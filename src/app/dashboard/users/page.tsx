'use client';

import Link from 'next/link';
import { Edit, Trash, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  phone: string | null;
  bio: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [verifyPassword, setVerifyPassword] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users?page=${page}&limit=${limit}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal memuat user");
      }

      if (data.success) {
        setUsers(data.data);
        setMeta(data.meta);
      }
    } catch (err: any) {
      toast.error("Gagal memuat user", {
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
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setUsers((prev) => prev.filter((l) => l.id !== id));

      toast.success("User berhasil dihapus");
    } catch (err: any) {
      toast.error("Gagal menghapus user", {
        description: err.message || "Terjadi kesalahan",
      });
    }
  };

  const handleVerifyPassword = async () => {
    if (!verifyPassword.trim()) {
      toast.error("Password wajib diisi");
      return;
    }

    if (!selectedUserId) return;

    setIsVerifying(true);
    try {
      const res = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: verifyPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      if (data.success) {
        toast.success("Verifikasi berhasil");
        router.push(`/dashboard/users/update/${selectedUserId}`);
      }
    } catch (err: any) {
      toast.error("Verifikasi gagal", {
        description: err.message || "Password salah",
      });
    } finally {
      setIsVerifying(false);
      setVerifyPassword('');
      setSelectedUserId(null);
    }
  };

  const openVerifyModal = (userId: string) => {
    setSelectedUserId(userId);
    setVerifyPassword('');
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">Users Management</h1>
          <p className="text-muted-foreground  text-black">
            Manage users and administrators
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0">
          <Link href="/dashboard/users/create">
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </Link>
        </Button>
      </div>
      
      {/* Content */}
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-lg p-6 overflow-x-auto">
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-500">No users yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Start by adding your first user
            </p>
            <Button asChild className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0">
              <Link href="/dashboard/users/create">
                <Plus className="mr-2 h-4 w-4" />
                Create First User
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/30">
                <tr>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold">Nama</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold">Email</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold">Phone</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold">Role</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold">Additional Information</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold">Created At</th>
                  <th className="border-b border-white/20 p-3 text-right text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-3 text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold text-sm">
                          {(user.name || user.email).charAt(0).toUpperCase()}
                        </div>
                        <span>{user.name || '-'}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-900">{user.email}</td>
                    <td className="p-3 text-gray-900">{user.phone || '-'}</td>
                    <td className="p-3">
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md border border-orange-200 capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 text-gray-900">{user.bio || '-'}</td>
                    <td className="p-3 text-gray-900 text-sm">
                      {new Date(user.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openVerifyModal(user.id)}
                              className="border-orange-600 hover:bg-orange-50 hover:text-orange-900 hover:border-orange-300"
                            >
                              <Edit className="h-4 w-4 text-orange-600 hover:text-orange-900" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Verifikasi Password</AlertDialogTitle>
                              <AlertDialogDescription>
                                Masukkan password Anda untuk melanjutkan edit user ini.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="py-4">
                              <Label htmlFor="verify-password">Password</Label>
                              <Input
                                id="verify-password"
                                type="password"
                                placeholder="Masukkan password Anda"
                                value={verifyPassword}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleVerifyPassword();
                                  }
                                }}
                              />
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => {
                                setVerifyPassword('');
                                setSelectedUserId(null);
                              }}>
                                Batal
                              </AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={handleVerifyPassword}
                                disabled={isVerifying}
                              >
                                {isVerifying ? 'Memverifikasi...' : 'Verifikasi'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
                              <AlertDialogTitle>Hapus User?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. User akan dihapus permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(user.id)}>
                                Hapus
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
          </div>
        )}

        {meta && meta.totalPages > 0 && (
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select value={limit.toString()} onValueChange={handleLimitChange}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">entries</span>
            </div>

            <div className="text-sm text-gray-600">
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, meta.total)} of {meta.total} users
            </div>
            
            {meta.totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
              
                <div className="flex items-center gap-1">
                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const showPage = 
                      pageNum === 1 || 
                      pageNum === meta.totalPages || 
                      (pageNum >= page - 1 && pageNum <= page + 1);
                    
                    if (!showPage && pageNum === 2 && page > 3) {
                      return <span key={pageNum} className="px-2">...</span>;
                    }
                    
                    if (!showPage && pageNum === meta.totalPages - 1 && page < meta.totalPages - 2) {
                      return <span key={pageNum} className="px-2">...</span>;
                    }
                    
                    if (!showPage) return null;
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                        className={pageNum === page ? "bg-orange-600 hover:bg-orange-700" : ""}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
              
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
