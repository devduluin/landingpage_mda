import { z } from "zod";

export const userCreateSchema = z.object({
    email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),

    password: z
        .string()
        .min(6, "Password minimal 6 karakter")
        .max(100, "Password terlalu panjang"),

    name: z
        .string()
        .max(100, "Nama terlalu panjang")
        .optional(),

    phone: z
        .string()
        .max(20, "Nomor telepon terlalu panjang")
        .optional(),

    avatar: z
        .string()
        .max(255, "Avatar URL terlalu panjang")
        .optional(),

    bio: z
        .string()
        .optional(),

    role: z
        .string()
        .default("admin"),
});

export const userUpdateSchema = userCreateSchema.partial();

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
