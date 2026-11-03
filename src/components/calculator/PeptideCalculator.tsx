import React, { useState } from 'react';
import { SYRINGE_TYPES, calculateReconstitution } from '../../utils/calculator';
import { SyringeCanvas } from './SyringeCanvas';
import { Calculator, Sparkles, AlertCircle, CheckCircle, Info, RefreshCw, Beaker } from 'lucide-react';

interface Preset {
  name: string;
  vialMg: number;
  waterMl: number;
  doseMcg: number;
}

const PRESETS: Preset[] = [
  { name: 'Tirzepatide 15mg', vialMg: 15, waterMl: 3, doseMcg: 2500 },
  { name: 'Semaglutide 5mg', vialMg: 5, waterMl: 2, doseMcg: 250 },
  { name: 'BPC-157 5mg', vialMg: 5, waterMl: 2, doseMcg: 250 },
  { name: 'BPC-157 10mg', vialMg: 10, waterMl: 2, doseMcg: 500 },
  { name: 'BPC-157 15mg', vialMg: 15, waterMl: 3, doseMcg: 500 },
  { name: 'GHK-Cu 50mg', vialMg: 50, waterMl: 3, doseMcg: 1000 },
  { name: 'Retatrutide 10mg', vialMg: 10, waterMl: 2, doseMcg: 2000 },
  { name: 'Retatrutide 50mg', vialMg: 50, waterMl: 5, doseMcg: 2500 },
  { name: 'NAD+ 500mg', vialMg: 500, waterMl: 10, doseMcg: 50000 },
];

export const PeptideCalculator: React.FC = () => {
  const [vialMg, setVialMg] = useState<number>(5);
  const [waterMl, setWaterMl] = useState<number>(2);
  const [doseMcg, setDoseMcg] = useState<number>(250);
  const [selectedSyringe, setSelectedSyringe] = useState(SYRINGE_TYPES[0]);

  const result = calculateReconstitution(vialMg, waterMl, doseMcg, selectedSyringe);

  const applyPreset = (preset: Preset) => {
    setVialMg(preset.vialMg);
    setWaterMl(preset.waterMl);
    setDoseMcg(preset.doseMcg);
  };

  const handleReset = () => {
    setVialMg(5);
    setWaterMl(2);
    setDoseMcg(250);
    setSelectedSyringe(SYRINGE_TYPES[0]);
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-100 shadow-brand p-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            <Calculator className="w-3.5 h-3.5 text-brand-700" />
            Analytical Dosage & Reconstitution Tool
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Peptide Reconstitution Calculator
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Calculate accurate diluent ratios, solution concentrations, and syringe unit tick marks for laboratory research trials.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-800 bg-slate-100 hover:bg-brand-50 px-3.5 py-2 rounded-xl transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Preset Buttons */}
      <div className="my-6">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
          Quick Preset Sequences
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-900 transition-all"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {/* Input 1: Vial mg */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
            1. Total Peptide in Vial
          </label>
          <span className="text-[11px] text-slate-400 block mb-3">
            Lyophilized mass stated on label
          </span>
          <div className="relative">
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={vialMg || ''}
              onChange={(e) => setVialMg(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-800">
              mg
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            = {((vialMg || 0) * 1000).toLocaleString()} mcg
          </p>
        </div>

        {/* Input 2: Bacteriostatic Water mL */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
            2. Added Bacteriostatic Water
          </label>
          <span className="text-[11px] text-slate-400 block mb-3">
            Volume of sterile diluent added
          </span>
          <div className="relative">
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={waterMl || ''}
              onChange={(e) => setWaterMl(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-800">
              mL
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Recommended: 1 mL to 3 mL
          </p>
        </div>

        {/* Input 3: Desired Dose mcg */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
            3. Desired Research Dose
          </label>
          <span className="text-[11px] text-slate-400 block mb-3">
            Target quantity per study unit
          </span>
          <div className="relative">
            <input
              type="number"
              min="10"
              step="50"
              value={doseMcg || ''}
              onChange={(e) => setDoseMcg(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-800">
              mcg
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            = {((doseMcg || 0) / 1000).toFixed(3)} mg
          </p>
        </div>
      </div>

      {/* Syringe Selection Tabs */}
      <div className="my-6">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
          Select Research Syringe Calibration Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SYRINGE_TYPES.map((s) => {
            const isSelected = selectedSyringe.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSyringe(s)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-brand-800 bg-brand-50/70 text-brand-950 font-bold shadow-sm'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{s.name}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-brand-800"></span>}
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">
                  {s.totalUnits} Units Total • {s.capacityMl} mL
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Syringe Visualizer */}
      <div className="my-8">
        <SyringeCanvas
          unitsToDraw={result.unitsToDraw}
          syringe={selectedSyringe}
          doseVolumeMl={result.doseVolumeMl}
        />
      </div>

      {/* Results Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-900 to-brand-950 text-white shadow-brand">
          <span className="text-xs text-purple-200 uppercase tracking-wider font-semibold block">
            Syringe Draw
          </span>
          <div className="text-3xl font-extrabold text-gold-400 mt-1">
            {result.unitsToDraw} <span className="text-sm text-purple-200 font-normal">Units</span>
          </div>
          <p className="text-[11px] text-purple-300 mt-1">
            Pull plunger precisely to tick mark {result.unitsToDraw}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
            Dose Volume
          </span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">
            {result.doseVolumeMl} <span className="text-sm text-slate-500 font-normal">mL</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Exact liquid volume per aliquot
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
            Solution Concentration
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {result.concentrationMgPerMl} <span className="text-sm text-slate-500 font-normal">mg/mL</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            ({result.concentrationMcgPerMl.toLocaleString()} mcg/mL)
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
            Doses per Vial
          </span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">
            {result.totalDosesPerVial} <span className="text-sm text-slate-500 font-normal">Total</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Based on {doseMcg} mcg target
          </p>
        </div>
      </div>

      {result.isVolumeExceeded && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 my-4">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong>Volume exceeds syringe capacity:</strong> The required {result.unitsToDraw} units exceed the {selectedSyringe.totalUnits} unit limit of this syringe. Select a larger syringe or reduce diluent volume.
          </div>
        </div>
      )}

      {/* Protocol Guide */}
      <div className="mt-10 pt-8 border-t border-slate-100">
        <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
          <Beaker className="w-4 h-4 text-brand-700" />
          Standard Laboratory Reconstitution Protocol
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-brand-800 text-white font-bold flex items-center justify-center mb-2">1</span>
            <strong>Sterilize Tops:</strong> Wipe both peptide vial and bacteriostatic water rubber stoppers with fresh 70% isopropyl alcohol swabs. Allow to air-dry.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-brand-800 text-white font-bold flex items-center justify-center mb-2">2</span>
            <strong>Draw Diluent:</strong> Draw desired bacteriostatic water volume ({waterMl} mL) using a sterile syringe. Aim water stream against the inside glass wall.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-brand-800 text-white font-bold flex items-center justify-center mb-2">3</span>
            <strong>Gentle Swirling:</strong> Gently rotate and swirl the vial until the lyophilized cake completely dissolves. <em>Never shake aggressively</em>, which can denature peptide chains.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-brand-800 text-white font-bold flex items-center justify-center mb-2">4</span>
            <strong>Cold Storage:</strong> Store reconstituted solution refrigerated between 2°C and 8°C. Do not freeze once reconstituted with bacteriostatic water.
          </div>
        </div>
      </div>
    </div>
  );
};
