import React from 'react';
import { SyringeType } from '../../utils/calculator';

interface SyringeCanvasProps {
  unitsToDraw: number;
  syringe: SyringeType;
  doseVolumeMl: number;
}

export const SyringeCanvas: React.FC<SyringeCanvasProps> = ({
  unitsToDraw,
  syringe,
  doseVolumeMl,
}) => {
  const maxUnits = syringe.totalUnits;
  const clampedUnits = Math.min(Math.max(unitsToDraw, 0), maxUnits);
  const fillPercent = maxUnits > 0 ? (clampedUnits / maxUnits) * 100 : 0;

  // Generate tick marks
  const ticks = [];
  const majorInterval = maxUnits === 30 ? 5 : 10;
  for (let i = 0; i <= maxUnits; i += syringe.subdivisions) {
    const isMajor = i % majorInterval === 0;
    const isMid = !isMajor && i % (majorInterval / 2) === 0;
    ticks.push({
      unit: i,
      isMajor,
      isMid,
      percent: (i / maxUnits) * 100,
    });
  }

  return (
    <div className="w-full bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
            Interactive Visual Calibration
          </span>
          <h4 className="text-base font-bold text-white">
            {syringe.name}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Fluid Draw</span>
          <div className="text-lg font-mono font-extrabold text-gold-400">
            {unitsToDraw} <span className="text-xs text-slate-300">Units</span> ({doseVolumeMl} mL)
          </div>
        </div>
      </div>

      {/* SVG Syringe Graphic */}
      <div className="my-8 relative px-4 select-none">
        {/* Syringe container */}
        <div className="relative h-28 flex items-center">
          {/* Needle & Hub (Left) */}
          <div className="flex items-center flex-shrink-0 z-10">
            {/* Needle metal shaft */}
            <div className="w-12 h-1 bg-gradient-to-r from-slate-400 to-slate-200 rounded-l" />
            {/* Clear plastic hub */}
            <div className="w-4 h-6 bg-purple-300/40 border border-purple-200/60 rounded-sm" />
            {/* Barrel tip */}
            <div className="w-3 h-10 bg-slate-300/60 border border-slate-400/80 rounded-l" />
          </div>

          {/* Barrel (Glass/Plastic cylinder) */}
          <div className="relative flex-1 h-20 bg-slate-800/80 rounded-r border-2 border-slate-400/50 overflow-hidden shadow-inner flex items-center">
            {/* Fluid fill layer */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-purple-500/80 via-brand-600/70 to-gold-500/70 transition-all duration-300 border-r-4 border-purple-300"
              style={{ width: `${fillPercent}%` }}
            >
              {/* Liquid sheen effect */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/20" />
            </div>

            {/* Plunger Stopper (Black Rubber) */}
            <div
              className="absolute top-0 bottom-0 w-3 bg-slate-950 border-x border-slate-700 shadow-md transition-all duration-300 z-10"
              style={{ left: `${fillPercent}%` }}
            />

            {/* Measurement Ticks Overlay */}
            <div className="absolute inset-0 flex pointer-events-none">
              {ticks.map((t) => (
                <div
                  key={t.unit}
                  className="absolute bottom-0 flex flex-col items-center"
                  style={{ left: `${t.percent}%`, transform: 'translateX(-50%)' }}
                >
                  {/* Tick line */}
                  <div
                    className={`w-0.5 ${
                      t.isMajor
                        ? 'h-6 bg-slate-200'
                        : t.isMid
                        ? 'h-4 bg-slate-400'
                        : 'h-2 bg-slate-500'
                    }`}
                  />
                  {/* Major number label */}
                  {t.isMajor && (
                    <span className="text-[10px] font-mono text-slate-300 font-semibold mt-1">
                      {t.unit}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Dose Level Marker Callout */}
            {unitsToDraw > 0 && unitsToDraw <= maxUnits && (
              <div
                className="absolute top-2 transition-all duration-300 -translate-x-1/2 z-20"
                style={{ left: `${fillPercent}%` }}
              >
                <div className="bg-gold-500 text-brand-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap">
                  ▲ {unitsToDraw}
                </div>
              </div>
            )}
          </div>

          {/* Plunger Shaft & Thumb Flange (Right) */}
          <div className="flex items-center flex-shrink-0 z-10">
            {/* Plunger rod */}
            <div 
              className="h-4 bg-gradient-to-b from-slate-400 to-slate-600 border border-slate-500 transition-all duration-300"
              style={{ width: `${Math.max(15, 60 - fillPercent * 0.4)}px` }}
            />
            {/* Thumb rest flange */}
            <div className="w-3 h-16 bg-slate-300 border-2 border-slate-500 rounded-sm shadow-md" />
          </div>
        </div>
      </div>

      {/* Syringe Explanatory Footer */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
        <span>Capacity: {syringe.capacityMl} mL ({syringe.totalUnits} Units)</span>
        <span className="text-gold-400 font-medium">1 Unit = {syringe.capacityMl / syringe.totalUnits} mL</span>
      </div>
    </div>
  );
};
