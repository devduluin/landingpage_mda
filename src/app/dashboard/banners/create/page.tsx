'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { Upload } from 'lucide-react';

export default function CreateBannerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    order: 0,
    isActive: true,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Hanya file gambar yang diperbolehkan (JPEG, PNG, WebP)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'banners');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Gagal mengupload gambar');
      }

      setFormData(prev => ({ ...prev, image: data.data.url }));
      setImagePreview(data.data.url);
      toast.success('Gambar berhasil diupload');
    } catch (err: any) {
      toast.error('Gagal mengupload gambar', {
        description: err.message || 'Terjadi kesalahan',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error('Gambar banner harus diupload');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Gagal membuat banner');
      }

      toast.success('Banner berhasil dibuat');
      router.push('/dashboard/banners');
    } catch (err: any) {
      toast.error('Gagal membuat banner', {
        description: err.message || 'Terjadi kesalahan',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-black">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Banner</h1>
        <p className="text-muted-foreground">
          Add a new banner to the hero section
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Banner Name *</Label>
            <Input
              id="name"
              required
              placeholder="e.g., Homepage Banner 1"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Banner Image *</Label>
            <p className="text-xs text-gray-500 mb-2">Tinggi gambar harus: <strong>400 pixels</strong>, lebar bebas (recommended: 1200-1400px untuk best quality)</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="flex-1"
                />
                <Button type="button" disabled={uploading} variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              
              {imagePreview && (
                <div className="relative w-full h-48 overflow-hidden rounded-lg border border-gray-200">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                min="0"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
              <p className="text-xs text-gray-500">Lower numbers appear first</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="isActive">Status</Label>
              <select
                id="isActive"
                value={formData.isActive.toString()}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading || uploading}>
              {loading ? 'Creating...' : 'Create Banner'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/banners">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
