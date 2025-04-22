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
    shipDate: new Date('2023-04-05').toISOString(),
    arrivalDate: new Date('2023-04-09').toISOString(),
    status: 'Completed',
    value: '$86,400',
    inspections: [
      formatInspection({
        id: 'insp-001',
        type: 'Post-Harvest',
        date: '2025-04-16',
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
          'Sizing Rings',
          'Penetrometer',
          'Moisture Meter'
        ],
        notes: 'Farm meets export readiness criteria with minor corrections needed in worker welfare facilities.',
        inspector: {
          name: 'John Kamau',
          affiliatedBody: 'KEPHIS',
          inspectionDate: '2025-04-16'
        },
        postHarvestDetails: {
          farmIdentification: {
            farmName: 'Green Highlands Avocado Farms',
            growerName: 'James Mwangi',
            registrationNumbers: [
              { type: 'KEPHIS', value: 'KE-AVO-2025-123' },
              { type: 'HCD', value: 'HCD-2025-456' }
            ],
            location: {
              coordinates: '-1.2921,36.8219',
              address: 'Muranga County, Kenya'
            },
            areas: {
              total: 150,
              avocado: 85
            },
            varieties: ['Hass', 'Fuerte'],
            targetMarkets: ['UAE', 'EU', 'Singapore'],
            associatedPackhouse: 'Fresh Pack Kenya Ltd',
            photos: [
              { type: 'farm_entrance', url: 'https://example.com/farm-entrance.jpg' },
              { type: 'orchard_overview', url: 'https://example.com/orchard.jpg' }
            ]
          },
          traceability: {
            systemType: 'Digital QR-based system with block coding',
            recordsAvailable: true,
            recordTypes: [
              'Farm Activities',
              'Input Applications',
              'Harvest Records',
              'Training Records',
              'Pest Monitoring'
            ],
            photos: [
              { type: 'block_markers', url: 'https://example.com/block-markers.jpg' },
              { type: 'record_system', url: 'https://example.com/records.jpg' }
            ]
          },
          gap: {
            siteHistory: 'Previously coffee farm, converted to avocados in 2018',
            soilManagement: {
              fertilizers: [
                { type: 'Organic Compost', applicationDate: '2025-02-15', rate: '2.5 tons/ha' },
                { type: 'NPK 17:17:17', applicationDate: '2025-03-01', rate: '200 kg/ha' }
              ],
              storageCompliance: true
            },
            waterManagement: {
              source: 'Borehole and Rainwater Harvesting',
              qualityTestDate: '2025-03-15',
              irrigationMethod: 'Drip Irrigation',
              testResults: 'Potable'
            },
            photos: [
              { type: 'fertilizer_storage', url: 'https://example.com/fertilizer.jpg' },
              { type: 'irrigation_system', url: 'https://example.com/irrigation.jpg' }
            ]
          },
          pestManagement: {
            ipmStrategyPresent: true,
            monitoringLogs: [
              { date: '2025-04-01', findings: 'Low fruit fly presence', action: 'Pheromone traps installed' },
              { date: '2025-04-08', findings: 'No significant pests', action: 'Continued monitoring' }
            ],
            pesticides: {
              storage: {
                secure: true,
                conditions: 'Well-ventilated, locked facility with proper labeling'
              },
              records: [
                { product: 'Organic Neem Extract', applicationDate: '2025-03-20', phi: 7 },
                { product: 'Copper Oxychloride', applicationDate: '2025-03-15', phi: 14 }
              ],
              disposal: 'Triple rinsing, puncturing, and authorized collection'
            },
            calibrationRecords: [
              { equipment: 'Backpack Sprayer', date: '2025-03-01', result: 'Calibrated' }
            ],
            photos: [
              { type: 'pesticide_storage', url: 'https://example.com/pesticide-store.jpg' },
              { type: 'pest_traps', url: 'https://example.com/traps.jpg' }
            ]
          },
          preHarvest: {
            maturityMethod: 'Dry Matter Testing and Visual Assessment',
            dryMatterPercentage: 23,
            equipment: [
              { type: 'Harvesting Clippers', condition: 'Good', lastMaintenance: '2025-04-01' },
              { type: 'Collection Crates', condition: 'Excellent', lastMaintenance: '2025-04-01' }
            ],
            trainingRecords: [
              { topic: 'Harvest Techniques', date: '2025-03-25', attendees: 15 },
              { topic: 'Food Safety', date: '2025-03-26', attendees: 15 }
            ],
            heatRemovalPlan: 'Immediate transfer to on-farm shade area, collection within 2 hours',
            photos: [
              { type: 'harvesting_tools', url: 'https://example.com/tools.jpg' },
              { type: 'collection_crates', url: 'https://example.com/crates.jpg' }
            ]
          },
          workerWelfare: {
            hygieneTraining: [
              { date: '2025-03-15', topics: ['Personal Hygiene', 'Food Safety'], trainer: 'Mary Njeri' }
            ],
            facilities: [
              { type: 'Toilets', count: 4, condition: 'Good', supplies: ['Toilet Paper', 'Soap', 'Water'] },
              { type: 'Handwashing Stations', count: 6, condition: 'Good', supplies: ['Soap', 'Paper Towels'] }
            ],
            firstAid: {
              kitsAvailable: 3,
              trainedPersonnel: 2,
              lastInspection: '2025-04-01'
            },
            waterAccess: {
              points: 6,
              potable: true,
              testDate: '2025-03-15'
            },
            photos: [
              { type: 'sanitation_facilities', url: 'https://example.com/facilities.jpg' },
              { type: 'handwashing_stations', url: 'https://example.com/handwashing.jpg' }
            ]
          },
          environmental: {
            wasteManagement: {
              plan: 'Segregation of organic and inorganic waste, composting of organic waste',
              collectionAreas: [
                { type: 'Organic Waste', condition: 'Good', lastCleaned: '2025-04-15' },
                { type: 'Chemical Containers', condition: 'Good', lastCleaned: '2025-04-15' }
              ]
            },
            waterProtection: {
              bufferZones: [
                { location: 'Stream Border', width: 10 },
                { location: 'Chemical Mixing Area', width: 15 }
              ],
              measures: ['Grass Strips', 'Contour Planting', 'Rainwater Harvesting']
            },
            biodiversity: {
              zones: [
                { type: 'Natural Forest', area: 5, species: ['Indigenous Trees', 'Local Birds'] },
                { type: 'Hedgerows', area: 2, species: ['Native Shrubs', 'Pollinators'] }
              ]
            },
            photos: [
              { type: 'waste_management', url: 'https://example.com/waste.jpg' },
              { type: 'buffer_zones', url: 'https://example.com/buffer.jpg' }
            ]
          },
          finalEvaluation: {
            strengths: [
              'Strong traceability system',
              'Excellent pest management practices',
              'Good environmental protection measures'
            ],
            weaknesses: [
              'Some worker welfare facilities need upgrading',
              'Additional handwashing stations needed'
            ],
            nonConformities: [
              {
                severity: 'Minor',
                description: 'Insufficient number of handwashing stations',
                correctiveAction: 'Install 2 additional stations',
                deadline: '2025-05-16'
              }
            ],
            exportReadiness: 'Minor Corrections Needed',
            evaluator: {
              name: 'John Kamau',
              organization: 'KEPHIS',
              date: '2025-04-16'
            }
          }
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
      formatInspection({
        id: 'insp-005',
        type: 'Warehouse',
        date: '2023-04-10',
        location: 'TFC Distribution Center, Dubai, UAE',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Good', threshold: 'Good', status: 'Passed', details: 'Product condition maintained during storage.' },
          { type: 'Chemical', value: 'Within Spec', threshold: 'Within Spec', status: 'Passed', details: 'No chemical deterioration observed.' },
          { type: 'Moisture', value: '71%', threshold: '65-75%', status: 'Passed', details: 'Moisture content optimal.' }
        ],
        compliances: [
          { name: 'Storage Standards', status: 'Passed', details: 'Meets TFC storage requirements.' },
          { name: 'Cold Chain', status: 'Passed', details: 'Temperature maintained within specifications.' }
        ],
        inspectionTools: [
          'Digital Thermometer',
          'Penetrometer',
          'Moisture Meter',
          'Color Chart'
        ],
        notes: 'Product received in excellent condition. Storage conditions optimal.',
        distributionCenterDetails: {
          shipmentReceiving: {
            inspectionDate: '2023-04-10T08:00:00Z',
            inspectorName: 'Ahmed Al-Mansouri',
            inspectorId: 'TFC-INSP-123',
            internalLotId: 'TFC-LOT-2023-456',
            palletIds: ['PLT-001', 'PLT-002', 'PLT-003', 'PLT-004'],
            containerId: 'MSKU-7654321',
            poReference: 'PO-2023-789',
            supplierLotId: 'GH-LOT-2023-123',
            supplierName: 'Green Highlands Avocado Farms',
            variety: 'Hass',
            declaredGrade: 'Class I',
            dateReceived: '2023-04-10T07:30:00Z',
            cartonsReceived: 2000,
            cartonsSampled: 20,
            photos: [
              { type: 'receiving_area', url: 'https://example.com/receiving.jpg' },
              { type: 'pallet_condition', url: 'https://example.com/pallets.jpg' }
            ]
          },
          storageConditions: {
            deliveryTruckTemp: 5.5,
            pulpTemperatures: [
              { palletId: 'PLT-001', temperature: 5.8, acceptable: true },
              { palletId: 'PLT-002', temperature: 5.6, acceptable: true },
              { palletId: 'PLT-003', temperature: 5.7, acceptable: true },
              { palletId: 'PLT-004', temperature: 5.9, acceptable: true }
            ],
            averagePulpTemp: 5.75,
            initialStorageBay: 'Bay-C12',
            photos: [
              { type: 'temperature_reading', url: 'https://example.com/temp.jpg' },
              { type: 'storage_bay', url: 'https://example.com/bay.jpg' }
            ]
          },
          packagingLabeling: {
            cartonCondition: {
              status: 'Good',
              damageCount: 0,
              photos: [
                { type: 'carton_condition', url: 'https://example.com/cartons.jpg' }
              ]
            },
            labelAccuracy: {
              status: 'Correct',
              details: 'All labels clear and accurate'
            },
            palletCondition: 'Good',
            photos: [
              { type: 'labels', url: 'https://example.com/labels.jpg' }
            ]
          },
          externalQuality: {
            appearance: {
              uniformity: 'Good',
              colorStage: 'Green',
              gloss: 'Good'
            },
            shape: {
              status: 'Typical',
              percentageAffected: 0
            },
            size: {
              sizeCode: '16',
              uniformity: 'Good',
              averageWeight: 250
            },
            externalDefects: [
              { type: 'Bruising', percentageAffected: 1.2 },
              { type: 'Cuts', percentageAffected: 0.5 }
            ],
            photos: [
              { type: 'external_quality', url: 'https://example.com/quality.jpg' }
            ]
          },
          internalQuality: {
            firmness: {
              readings: [7.2, 7.4, 7.1, 7.3, 7.2],
              average: 7.24
            },
            dryMatter: 23.5,
            fleshColor: 'Creamy',
            internalDefects: [
              { type: 'Vascular Browning', severity: 'None' },
              { type: 'Flesh Bruising', severity: 'None' }
            ],
            photos: [
              { type: 'internal_quality', url: 'https://example.com/internal.jpg' }
            ]
          },
          sensoryEvaluation: {
            aroma: 'Fresh',
            texture: 'Creamy',
            taste: 'Good',
            photos: [
              { type: 'cut_fruit', url: 'https://example.com/cut.jpg' }
            ]
          },
          finalAssessment: {
            qualityRating: 'Premium',
            primaryIssues: [],
            recommendedAction: 'Accept for Standard Storage',
            actionDetails: 'Product meets all quality specifications',
            finalStorageBay: 'Bay-C12',
            inspectorRemarks: 'Excellent quality shipment. All parameters within specification. Approved for standard storage and distribution.',
            photos: [
              { type: 'final_storage', url: 'https://example.com/storage.jpg' }
            ]
          }
        }
      }),
      formatInspection({
        id: 'insp-006',
        type: 'Retail',
        date: '2023-04-12',
        location: 'Fresh Mart Supermarket, Dubai Mall, UAE',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Good', threshold: 'Good', status: 'Passed', details: 'Product display and handling meets standards.' },
          { type: 'Chemical', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Not applicable for retail inspection.' },
          { type: 'Moisture', value: '70%', threshold: '65-75%', status: 'Passed', details: 'Fruit moisture content maintained.' }
        ],
        compliances: [
          { name: 'Display Standards', status: 'Passed', details: 'Meets TFC retail display guidelines.' },
          { name: 'Product Labeling', status: 'Passed', details: 'Origin and pricing clearly displayed.' }
        ],
        inspectionTools: [
          'Digital Thermometer',
          'Firmness Tester',
          'Digital Camera',
          'Inspection Checklist'
        ],
        notes: 'Overall excellent retail presentation and stock management.',
        retailShelfDetails: {
          auditMetadata: {
            dateTime: '2023-04-12T10:00:00Z',
            auditorName: 'Sarah Al-Mansoori',
            auditorId: 'TFC-RTL-123',
            storeName: 'Fresh Mart Supermarket',
            storeLocation: 'Dubai Mall, Sheikh Mohammed Bin Rashid Blvd, Dubai',
            storeContact: 'Mohammed Hassan',
            weatherConditions: 'Indoor Climate Controlled',
            photos: [
              { type: 'store_front', url: 'https://example.com/store.jpg' }
            ]
          },
          displayArea: {
            location: 'Main Produce Section',
            displayType: 'Refrigerated',
            cleanliness: 'Excellent',
            lighting: 'Adequate',
            posPresent: true,
            posCondition: 'Good',
            posOriginAccuracy: 'Correct',
            overallAppeal: 'High',
            photos: [
              { type: 'display_area', url: 'https://example.com/display.jpg' },
              { type: 'pos_materials', url: 'https://example.com/pos.jpg' }
            ]
          },
          looseAvocados: {
            variety: 'Hass',
            originLabeling: 'Clearly Labeled',
            priceLabeling: 'Clear & Correct',
            ripenessMix: {
              hardRipenAtHome: 30,
              breakingFirmRipe: 40,
              readyToEat: 25,
              overripe: 5
            },
            visualQuality: {
              sizeColorUniformity: 'Good',
              damagedFruit: {
                level: 'Some',
                count: 3
              },
              overripeMoldyFruit: {
                level: 'None',
                count: 0
              },
              handlingDamage: 'Minimal'
            },
            firmnessConsistency: 'Consistent',
            stockRotation: {
              olderStockMixed: false,
              removalPercentage: 5
            },
            photos: [
              { type: 'loose_avocados', url: 'https://example.com/loose.jpg' },
              { type: 'ripeness_stages', url: 'https://example.com/ripeness.jpg' }
            ]
          },
          prePackaged: {
            packageType: '4-count mesh bag',
            condition: 'Good',
            labelingAccuracy: 'Correct',
            fruitVisibility: 'Yes',
            inPackQuality: {
              uniformity: 'Good',
              visibleDamage: 'None'
            },
            fifoFollowed: true,
            photos: [
              { type: 'packaged_product', url: 'https://example.com/packaged.jpg' }
            ]
          },
          summary: {
            stockLevel: 'Medium',
            overallQuality: 'Excellent',
            immediateActions: 'Removed 3 damaged fruits from display',
            storeRecommendations: 'Continue current stock rotation practices. Consider increasing ready-to-eat proportion slightly based on customer demand.',
            tfcRecommendations: 'Current ripeness distribution working well for this location. Maintain delivery schedule.',
            auditorComments: 'Excellent presentation and stock management. Staff well-trained in handling procedures.'
          }
        }
      })
    ]
  },
];
