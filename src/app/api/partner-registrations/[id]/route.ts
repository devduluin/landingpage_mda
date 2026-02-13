import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const registration = await prisma.driverRegistration.findFirst({
            where: { 
                id,
                deletedAt: null 
            },
        });

        if (!registration) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Pendaftaran tidak ditemukan",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Pendaftaran ditemukan",
            data: registration,
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

        const registration = await prisma.driverRegistration.update({
            where: { id },
            data: {
                status: body.status,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Status pendaftaran berhasil diupdate",
            data: registration,
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Pendaftaran tidak ditemukan",
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

        // Soft delete
        await prisma.driverRegistration.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Pendaftaran berhasil dihapus",
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Pendaftaran tidak ditemukan",
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
