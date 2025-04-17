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

export interface FarmIdentification {
  farmName: string;
  growerName: string;
  registrationNumbers: {
    type: string; // e.g., "HCD", "KEPHIS"
    value: string;
  }[];
  location: {
    coordinates: string;
    address: string;
  };
  areas: {
    total: number; // in hectares
    avocado: number; // in hectares
  };
  varieties: string[];
  targetMarkets: string[];
  associatedPackhouse: string;
  photos: {
    type: string; // e.g., "farm_signage", "orchard_overview"
    url: string;
  }[];
}

export interface TraceabilityRecord {
  systemType: string; // e.g., "Digital", "Paper"
  recordsAvailable: boolean;
  recordTypes: string[]; // e.g., ["inputs", "harvest", "staff"]
  photos: {
    type: string;
    url: string;
  }[];
}

export interface GAPRecord {
  siteHistory: string;
  soilManagement: {
    fertilizers: {
      type: string;
      applicationDate: string;
      rate: string;
    }[];
    storageCompliance: boolean;
  };
  waterManagement: {
    source: string;
    qualityTestDate: string;
    irrigationMethod: string;
    testResults: string;
  };
  photos: {
    type: string;
    url: string;
  }[];
}

export interface PestDiseaseManagement {
  ipmStrategyPresent: boolean;
  monitoringLogs: {
    date: string;
    findings: string;
    action: string;
  }[];
  pesticides: {
    storage: {
      secure: boolean;
      conditions: string;
    };
    records: {
      product: string;
      applicationDate: string;
      phi: number; // Pre-harvest interval in days
    }[];
    disposal: string;
  };
  calibrationRecords: {
    equipment: string;
    date: string;
    result: string;
  }[];
  photos: {
    type: string;
    url: string;
  }[];
}

export interface PreHarvestAssessment {
  maturityMethod: string;
  dryMatterPercentage: number;
  equipment: {
    type: string;
    condition: string;
    lastMaintenance: string;
  }[];
  trainingRecords: {
    topic: string;
    date: string;
    attendees: number;
  }[];
  heatRemovalPlan: string;
  photos: {
    type: string;
    url: string;
  }[];
}

export interface WorkerWelfare {
  hygieneTraining: {
    date: string;
    topics: string[];
    trainer: string;
  }[];
  facilities: {
    type: string; // e.g., "toilet", "handwashing"
    count: number;
    condition: string;
    supplies: string[];
  }[];
  firstAid: {
    kitsAvailable: number;
    trainedPersonnel: number;
    lastInspection: string;
  };
  waterAccess: {
    points: number;
    potable: boolean;
    testDate: string;
  };
  photos: {
    type: string;
    url: string;
  }[];
}

export interface EnvironmentalProtection {
  wasteManagement: {
    plan: string;
    collectionAreas: {
      type: string;
      condition: string;
      lastCleaned: string;
    }[];
  };
  waterProtection: {
    bufferZones: {
      location: string;
      width: number; // in meters
    }[];
    measures: string[];
  };
  biodiversity: {
    zones: {
      type: string;
      area: number; // in hectares
      species: string[];
    }[];
  };
  photos: {
    type: string;
    url: string;
  }[];
}

export interface FinalEvaluation {
  strengths: string[];
  weaknesses: string[];
  nonConformities: {
    severity: 'Minor' | 'Major' | 'Critical';
    description: string;
    correctiveAction: string;
    deadline: string;
  }[];
  exportReadiness: 'Ready' | 'Minor Corrections Needed' | 'Not Ready';
  evaluator: {
    name: string;
    organization: string;
    date: string;
  };
}

export interface PostHarvestInspection {
  farmIdentification: FarmIdentification;
  traceability: TraceabilityRecord;
  gap: GAPRecord;
  pestManagement: PestDiseaseManagement;
  preHarvest: PreHarvestAssessment;
  workerWelfare: WorkerWelfare;
  environmental: EnvironmentalProtection;
  finalEvaluation: FinalEvaluation;
}

export interface Inspection {
  id: string;
  type: 'Post-Harvest' | 'Pre-Shipment' | 'On-Arrival' | 'Warehouse';
  date: string;
  location: string;
  status: 'Passed' | 'Failed' | 'Pending';
  qualityChecks: QualityCheck[];
  compliances: Compliance[];
  inspectionTools: string[];
  lab?: Lab;
  notes?: string;
  postHarvestDetails?: PostHarvestInspection;
  preShipmentDetails?: PreShipmentInspection;
  createdAt: string;
  updatedAt: string;
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

export interface PhotoRecord {
  type: string;
  url: string;
}

export interface PreShipmentInspection {
  facilityIdentification: {
    facilityName: string;
    registrationNumber: string;
    address: string;
    contactPerson: string;
    phone: string;
    email: string;
    photos: PhotoRecord[];
  };
  regulatoryCompliance: {
    documentsValid: boolean;
    certifications: {
      type: string;
      number: string;
      expiryDate: string;
    }[];
    permits: {
      type: string;
      number: string;
      validUntil: string;
    }[];
    photos: PhotoRecord[];
  };
  facilityCondition: {
    maintenanceStatus: 'Good' | 'Fair' | 'Poor';
    cleanlinessRating: number;
    pestControl: {
      program: string;
      lastInspection: string;
      findings: string;
    };
    repairs: {
      area: string;
      issue: string;
      status: string;
      date: string;
    }[];
    photos: PhotoRecord[];
  };
  receivingArea: {
    temperature: {
      current: number;
      required: number;
      withinRange: boolean;
    };
    loadingDocks: {
      number: string;
      condition: string;
      cleanliness: string;
    }[];
    photos: PhotoRecord[];
  };
  processingLine: {
    equipmentCondition: 'Operational' | 'Needs Maintenance' | 'Out of Service';
    stations: {
      name: string;
      status: string;
      lastMaintenance: string;
      notes: string;
    }[];
    calibration: {
      equipment: string;
      lastCalibrated: string;
      nextDue: string;
    }[];
    photos: PhotoRecord[];
  };
  qualityControl: {
    proceduresFollowed: boolean;
    checkpoints: {
      station: string;
      parameters: string[];
      frequency: string;
      responsible: string;
    }[];
    samples: {
      type: string;
      quantity: number;
      results: string;
      date: string;
    }[];
    photos: PhotoRecord[];
  };
  packingLabeling: {
    materialsCompliant: boolean;
    packaging: {
      type: string;
      condition: string;
      quantity: number;
    }[];
    labels: {
      type: string;
      compliance: boolean;
      notes: string;
    }[];
    photos: PhotoRecord[];
  };
  storage: {
    temperature: {
      current: number;
      required: number;
      withinRange: boolean;
    };
    humidity: {
      current: number;
      required: number;
      withinRange: boolean;
    };
    areas: {
      name: string;
      capacity: string;
      currentUsage: string;
      condition: string;
    }[];
    photos: PhotoRecord[];
  };
  workerHygiene: {
    trainingCurrent: boolean;
    personnel: {
      role: string;
      certified: boolean;
      lastTraining: string;
    }[];
    facilities: {
      type: string;
      condition: string;
      adequacy: string;
    }[];
    photos: PhotoRecord[];
  };
  finalAssessment: {
    readyForShipment: boolean;
    issues: {
      category: string;
      description: string;
      severity: 'Critical' | 'Major' | 'Minor';
      action: string;
    }[];
    recommendations: string[];
    approver: {
      name: string;
      position: string;
      date: string;
      signature: string;
    };
    photos: PhotoRecord[];
  };
}
