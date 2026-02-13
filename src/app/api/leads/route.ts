import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadCreateSchema } from "@/schemas/lead.schema";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = leadCreateSchema.safeParse(body);

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

        const lead = await prisma.lead.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                companyName: data.companyName,
                industry: data.industry,
                service: data.service,
                message: data.message || null,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Lead berhasil dibuat",
                data: lead,
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
        const period = searchParams.get('period') || 'monthly';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Calculate date range based on period
        const now = new Date();
        let startDate = new Date();

        switch (period) {
            case 'daily':
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'weekly':
                const day = now.getDay();
                startDate.setDate(now.getDate() - day);
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'monthly':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case 'yearly':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            default:
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }

        const whereCondition = {
            createdAt: {
                gte: startDate,
            },
            deletedAt: null
        };

        // Get total count for pagination
        const total = await prisma.lead.count({ where: whereCondition });

        const leads = await prisma.lead.findMany({
            where: whereCondition,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        });

        return NextResponse.json({
            success: true,
            message: "Berhasil mengambil data leads",
            data: leads,
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
                message: "Gagal mengambil data leads",
            },
            { status: 500 }
        );
    }
}
