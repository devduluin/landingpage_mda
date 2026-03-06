'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Building2, User, Phone, Mail, Briefcase, Layers, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SERVICE_OPTIONS = [
    'Ride-Hailing Driver',
    'Manufacture (Pabrikasi/Garmen)',
    'Security & Building Management',
    'Courier',
    'Trucking Driver',
    'Technician',
    'Gardener (Layanan Pertamanan)',
    'Pest Control',
    'Gondola',
    'Cleaning Service',
    'Driver Kantoran',
    'Front Office',
];

interface LeadPopupFormProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormStep = 'form' | 'success';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    companyName: string;
    industry: string;
    service: string[];
    message: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    companyName?: string;
    industry?: string;
    service?: string;
}

export default function LeadPopupForm({ isOpen, onClose }: LeadPopupFormProps) {
    const [step, setStep] = useState<FormStep>('form');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        industry: '',
        service: [],
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('form');
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    companyName: '',
                    industry: '',
                    service: [],
                    message: '',
                });
                setErrors({});
            }, 300);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
            newErrors.fullName = 'Nama lengkap minimal 3 karakter';
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email tidak valid';
        }
        if (!formData.phone.trim() || formData.phone.trim().length < 8) {
            newErrors.phone = 'Nomor telepon minimal 8 digit';
        }
        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Nama perusahaan wajib diisi';
        }
        if (!formData.industry.trim()) {
            newErrors.industry = 'Bidang usaha wajib diisi';
        }
        if (formData.service.length === 0) {
            newErrors.service = 'Pilih minimal satu layanan';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleServiceToggle = (service: string) => {
        setFormData(prev => ({
            ...prev,
            service: prev.service.includes(service)
                ? prev.service.filter(s => s !== service)
                : [...prev.service, service],
        }));
        if (errors.service) {
            setErrors(prev => ({ ...prev, service: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Terjadi kesalahan');
            }

            setStep('success');
        } catch (err: any) {
            setErrors(prev => ({
                ...prev,
                fullName: err.message || 'Terjadi kesalahan, silakan coba lagi.',
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
                style={{ animation: 'slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}
                onClick={e => e.stopPropagation()}
            >
                {step === 'success' ? (
                    /* Success State */
                    <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Terima Kasih!</h2>
                        <p className="text-gray-500 mb-2 leading-relaxed">
                            Data Anda telah kami terima. Tim kami akan segera menghubungi Anda untuk membahas kebutuhan SDM perusahaan Anda.
                        </p>
                        <p className="text-sm text-orange-500 font-medium mb-8">
                            Kami biasanya merespons dalam 1×24 jam kerja.
                        </p>
                        <Button
                            onClick={onClose}
                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg shadow-orange-200 transition-all duration-300"
                        >
                            Tutup
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="relative px-6 pt-6 pb-4 border-b border-gray-100">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                                        Konsultasi Gratis
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Dapatkan Solusi SDM Terbaik
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Isi data perusahaan Anda dan tim kami akan segera menghubungi Anda.
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        <span className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5 text-orange-500" />
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={e => {
                                            setFormData(prev => ({ ...prev, fullName: e.target.value }));
                                            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
                                        }}
                                        placeholder="Masukkan nama lengkap"
                                        className={`w-full h-10 px-3.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                                            }`}
                                    />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        <span className="flex items-center gap-1.5">
                                            <Mail className="w-3.5 h-3.5 text-orange-500" />
                                            Email <span className="text-red-500">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => {
                                            setFormData(prev => ({ ...prev, email: e.target.value }));
                                            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                                        }}
                                        placeholder="contoh@perusahaan.com"
                                        className={`w-full h-10 px-3.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        <span className="flex items-center gap-1.5">
                                            <Phone className="w-3.5 h-3.5 text-orange-500" />
                                            Nomor Telepon <span className="text-red-500">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => {
                                            setFormData(prev => ({ ...prev, phone: e.target.value }));
                                            if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                                        }}
                                        placeholder="08xxxxxxxxxx"
                                        className={`w-full h-10 px-3.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                                            }`}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        <span className="flex items-center gap-1.5">
                                            <Building2 className="w-3.5 h-3.5 text-orange-500" />
                                            Nama Perusahaan <span className="text-red-500">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        onChange={e => {
                                            setFormData(prev => ({ ...prev, companyName: e.target.value }));
                                            if (errors.companyName) setErrors(prev => ({ ...prev, companyName: undefined }));
                                        }}
                                        placeholder="PT. Nama Perusahaan"
                                        className={`w-full h-10 px-3.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 ${errors.companyName ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                                            }`}
                                    />
                                    {errors.companyName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    <span className="flex items-center gap-1.5">
                                        <Briefcase className="w-3.5 h-3.5 text-orange-500" />
                                        Bidang Usaha <span className="text-red-500">*</span>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.industry}
                                    onChange={e => {
                                        setFormData(prev => ({ ...prev, industry: e.target.value }));
                                        if (errors.industry) setErrors(prev => ({ ...prev, industry: undefined }));
                                    }}
                                    placeholder="Contoh: Manufaktur, Perhotelan, Ritel..."
                                    className={`w-full h-10 px-3.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 ${errors.industry ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                                        }`}
                                />
                                {errors.industry && (
                                    <p className="text-red-500 text-xs mt-1">{errors.industry}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    <span className="flex items-center gap-1.5">
                                        <MessageSquare className="w-3.5 h-3.5 text-orange-500" />
                                        Pesan / Kebutuhan Tambahan
                                    </span>
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    placeholder="Ceritakan kebutuhan SDM Anda secara singkat (opsional)..."
                                    rows={3}
                                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 border-gray-300 bg-white hover:border-gray-400 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <span className="flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 text-orange-500" />
                                        Layanan yang Dibutuhkan <span className="text-red-500">*</span>
                                    </span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {SERVICE_OPTIONS.map(service => {
                                        const isSelected = formData.service.includes(service);
                                        return (
                                            <button
                                                key={service}
                                                type="button"
                                                onClick={() => handleServiceToggle(service)}
                                                className={`text-left text-xs font-medium px-3 py-2.5 rounded-xl border transition-all duration-200 leading-snug ${isSelected
                                                    ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200'
                                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600'
                                                    }`}
                                            >
                                                {service}
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.service && (
                                    <p className="text-red-500 text-xs mt-1.5">{errors.service}</p>
                                )}
                                {formData.service.length > 0 && (
                                    <p className="text-xs text-orange-600 mt-1.5 font-medium">
                                        {formData.service.length} layanan dipilih
                                    </p>
                                )}
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 transition-all duration-300 disabled:opacity-60"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Mengirim...
                                        </span>
                                    ) : (
                                        'Kirim & Dapatkan Konsultasi Gratis'
                                    )}
                                </Button>
                                <p className="text-center text-xs text-gray-400 mt-2">
                                    Dengan mengirim form ini, Anda menyetujui untuk dihubungi oleh tim MDA Partner.
                                </p>
                            </div>
                        </form>
                    </>
                )}
            </div>

            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
        </div>
    );
}
