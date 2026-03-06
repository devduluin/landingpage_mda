import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const folder = formData.get("folder") as string || "general";

        if (!file) {
            return NextResponse.json(
                { success: false, message: "Tidak ada file yang diupload" },
                { status: 400 }
            );
        }

        // Validate file type (only images)
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, message: "Hanya file gambar yang diperbolehkan (JPEG, PNG, WebP)" },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, message: "Ukuran file maksimal 5MB" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        if (folder === "banners") {
            try {
                // Create a bitmap to get dimensions
                const { default: sizeOf } = await import('image-size');
                const dimensions = sizeOf(buffer);
                
                if (dimensions.height !== 400) {
                    return NextResponse.json(
                        { 
                            success: false, 
                            message: `Tinggi gambar harus 400 pixels. Gambar Anda: ${dimensions.width}x${dimensions.height}` 
                        },
                        { status: 400 }
                    );
                }
            } catch (dimensionError) {
                console.error("Dimension validation error:", dimensionError);
                // Continue without dimension validation if it fails
            }
        }

        // Create unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, "-");
        const filename = `${timestamp}-${originalName}`;

        // Create upload directory if it doesn't exist
        const uploadDir = join(process.cwd(), "public", "uploads", folder);
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Save file
        const filepath = join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return public URL (via API route for standalone mode)
        const publicUrl = `/api/public/uploads/${folder}/${filename}`;

        return NextResponse.json({
            success: true,
            message: "File berhasil diupload",
            data: {
                url: publicUrl,
                filename,
            },
        });
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Gagal mengupload file",
            },
            { status: 500 }
        );
    }
}
