import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bannerCreateSchema } from "@/schemas/banner.schema";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = bannerCreateSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validasi gagal",
                    errors: validated.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const data = validated.data;

        const banner = await prisma.banner.create({
            data: {
                name: data.name,
                image: data.image,
                order: data.order,
                isActive: data.isActive,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Banner berhasil dibuat",
                data: banner,
            },
            { status: 201 }
        );
    } catch (error: any) {
        if (error.name === "ZodError") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validasi gagal",
                    errors: error.errors,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Terjadi kesalahan server",
            },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;
        const activeOnly = searchParams.get('activeOnly') === 'true';

        const whereCondition: any = {
            deletedAt: null
        };

        if (activeOnly) {
            whereCondition.isActive = true;
        }

        // Get total count for pagination
        const total = await prisma.banner.count({ where: whereCondition });

        const banners = await prisma.banner.findMany({
            where: whereCondition,
            orderBy: { order: "asc" },
            skip: activeOnly ? undefined : skip,
            take: activeOnly ? undefined : limit,
        });

        return NextResponse.json({
            success: true,
            message: "Berhasil mengambil data banners",
            data: banners,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Gagal mengambil data banners",
            },
            { status: 500 }
        );
    }
}
