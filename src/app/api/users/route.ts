import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userCreateSchema } from "@/schemas/user.schema";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = userCreateSchema.safeParse(body);

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

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
                bio: data.bio,
                role: data.role,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "User berhasil dibuat",
                data: user,
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

        if (error.code === "P2002") {
            return NextResponse.json(
                {
                success: false,
                message: "Email sudah terdaftar",
                },
                { status: 409 }
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

        const whereCondition = {
            deletedAt: null
        };

        // Get total count for pagination
        const total = await prisma.user.count({ where: whereCondition });

        const users = await prisma.user.findMany({
            where: whereCondition,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        });

        return NextResponse.json({
            success: true,
            message: "Berhasil mengambil data users",
            data: users,
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
                message: "Gagal mengambil data users",
            },
            { status: 500 }
        );
    }
}
