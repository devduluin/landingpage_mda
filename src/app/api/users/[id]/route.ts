import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userUpdateSchema } from "@/schemas/user.schema";
import bcrypt from "bcryptjs";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const user = await prisma.user.findFirst({
            where: { 
                id,
                deletedAt: null 
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User tidak ditemukan",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "User ditemukan",
            data: user,
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Terjadi kesalahan server",
            },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const validated = userUpdateSchema.safeParse(body);

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

        // Hash password if provided
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const user = await prisma.user.update({
            where: { id },
            data,
        });

        return NextResponse.json({
            success: true,
            message: "User berhasil diupdate",
            data: user,
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                {
                    success: false,
                    message: "User tidak ditemukan",
                },
                { status: 404 }
            );
        }

        if (error.code === "P2002") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email sudah digunakan",
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

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        // Soft delete: update deletedAt instead of deleting
        await prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        return NextResponse.json({
            success: true,
            message: "User berhasil dihapus",
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                {
                    success: false,
                    message: "User tidak ditemukan",
                },
                { status: 404 }
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
