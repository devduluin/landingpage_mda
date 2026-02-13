'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Link from 'next/link';

export default function UpdateLeadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    service: [] as string[],
    message: '',
  });

  const serviceOptions = [
    'Satpam',
    'Cleaning Service',
    'Administrasi',
    'Sales',
    'Operator Jahit',
  ];

  useEffect(() => {
    fetchLead();
  }, [resolvedParams.id]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/leads/${resolvedParams.id}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      if (data.success) {
        setFormData({
          fullName: data.data.fullName,
          email: data.data.email,
          phone: data.data.phone,
          companyName: data.data.companyName,
          industry: data.data.industry,
          service: Array.isArray(data.data.service) ? data.data.service : [],
          message: data.data.message || '',
        });
      }
    } catch (err: any) {
      toast.error('Gagal memuat lead', {
        description: err.message,
      });
      router.push('/dashboard/leads');
    } finally {
      setFetching(false);
    }
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      service: prev.service.includes(service)
        ? prev.service.filter(s => s !== service)
        : [...prev.service, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/leads/${resolvedParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success('Lead berhasil diupdate');
      router.push('/dashboard/leads');
    } catch (err: any) {
      toast.error('Gagal mengupdate lead', {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black">Update Lead</h1>
        <p className="text-muted-foreground text-black">
          Edit lead information
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                required
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Services *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {serviceOptions.map((service) => (
                <label key={service} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.service.includes(service)}
                    onChange={() => handleServiceChange(service)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Lead'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/leads">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
