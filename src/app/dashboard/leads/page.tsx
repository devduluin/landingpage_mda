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

interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  service: string[];
  message?: string;
  createdAt: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<Meta | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leads?page=${page}&limit=${limit}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal memuat lead");
      }

      if (data.success) {
        setLeads(data.data);
        setMeta(data.meta);
      }
    } catch (err: any) {
      toast.error("Gagal memuat lead", {
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
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setLeads((prev) => prev.filter((l) => l.id !== id));

      toast.success("Lead berhasil dihapus");
    } catch (err: any) {
      toast.error("Gagal menghapus lead", {
        description: err.message || "Terjadi kesalahan",
      });
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">Leads Management</h1>
          <p className="text-muted-foreground  text-black">
            Manage potential clients and business opportunities
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0">
          <Link href="/dashboard/leads/create">
            <Plus className="mr-2 h-4 w-4" />
            Add New Lead
          </Link>
        </Button>
      </div>
      
      {/* Content */}
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-lg p-6 overflow-x-auto">
        {loading ? (
          <p>Loading leads...</p>
        ) : leads.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-500">No leads yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Start by adding your first potential client
            </p>
            <Button asChild className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0">
              <Link href="/dashboard/leads/create">
                <Plus className="mr-2 h-4 w-4" />
                Create First Lead
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="bg-white/30">
                <tr>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[15%]">Nama</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[20%]">Email</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[12%]">Phone</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[13%]">Perusahaan</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[7%]">Industri</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[20%]">Layanan</th>
                  <th className="border-b border-white/20 p-3 text-gray-700 font-semibold w-[8%]">Date In</th>
                  <th className="border-b border-white/20 p-3 text-right text-gray-700 font-semibold w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20 text-sm">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-3 text-gray-900 break-words">{lead.fullName}</td>
                    <td className="p-3 text-gray-900 break-words">{lead.email}</td>
                    <td className="p-3 text-gray-900 break-words">{lead.phone}</td>
                    <td className="p-3 text-gray-900 break-words">{lead.companyName}</td>
                    <td className="p-3 text-gray-900 break-words">{lead.industry}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(lead.service) ? lead.service.map((s, idx) => (
                          <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md border border-orange-200">
                            {s}
                          </span>
                        )) : '-'}
                      </div>
                    </td>
                    <td className="p-3 text-gray-900 break-words">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }) : '-'}</td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="border-orange-600 hover:bg-orange-50 hover:text-orange-900 hover:border-orange-300"
                        >
                          <Link href={`/dashboard/leads/update/${lead.id}`}>
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
                              <AlertDialogTitle>Hapus Lead?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Lead akan dihapus permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(lead.id)}>
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
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, meta.total)} of {meta.total} leads
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
