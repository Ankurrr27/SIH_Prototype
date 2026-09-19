import {
  LayoutDashboard,
  FileText,
  Scale,
  Calendar,
  Award,
  Bell,
  User,
  Settings,
  Users,
  Building2,
  ClipboardCheck,
  ShieldAlert,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { UserRole } from '@/types/user';

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: string;
}

export const navigationConfig: Record<UserRole, NavItem[]> = {
  [UserRole.APPLICANT]: [
    { title: 'Dashboard', href: '/applicant/dashboard', icon: LayoutDashboard },
    { title: 'My Instruments', href: '/applicant/instruments', icon: Scale },
    { title: 'Applications', href: '/applicant/applications', icon: FileText },
    { title: 'Certificates', href: '/applicant/certificates', icon: Award },
    { title: 'Notifications', href: '/applicant/notifications', icon: Bell },
    { title: 'Profile', href: '/applicant/profile', icon: User },
    { title: 'Settings', href: '/applicant/settings', icon: Settings },
  ],

  [UserRole.LMO]: [
    { title: 'Dashboard', href: '/lmo/dashboard', icon: LayoutDashboard },
    { title: 'Applications', href: '/lmo/applications', icon: FileText },
    { title: 'Inspections', href: '/lmo/inspections', icon: ClipboardCheck },
    { title: 'Schedules', href: '/lmo/schedules', icon: Calendar },
    { title: 'Certificates', href: '/lmo/certificates', icon: Award },
    { title: 'Notifications', href: '/lmo/notifications', icon: Bell },
  ],

  [UserRole.GATC]: [
    { title: 'Dashboard', href: '/gatc/dashboard', icon: LayoutDashboard },
    { title: 'Assignments', href: '/gatc/assignments', icon: FileText },
    { title: 'Testing Queue', href: '/gatc/testing', icon: CheckCircle2 },
    { title: 'Reports', href: '/gatc/reports', icon: ClipboardCheck },
    { title: 'Notifications', href: '/gatc/notifications', icon: Bell },
  ],

  [UserRole.ADMIN]: [
    { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { title: 'Users', href: '/admin/users', icon: Users },
    { title: 'Organizations', href: '/admin/organizations', icon: Building2 },
    { title: 'Instruments', href: '/admin/instruments', icon: Scale },
    { title: 'Applications', href: '/admin/applications', icon: FileText },
    { title: 'Certificates', href: '/admin/certificates', icon: Award },
    { title: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert },
    { title: 'System Health', href: '/admin/system-health', icon: Activity },
  ],
};
