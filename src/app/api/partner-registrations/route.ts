import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        
        const fullName = formData.get('fullName') as string;
        const ktpNumber = formData.get('ktpNumber') as string;
        const birthDate = formData.get('birthDate') as string;
        const email = formData.get('email') as string;
        const phoneNumber = formData.get('phoneNumber') as string;
        const completeAddress = formData.get('completeAddress') as string;
        const serviceType = formData.get('serviceType') as string;

        // Handle file upload for CV
        let fileCv = null;
        const fileCvFile = formData.get('fileCv') as File | null;

        // Save file if it exists
        if (fileCvFile && fileCvFile.size > 0) {
            const bytes = await fileCvFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `cv-${Date.now()}-${fileCvFile.name}`;
            const uploadDir = join(process.cwd(), 'public', 'uploads', 'drivers');
            
            // Create directory if it doesn't exist
            await mkdir(uploadDir, { recursive: true });
            
            const path = join(uploadDir, filename);
            await writeFile(path, buffer);
            fileCv = `/uploads/drivers/${filename}`;
        }

        // Create driver registration
        const driverRegistration = await prisma.driverRegistration.create({
            data: {
                fullName,
                ktpNumber,
                birthDate: new Date(birthDate),
                email,
                phoneNumber,
                completeAddress,
                serviceType,
                fileCv,
                status: 'pending',
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Pendaftaran driver berhasil dibuat",
                data: driverRegistration,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Driver registration error:', error);

        if (error.code === "P2002") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Nomor KTP sudah terdaftar",
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Terjadi kesalahan server",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const skip = (page - 1) * limit;

        const whereCondition: any = {
            deletedAt: null
        };

        if (status) {
            whereCondition.status = status;
        }

        // Get total count for pagination
        const total = await prisma.driverRegistration.count({ where: whereCondition });

        const registrations = await prisma.driverRegistration.findMany({
            where: whereCondition,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        });

        return NextResponse.json({
            success: true,
            message: "Berhasil mengambil data pendaftaran driver",
            data: registrations,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching driver registrations:', error);
        return NextResponse.json(
            {
                success: false,
                message: "Gagal mengambil data pendaftaran driver",
            },
            { status: 500 }
        );
    }
}
