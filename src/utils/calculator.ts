export interface SyringeType {
  id: string;
  name: string;
  capacityMl: number;
  totalUnits: number;
  subdivisions: number;
}

export const SYRINGE_TYPES: SyringeType[] = [
  { id: 'u100-1ml', name: '1.0 mL (100 Units) - Standard', capacityMl: 1.0, totalUnits: 100, subdivisions: 1 },
  { id: 'u100-05ml', name: '0.5 mL (50 Units) - Low Dose', capacityMl: 0.5, totalUnits: 50, subdivisions: 1 },
  { id: 'u100-03ml', name: '0.3 mL (30 Units) - Micro Dose', capacityMl: 0.3, totalUnits: 30, subdivisions: 0.5 },
];

export interface CalculationResult {
  concentrationMcgPerMl: number;
  concentrationMgPerMl: number;
  doseVolumeMl: number;
  unitsToDraw: number;
  totalDosesPerVial: number;
  isVolumeExceeded: boolean;
  isValid: boolean;
  errorMessage?: string;
}

export const calculateReconstitution = (
  vialMg: number,
  waterMl: number,
  desiredDoseMcg: number,
  syringe: SyringeType
): CalculationResult => {
  if (vialMg <= 0 || waterMl <= 0 || desiredDoseMcg <= 0) {
    return {
      concentrationMcgPerMl: 0,
      concentrationMgPerMl: 0,
      doseVolumeMl: 0,
      unitsToDraw: 0,
      totalDosesPerVial: 0,
      isVolumeExceeded: false,
      isValid: false,
      errorMessage: 'Please enter valid positive values for all parameters.',
    };
  }

  const totalVialMcg = vialMg * 1000;
  const concentrationMcgPerMl = totalVialMcg / waterMl;
  const concentrationMgPerMl = vialMg / waterMl;
  const doseVolumeMl = desiredDoseMcg / concentrationMcgPerMl;
  
  // Units = doseVolumeMl * (syringe.totalUnits / syringe.capacityMl)
  const unitsPerMl = syringe.totalUnits / syringe.capacityMl;
  const unitsToDraw = Math.round((doseVolumeMl * unitsPerMl) * 10) / 10;
  const totalDosesPerVial = Math.floor(totalVialMcg / desiredDoseMcg);
  const isVolumeExceeded = unitsToDraw > syringe.totalUnits;

  return {
    concentrationMcgPerMl: Math.round(concentrationMcgPerMl * 100) / 100,
    concentrationMgPerMl: Math.round(concentrationMgPerMl * 100) / 100,
    doseVolumeMl: Math.round(doseVolumeMl * 1000) / 1000,
    unitsToDraw,
    totalDosesPerVial,
    isVolumeExceeded,
    isValid: true,
  };
};
