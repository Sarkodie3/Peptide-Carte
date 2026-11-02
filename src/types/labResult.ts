export interface LabResult {
  id: string;
  product: string;
  batch: string;
  lab: string;
  date: string;
  notes: string;
  purity: string;
  purityNumeric: number;
  reportUrl: string;
  testMethod: string;
  status: 'Passed' | 'Verified';
}
