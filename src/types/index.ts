export type InspectionType = 'Post-Harvest' | 'Pre-Shipment' | 'On-Arrival' | 'Warehouse';

export type QualityCheckType = 'Physical' | 'Chemical' | 'Moisture';

export type InspectionStatus = 'Passed' | 'Failed' | 'Pending';

export interface QualityCheck {
  type: QualityCheckType;
  status: InspectionStatus;
  value?: string;
  threshold?: string;
  details?: string;
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

export type OrderStatus = 'Approved' | 'Pending' | 'Rejected';

export interface CompanyDetails {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  registrationNumbers: {
    type: string;
    value: string;
  }[];
}

export interface LineItem {
  productName: string;
  grade: string;
  sizeSpec: string;
  packagingType: string;
  hsCode: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

export interface ShippingDetails {
  modeOfTransport: string;
  vesselOrFlightNumber?: string;
  blOrAwbNumber?: string;
  portOfLoading: string;
  portOfDischarge: string;
  finalDestination?: string;
  countryOfOrigin: string;
  countryOfDestination: string;
}

export interface TransactionDetails {
  incoterms: string;
  termsOfPayment: string;
  currency: string;
}

export interface Charges {
  subtotal: number;
  freightCharges?: number;
  insuranceCharges?: number;
  packingCharges?: number;
  otherCharges?: number;
  totalAmount: number;
}

export interface ShippingMarks {
  description: string;
  lotId: string;
  cartonRange: string;
}

export interface PurchaseOrder {
  id: string;
  status: OrderStatus;
  invoiceNumber: string;
  invoiceDate: string;
  customerPoNumber: string;
  exporter: CompanyDetails;
  importer: CompanyDetails;
  consignee?: CompanyDetails;
  shipmentDetails: ShippingDetails;
  transactionDetails: TransactionDetails;
  lineItems: LineItem[];
  charges: Charges;
  shippingMarks: ShippingMarks;
  declarations: {
    type: string;
    reference: string;
  }[];
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    swiftCode: string;
  };
  createdAt: string;
  updatedAt: string;
}
