export function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg,#22D3EE,#2563EB,#22D3EE)",
        backgroundSize: "200% 100%",
        animation: "atw-gradient 6s linear infinite",
      }}
    >
      {children}
      <style>{`@keyframes atw-gradient{0%{background-position:0% 0}100%{background-position:200% 0}}`}</style>
    </span>
  );
}
