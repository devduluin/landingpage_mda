import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
