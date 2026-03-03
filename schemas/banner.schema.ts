import { z } from "zod";

export const bannerCreateSchema = z.object({
  name: z.string().min(1, "Nama banner harus diisi"),
  image: z.string().min(1, "Gambar banner harus diisi"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const bannerUpdateSchema = z.object({
  name: z.string().min(1, "Nama banner harus diisi").optional(),
  image: z.string().optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export type BannerCreate = z.infer<typeof bannerCreateSchema>;
export type BannerUpdate = z.infer<typeof bannerUpdateSchema>;
