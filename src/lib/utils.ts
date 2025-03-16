import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Function to format date to `day month, year`
 *
 * @param {Date} postDate
 * @returns {string}
 * @export
 */
export function formateDate(postDate: Date): string {
  const date = new Date(postDate);

  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}
