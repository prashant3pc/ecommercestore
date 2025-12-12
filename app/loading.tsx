export default function Loading() {
  return (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-56 bg-slate-200 rounded-md" />
      ))}
    </div>
  );
}
