export function AnimatedBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#3b82f620,transparent_45%),radial-gradient(circle_at_bottom_right,#8b5cf620,transparent_45%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </>
  );
}