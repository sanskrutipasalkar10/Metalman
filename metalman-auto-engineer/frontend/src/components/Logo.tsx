import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  showText?: boolean;
}

export const Logo = ({ className, variant = "dark", showText = true }: LogoProps) => {
  const textColor = variant === "light" ? "text-white" : "text-foreground";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-md bg-gradient-orange shadow-orange">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
          <path d="M3 7l9-5 9 5-9 5-9-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M3 12l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-display text-base font-black tracking-tight", textColor)}>METALMAN</span>
          <span className={cn("text-[9px] font-bold uppercase tracking-[0.25em] text-orange-500")}>Auto Ltd • NPD Suite</span>
        </div>
      )}
    </div>
  );
};