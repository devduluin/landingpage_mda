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

        // Normalize image URLs for backward compatibility
        // Convert old /uploads/... format to /api/public/uploads/...
        const normalizedBanners = banners.map(banner => ({
            ...banner,
            image: banner.image?.startsWith('/uploads/')
                ? `/api/public${banner.image}`
                : banner.image
        }));

        return NextResponse.json({
            success: true,
            message: "Berhasil mengambil data banners",
            data: normalizedBanners,
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
