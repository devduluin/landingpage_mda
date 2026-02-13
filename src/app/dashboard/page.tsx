'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  createdAt: string;
}

type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export default function DashboardPage() {
  const [period, setPeriod] = useState<PeriodType>('monthly');
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalUsers: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, usersRes] = await Promise.all([
        fetch(`/api/leads?period=${period}`),
        fetch(`/api/users/count?period=${period}`)
      ]);
      
      const leadsData = await leadsRes.json();
      const usersData = await usersRes.json();
      
      if (leadsData.success) {
        setStats(prev => ({
          ...prev,
          totalLeads: leadsData.data.length,
        }));
        // Get last 5 leads
        setRecentLeads(leadsData.data.slice(0, 5));
      }
      
      if (usersData.success) {
        setStats(prev => ({
          ...prev,
          totalUsers: usersData.data.total,
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      case 'yearly':
        return 'Yearly';
      default:
        return 'Monthly';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome to MDA Dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Choose Period:</span>
            <Select value={period} onValueChange={(value: string) => setPeriod(value as PeriodType)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Pilih periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              Total Leads
            </h3>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">
              {loading ? '...' : stats.totalLeads}
            </div>
            <p className="text-xs text-gray-500 mt-1">{getPeriodLabel()}</p>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              Total Users
            </h3>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">
              {loading ? '...' : stats.totalUsers}
            </div>
            <p className="text-xs text-gray-500 mt-1">{getPeriodLabel()}</p>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-white/20">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Leads</h2>
            <p className="text-sm text-gray-600 mt-1">Latest 5 leads</p>
          </div>
          <Link href="/dashboard/leads">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md cursor-pointer">
              See More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : recentLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No leads yet</div>
          ) : (
            <table className="w-full">
              <thead className="bg-white/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Date In
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lead.fullName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{lead.companyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{lead.industry}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{formatDate(lead.createdAt)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
