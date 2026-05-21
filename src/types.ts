export type DivisionId = 'comercial' | 'hca' | 'fina' | 'lga' | 'spia';

export interface Division {
  id: DivisionId;
  name: string;
  fullName: string;
  shortDescription: string;
  description: string;
  iconName: string;
  accentColor: string; // Tailwind border/text override
  bgGradient: string;  // Tailwind gradient colors
  samplePrompts: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTablePresent?: boolean;
}

export interface CalculationRow {
  label: string;
  value: string;
  notes: string;
}

export interface CalculationTemplate {
  title: string;
  subtitle: string;
  divisionId: DivisionId;
  headers: string[];
  rows: CalculationRow[];
  totalFormula?: {
    rowLabel: string;
    colIndex: number;
    operation: 'sum' | 'percentage';
  };
}

export interface KpiItem {
  id: string;
  name: string;
  target: number;
  actual: number;
  unit: string;
  weight: number; // e.g. 25 for 25%
  direction: 'higher_better' | 'lower_better';
  description?: string;
}

export interface DivisionKpiData {
  divisionId: DivisionId;
  kpis: KpiItem[];
  overallScore?: number;
  grade?: string;
  analysisReport?: string;
  analyzedAt?: string;
}

