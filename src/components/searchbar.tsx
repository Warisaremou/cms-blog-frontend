"use client";

import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import * as React from "react";

const Searchbar = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={22}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-foreground/50"
      />

      <Input
        type="search"
        className={cn("h-11 rounded-full border border-accent-foreground/10 bg-accent pl-10", className)}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Searchbar.displayName = "Searchbar";

export { Searchbar };
