export function ShinyText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: "linear-gradient(110deg,#94A3B8 35%,#FFFFFF 50%,#94A3B8 65%)",
        backgroundSize: "200% 100%",
        animation: "atw-shine 3s linear infinite",
      }}
    >
      {text}
      <style>{`@keyframes atw-shine{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </span>
  );
}
