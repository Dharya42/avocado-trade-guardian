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

export interface TransitMonitoringDetails {
  monitorInfo: {
    monitorName: string;
    monitorId: string;
    startDate: string;
    endDate: string;
    company: string;
    photos: PhotoRecord[];
  };
  shipmentIdentification: {
    containerId: string;
    bookingReference: string;
    exporterName: string;
    importerName: string;
    sealNumber: string;
    photos: PhotoRecord[];
  };
  vesselDetails: {
    vesselName: string;
    imoNumber: string;
    voyageNumber: string;
    shippingLine: string;
    portOfLoading: {
      name: string;
      actualDeparture: string;
    };
    transshipments: {
      port: string;
      eta: string;
      ata: string;
      atd: string;
    }[];
    portOfDischarge: {
      name: string;
      originalEta: string;
      currentEta: string;
      etaChanges: {
        date: string;
        newEta: string;
        reason: string;
      }[];
    };
    photos: PhotoRecord[];
  };
  monitoringSources: {
    primarySource: {
      type: string;
      details: string;
    };
    secondarySource?: {
      type: string;
      details: string;
    };
    reviewFrequency: string;
    photos: PhotoRecord[];
  };
  environmentalConditions: {
    temperature: {
      setPoint: number;
      dataAvailability: 'Continuous' | 'Snapshot';
      reviewMethod: 'Portal' | 'File' | 'Screenshot';
      minTemperature: number;
      maxTemperature: number;
      deviationsNoted: boolean;
      evidence: PhotoRecord[];
    };
    controlledAtmosphere: {
      required: boolean;
      o2SetPoint?: number;
      co2SetPoint?: number;
      dataAvailable: boolean;
      o2Range?: {
        min: number;
        max: number;
      };
      co2Range?: {
        min: number;
        max: number;
      };
      deviationsNoted: boolean;
      evidence: PhotoRecord[];
    };
    relativeHumidity: {
      dataReviewed: boolean;
      range?: {
        min: number;
        max: number;
      };
    };
    reeferUnit: {
      powerStatus: 'On' | 'Off';
      outages: {
        startTime: string;
        endTime: string;
        duration: string;
      }[];
    };
    photos: PhotoRecord[];
  };
  eventMonitoring: {
    hasAlerts: boolean;
    alerts: {
      dateTime: string;
      description: string;
      duration: string;
      resolution: string;
      evidence: PhotoRecord[];
    }[];
    hasDelays: boolean;
    delays: {
      description: string;
      impact: string;
    }[];
    photos: PhotoRecord[];
  };
  transitSummary: {
    overallCondition: 'OK' | 'Minor Issues' | 'Major Issues';
    communicationLog: string[];
    finalEta: string;
    photos: PhotoRecord[];
  };
}

export interface Inspection {
  id: string;
  type: 'Post-Harvest' | 'Pre-Shipment' | 'Transit' | 'On-Arrival' | 'Warehouse';
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
  transitDetails?: TransitMonitoringDetails;
  postOfImportDetails?: PostOfImportDetails;
  distributionCenterDetails?: DistributionCenterInspection;
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
  shipDate: string;
  arrivalDate: string;
  status: string;
  value: string;
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

export interface PostOfImportDetails {
  shipmentDetails: {
    inspectionDateTime: string;
    inspectorName: string;
    inspectorId: string;
    shipmentId: string;
    containerId: string;
    vesselInfo: string;
    importerInfo: {
      name: string;
      licenseNo: string;
    };
    exporterName: string;
    commodity: string;
    quantity: {
      cartons: number;
      weight: number;
      unit: string;
    };
    photos: PhotoEvidence[];
  };
  
  documentVerification: {
    importPermit: {
      present: boolean;
      checkNumber: string;
    };
    commercialInvoice: {
      present: boolean;
      quantityMatch: boolean;
      valueMatch: boolean;
    };
    packingList: {
      present: boolean;
      cartonCountMatch: boolean;
    };
    billOfLading: {
      present: boolean;
      matchesShipmentId: boolean;
    };
    phytosanitaryCert: {
      present: boolean;
      valid: boolean;
      pestFree: boolean;
      dateCorrect: boolean;
      certNumber: string;
    };
    certificateOfOrigin: {
      present: boolean;
      consistentWithInvoice: boolean;
    };
    photos: PhotoEvidence[];
  };

  containerSealIntegrity: {
    containerCondition: 'Good' | 'Minor Damage' | 'Significant Damage';
    documentSealNumber: string;
    actualSealNumber: string;
    sealIntegrity: 'Matches' | 'Broken' | 'Missing' | 'Tampered' | 'Mismatch';
    photos: PhotoEvidence[];
  };

  productTemperatureCheck: {
    temperatureRecorder: {
      deviceId: string;
      reading: number;
      inRange: boolean;
    };
    pulpTemperature: {
      readings: number[];
      acceptable: boolean;
    };
    containerAtmosphere: 'Normal' | 'Off-Odor' | 'Mold' | 'Condensation';
    palletCondition: {
      status: 'Secure' | 'Shifted' | 'Crushed' | 'Wet';
      notes: string;
    };
    photos: PhotoEvidence[];
  };

  qualityInspection: {
    sampleCartons: string[];
    appearance: {
      color: 'Typical' | 'Abnormal';
      uniformity: 'Good' | 'Poor';
      defects: 'None' | 'Moderate' | 'Severe';
      pestPresence: {
        detected: boolean;
        description: string;
      };
    };
    packagingIntegrity: {
      status: 'Intact' | 'Damaged' | 'Labeling Issues';
      notes: string;
    };
    photos: PhotoEvidence[];
  };

  complianceDecision: {
    overallCompliance: 'Compliant' | 'Non-Compliant' | 'Pending Lab Test';
    nonComplianceReasons: {
      missingDocs: boolean;
      sealTampering: boolean;
      tempDeviation: boolean;
      pests: boolean;
      qualityIssues: boolean;
      other: string;
    };
    action: 'Released' | 'Hold' | 'Lab Sample' | 'Rejected';
    inspectorRemarks: string;
  };
}

interface PhotoEvidence {
  type: string;
  url: string;
  timestamp: string;
  description?: string;
}

export interface DistributionCenterInspection {
  shipmentReceiving: {
    inspectionDate: string;
    inspectorName: string;
    inspectorId: string;
    internalLotId: string;
    palletIds: string[];
    containerId: string;
    poReference: string;
    supplierLotId: string;
    supplierName: string;
    variety: string;
    declaredGrade: string;
    dateReceived: string;
    cartonsReceived: number;
    cartonsSampled: number;
    photos: PhotoRecord[];
  };
  storageConditions: {
    deliveryTruckTemp: number;
    pulpTemperatures: {
      palletId: string;
      temperature: number;
      acceptable: boolean;
    }[];
    averagePulpTemp: number;
    initialStorageBay: string;
    photos: PhotoRecord[];
  };
  packagingLabeling: {
    cartonCondition: {
      status: 'Good' | 'Minor Damage' | 'Major Damage';
      damageCount: number;
      photos: PhotoRecord[];
    };
    labelAccuracy: {
      status: 'Correct' | 'Missing' | 'Mismatched';
      details?: string;
    };
    palletCondition: 'Good' | 'Damaged';
    photos: PhotoRecord[];
  };
  externalQuality: {
    appearance: {
      uniformity: 'Good' | 'Fair' | 'Poor';
      colorStage: 'Green' | 'Turning' | 'Mixed';
      gloss: 'Good' | 'Dull';
    };
    shape: {
      status: 'Typical' | 'Misshapen';
      percentageAffected?: number;
    };
    size: {
      sizeCode: string;
      uniformity: 'Good' | 'Fair' | 'Poor';
      averageWeight: number;
    };
    externalDefects: {
      type: 'Bruising' | 'Cuts' | 'Scars' | 'Sunburn' | 'Mold' | 'Pest Damage' | 'Stem Issues';
      percentageAffected: number;
    }[];
    photos: PhotoRecord[];
  };
  internalQuality: {
    firmness: {
      readings: number[];
      average: number;
    };
    dryMatter?: number;
    fleshColor: 'Creamy' | 'Grayish' | 'Dark';
    internalDefects: {
      type: 'Vascular Browning' | 'Flesh Bruising' | 'Seed Cavity Mold' | 'Uneven Ripening';
      severity: 'None' | 'Minor' | 'Moderate' | 'Severe';
    }[];
    photos: PhotoRecord[];
  };
  sensoryEvaluation?: {
    aroma: 'Fresh' | 'Fermented';
    texture: 'Creamy' | 'Watery' | 'Fibrous';
    taste: 'Good' | 'Bitter' | 'Off';
    photos: PhotoRecord[];
  };
  finalAssessment: {
    qualityRating: 'Premium' | 'Acceptable' | 'Below Standard';
    primaryIssues: string[];
    recommendedAction: 'Accept for Standard Storage' | 'Accept for Quick Sale' | 'Hold for Review' | 'Segregate' | 'Reject';
    actionDetails?: string;
    finalStorageBay: string;
    inspectorRemarks: string;
    photos: PhotoRecord[];
  };
}
