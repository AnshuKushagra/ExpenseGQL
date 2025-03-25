import { clsx } from "clsx";
import { twmerge } from "tailwind-merge";
export function cn(...inputs) {
  return twmerge(clsx(inputs));
}
