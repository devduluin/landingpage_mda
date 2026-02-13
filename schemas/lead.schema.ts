import { z } from "zod";

export const leadCreateSchema = z.object({
    fullName: z
        .string()
        .min(1, "Nama lengkap wajib diisi")
        .max(100, "Nama terlalu panjang"),

    email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),

    phone: z
        .string()
        .min(8, "Nomor telepon minimal 8 digit")
        .max(20, "Nomor telepon terlalu panjang"),

    companyName: z
        .string()
        .min(1, "Nama perusahaan wajib diisi")
        .max(100, "Nama perusahaan terlalu panjang"),

    industry: z
        .string()
        .min(1, "Industri wajib diisi")
        .max(50, "Industri terlalu panjang"),

    service: z
        .array(z.string())
        .min(1, "Silahkan pilih minimal satu layanan"),

    message: z.string().optional(),
});

export const leadUpdateSchema = leadCreateSchema.partial();

export type LeadCreate = z.infer<typeof leadCreateSchema>;
export type LeadUpdate = z.infer<typeof leadUpdateSchema>;
