'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';
import { User } from '@/types/user';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const { user, setUser, setTokens, logout: clearStore, isAuthenticated } = useAuthStore();

  // Fetch current profile on mount if token exists
  const { isLoading: isFetchingMe, refetch: fetchMe } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await api.get<User>('/auth/me');
      if (res.success && res.data) {
        setUser(res.data);
        return res.data;
      }
      return null;
    },
    enabled: isAuthenticated && !user,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return api.post<{ user: User; accessToken: string; refreshToken: string }>(
        '/auth/login',
        credentials
      );
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        setTokens(res.data.accessToken, res.data.refreshToken);
        setUser(res.data.user);
        toast.success('Login successful!');

        // Redirect based on primary user role
        const primaryRole = res.data.user.roles[0];
        if (primaryRole === 'ADMIN') router.push('/admin/dashboard');
        else if (primaryRole === 'LMO') router.push('/lmo/dashboard');
        else if (primaryRole === 'GATC') router.push('/gatc/dashboard');
        else router.push('/applicant/dashboard');
      }
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (payload: any) => {
      return api.post<{ user: User; accessToken: string; refreshToken: string }>(
        '/auth/register',
        payload
      );
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        setTokens(res.data.accessToken, res.data.refreshToken);
        setUser(res.data.user);
        toast.success('Account registered successfully!');
        router.push('/applicant/dashboard');
      }
    },
  });

  // Logout mutation
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    } finally {
      clearStore();
      toast.info('Logged out');
      router.push('/login');
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading: isFetchingMe || loginMutation.isPending || registerMutation.isPending,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    fetchMe,
  };
}
