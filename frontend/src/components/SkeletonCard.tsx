const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton p-0 rounded-xl overflow-hidden">
      <div className="h-44 md:h-48 bg-slate-800" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-slate-800 rounded" />
        <div className="h-3 w-1/2 bg-slate-800 rounded" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-8 w-24 bg-slate-800 rounded" />
          <div className="h-8 w-12 bg-slate-800 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
