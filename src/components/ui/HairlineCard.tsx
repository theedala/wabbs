type Props = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function HairlineCard({ children, className = "", hover = true }: Props) {
  return (
    <div
      className={`rounded-xl border border-border bg-bg p-6 transition-all duration-300 ${
        hover ? "hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
