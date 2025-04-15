
export type InspectionType = 'Post-Harvest' | 'Pre-Shipment' | 'On-Arrival' | 'Warehouse';

export type QualityCheckType = 'Physical' | 'Chemical' | 'Moisture';

export type InspectionStatus = 'Passed' | 'Failed' | 'Pending';

export interface QualityCheck {
  type: QualityCheckType;
  status: InspectionStatus;
  value?: string;
  threshold?: string;
}

export interface Compliance {
  name: string;
  status: InspectionStatus;
  details?: string;
}

export interface Lab {
  name: string;
  location: string;
  contactPerson?: string;
}

export interface Inspection {
  id: string;
  type: InspectionType;
  date: string;
  location: string;
  status: InspectionStatus;
  qualityChecks: QualityCheck[];
  compliances: Compliance[];
  inspectionTools: string[];
  lab?: Lab;
  notes?: string;
}

export interface Trade {
  id: string;
  tradeNumber: string;
  supplier: string;
  supplierCountry: string;
  buyer: string;
  buyerCountry: string;
  productType: string;
  quantity: string;
  departureDate?: string;
  arrivalDate?: string;
  status: 'In Transit' | 'Completed' | 'Rejected';
  inspections: Inspection[];
}

export interface RejectionData {
  quantity: number;
  percentage: number;
  byRegion: {
    region: string;
    quantity: number;
    percentage: number;
  }[];
  bySupplier: {
    supplier: string;
    quantity: number;
    percentage: number;
  }[];
}

export interface ComplianceBreachData {
  quantity: number;
  percentage: number;
  byRegion: {
    region: string;
    quantity: number;
    percentage: number;
  }[];
  bySupplier: {
    supplier: string;
    quantity: number;
    percentage: number;
  }[];
}

export interface KPIData {
  rejectionRates: RejectionData;
  complianceBreaches: ComplianceBreachData;
}
