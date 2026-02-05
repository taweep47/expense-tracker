const SummaryCard = ({ label, value, icon }) => {
  return (
    <div className="
      bg-white rounded-2xl border border-slate-200
      p-6 hover:shadow-md transition
    ">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>
        {icon}
      </div>

      <p className="text-2xl font-semibold mt-3">
        {value}
      </p>
    </div>
  )
}

export default SummaryCard
