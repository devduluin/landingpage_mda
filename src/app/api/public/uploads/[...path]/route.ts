import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        const { path } = params;
        
        if (!path || path.length === 0) {
            return new NextResponse("Not Found", { status: 404 });
        }

        // Build file path
        const filepath = join(process.cwd(), "public", "uploads", ...path);

        // Check if file exists
        if (!existsSync(filepath)) {
            return new NextResponse("File Not Found", { status: 404 });
        }

        // Read file
        const fileBuffer = await readFile(filepath);

        // Determine content type based on file extension
        const extension = path[path.length - 1].split('.').pop()?.toLowerCase();
        const contentType = getContentType(extension);

        // Return file with appropriate headers
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error serving file:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

function getContentType(extension: string | undefined): string {
    const types: Record<string, string> = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'svg': 'image/svg+xml',
        'pdf': 'application/pdf',
    };

    return types[extension || ''] || 'application/octet-stream';
}
