'use client';

import { Trash, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

interface DriverRegistration {
  id: string;
  fullName: string;
  ktpNumber: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  completeAddress: string;
  serviceType: string;
  fileCv?: string;
  status: string;
  createdAt: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function DriverRegistrationsPage() {
  const [registrations, setRegistrations] = useState<DriverRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedRegistration, setSelectedRegistration] = useState<DriverRegistration | null>(null);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (statusFilter) {
        queryParams.append('status', statusFilter);
      }

      const res = await fetch(`/api/partner-registrations?${queryParams}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal memuat data");
      }

      if (data.success) {
        setRegistrations(data.data);
        setMeta(data.meta);
      }
    } catch (err: any) {
      toast.error("Failed to load data", {
        description: err?.message || "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value));
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value === 'all' ? '' : value);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/partner-registrations/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setRegistrations((prev) => prev.filter((r) => r.id !== id));

      toast.success("Registration successfully deleted");
    } catch (err: any) {
      toast.error("Failed to delete registration", {
        description: err.message || "An error occurred",
      });
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/partner-registrations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );

      toast.success("Status successfully updated");
    } catch (err: any) {
      toast.error("Failed to update status", {
        description: err.message || "An error occurred",
      });
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [page, limit, statusFilter]);

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Registrations</h1>
          <p className="text-gray-500 mt-1">Manage driver partner registrations</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status:</span>
              <Select value={statusFilter || 'all'} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {meta && (
              <div className="text-sm text-gray-600">
                Total: {meta.total} registrations
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No registration data
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {registration.fullName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{registration.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{registration.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {registration.serviceType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(registration.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(registration.createdAt).toLocaleDateString('id-ID')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedRegistration(registration)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
                              <DialogHeader>
                                <DialogTitle className="text-gray-900">Partner Registration Details</DialogTitle>
                                <DialogDescription className="text-gray-500">
                                  Complete partner registration information
                                </DialogDescription>
                              </DialogHeader>
                              {selectedRegistration && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                                      <p className="text-sm text-gray-900 mt-1">{selectedRegistration.fullName}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Email</label>
                                      <p className="text-sm text-gray-900 mt-1">{selectedRegistration.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">ID Card Number</label>
                                      <p className="text-sm text-gray-900 mt-1">{selectedRegistration.ktpNumber}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                                      <p className="text-sm text-gray-900 mt-1">
                                        {new Date(selectedRegistration.birthDate).toLocaleDateString('id-ID')}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Phone Number</label>
                                      <p className="text-sm text-gray-900 mt-1">{selectedRegistration.phoneNumber}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Status</label>
                                      <div className="mt-1">{getStatusBadge(selectedRegistration.status)}</div>
                                    </div>
                                    <div className="col-span-2">
                                      <label className="text-sm font-medium text-gray-600">Complete Address</label>
                                      <p className="text-sm text-gray-900 mt-1">{selectedRegistration.completeAddress}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <label className="text-sm font-medium text-gray-600">Service Type</label>
                                      <p className="text-sm text-gray-900 mt-1">{selectedRegistration.serviceType}</p>
                                    </div>
                                  </div>

                                  {/* CV Document */}
                                  {selectedRegistration.fileCv && (
                                    <div className="border-t border-gray-200 pt-4">
                                      <h3 className="text-sm font-medium text-gray-900 mb-3">CV Document</h3>
                                      <a 
                                        href={selectedRegistration.fileCv} 
                                        target="_blank"
                                        className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition"
                                      >
                                        View CV
                                      </a>
                                    </div>
                                  )}

                                  {/* Status Update */}
                                  <div className="border-t border-gray-200 pt-4">
                                    <label className="text-sm font-medium text-gray-900 mb-2 block">Update Status</label>
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() => handleUpdateStatus(selectedRegistration.id, 'approved')}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        onClick={() => handleUpdateStatus(selectedRegistration.id, 'rejected')}
                                        variant="secondary"
                                      >
                                        Reject
                                      </Button>
                                      <Button
                                        onClick={() => handleUpdateStatus(selectedRegistration.id, 'pending')}
                                        variant="outline"
                                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                      >
                                        Pending
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-gray-900">Delete Confirmation</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-500">
                                  Are you sure you want to delete this registration? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(registration.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white"
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
            </div>

            {meta && meta.totalPages > 0 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
                    Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, meta.total)} of {meta.total} registrations
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
