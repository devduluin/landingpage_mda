import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bannerUpdateSchema } from "@/schemas/banner.schema";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const banner = await prisma.banner.findFirst({
            where: { 
                id,
                deletedAt: null 
            },
        });

        if (!banner) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Banner tidak ditemukan",
                },
                { status: 404 }
            );
        }

        // Normalize image URL for backward compatibility
        const normalizedBanner = {
            ...banner,
            image: banner.image?.startsWith('/uploads/')
                ? `/api/public${banner.image}`
                : banner.image
        };

        return NextResponse.json({
            success: true,
            message: "Banner ditemukan",
            data: normalizedBanner,
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
        const validated = bannerUpdateSchema.safeParse(body);

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

        const banner = await prisma.banner.update({
            where: { id },
            data: validated.data,
        });

        return NextResponse.json({
            success: true,
            message: "Banner berhasil diupdate",
            data: banner,
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Banner tidak ditemukan",
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

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        // Soft delete: update deletedAt instead of deleting
        await prisma.banner.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        return NextResponse.json({
            success: true,
            message: "Banner berhasil dihapus",
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Banner tidak ditemukan",
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
