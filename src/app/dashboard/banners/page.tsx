'use client';

import Link from 'next/link';
import { Edit, Trash, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import Image from 'next/image';

interface Banner {
  id: string;
  name: string;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<Meta | null>(null);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/banners?page=${page}&limit=${limit}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal memuat banner");
      }

      if (data.success) {
        setBanners(data.data);
        setMeta(data.meta);
      }
    } catch (err: any) {
      toast.error("Gagal memuat banner", {
        description: err?.message || "Terjadi kesalahan",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value));
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setBanners((prev) => prev.filter((b) => b.id !== id));

      toast.success("Banner berhasil dihapus");
    } catch (err: any) {
      toast.error("Gagal menghapus banner", {
        description: err.message || "Terjadi kesalahan",
      });
    }
  };

  useEffect(() => {
    fetchBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">Banners Management</h1>
          <p className="text-muted-foreground text-black">
            Manage hero section banners
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0">
          <Link href="/dashboard/banners/create">
            <Plus className="mr-2 h-4 w-4" />
            Add New Banner
          </Link>
        </Button>
      </div>
      
      {/* Content */}
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-lg p-6 overflow-x-auto">
        {loading ? (
          <p>Loading banners...</p>
        ) : banners.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-500">No banners yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Start by adding your first banner
            </p>
            <Button asChild className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0">
              <Link href="/dashboard/banners/create">
                <Plus className="mr-2 h-4 w-4" />
                Create First Banner
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="bg-white/30">
                <tr>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[30%]">Nama</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[35%]">Image</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[10%]">Order</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[10%]">Status</th>
                  <th className="border-b border-white/20 p-3 text-right text-gray-700 font-semibold w-[15%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20 text-sm">
                {banners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-3 text-gray-900 break-words">{banner.name}</td>
                    <td className="p-3">
                      <div className="relative w-32 h-20 overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={banner.image}
                          alt={banner.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </td>
                    <td className="p-3 text-gray-900">{banner.order}</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-1 rounded-md border ${
                        banner.isActive 
                          ? 'bg-green-100 text-green-700 border-green-200' 
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        {banner.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="border-orange-600 hover:bg-orange-50 hover:text-orange-900 hover:border-orange-300"
                        >
                          <Link href={`/dashboard/banners/update/${banner.id}`}>
                            <Edit className="h-4 w-4 text-orange-600 hover:text-orange-900" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="border-red-600 hover:bg-red-50 hover:text-red-900 hover:border-red-300"
                            >
                              <Trash className="h-4 w-4 text-red-600 hover:text-red-900" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the banner.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(banner.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Rows per page:</span>
                  <Select value={limit.toString()} onValueChange={handleLimitChange}>
                    <SelectTrigger className="w-[70px] border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">
                    Page {meta.page} of {meta.totalPages}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="border-gray-300"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                      disabled={page === meta.totalPages}
                      className="border-gray-300"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
