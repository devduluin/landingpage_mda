import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            return NextResponse.json(null);
        }

        const verified = await verifyToken(token);
        if (!verified) {
            return NextResponse.json(null);
        }

        const user = await prisma.user.findFirst({
            where: { 
                id: verified.payload.id as string,
                deletedAt: null
            },
            select: { 
                id: true, 
                name: true, 
                email: true,
                role: true,
                avatar: true
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Get user error:", error);
        return NextResponse.json(null);
    }
}
