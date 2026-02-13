import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { password } = await req.json();

        if (!password) {
            return NextResponse.json(
                { success: false, message: "Password wajib diisi" },
                { status: 400 }
            );
        }

        // Get current user from token
        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const verified = await verifyToken(token);
        if (!verified) {
            return NextResponse.json(
                { success: false, message: "Token tidak valid" },
                { status: 401 }
            );
        }

        // Get user with password
        const user = await prisma.user.findFirst({
            where: { 
                id: verified.payload.id as string,
                deletedAt: null
            },
            select: { 
                id: true,
                password: true,
                deletedAt: true
            }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Password salah" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Password terverifikasi"
        });

    } catch (error) {
        console.error("Verify password error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
