import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadUpdateSchema } from "@/schemas/lead.schema";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const lead = await prisma.lead.findFirst({
            where: { 
                id,
                deletedAt: null 
            },
        });

        if (!lead) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Lead tidak ditemukan",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Lead ditemukan",
            data: lead,
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
        const validated = leadUpdateSchema.safeParse(body);

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

        const lead = await prisma.lead.update({
            where: { id },
            data: validated.data,
        });

        return NextResponse.json({
            success: true,
            message: "Lead berhasil diupdate",
            data: lead,
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Lead tidak ditemukan",
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
        await prisma.lead.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        return NextResponse.json({
            success: true,
            message: "Lead berhasil dihapus",
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Lead tidak ditemukan",
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
