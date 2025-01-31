// THis function/utility helps ensure you don’t accidentally end up with conflicting Tailwind classes 
// when dynamically building your class names

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
