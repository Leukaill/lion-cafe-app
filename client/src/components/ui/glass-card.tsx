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
        variant === "default" && "bg-white/80 border-gray-200 shadow-md",
        variant === "dark" && "bg-white/90 border-gray-300 shadow-lg",
        hover && "hover:bg-white/90 hover:scale-105 cursor-pointer transform hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
