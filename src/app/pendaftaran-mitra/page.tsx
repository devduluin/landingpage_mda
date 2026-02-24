'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const driverRegistrationSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  ktpNumber: z.string().min(16, 'Nomor KTP harus 16 digit').max(16, 'Nomor KTP harus 16 digit'),
  birthDate: z.string().min(1, 'Tanggal lahir harus diisi'),
  email: z.string().email('Email tidak valid'),
  phoneNumber: z.string().min(10, 'Nomor HP minimal 10 digit'),
  completeAddress: z.string().min(10, 'Alamat lengkap minimal 10 karakter'),
  serviceType: z.string().min(1, 'Pilih jenis layanan'),
  fileCv: z.any().optional(),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: 'Anda harus menyetujui syarat dan ketentuan',
  }),
});

type DriverRegistrationForm = z.infer<typeof driverRegistrationSchema>;

export default function PendaftaranDriverPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<DriverRegistrationForm>({
    resolver: zodResolver(driverRegistrationSchema),
  });

  const watchServiceType = watch('serviceType');

  const onSubmit = async (data: DriverRegistrationForm) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'fileCv') {
          if (value && value[0]) {
            formData.append(key, value[0]);
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      const res = await fetch('/api/partner-registrations', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Gagal mengirim pendaftaran');
      }

      toast.success('Pendaftaran berhasil!', {
        description: 'Data Anda telah kami terima dan akan segera diproses.',
      });

      reset();

      // Redirect to home page after successful registration
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error: any) {
      toast.error('Gagal mengirim pendaftaran', {
        description: error.message || 'Terjadi kesalahan, silakan coba lagi.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            <span className="font-medium">Kembali ke Beranda</span>
          </Link>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Pendaftaran Mitra <span className="text-orange-500">MDA Partner</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Bergabunglah bersama MDA Partner dan kembangkan karir Anda di berbagai bidang layanan profesional. Daftarkan diri Anda sekarang untuk menjadi bagian dari mitra terpercaya kami.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Informasi Pribadi</h2>

            {/* Section: Nama Lengkap */}
            <div className="border-b border-gray-200 pb-6 space-y-4">
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Masukkan Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    {...register('fullName')}
                    placeholder="Masukkan Nama Lengkap"
                    className="h-12"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Section: Nomor KTP & Tanggal Lahir */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Masukkan Nomor KTP <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    {...register('ktpNumber')}
                    placeholder="Masukkan Nomor KTP"
                    maxLength={16}
                    className="h-12"
                  />
                  {errors.ktpNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.ktpNumber.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Masukkan Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    {...register('birthDate')}
                    className="h-12"
                  />
                  {errors.birthDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>
                  )}
                </div>
              </div>

              {/* Section: Email & No HP */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Masukkan Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder="contoh@email.com"
                    className="h-12"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Masukkan Nomor HP <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    {...register('phoneNumber')}
                    placeholder="08xxxxxxxxxx"
                    className="h-12"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>

              {/* Section: Alamat Domisili */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Jalan, Nomor Rumah, RT/RW, Kel/Desa, Kecamatan, Kota, Kode Pos
                  <span className="text-red-500">*</span>
                </label>
                <Textarea
                  {...register('completeAddress')}
                  placeholder="Masukkan alamat domisili lengkap"
                  rows={4}
                />
                {errors.completeAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.completeAddress.message}</p>
                )}
              </div>
            </div>

            {/* Section: Jenis Layanan */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Jenis Layanan</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih jenis layanan yang Anda inginkan <span className="text-red-500">*</span>
                </label>
                <Select
                  value={watchServiceType}
                  onValueChange={(value) => setValue('serviceType', value, { shouldValidate: true })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Pilih jenis layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ride-Hailing Driver">Ride-Hailing Driver</SelectItem>
                    <SelectItem value="Manufacture (Pabrikasi/Garmen)">Manufacture (Pabrikasi/Garmen)</SelectItem>
                    <SelectItem value="Security & Building Management">Security & Building Management</SelectItem>
                    <SelectItem value="Courier">Courier</SelectItem>
                    <SelectItem value="Trucking Driver">Trucking Driver</SelectItem>
                    <SelectItem value="Technician">Technician</SelectItem>
                    <SelectItem value="Gardener (Layanan Pertamanan)">Gardener (Layanan Pertamanan)</SelectItem>
                    <SelectItem value="Pest Control">Pest Control</SelectItem>
                    <SelectItem value="Gondola">Gondola</SelectItem>
                    <SelectItem value="Cleaning Service">Cleaning Service</SelectItem>
                    <SelectItem value="Driver Kantoran">Driver Kantoran</SelectItem>
                    <SelectItem value="Front Office">Front Office</SelectItem>
                  </SelectContent>
                </Select>
                {errors.serviceType && (
                  <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>
                )}
              </div>
            </div>

            {/* Section: Upload CV */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">CV/Daftar Riwayat Hidup</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih File CV (PDF, DOC, DOCX, atau Gambar)
                </label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  {...register('fileCv')}
                  className="h-12 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Pilih Dokumen | Belum Ada Dokumen</p>
              </div>
            </div>

            {/* Section: Syarat dan Ketentuan */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreedToTerms"
                  {...register('agreedToTerms')}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="agreedToTerms" className="text-sm text-gray-700 cursor-pointer">
                  Saya menyetujui <span className="text-orange-500 font-semibold">Syarat dan Ketentuan</span> yang berlaku.
                  Data yang saya berikan adalah benar dan saya bertanggung jawab atas kebenaran data tersebut.
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.agreedToTerms && (
                <p className="text-red-500 text-sm mt-2">{errors.agreedToTerms.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Mengirim...' : 'Lanjutkan'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
