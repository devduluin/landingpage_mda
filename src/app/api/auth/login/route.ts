import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/jwt";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { status: "error", message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst({
            where: { 
                email,
                deletedAt: null
            }
        });

        if (!user) {
            return NextResponse.json(
                { status: "error", message: "User not found. Email is not registered." },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { status: "error", message: "Password incorrect." },
                { status: 401 }
            );
        }

        // Create access token (7 days)
        const accessToken = await createToken({
            id: user.id,
            email: user.email,
        });

        // Create refresh token (30 days)
        const refreshToken = await createToken({
            id: user.id,
            email: user.email,
        });

        const res = NextResponse.json({
            status: "success",
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: accessToken
        });

        // Set access_token cookie (7 days)
        res.cookies.set("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        // Set refresh_token cookie (30 days)
        res.cookies.set("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        return res;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
}
