import React from 'react';

const MetricCard = ({ title, value, icon, color = 'primary', loading = false }) => {
  const colorClasses = {
    primary: 'border-primary text-primary',
    error: 'border-error text-error',
    warning: 'border-warning text-warning',
    info: 'border-info text-info',
    success: 'border-success text-success',
    secondary: 'border-secondary text-secondary',
  };

  const selectedColor = colorClasses[color] || colorClasses.primary;
  const [borderColor, textColor] = selectedColor.split(' ');

  return (
    <div className={`card bg-base-100 shadow-lg border-l-4 ${borderColor}`}>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-600">{title}</p>
            {loading ? (
              <span className="loading loading-spinner loading-sm text-primary mt-2"></span>
            ) : (
              <p className={`text-3xl font-bold ${textColor} mt-2`}>{value || 0}</p>
            )}
          </div>
          <div className={`text-4xl opacity-20`} style={{ color: getColorValue(color) }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

const getColorValue = (color) => {
  const colorMap = {
    primary: 'hsl(var(--p))',
    error: 'hsl(var(--er))',
    warning: 'hsl(var(--wa))',
    info: 'hsl(var(--in))',
    success: 'hsl(var(--su))',
    secondary: 'hsl(var(--s))',
  };
  return colorMap[color] || colorMap.primary;
};

export default MetricCard;
