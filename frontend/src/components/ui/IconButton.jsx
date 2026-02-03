export function IconButton({ label, className = "", ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={[
        "inline-flex items-center justify-center rounded-md",
        "h-10 w-10",
        "bg-white/5 hover:bg-white/10",
        "border border-white/10",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        "transition",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
