"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { DataTable, Column } from '../../../components/DataTable';
import { StatusBadge } from '../../../components/StatusBadge';
import { PageContainer } from '../../../components/PageContainer';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { formatDate } from '../../../lib/utils';
import Link from 'next/link';

interface Frame {
  id: string;
  name: string;
  template: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function FramesPage() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const perPage = 10;

  useEffect(() => {
    fetchFrames();
  }, [page, statusFilter, search]);

  async function fetchFrames() {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
      });
      
      if (statusFilter) params.append('status', statusFilter);
      if (search) params.append('search', search);

      const response = await fetch(`/api/frames?${params}`);
      const data = await response.json();

      if (data.success) {
        setFrames(data.data);
        setTotal(data.pagination.total);
      }
    } catch (error) {
      console.error('Failed to fetch frames:', error);
    } finally {
      setLoading(false);
    }
  }

  const columns: Column<Frame>[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      width: '30%',
      render: (value, row) => (
        <div>
          <div className="font-medium text-white">{value}</div>
          <div className="text-xs text-neutral-500">{row.id}</div>
        </div>
      ),
    },
    {
      key: 'template',
      title: 'Template',
      sortable: true,
      render: (value) => (
        <span className="text-primary">{value}</span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'createdAt',
      title: 'Created',
      sortable: true,
      render: (value) => (
        <span className="text-neutral-400 text-xs">{formatDate(value)}</span>
      ),
    },
    {
      key: 'updatedAt',
      title: 'Updated',
      sortable: true,
      render: (value) => (
        <span className="text-neutral-400 text-xs">{formatDate(value)}</span>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Link
            href={`/frames/${row.id}`}
            className="text-primary hover:text-primary/80 text-sm"
          >
            Edit
          </Link>
          <button className="text-error hover:text-error/80 text-sm">
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer
      title="Frames"
      description="Manage your frames, templates, and configurations"
      action={
        <Link
          href="/frames/create"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-md hover:bg-primary/90 transition-all font-medium"
        >
          <Plus size={18} />
          Create Frame
        </Link>
      }
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
          <input
            type="text"
            placeholder="Search frames..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white focus:outline-none focus:border-primary transition-colors"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="paused">Paused</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Data Table */}
      {loading ? (
        <LoadingSpinner size="lg" className="py-12" />
      ) : (
        <DataTable
          data={frames}
          columns={columns}
          loading={loading}
          pagination={{
            page,
            perPage,
            total,
            onPageChange: setPage,
          }}
        />
      )}
    </PageContainer>
  );
}
