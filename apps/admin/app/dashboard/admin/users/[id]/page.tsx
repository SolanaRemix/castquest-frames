import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Shield,
  Calendar,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import { formatDate, getStatusColor } from '../../../../../lib/utils';

export const metadata: Metadata = {
  title: 'User Details | CastQuest Admin',
  description: 'View detailed user information',
};

export default function AdminUserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Placeholder data
  const user = {
    id: params.id,
    address: '0x1234...5678',
    username: 'alice.eth',
    email: 'alice@example.com',
    status: 'active',
    role: 'user',
    joinedAt: '2024-01-01T00:00:00Z',
    lastActive: '2024-01-15T10:30:00Z',
    verified: true,
  };

  const stats = [
    { label: 'Quests Completed', value: '12' },
    { label: 'Frames Created', value: '5' },
    { label: 'Total Earnings', value: '2,450 CAST' },
    { label: 'Followers', value: '234' },
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'Completed quest',
      target: 'Welcome to CastQuest',
      timestamp: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      action: 'Created frame',
      target: 'Frame #145',
      timestamp: '2024-01-15T09:15:00Z',
    },
    {
      id: '3',
      action: 'Claimed reward',
      target: '250 CAST',
      timestamp: '2024-01-15T08:45:00Z',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/admin/users"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Users
      </Link>

      {/* Header */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-2xl font-bold text-primary">
              A
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {user.username}
                </h1>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-medium rounded border ${getStatusColor(
                    user.status
                  )}`}
                >
                  {user.status}
                </span>
                {user.verified && (
                  <Shield className="text-success" size={20} title="Verified" />
                )}
              </div>
              <div className="space-y-1 text-sm text-neutral-400">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span>{user.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>Joined {formatDate(user.joinedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={14} />
                  <span>Last active {formatDate(user.lastActive)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="px-4 py-2 bg-warning text-black rounded-lg hover:bg-warning/90 transition-colors font-medium">
              Suspend User
            </button>
            <button className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-lg hover:border-neutral-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-neutral-950 border border-neutral-800 rounded-lg p-4"
          >
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between p-3 bg-neutral-900 rounded-lg"
              >
                <div>
                  <div className="text-white font-medium">{activity.action}</div>
                  <div className="text-sm text-neutral-400 mt-1">
                    {activity.target}
                  </div>
                </div>
                <span className="text-xs text-neutral-500 whitespace-nowrap">
                  {formatDate(activity.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Account Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 text-white rounded-lg hover:border-neutral-700 transition-colors text-left">
              <div className="font-medium">Reset Password</div>
              <div className="text-sm text-neutral-400 mt-1">
                Send password reset email
              </div>
            </button>
            <button className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 text-white rounded-lg hover:border-neutral-700 transition-colors text-left">
              <div className="font-medium">Verify Email</div>
              <div className="text-sm text-neutral-400 mt-1">
                Manually verify user email
              </div>
            </button>
            <button className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 text-white rounded-lg hover:border-neutral-700 transition-colors text-left">
              <div className="font-medium">Change Role</div>
              <div className="text-sm text-neutral-400 mt-1">
                Update user permissions
              </div>
            </button>
            <button className="w-full px-4 py-3 bg-error/10 border border-error/30 text-error rounded-lg hover:bg-error/20 transition-colors text-left">
              <div className="font-medium flex items-center gap-2">
                <AlertTriangle size={16} />
                Delete Account
              </div>
              <div className="text-sm text-error/80 mt-1">
                Permanently remove user
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
