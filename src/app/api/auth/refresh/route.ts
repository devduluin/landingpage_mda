import { NextResponse } from "next/server";
import { verifyToken, createToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refresh_token")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { success: false, message: "Refresh token tidak ditemukan" },
                { status: 401 }
            );
        }

        // Verify refresh token
        const verified = await verifyToken(refreshToken);
        if (!verified) {
            return NextResponse.json(
                { success: false, message: "Refresh token tidak valid atau expired" },
                { status: 401 }
            );
        }

        // Get user data
        const user = await prisma.user.findFirst({
            where: { 
                id: verified.payload.id as string,
                deletedAt: null
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        // Generate new access token
        const newAccessToken = await createToken({
            id: user.id,
            email: user.email,
        });

        const res = NextResponse.json({
            success: true,
            message: "Token berhasil diperbarui",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });

        // Set new access_token cookie
        res.cookies.set("access_token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return res;

    } catch (error) {
        console.error("Refresh token error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
