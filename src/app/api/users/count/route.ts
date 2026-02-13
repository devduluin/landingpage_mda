import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const period = searchParams.get('period') || 'monthly';

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

        const userCount = await prisma.user.count({
            where: {
                createdAt: {
                    gte: startDate,
                },
                deletedAt: null
            }
        });
        
        return NextResponse.json({
            success: true,
            data: {
                total: userCount
            }
        });
    } catch (error) {
        console.error('Error fetching user count:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch user count' },
            { status: 500 }
        );
    }
}
