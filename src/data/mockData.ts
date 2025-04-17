
import { Trade } from '@/types';
import { formatInspection } from './mockData-helpers';

// KPI Mock Data for dashboard visualizations
export const mockKPIData = {
  rejectionRates: {
    quantity: 42,  // Added required quantity property
    percentage: 4.2,
    byRegion: [
      { region: 'Chile', quantity: 15, percentage: 5.8 },
      { region: 'Kenya', quantity: 12, percentage: 3.6 },
      { region: 'Mexico', quantity: 8, percentage: 4.1 },
      { region: 'Peru', quantity: 7, percentage: 3.9 }
    ],
    bySupplier: [
      { supplier: 'Green Valley Farms', quantity: 18, percentage: 6.2 },
      { supplier: 'Highland Avocado Co.', quantity: 10, percentage: 4.0 },
      { supplier: 'Sunshine Growers', quantity: 8, percentage: 3.8 },
      { supplier: 'Fresh Fields Ltd', quantity: 6, percentage: 3.5 }
    ]
  },
  complianceBreaches: {
    quantity: 37,  // Added required quantity property
    percentage: 3.7,
    byRegion: [
      { region: 'Chile', quantity: 14, percentage: 4.2 },
      { region: 'Kenya', quantity: 10, percentage: 3.1 },
      { region: 'Mexico', quantity: 9, percentage: 4.6 },
      { region: 'Peru', quantity: 4, percentage: 2.9 }
    ],
    bySupplier: [
      { supplier: 'Green Valley Farms', quantity: 15, percentage: 5.1 },
      { supplier: 'Highland Avocado Co.', quantity: 9, percentage: 3.3 },
      { supplier: 'Sunshine Growers', quantity: 8, percentage: 3.2 },
      { supplier: 'Fresh Fields Ltd', quantity: 5, percentage: 3.0 }
    ]
  }
};

export const mockTrades: Trade[] = [
  {
    id: '1',
    tradeNumber: 'TRD-AVG-2023-001',
    supplier: 'Green Highlands Avocado Farms',
    supplierCountry: 'Kenya',
    buyer: 'Fresh Mart Distributors',
    buyerCountry: 'UAE',
    productType: 'Hass Avocados',
    quantity: '24,000 kg (2,000 cartons)',
    // Use the proper format for shipDate and arrivalDate to match the Trade type
    shipDate: new Date('2023-04-05').toISOString(),
    arrivalDate: new Date('2023-04-09').toISOString(),
    status: 'Completed',
    value: '$86,400',
    inspections: [
      formatInspection({
        id: 'insp-001',
        type: 'Post-Harvest',
        date: '2023-03-28',
        location: 'Nairobi, Kenya',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Excellent', threshold: 'Good', status: 'Passed', details: 'Avocados are firm and free from physical damage.' },
          { type: 'Chemical', value: 'Optimal', threshold: 'Optimal', status: 'Passed', details: 'Chemical analysis shows ideal maturity levels.' },
          { type: 'Moisture', value: '70%', threshold: '65-75%', status: 'Passed', details: 'Moisture content within acceptable range.' }
        ],
        compliances: [
          { name: 'GLOBALG.A.P', status: 'Passed', details: 'Compliant with GLOBALG.A.P standards.' },
          { name: 'HACCP', status: 'Passed', details: 'Compliant with HACCP food safety standards.' }
        ],
        inspectionTools: [
          'Refractometer',
          'Digital Scale',
          'Color Chart',
          'Sizing Rings'
        ],
        notes: 'Excellent quality overall. Fruit properly matured and sized.',
        lab: {
          name: 'AgriQuality Labs',
          location: 'Nairobi',
          contactPerson: 'Dr. Mwangi'
        },
        postHarvestDetails: {
          harvestDate: '2023-03-27',
          storageConditions: 'Cool, dry place',
          pestControlUsed: 'None',
          packagingType: 'Ventilated cartons',
          transportMethod: 'Refrigerated trucks'
        }
      }),
      
      formatInspection({
        id: 'insp-002',
        type: 'Pre-Shipment',
        date: '2023-03-30',
        location: 'Mombasa Port, Kenya',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Excellent', threshold: 'Good', status: 'Passed', details: 'Avocados are firm and free from physical damage.' },
          { type: 'Chemical', value: 'Optimal', threshold: 'Optimal', status: 'Passed', details: 'Chemical analysis shows ideal maturity levels.' },
          { type: 'Moisture', value: '70%', threshold: '65-75%', status: 'Passed', details: 'Moisture content within acceptable range.' }
        ],
        compliances: [
          { name: 'GLOBALG.A.P', status: 'Passed', details: 'Compliant with GLOBALG.A.P standards.' },
          { name: 'HACCP', status: 'Passed', details: 'Compliant with HACCP food safety standards.' }
        ],
        inspectionTools: [
          'Temperature Logger',
          'Humidity Meter',
          'Digital Camera',
          'Sampling Tools'
        ],
        notes: 'Container properly sealed and temperature settings verified.',
        preShipmentDetails: {
          facilityIdentification: {
            facilityName: "Fresh Pack Kenya Ltd",
            registrationNumber: "PKH-2023-45678",
            address: "Mombasa Export Processing Zone, Mombasa",
            contactPerson: "Jane Kariuki",
            phone: "+254 712 345 678",
            email: "operations@freshpack.co.ke",
            photos: [
              { type: "facility_exterior", url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" },
              { type: "facility_signage", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085" }
            ]
          },
          regulatoryCompliance: {
            documentsValid: true,
            certifications: [
              { type: "GLOBALG.A.P", number: "GGN 4052852192286", expiryDate: "2023-12-31" },
              { type: "HACCP", number: "HC-234-KE", expiryDate: "2023-11-15" },
              { type: "ISO 22000", number: "ISO22-789-2023", expiryDate: "2024-06-30" }
            ],
            permits: [
              { type: "Export Permit", number: "EXP-2023-4567", validUntil: "2023-04-30" },
              { type: "Phytosanitary Certificate", number: "KEPHIS-PC-2023-789", validUntil: "2023-04-15" }
            ],
            photos: [
              { type: "certifications", url: "https://images.unsplash.com/photo-1486718448742-163732cd1544" }
            ]
          },
          facilityCondition: {
            maintenanceStatus: "Good",
            cleanlinessRating: 8,
            pestControl: {
              program: "Integrated Pest Management",
              lastInspection: "2023-03-15",
              findings: "No evidence of pests found"
            },
            repairs: [
              { area: "Loading Dock Door", issue: "Seal damaged", status: "Scheduled", date: "2023-04-10" }
            ],
            photos: [
              { type: "facility_interior", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f" },
              { type: "pest_control", url: "https://images.unsplash.com/photo-1517022812141-23620dba5c23" }
            ]
          },
          receivingArea: {
            temperature: {
              current: 20,
              required: "18-22",
              withinRange: true
            },
            loadingDocks: [
              { number: 1, condition: "Good", cleanliness: "Clean" },
              { number: 2, condition: "Good", cleanliness: "Clean" }
            ],
            photos: [
              { type: "receiving_area", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" }
            ]
          },
          processingLine: {
            equipmentCondition: "Operational",
            stations: [
              { name: "Washing Station", status: "Operational", lastMaintenance: "2023-03-01", notes: "Running efficiently" },
              { name: "Sorting Line", status: "Operational", lastMaintenance: "2023-03-05", notes: "New sorting sensors installed" },
              { name: "Grading Station", status: "Operational", lastMaintenance: "2023-03-05", notes: "Calibrated" }
            ],
            calibration: [
              { equipment: "Weight Sorter", lastCalibrated: "2023-03-15", nextDue: "2023-04-15" },
              { equipment: "Size Grader", lastCalibrated: "2023-03-15", nextDue: "2023-04-15" }
            ],
            photos: [
              { type: "processing_line", url: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
              { type: "washing_station", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625" }
            ]
          },
          qualityControl: {
            proceduresFollowed: true,
            checkpoints: [
              { 
                station: "Receiving", 
                parameters: ["Ripeness", "Defects", "Sizing"],
                frequency: "Each batch",
                responsible: "QC Officer"
              },
              { 
                station: "Pre-Shipping", 
                parameters: ["Temperature", "Packaging Integrity", "Labeling"],
                frequency: "Each container",
                responsible: "QC Manager"
              }
            ],
            samples: [
              { type: "External Quality", quantity: "n=60 from 3 pallets", results: "Meets specifications", date: "2023-03-30" },
              { type: "Internal Quality", quantity: "n=20 from 3 pallets", results: "Meets specifications", date: "2023-03-30" }
            ],
            photos: [
              { type: "quality_check", url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e" }
            ]
          },
          packingLabeling: {
            materialsCompliant: true,
            packaging: [
              { type: "Cartons", condition: "New", quantity: "Sufficient" },
              { type: "Liners", condition: "New", quantity: "Sufficient" }
            ],
            labels: [
              { type: "Product Labels", compliance: true, notes: "All information correct and legible" },
              { type: "Carton Markings", compliance: true, notes: "Properly printed with all required information" }
            ],
            photos: [
              { type: "packaging_materials", url: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" },
              { type: "labeled_carton", url: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0" }
            ]
          },
          storage: {
            temperature: {
              current: 5.5,
              required: "5-7",
              withinRange: true
            },
            humidity: {
              current: 90,
              required: "85-95",
              withinRange: true
            },
            areas: [
              { name: "Pre-Cooling Room", capacity: "10,000 kg", currentUsage: "60%", condition: "Good" },
              { name: "Cold Storage", capacity: "30,000 kg", currentUsage: "40%", condition: "Good" }
            ],
            photos: [
              { type: "cold_storage", url: "https://images.unsplash.com/photo-1601599924803-f5d841fa2c5a" }
            ]
          },
          workerHygiene: {
            trainingCurrent: true,
            personnel: [
              { role: "Line Workers", certified: true, lastTraining: "2023-02-15" },
              { role: "Quality Control", certified: true, lastTraining: "2023-02-15" },
              { role: "Supervisors", certified: true, lastTraining: "2023-01-20" }
            ],
            facilities: [
              { type: "Handwashing Stations", condition: "Good", adequacy: "Sufficient" },
              { type: "Sanitation Facilities", condition: "Good", adequacy: "Sufficient" },
              { type: "Change Rooms", condition: "Good", adequacy: "Sufficient" }
            ],
            photos: [
              { type: "worker_ppe", url: "https://images.unsplash.com/photo-1499366440726-c474dd1fbd7d" },
              { type: "handwashing_station", url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" }
            ]
          },
          finalAssessment: {
            readyForShipment: true,
            issues: [
              { category: "Documentation", description: "Missing carrier's contact information", severity: "Minor", action: "Update before dispatch" }
            ],
            recommendations: [
              "Ensure all temperature loggers are properly activated before container sealing",
              "Provide additional training on new labeling requirements coming next quarter"
            ],
            approver: {
              name: "David Mwangi",
              position: "Pre-Shipment Inspector",
              date: "2023-03-30"
            },
            photos: [
              { type: "container_loading", url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec" }
            ]
          }
        }
      }),
    ]
  },
];
