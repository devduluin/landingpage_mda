'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Edit,
    User,
    Mail,
    Phone,
    Building2,
    Briefcase,
    Layers,
    Calendar,
    MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
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
import { Trash } from 'lucide-react';

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
    deletedAt?: string | null;
}

export default function LeadDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [lead, setLead] = useState<Lead | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLead();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedParams.id]);

    const fetchLead = async () => {
        try {
            const res = await fetch(`/api/leads/${resolvedParams.id}`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Gagal memuat lead');

            if (data.success) {
                setLead(data.data);
            }
        } catch (err: any) {
            toast.error('Gagal memuat lead', {
                description: err.message,
            });
            router.push('/dashboard/leads');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/leads/${resolvedParams.id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            toast.success('Lead berhasil dihapus');
            router.push('/dashboard/leads');
        } catch (err: any) {
            toast.error('Gagal menghapus lead', {
                description: err.message || 'Terjadi kesalahan',
            });
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-xl animate-pulse" />
                    <div>
                        <div className="h-7 w-48 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-4 w-32 bg-gray-100 rounded-lg animate-pulse mt-2" />
                    </div>
                </div>
                <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-lg p-6 space-y-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!lead) return null;

    const fields = [
        {
            icon: <User className="w-5 h-5 text-orange-500" />,
            label: 'Nama Lengkap',
            value: lead.fullName,
        },
        {
            icon: <Mail className="w-5 h-5 text-orange-500" />,
            label: 'Email',
            value: lead.email,
        },
        {
            icon: <Phone className="w-5 h-5 text-orange-500" />,
            label: 'Nomor Telepon',
            value: lead.phone,
        },
        {
            icon: <Building2 className="w-5 h-5 text-orange-500" />,
            label: 'Nama Perusahaan',
            value: lead.companyName,
        },
        {
            icon: <Briefcase className="w-5 h-5 text-orange-500" />,
            label: 'Bidang Usaha',
            value: lead.industry,
        },
        {
            icon: <Calendar className="w-5 h-5 text-orange-500" />,
            label: 'Tanggal Masuk',
            value: new Date(lead.createdAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/leads"
                        className="flex items-center justify-center w-10 h-10 bg-white/80 rounded-xl border border-white/20 shadow-sm hover:bg-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-black">
                            Detail Lead
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            ID: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">{lead.id}</code>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        asChild
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0"
                    >
                        <Link href={`/dashboard/leads/update/${lead.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Lead
                        </Link>
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                            >
                                <Trash className="mr-2 h-4 w-4" />
                                Hapus
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Lead?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini tidak dapat dibatalkan. Lead <strong>{lead.fullName}</strong> akan dihapus permanen dari sistem.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-5">Informasi Lead</h2>
                    <div className="space-y-4">
                        {fields.map((field, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/80 hover:bg-white/80 transition-colors border border-transparent hover:border-gray-100"
                            >
                                <div className="flex-shrink-0 w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center">
                                    {field.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        {field.label}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 break-words">
                                        {field.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                                <Layers className="w-4 h-4 text-orange-500" />
                            </div>
                            <h2 className="text-base font-semibold text-gray-900">Layanan Dibutuhkan</h2>
                        </div>
                        {Array.isArray(lead.service) && lead.service.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {lead.service.map((s, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center text-xs font-medium bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">Tidak ada layanan yang dipilih</p>
                        )}
                    </div>

                    {lead.message && (
                        <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <MessageSquare className="w-4 h-4 text-blue-500" />
                                </div>
                                <h2 className="text-base font-semibold text-gray-900">Pesan</h2>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {lead.message}
                            </p>
                        </div>
                    )}

                    <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-lg p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
                        <div className="space-y-2">
                            <a
                                href={`mailto:${lead.email}`}
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition-all duration-200 border border-transparent hover:border-orange-200"
                            >
                                <Mail className="w-4 h-4" />
                                Kirim Email
                            </a>
                            <a
                                href={`tel:${lead.phone}`}
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all duration-200 border border-transparent hover:border-green-200"
                            >
                                <Phone className="w-4 h-4" />
                                Hubungi via Telepon
                            </a>
                            <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all duration-200 border border-transparent hover:border-green-200"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
