const SummaryCard = ({
  label,
  value,
  icon: Icon,
  accent = "slate", // slate | red | green | blue | yellow
}) => {
  const accentMap = {
    slate: "hover:ring-slate-300",
    red: "hover:ring-red-300",
    green: "hover:ring-green-300",
    blue: "hover:ring-blue-300",
    yellow: "hover:ring-yellow-300",
  };

  const iconBgMap = {
    slate: "bg-slate-100 text-slate-600",
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div
      className={`
        bg-white border border-slate-200 rounded-xl p-4
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-lg
        hover:ring-2 hover:ring-offset-2
        ${accentMap[accent]}
      `}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div
            className={`p-2 rounded-lg ${iconBgMap[accent]}`}
          >
            <Icon size={18} />
          </div>
        )}

        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-xl font-semibold mt-1">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
