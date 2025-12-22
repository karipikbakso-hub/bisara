import { Sparkles, Clock } from "lucide-react";

interface BadgeProps {
  variant: "available" | "coming-soon";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  if (variant === "available") {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 text-primary-700 text-sm font-medium rounded-full ${className || ""}`}>
        <Sparkles className="w-3.5 h-3.5" />
        {children}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 border border-neutral-300 text-neutral-600 text-sm font-medium rounded-full ${className || ""}`}>
      <Clock className="w-3.5 h-3.5" />
      {children}
    </span>
  );
}
