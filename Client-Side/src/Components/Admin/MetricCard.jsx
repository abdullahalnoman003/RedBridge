import React from 'react';

const MetricCard = ({ title, subtitle, value, icon, color = 'primary', loading = false }) => {
  const colorClasses = {
    primary: 'border-primary text-primary bg-primary/10',
    error: 'border-error text-error bg-error/10',
    warning: 'border-warning text-warning bg-warning/10',
    info: 'border-info text-info bg-info/10',
    success: 'border-success text-success bg-success/10',
    secondary: 'border-secondary text-secondary bg-secondary/10',
  };

  const selectedColor = colorClasses[color] || colorClasses.primary;
  const [borderColor, textColor, iconBg] = selectedColor.split(' ');

  return (
    <div
      className={`group card bg-base-100/95 shadow-md border border-base-300 border-l-4 ${borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className="card-body relative overflow-hidden">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-base-200/70 blur-2xl" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-base-content/60">{title}</p>
            {loading ? (
              <span className="loading loading-spinner loading-sm text-primary mt-1"></span>
            ) : (
              <p className={`text-3xl font-bold ${textColor}`}>{value || 0}</p>
            )}
            <p className="text-xs text-base-content/50">{subtitle}</p>
          </div>
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} ${textColor} text-2xl shadow-inner transition-transform duration-300 group-hover:scale-110`}
          >
            {icon}
          </div>
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-base-200">
          <div className={`h-full w-3/4 rounded-full ${iconBg}`} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
