import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md";
  showText?: boolean;
};

export function Logo({ size = "md", showText = true }: LogoProps) {
  const iconSize = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const svgSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const textSize = size === "sm" ? "text-lg" : "text-xl";

  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <div
        className={`flex ${iconSize} items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-sm`}
      >
        <svg className={svgSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.2 4.2 2.5 5.5C7 15 5 17 5 19.5 5 21.4 6.6 23 8.5 23h7c1.9 0 3.5-1.6 3.5-3.5 0-2.5-2-4.5-3.5-5.5C16.8 12.2 18 10.5 18 8c0-3.5-2.5-6-6-6zm0 2c2.2 0 4 1.8 4 4 0 1.5-.8 2.8-2 3.5-.4.2-.6.7-.4 1.1.5 1.2 1.4 2.4 2.4 3.4H8c1-1 1.9-2.2 2.4-3.4.2-.4 0-.9-.4-1.1-1.2-.7-2-2-2-3.5 0-2.2 1.8-4 4-4z" />
        </svg>
      </div>
      {showText && (
        <span className={`${textSize} font-bold tracking-tight text-slate-900`}>
          Sweet<span className="text-rose-600">Desk</span>
        </span>
      )}
    </Link>
  );
}
