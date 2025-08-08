import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark";
  hover?: boolean;
}

export function GlassCard({ 
  className, 
  variant = "default", 
  hover = false, 
  children, 
  ...props 
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border backdrop-blur-[15px] transition-all duration-300",
        variant === "default" && "bg-white/10 border-white/20",
        variant === "dark" && "bg-black/30 border-white/10",
        hover && "hover:bg-white/20 hover:scale-105 cursor-pointer transform",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
