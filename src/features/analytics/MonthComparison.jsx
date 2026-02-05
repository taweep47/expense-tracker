import { TrendingUp, TrendingDown } from "lucide-react";

const MonthComparison = ({
  thisMonth = 0,
  lastMonth = 0,
}) => {
  let percent = null;

  if (lastMonth > 0) {
    percent = ((thisMonth - lastMonth) / lastMonth) * 100;
  }

  const isUp = percent > 0;
  const isDown = percent < 0;
  const isSame = percent === 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 transition hover:shadow-sm">
      <p className="text-sm text-slate-500">Compared to last month</p>

      <div className="flex items-center gap-2 mt-2">
        {isUp && <TrendingUp size={18} className="text-red-600" />}
        {isDown && <TrendingDown size={18} className="text-green-600" />}

        <span
          className={`text-lg font-semibold ${
            isUp
              ? "text-red-600"
              : isDown
              ? "text-green-600"
              : "text-slate-600"
          }`}
        >
          {percent === null
            ? "—"
            : `${Math.abs(percent).toFixed(1)}%`}
        </span>
      </div>

      <p className="text-xs text-slate-400 mt-1">
        ฿{thisMonth.toLocaleString()} vs ฿
        {lastMonth.toLocaleString()}
      </p>

      {percent === null && thisMonth > 0 && (
        <p className="text-xs text-slate-400 mt-1">
          No data from last month
        </p>
      )}

      {isSame && (
        <p className="text-xs text-slate-400 mt-1">
          No change from last month
        </p>
      )}
    </div>
  );
};

export default MonthComparison;
