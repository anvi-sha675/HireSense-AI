import { useQuery } from "@tanstack/react-query";
import {
  fetchDashboardStats,
  fetchRecentInterviews,
  fetchSkillRadar,
  fetchWeeklyProgress,
} from "@/features/dashboard/services/dashboard-service";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
  });
}

export function useRecentInterviews() {
  return useQuery({
    queryKey: ["dashboard", "recent-interviews"],
    queryFn: fetchRecentInterviews,
  });
}

export function useSkillRadar() {
  return useQuery({
    queryKey: ["dashboard", "skill-radar"],
    queryFn: fetchSkillRadar,
  });
}

export function useWeeklyProgress() {
  return useQuery({
    queryKey: ["dashboard", "weekly-progress"],
    queryFn: fetchWeeklyProgress,
  });
}
