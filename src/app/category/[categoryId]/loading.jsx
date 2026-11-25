export default function ProductGridSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div className="mb-4 h-40 w-full rounded-xl bg-gray-200" />
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mb-4 h-3 w-1/2 rounded bg-gray-100" />
            <div className="h-6 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}