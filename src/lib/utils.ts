import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const removeLanguagePrefix = (pathname: string) => {
    const path = pathname
    const parts = path.split('/'); // Split the path into parts
    return `/${parts.slice(2).join('/')}`; // Join the parts, excluding the language prefix
};