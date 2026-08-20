import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatScore(score) {
  return Math.round(score);
}

export function scoreTone(score) {
  if (score >= 75) return "confidence";
  if (score >= 50) return "amber";
  return "rose";
}
