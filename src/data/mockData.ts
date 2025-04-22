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
        date: '2023-03-16',
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
          inspectionDate: '2023-04-16'
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
        id: 'insp-002b',
        type: 'Port-Export',
        date: '2023-04-01',
        location: 'Port of Mombasa, Kenya',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Pass', threshold: 'Pass', status: 'Passed', details: 'Container and cargo condition meets export standards.' },
          { type: 'Chemical', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Not applicable for port inspection.' },
          { type: 'Moisture', value: '70%', threshold: '65-75%', status: 'Passed', details: 'Container atmosphere within specifications.' }
        ],
        compliances: [
          { name: 'Export Documentation', status: 'Passed', details: 'All required export documents present and valid.' },
          { name: 'Container Standards', status: 'Passed', details: 'Container meets shipping line requirements.' }
        ],
        inspectionTools: [
          'Digital Thermometer',
          'Humidity Meter',
          'Container Inspection Kit',
          'Seal Verification Tools'
        ],
        notes: 'Container properly prepared and sealed for export. All parameters within specification.',
        portOfExportDetails: {
          inspectorInfo: {
            name: "James Ochieng",
            inspectionDate: "2023-04-01",
            inspectionTime: "09:30",
            affiliatedBody: "KEPHIS",
            portLocation: "Port of Mombasa, Terminal 2",
            photos: [
              { type: "inspector_id", url: "https://example.com/inspector-badge.jpg" }
            ]
          },
          consignmentInfo: {
            bookingReference: "MSC-BOK-2023-789",
            exporterName: "Green Highlands Avocado Farms",
            importerName: "Fresh Mart Distributors",
            containerId: "MSKU-7654321",
            vesselInfo: {
              name: "MSC Avocado Express",
              voyageNumber: "VOY-456-23"
            },
            phytosanitaryCertificate: true,
            exportPermit: true,
            photos: [
              { type: "container_number", url: "https://example.com/container.jpg" },
              { type: "documents", url: "https://example.com/documents.jpg" }
            ]
          },
          containerCondition: {
            containerType: "Reefer",
            externalCondition: "Pass",
            internalCleanliness: "Pass",
            doorSealsCondition: "Pass",
            reeferUnitFunctionality: "Pass",
            photos: [
              { type: "container_external", url: "https://example.com/container-ext.jpg" },
              { type: "container_internal", url: "https://example.com/container-int.jpg" }
            ]
          },
          temperatureVerification: {
            setTemperature: 5.5,
            actualTemperature: 5.6,
            preCooled: true,
            pulpTemperatures: {
              location1: 5.7,
              location2: 5.6,
              location3: 5.5,
              location4: 5.6,
              location5: 5.7,
              average: 5.62
            },
            temperatureLoggerPlaced: true,
            loggerPosition: "Carton stack center, middle height",
            photos: [
              { type: "temp_display", url: "https://example.com/temp.jpg" },
              { type: "logger_placement", url: "https://example.com/logger.jpg" }
            ]
          },
          loadingProcess: {
            loadingMethod: "Palletized",
            handlingPractices: "Good",
            stackingPattern: "Pass",
            cartonCondition: "Good",
            dunnageMaterial: "Air bags and corner protectors",
            timeframeAcceptable: true,
            photos: [
              { type: "loading_process", url: "https://example.com/loading.jpg" },
              { type: "stacking_pattern", url: "https://example.com/stacking.jpg" }
            ]
          },
          finalSealing: {
            totalUnits: {
              pallets: 20,
              cartons: 2000
            },
            doorsClosed: true,
            highSecuritySeal: true,
            sealNumber: "SL-98765432",
            sealType: "Bolt",
            photos: [
              { type: "seal_applied", url: "https://example.com/seal.jpg" },
              { type: "final_closure", url: "https://example.com/closure.jpg" }
            ]
          },
          overallAssessment: {
            findings: "Container loading and sealing completed according to protocol. Temperature and atmosphere conditions optimal for transit.",
            correctiveActions: "None required",
            exportClearance: true
          }
        }
      }),
      
      formatInspection({
        id: 'insp-003',
        type: 'Transit',
        date: '2023-04-06',
        location: 'Mombasa - Dubai Sea Route',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Stable', threshold: 'Stable', status: 'Passed', details: 'Container integrity maintained throughout transit.' },
          { type: 'Chemical', value: 'Within Range', threshold: 'Within Range', status: 'Passed', details: 'Atmosphere levels maintained within specifications.' },
          { type: 'Moisture', value: '85-90%', threshold: '80-90%', status: 'Passed', details: 'Relative humidity maintained within optimal range.' }
        ],
        compliances: [
          { name: 'Temperature Control', status: 'Passed', details: 'Temperature maintained between 5-7°C throughout transit.' },
          { name: 'Container Seal', status: 'Passed', details: 'Seal integrity maintained, no tampering detected.' }
        ],
        inspectionTools: [
          'Remote Temperature Logger',
          'Humidity Sensor',
          'GPS Tracker',
          'Atmosphere Analyzer'
        ],
        notes: 'Transit conditions maintained within specifications. No significant deviations noted.',
        transitDetails: {
          monitorInfo: {
            monitorName: "Sarah Johnson",
            monitorId: "MTR-2023-456",
            startDate: "2023-04-06",
            endDate: "2023-04-09",
            company: "SeaWatch Monitoring Ltd",
            photos: [
              { type: "monitor_id", url: "https://example.com/monitor-badge.jpg" }
            ]
          },
          shipmentIdentification: {
            containerId: "MSKU-7654321",
            bookingReference: "BKG-2023-789",
            exporterName: "Green Highlands Avocado Farms",
            importerName: "Fresh Mart Distributors",
            sealNumber: "SL-98765432",
            photos: [
              { type: "container_seal", url: "https://example.com/seal.jpg" },
              { type: "container_number", url: "https://example.com/container.jpg" }
            ]
          },
          vesselDetails: {
            vesselName: "MSC Avocado Express",
            imoNumber: "IMO-9876543",
            voyageNumber: "VOY-456-23",
            shippingLine: "MSC",
            portOfLoading: {
              name: "Mombasa Port",
              actualDeparture: "2023-04-06T08:30:00Z"
            },
            transshipments: [
              {
                port: "Jebel Ali",
                eta: "2023-04-08T14:00:00Z",
                ata: "2023-04-08T15:30:00Z",
                atd: "2023-04-08T23:00:00Z"
              }
            ],
            portOfDischarge: {
              name: "Dubai Port",
              originalEta: "2023-04-09T10:00:00Z",
              currentEta: "2023-04-09T12:00:00Z",
              etaChanges: [
                {
                  date: "2023-04-08T16:00:00Z",
                  newEta: "2023-04-09T12:00:00Z",
                  reason: "Port congestion at Jebel Ali"
                }
              ]
            },
            photos: [
              { type: "vessel_departure", url: "https://example.com/departure.jpg" }
            ]
          },
          monitoringSources: {
            primarySource: {
              type: "Emerson Real-Time Monitoring",
              details: "Container equipped with Emerson cargo monitoring system"
            },
            secondarySource: {
              type: "Carrier TripLINK",
              details: "Backup monitoring through carrier's system"
            },
            reviewFrequency: "Every 4 hours",
            photos: [
              { type: "monitoring_device", url: "https://example.com/device.jpg" }
            ]
          },
          environmentalConditions: {
            temperature: {
              setPoint: 5.5,
              dataAvailability: "Continuous",
              reviewMethod: "Portal",
              minTemperature: 5.2,
              maxTemperature: 5.8,
              deviationsNoted: false,
              evidence: [
                { type: "temp_graph", url: "https://example.com/temperature.jpg" }
              ]
            },
            controlledAtmosphere: {
              required: true,
              o2SetPoint: 5,
              co2SetPoint: 5,
              dataAvailable: true,
              o2Range: {
                min: 4.8,
                max: 5.2
              },
              co2Range: {
                min: 4.7,
                max: 5.3
              },
              deviationsNoted: false,
              evidence: [
                { type: "atmosphere_log", url: "https://example.com/atmosphere.jpg" }
              ]
            },
            relativeHumidity: {
              dataReviewed: true,
              range: {
                min: 85,
                max: 90
              }
            },
            reeferUnit: {
              powerStatus: "On",
              outages: []
            },
            photos: [
              { type: "reefer_display", url: "https://example.com/reefer.jpg" }
            ]
          },
          eventMonitoring: {
            hasAlerts: false,
            alerts: [],
            hasDelays: true,
            delays: [
              {
                description: "Port congestion at Jebel Ali",
                impact: "2-hour delay in transshipment operation"
              }
            ],
            photos: [
              { type: "port_congestion", url: "https://example.com/port.jpg" }
            ]
          },
          transitSummary: {
            overallCondition: "OK",
            communicationLog: [
              "2023-04-06 09:00 - Container departed Mombasa Port",
              "2023-04-08 15:30 - Arrived at Jebel Ali for transshipment",
              "2023-04-08 23:00 - Departed Jebel Ali",
              "2023-04-09 12:00 - Expected arrival at Dubai Port"
            ],
            finalEta: "2023-04-09T12:00:00Z",
            photos: [
              { type: "final_status", url: "https://example.com/status.jpg" }
            ]
          }
        }
      }),
      formatInspection({
        id: 'insp-004',
        type: 'On-Arrival',
        date: '2023-04-09',
        location: 'Dubai Port, UAE',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Good', threshold: 'Good', status: 'Passed', details: 'Product condition maintained during transit.' },
          { type: 'Chemical', value: 'Within Spec', threshold: 'Within Spec', status: 'Passed', details: 'No chemical deterioration observed.' },
          { type: 'Moisture', value: '72%', threshold: '65-75%', status: 'Passed', details: 'Moisture content optimal.' }
        ],
        compliances: [
          { name: 'UAE Import Standards', status: 'Passed', details: 'Meets all UAE import requirements.' },
          { name: 'Food Safety Standards', status: 'Passed', details: 'Compliant with UAE food safety regulations.' }
        ],
        inspectionTools: [
          'Digital Thermometer',
          'Moisture Meter',
          'Quality Assessment Kit',
          'Documentation Scanner'
        ],
        notes: 'Shipment arrived in excellent condition. All documentation and physical checks passed.',
        postOfImportDetails: {
          shipmentDetails: {
            inspectionDateTime: '2023-04-09T09:30:00Z',
            inspectorName: 'Mohammed Al-Rashid',
            inspectorId: 'UAE-INSP-2023-456',
            shipmentId: 'SHP-2023-789',
            containerId: 'MSKU-7654321',
            vesselInfo: 'MSC Avocado Express / VOY-456-23',
            importerInfo: {
              name: 'Fresh Mart Distributors',
              licenseNo: 'UAE-IMP-2023-789'
            },
            exporterName: 'Green Highlands Avocado Farms',
            commodity: 'Fresh Hass Avocados',
            quantity: {
              cartons: 2000,
              weight: 24000,
              unit: 'kg'
            },
            photos: [
              { type: 'container_arrival', url: 'https://example.com/arrival.jpg', timestamp: '2023-04-09T09:15:00Z' },
              { type: 'documentation', url: 'https://example.com/docs.jpg', timestamp: '2023-04-09T09:20:00Z' }
            ]
          },
          documentVerification: {
            importPermit: {
              present: true,
              checkNumber: 'UAE-IMP-2023-456'
            },
            commercialInvoice: {
              present: true,
              quantityMatch: true,
              valueMatch: true
            },
            packingList: {
              present: true,
              cartonCountMatch: true
            },
            billOfLading: {
              present: true,
              matchesShipmentId: true
            },
            phytosanitaryCert: {
              present: true,
              valid: true,
              pestFree: true,
              dateCorrect: true,
              certNumber: 'KEPHIS-PC-2023-789'
            },
            certificateOfOrigin: {
              present: true,
              consistentWithInvoice: true
            },
            photos: [
              { type: 'import_permit', url: 'https://example.com/permit.jpg', timestamp: '2023-04-09T09:35:00Z' },
              { type: 'certificates', url: 'https://example.com/certs.jpg', timestamp: '2023-04-09T09:36:00Z' }
            ]
          },
          containerSealIntegrity: {
            containerCondition: 'Good',
            documentSealNumber: 'SL-98765432',
            actualSealNumber: 'SL-98765432',
            sealIntegrity: 'Matches',
            photos: [
              { type: 'seal_intact', url: 'https://example.com/seal.jpg', timestamp: '2023-04-09T09:40:00Z' },
              { type: 'container_condition', url: 'https://example.com/container.jpg', timestamp: '2023-04-09T09:41:00Z' }
            ]
          },
          productTemperatureCheck: {
            temperatureRecorder: {
              deviceId: 'TEMP-456',
              reading: 5.8,
              inRange: true
            },
            pulpTemperature: {
              readings: [6.1, 5.9, 6.0],
              acceptable: true
            },
            containerAtmosphere: 'Normal',
            palletCondition: {
              status: 'Secure',
              notes: 'All pallets properly secured, no shifting observed'
            },
            photos: [
              { type: 'temp_reading', url: 'https://example.com/temp.jpg', timestamp: '2023-04-09T09:45:00Z' },
              { type: 'pulp_temp', url: 'https://example.com/pulp.jpg', timestamp: '2023-04-09T09:46:00Z' }
            ]
          },
          qualityInspection: {
            sampleCartons: ['A123', 'B456', 'C789'],
            appearance: {
              color: 'Typical',
              uniformity: 'Good',
              defects: 'None',
              pestPresence: {
                detected: false,
                description: ''
              }
            },
            packagingIntegrity: {
              status: 'Intact',
              notes: 'All cartons in good condition, labels clear and intact'
            },
            photos: [
              { type: 'sample_product', url: 'https://example.com/sample.jpg', timestamp: '2023-04-09T09:50:00Z' },
              { type: 'packaging', url: 'https://example.com/packaging.jpg', timestamp: '2023-04-09T09:51:00Z' }
            ]
          },
          complianceDecision: {
            overallCompliance: 'Compliant',
            nonComplianceReasons: {
              missingDocs: false,
              sealTampering: false,
              tempDeviation: false,
              pests: false,
              qualityIssues: false,
              other: ''
            },
            action: 'Released',
            inspectorRemarks: 'Shipment meets all UAE import requirements. Product quality and condition excellent. Cleared for market distribution.'
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
  {
    id: '2', // Changed ID
    tradeNumber: 'TRD-AVG-2023-002', // Incremented trade number
    supplier: 'Rift Valley Avocado Growers', // Changed supplier name
    supplierCountry: 'Kenya', // Kept constraint
    buyer: 'Gulf Fresh Imports', // Changed buyer name
    buyerCountry: 'UAE', // Kept constraint
    productType: 'Hass Avocados', // Kept product type
    quantity: '22,000 kg (1,834 cartons)', // Changed quantity
    shipDate: new Date('2023-05-10').toISOString(), // Changed ship date
    arrivalDate: new Date('2023-05-15').toISOString(), // Changed arrival date
    status: 'Completed', // Kept status, but will add notes in inspection
    value: '$80,300', // Adjusted value based on quantity
    inspections: [
      formatInspection({
        id: 'insp-007', // Changed ID
        type: 'Post-Harvest',
        date: '2023-04-25', // Changed date
        location: 'Nakuru County, Kenya', // Changed location slightly
        status: 'Passed', // Kept status
        qualityChecks: [
          { type: 'Physical', value: 'Good', threshold: 'Good', status: 'Passed', details: 'Avocados mostly firm, minor blemishes on <2%.' }, // Slightly modified details
          { type: 'Chemical', value: 'Optimal', threshold: 'Optimal', status: 'Passed', details: 'Chemical analysis indicates good maturity.' },
          { type: 'Moisture', value: '73%', threshold: '65-75%', status: 'Passed', details: 'Moisture content acceptable.' } // Changed value
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
        notes: 'Farm compliant. Harvest slightly delayed due to recent heavy rains impacting field access.', // Modified notes
        inspector: {
          name: 'Grace Wanjiru', // Changed inspector name
          affiliatedBody: 'KEPHIS',
          inspectionDate: '2023-04-25' // Changed date
        },
        postHarvestDetails: { // Updated nested details consistently
          farmIdentification: {
            farmName: 'Rift Valley Avocado Growers', // Changed farm name
            growerName: 'Peter Njoroge', // Changed grower name
            registrationNumbers: [
              { type: 'KEPHIS', value: 'KE-AVO-2025-789' }, // Changed number
              { type: 'HCD', value: 'HCD-2025-101' } // Changed number
            ],
            location: {
              coordinates: '-0.3031,36.0800', // Changed coordinates
              address: 'Nakuru County, Kenya' // Changed address
            },
            areas: {
              total: 120, // Changed area
              avocado: 70 // Changed area
            },
            varieties: ['Hass', 'Fuerte'],
            targetMarkets: ['UAE', 'EU'], // Changed markets slightly
            associatedPackhouse: 'Nakuru Fresh Produce Ltd', // Changed packhouse
            photos: [ // Kept photo structure, URLs would change in reality
              { type: 'farm_entrance', url: 'https://example.com/farm-entrance-rv.jpg' },
              { type: 'orchard_overview', url: 'https://example.com/orchard-rv.jpg' }
            ]
          },
          traceability: { // Kept structure, values could change slightly
            systemType: 'Digital QR-based system',
            recordsAvailable: true,
            recordTypes: [
              'Farm Activities',
              'Input Applications',
              'Harvest Records',
              'Training Records',
              'Pest Monitoring'
            ],
            photos: [
              { type: 'block_markers', url: 'https://example.com/block-markers-rv.jpg' },
              { type: 'record_system', url: 'https://example.com/records-rv.jpg' }
            ]
          },
          gap: { // Updated dates slightly
            siteHistory: 'Established avocado farm since 2015',
            soilManagement: {
              fertilizers: [
                { type: 'Organic Compost', applicationDate: '2025-02-10', rate: '2.0 tons/ha' }, // Adjusted values
                { type: 'NPK 15:15:15', applicationDate: '2025-03-05', rate: '180 kg/ha' } // Adjusted values
              ],
              storageCompliance: true
            },
            waterManagement: {
              source: 'Borehole', // Changed source
              qualityTestDate: '2025-03-20', // Changed date
              irrigationMethod: 'Drip Irrigation',
              testResults: 'Potable'
            },
            photos: [
              { type: 'fertilizer_storage', url: 'https://example.com/fertilizer-rv.jpg' },
              { type: 'irrigation_system', url: 'https://example.com/irrigation-rv.jpg' }
            ]
          },
          pestManagement: { // Updated dates slightly
            ipmStrategyPresent: true,
            monitoringLogs: [
              { date: '2025-04-05', findings: 'Minor scale insect presence', action: 'Spot treatment with horticultural oil' }, // Changed findings/action
              { date: '2025-04-12', findings: 'No significant pests', action: 'Continued monitoring' }
            ],
            pesticides: {
              storage: {
                secure: true,
                conditions: 'Well-ventilated, locked facility with proper labeling'
              },
              records: [
                { product: 'Horticultural Oil', applicationDate: '2025-04-06', phi: 1 }, // Changed product/date
                { product: 'Copper Fungicide', applicationDate: '2025-03-18', phi: 14 } // Changed product/date
              ],
              disposal: 'Triple rinsing, puncturing, and authorized collection'
            },
            calibrationRecords: [
              { equipment: 'Tractor Sprayer', date: '2025-03-02', result: 'Calibrated' } // Changed equipment/date
            ],
            photos: [
              { type: 'pesticide_storage', url: 'https://example.com/pesticide-store-rv.jpg' },
              { type: 'pest_traps', url: 'https://example.com/traps-rv.jpg' }
            ]
          },
          preHarvest: { // Updated dates slightly
            maturityMethod: 'Dry Matter Testing and Visual Assessment',
            dryMatterPercentage: 24, // Changed value
            equipment: [
              { type: 'Harvesting Clippers', condition: 'Good', lastMaintenance: '2025-04-05' }, // Changed date
              { type: 'Collection Crates', condition: 'Good', lastMaintenance: '2025-04-05' } // Changed condition/date
            ],
            trainingRecords: [
              { topic: 'Harvest Techniques', date: '2025-04-01', attendees: 12 }, // Changed date/attendees
              { topic: 'Food Safety', date: '2025-04-02', attendees: 12 } // Changed date/attendees
            ],
            heatRemovalPlan: 'Transfer to shaded collection points, picked up by packhouse truck within 3 hours', // Changed plan slightly
            photos: [
              { type: 'harvesting_tools', url: 'https://example.com/tools-rv.jpg' },
              { type: 'collection_crates', url: 'https://example.com/crates-rv.jpg' }
            ]
          },
          workerWelfare: { // Updated dates slightly
            hygieneTraining: [
              { date: '2025-03-20', topics: ['Personal Hygiene', 'Food Safety'], trainer: 'Susan Chege' } // Changed date/trainer
            ],
            facilities: [
              { type: 'Toilets', count: 3, condition: 'Good', supplies: ['Toilet Paper', 'Soap', 'Water'] }, // Changed count
              { type: 'Handwashing Stations', count: 5, condition: 'Good', supplies: ['Soap', 'Paper Towels'] } // Changed count
            ],
            firstAid: {
              kitsAvailable: 2, // Changed count
              trainedPersonnel: 2,
              lastInspection: '2025-04-05' // Changed date
            },
            waterAccess: {
              points: 5, // Changed count
              potable: true,
              testDate: '2025-03-20' // Changed date
            },
            photos: [
              { type: 'sanitation_facilities', url: 'https://example.com/facilities-rv.jpg' },
              { type: 'handwashing_stations', url: 'https://example.com/handwashing-rv.jpg' }
            ]
          },
          environmental: { // Updated dates slightly
            wasteManagement: {
              plan: 'Segregation, composting organic, licensed removal for inorganic', // Changed plan slightly
              collectionAreas: [
                { type: 'Organic Waste', condition: 'Good', lastCleaned: '2025-04-20' }, // Changed date
                { type: 'Chemical Containers', condition: 'Good', lastCleaned: '2025-04-20' } // Changed date
              ]
            },
            waterProtection: {
              bufferZones: [
                { location: 'River Bank', width: 12 }, // Changed location/width
                { location: 'Chemical Mixing Area', width: 15 }
              ],
              measures: ['Grass Strips', 'Contour Planting'] // Removed one measure
            },
            biodiversity: {
              zones: [
                { type: 'Woodlot', area: 4, species: ['Eucalyptus', 'Grevillea'] }, // Changed type/area/species
                { type: 'Hedgerows', area: 1.5, species: ['Native Shrubs'] } // Changed area/species
              ]
            },
            photos: [
              { type: 'waste_management', url: 'https://example.com/waste-rv.jpg' },
              { type: 'buffer_zones', url: 'https://example.com/buffer-rv.jpg' }
            ]
          },
          finalEvaluation: { // Updated evaluation slightly
            strengths: [
              'Good traceability',
              'Effective pest management',
              'Well-maintained irrigation'
            ],
            weaknesses: [
              'Minor delay in harvest noted impacting schedule',
              'Fewer sanitation facilities than ideal for peak season'
            ],
            nonConformities: [
              {
                severity: 'Observation', // Changed severity
                description: 'Harvest schedule slightly impacted by weather.',
                correctiveAction: 'Monitor weather forecasts closely for future planning.', // Changed action
                deadline: 'N/A' // Changed deadline
              }
            ],
            exportReadiness: 'Passed with Observations', // Changed readiness
            evaluator: {
              name: 'Grace Wanjiru', // Changed name
              organization: 'KEPHIS',
              date: '2023-04-25' // Changed date
            }
          }
        }
      }),

      formatInspection({ // Updated second inspection
        id: 'insp-008', // Changed ID
        type: 'Pre-Shipment',
        date: '2023-05-05', // Changed date
        location: 'Mombasa Logistics Hub, Kenya', // Changed location name
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Good', threshold: 'Good', status: 'Passed', details: 'Avocados firm, minor bruising consistent with farm report.' }, // Updated details
          { type: 'Chemical', value: 'Optimal', threshold: 'Optimal', status: 'Passed', details: 'Maturity levels confirmed optimal.' },
          { type: 'Moisture', value: '73%', threshold: '65-75%', status: 'Passed', details: 'Moisture content consistent.' } // Changed value
        ],
        compliances: [
          { name: 'GLOBALG.A.P', status: 'Passed', details: 'Farm certification verified.' },
          { name: 'HACCP', status: 'Passed', details: 'Packhouse compliance verified.' }
        ],
        inspectionTools: [
          'Temperature Logger',
          'Humidity Meter',
          'Digital Camera',
          'Sampling Tools'
        ],
        notes: 'Container loaded slightly behind schedule due to traffic but within acceptable limits. Temperature settings confirmed.', // Modified notes
        preShipmentDetails: { // Updated nested details consistently
          facilityIdentification: {
            facilityName: "Mombasa Logistics Hub", // Changed facility name
            registrationNumber: "PKH-2023-99887", // Changed number
            address: "Mombasa Port Area, Mombasa", // Changed address
            contactPerson: "Alice Mutua", // Changed contact
            phone: "+254 722 987 654", // Changed phone
            email: "ops@mlh.co.ke", // Changed email
            photos: [
              { type: "facility_exterior", url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec" }, // Different image URL example
              { type: "facility_signage", url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952" } // Different image URL example
            ]
          },
          regulatoryCompliance: { // Updated certificate/permit numbers and dates
            documentsValid: true,
            certifications: [
              { type: "GLOBALG.A.P", number: "GGN 4056789123456", expiryDate: "2024-01-31" },
              { type: "HACCP", number: "HC-567-KE", expiryDate: "2023-12-15" },
              { type: "ISO 22000", number: "ISO22-123-2023", expiryDate: "2024-07-31" }
            ],
            permits: [
              { type: "Export Permit", number: "EXP-2023-8899", validUntil: "2023-05-31" },
              { type: "Phytosanitary Certificate", number: "KEPHIS-PC-2023-1011", validUntil: "2023-05-20" }
            ],
            photos: [
              { type: "certifications", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7" } // Different image URL example
            ]
          },
          facilityCondition: { // Minor changes
            maintenanceStatus: "Good",
            cleanlinessRating: 7, // Changed rating
            pestControl: {
              program: "Scheduled Pest Control Service", // Changed program name
              lastInspection: "2023-04-20", // Changed date
              findings: "No significant pest activity" // Changed findings
            },
            repairs: [], // No repairs needed
            photos: [
              { type: "facility_interior", url: "https://images.unsplash.com/photo-1507207611509-ec014333ff52" }, // Different image URL example
              { type: "pest_control", url: "https://images.unsplash.com/photo-1591696205602-2f950c417cb1" } // Different image URL example
            ]
          },
          receivingArea: { // Minor changes
            temperature: {
              current: 19, // Changed temp
              required: "18-22",
              withinRange: true
            },
            loadingDocks: [
              { number: 1, condition: "Good", cleanliness: "Clean" },
              { number: 2, condition: "Fair", cleanliness: "Needs sweeping" } // Changed condition/cleanliness
            ],
            photos: [
              { type: "receiving_area", url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623" } // Different image URL example
            ]
          },
          processingLine: { // Minor changes, updated dates
            equipmentCondition: "Operational",
            stations: [
              { name: "Washing Station", status: "Operational", lastMaintenance: "2023-04-01", notes: "Running well" },
              { name: "Sorting Line", status: "Operational", lastMaintenance: "2023-04-05", notes: "Standard operation" },
              { name: "Grading Station", status: "Operational", lastMaintenance: "2023-04-05", notes: "Calibrated" }
            ],
            calibration: [
              { equipment: "Weight Sorter", lastCalibrated: "2023-04-18", nextDue: "2023-05-18" }, // Changed dates
              { equipment: "Size Grader", lastCalibrated: "2023-04-18", nextDue: "2023-05-18" } // Changed dates
            ],
            photos: [
              { type: "processing_line", url: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890" }, // Different image URL example
              { type: "washing_station", url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" } // Different image URL example
            ]
          },
          qualityControl: { // Updated dates
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
              { type: "External Quality", quantity: "n=55 from 3 pallets", results: "Meets specifications", date: "2023-05-05" }, // Changed quantity/date
              { type: "Internal Quality", quantity: "n=18 from 3 pallets", results: "Meets specifications", date: "2023-05-05" } // Changed quantity/date
            ],
            photos: [
              { type: "quality_check", url: "https://images.unsplash.com/photo-1576153119370-d59cb43b748b" } // Different image URL example
            ]
          },
          packingLabeling: { // Minor changes
            materialsCompliant: true,
            packaging: [
              { type: "Cartons", condition: "New", quantity: "Sufficient" },
              { type: "Liners", condition: "New", quantity: "Sufficient" }
            ],
            labels: [
              { type: "Product Labels", compliance: true, notes: "All information correct and legible" },
              { type: "Carton Markings", compliance: true, notes: "Properly printed, minor smudge on one label stack (corrected)" } // Added note
            ],
            photos: [
              { type: "packaging_materials", url: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f" }, // Different image URL example
              { type: "labeled_carton", url: "https://images.unsplash.com/photo-1606168010845-77063f718a0a" } // Different image URL example
            ]
          },
          storage: { // Minor changes
            temperature: {
              current: 5.8, // Changed temp
              required: "5-7",
              withinRange: true
            },
            humidity: {
              current: 88, // Changed humidity
              required: "85-95",
              withinRange: true
            },
            areas: [
              { name: "Pre-Cooling Room", capacity: "15,000 kg", currentUsage: "50%", condition: "Good" }, // Changed capacity/usage
              { name: "Cold Storage", capacity: "40,000 kg", currentUsage: "30%", condition: "Good" } // Changed capacity/usage
            ],
            photos: [
              { type: "cold_storage", url: "https://images.unsplash.com/photo-1587145820266-a595ee46be15" } // Different image URL example
            ]
          },
          workerHygiene: { // Updated dates
            trainingCurrent: true,
            personnel: [
              { role: "Line Workers", certified: true, lastTraining: "2023-03-10" },
              { role: "Quality Control", certified: true, lastTraining: "2023-03-10" },
              { role: "Supervisors", certified: true, lastTraining: "2023-02-15" }
            ],
            facilities: [
              { type: "Handwashing Stations", condition: "Good", adequacy: "Sufficient" },
              { type: "Sanitation Facilities", condition: "Good", adequacy: "Sufficient" },
              { type: "Change Rooms", condition: "Good", adequacy: "Sufficient" }
            ],
            photos: [
              { type: "worker_ppe", url: "https://images.unsplash.com/photo-1600880291147-1f650a44f0b5" }, // Different image URL example
              { type: "handwashing_station", url: "https://images.unsplash.com/photo-1580910277621-792d7ef1a57f" } // Different image URL example
            ]
          },
          finalAssessment: { // Updated approver/date
            readyForShipment: true,
            issues: [
              { category: "Logistics", description: "Minor delay in container arrival at facility", severity: "Minor", action: "Noted, proceeded with loading." } // Changed issue
            ],
            recommendations: [
              "Ensure temperature logger activated correctly.",
              "Double check label placement on all pallets before sealing."
            ],
            approver: {
              name: "Alice Mutua", // Changed name
              position: "Pre-Shipment Inspector",
              date: "2023-05-05" // Changed date
            },
            photos: [
              { type: "container_loading", url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec" } // Same image URL example
            ]
          }
        }
      }),

      formatInspection({ // Updated third inspection
        id: 'insp-009', // Changed ID
        type: 'Port-Export',
        date: '2023-05-09', // Changed date (closer to ship date)
        location: 'Port of Mombasa, Kenya',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Pass', threshold: 'Pass', status: 'Passed', details: 'Container and cargo condition meets export standards.' },
          { type: 'Chemical', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Not applicable for port inspection.' },
          { type: 'Moisture', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Atmosphere verified via reefer unit display.' } // Changed detail
        ],
        compliances: [
          { name: 'Export Documentation', status: 'Passed', details: 'All required export documents present and valid.' },
          { name: 'Container Standards', status: 'Passed', details: 'Container meets shipping line requirements.' }
        ],
        inspectionTools: [
          'Digital Thermometer',
          'Humidity Meter',
          'Container Inspection Kit',
          'Seal Verification Tools'
        ],
        notes: 'Final checks complete, container sealed, vessel departure confirmed for schedule.', // Modified notes
        portOfExportDetails: { // Updated nested details consistently
          inspectorInfo: {
            name: "David Kimani", // Changed name
            inspectionDate: "2023-05-09", // Changed date
            inspectionTime: "14:00", // Changed time
            affiliatedBody: "KEPHIS",
            portLocation: "Port of Mombasa, Terminal 1", // Changed terminal
            photos: [
              { type: "inspector_id", url: "https://example.com/inspector-badge-dk.jpg" } // Different image URL example
            ]
          },
          consignmentInfo: { // Updated details
            bookingReference: "MAEU-BOK-2023-123", // Changed ref
            exporterName: "Rift Valley Avocado Growers", // Changed exporter
            importerName: "Gulf Fresh Imports", // Changed importer
            containerId: "HLCU-1234567", // Changed container ID
            vesselInfo: {
              name: "Maersk Green", // Changed vessel
              voyageNumber: "VOY-ABC-23" // Changed voyage
            },
            phytosanitaryCertificate: true,
            exportPermit: true,
            photos: [
              { type: "container_number", url: "https://example.com/container-hlcu.jpg" }, // Different image URL example
              { type: "documents", url: "https://example.com/documents-rv.jpg" } // Different image URL example
            ]
          },
          containerCondition: { // Kept details
            containerType: "Reefer",
            externalCondition: "Pass",
            internalCleanliness: "Pass",
            doorSealsCondition: "Pass",
            reeferUnitFunctionality: "Pass",
            photos: [
              { type: "container_external", url: "https://example.com/container-ext-hlcu.jpg" }, // Different image URL example
              { type: "container_internal", url: "https://example.com/container-int-hlcu.jpg" } // Different image URL example
            ]
          },
          temperatureVerification: { // Changed temps slightly
            setTemperature: 5.5,
            actualTemperature: 5.4, // Changed temp
            preCooled: true,
            pulpTemperatures: {
              location1: 5.6,
              location2: 5.5,
              location3: 5.4,
              location4: 5.5,
              location5: 5.6,
              average: 5.52 // Recalculated average
            },
            temperatureLoggerPlaced: true,
            loggerPosition: "Between pallets 3 and 4, mid-height", // Changed position description
            photos: [
              { type: "temp_display", url: "https://example.com/temp-hlcu.jpg" }, // Different image URL example
              { type: "logger_placement", url: "https://example.com/logger-hlcu.jpg" } // Different image URL example
            ]
          },
          loadingProcess: { // Kept details
            loadingMethod: "Palletized",
            handlingPractices: "Good",
            stackingPattern: "Pass",
            cartonCondition: "Good",
            dunnageMaterial: "Air bags", // Simplified dunnage
            timeframeAcceptable: true,
            photos: [
              { type: "loading_process", url: "https://example.com/loading-hlcu.jpg" }, // Different image URL example
              { type: "stacking_pattern", url: "https://example.com/stacking-hlcu.jpg" } // Different image URL example
            ]
          },
          finalSealing: { // Updated details
            totalUnits: {
              pallets: 18, // Changed pallets
              cartons: 1834 // Changed cartons
            },
            doorsClosed: true,
            highSecuritySeal: true,
            sealNumber: "SL-ABC12345", // Changed seal number
            sealType: "Bolt",
            photos: [
              { type: "seal_applied", url: "https://example.com/seal-hlcu.jpg" }, // Different image URL example
              { type: "final_closure", url: "https://example.com/closure-hlcu.jpg" } // Different image URL example
            ]
          },
          overallAssessment: { // Kept details
            findings: "Container loading and sealing completed according to protocol. Temperature and atmosphere conditions optimal for transit.",
            correctiveActions: "None required",
            exportClearance: true
          }
        }
      }),

      formatInspection({ // Updated fourth inspection
        id: 'insp-010', // Changed ID
        type: 'Transit',
        date: '2023-05-12', // Changed date (mid-transit)
        location: 'Indian Ocean (Mombasa - Dubai Route)', // Changed location detail
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Stable', threshold: 'Stable', status: 'Passed', details: 'Container integrity maintained.' }, // Simplified detail
          { type: 'Chemical', value: 'Within Range', threshold: 'Within Range', status: 'Passed', details: 'Atmosphere levels maintained.' }, // Simplified detail
          { type: 'Moisture', value: '86-91%', threshold: '85-95%', status: 'Passed', details: 'Relative humidity optimal.' } // Changed range slightly
        ],
        compliances: [
          { name: 'Temperature Control', status: 'Passed', details: 'Temp maintained between 5-7°C, minor fluctuation on day 2 within tolerance.' }, // Added note on fluctuation
          { name: 'Container Seal', status: 'Passed', details: 'Seal integrity verified remotely, no alerts.' } // Changed detail slightly
        ],
        inspectionTools: [
          'Remote Temperature Logger',
          'Humidity Sensor',
          'GPS Tracker',
          'Atmosphere Analyzer'
        ],
        notes: 'Transit conditions generally stable. Minor temperature spike noted on May 12, auto-corrected within 1 hour. Remained within tolerance.', // Modified notes
        transitDetails: { // Updated nested details consistently
          monitorInfo: {
            monitorName: "Ahmed Khan", // Changed name
            monitorId: "MTR-2023-789", // Changed ID
            startDate: "2023-05-10", // Changed date
            endDate: "2023-05-15", // Changed date
            company: "Global Transit Monitors", // Changed company
            photos: [
              { type: "monitor_id", url: "https://example.com/monitor-badge-ak.jpg" } // Different image URL example
            ]
          },
          shipmentIdentification: { // Updated details
            containerId: "HLCU-1234567", // Changed container
            bookingReference: "MAEU-BOK-2023-123", // Changed booking ref
            exporterName: "Rift Valley Avocado Growers", // Changed exporter
            importerName: "Gulf Fresh Imports", // Changed importer
            sealNumber: "SL-ABC12345", // Changed seal
            photos: [
              { type: "container_seal", url: "https://example.com/seal-hlcu.jpg" }, // Different image URL example
              { type: "container_number", url: "https://example.com/container-hlcu.jpg" } // Different image URL example
            ]
          },
          vesselDetails: { // Updated details
            vesselName: "Maersk Green", // Changed vessel
            imoNumber: "IMO-1234567", // Changed IMO
            voyageNumber: "VOY-ABC-23", // Changed voyage
            shippingLine: "Maersk", // Changed line
            portOfLoading: {
              name: "Mombasa Port",
              actualDeparture: "2023-05-10T10:00:00Z" // Changed time
            },
            transshipments: [], // No transshipments this time
            portOfDischarge: {
              name: "Jebel Ali Port, Dubai", // Changed port name slightly
              originalEta: "2023-05-15T08:00:00Z", // Changed date/time
              currentEta: "2023-05-15T08:00:00Z", // Changed date/time
              etaChanges: [] // No ETA changes this time
            },
            photos: [
              { type: "vessel_departure", url: "https://example.com/departure-maersk.jpg" } // Different image URL example
            ]
          },
          monitoringSources: { // Changed source type
            primarySource: {
              type: "Carrier Real-Time Monitoring (Maersk RCM)", // Changed source
              details: "Container monitored via Maersk Remote Container Management"
            },
            secondarySource: { // Removed secondary source
              type: "N/A",
              details: ""
            },
            reviewFrequency: "Every 6 hours", // Changed frequency
            photos: [
              { type: "monitoring_device", url: "https://example.com/device-maersk.jpg" } // Different image URL example
            ]
          },
          environmentalConditions: { // Updated temp range due to fluctuation
            temperature: {
              setPoint: 5.5,
              dataAvailability: "Continuous",
              reviewMethod: "Portal",
              minTemperature: 5.1, // Changed min
              maxTemperature: 6.0, // Changed max (due to fluctuation)
              deviationsNoted: true, // Changed to true
              evidence: [
                { type: "temp_graph", url: "https://example.com/temperature-maersk.jpg" } // Different image URL example
              ]
            },
            controlledAtmosphere: { // Updated values slightly
              required: true,
              o2SetPoint: 5,
              co2SetPoint: 5,
              dataAvailable: true,
              o2Range: {
                min: 4.7, // Changed min
                max: 5.1 // Changed max
              },
              co2Range: {
                min: 4.8, // Changed min
                max: 5.2 // Changed max
              },
              deviationsNoted: false,
              evidence: [
                { type: "atmosphere_log", url: "https://example.com/atmosphere-maersk.jpg" } // Different image URL example
              ]
            },
            relativeHumidity: {
              dataReviewed: true,
              range: {
                min: 86, // Changed min
                max: 91 // Changed max
              }
            },
            reeferUnit: {
              powerStatus: "On",
              outages: []
            },
            photos: [
              { type: "reefer_display", url: "https://example.com/reefer-maersk.jpg" } // Different image URL example
            ]
          },
          eventMonitoring: { // Updated alerts/delays
            hasAlerts: true, // Changed to true
            alerts: [
              { timestamp: "2023-05-12T04:00:00Z", type: "Temperature Deviation", description: "Temp reached 6.0C, auto-corrected to 5.5C within 1 hour.", actionTaken: "Monitored, resolved automatically."} // Added alert
            ],
            hasDelays: false, // Changed to false
            delays: [],
            photos: [
              { type: "alert_log", url: "https://example.com/alert.jpg" } // Different image URL example
            ]
          },
          transitSummary: { // Updated dates
            overallCondition: "OK",
            communicationLog: [
              "2023-05-10 10:00 - Container departed Mombasa Port",
              "2023-05-12 05:00 - Minor temperature deviation alert resolved",
              "2023-05-15 08:00 - Expected arrival at Jebel Ali Port"
            ],
            finalEta: "2023-05-15T08:00:00Z", // Changed date/time
            photos: [
              { type: "final_status", url: "https://example.com/status-maersk.jpg" } // Different image URL example
            ]
          }
        }
      }),

      formatInspection({ // Updated fifth inspection
        id: 'insp-011', // Changed ID
        type: 'On-Arrival',
        date: '2023-05-15', // Changed date
        location: 'Jebel Ali Port, Dubai, UAE', // Changed location name
        status: 'Passed with Remarks', // Changed status slightly
        qualityChecks: [
          { type: 'Physical', value: 'Good', threshold: 'Good', status: 'Passed', details: 'Minor bruising on ~1% of sampled fruit, likely from transit.' }, // Added detail
          { type: 'Chemical', value: 'Within Spec', threshold: 'Within Spec', status: 'Passed', details: 'No chemical issues noted.' }, // Simplified detail
          { type: 'Moisture', value: '73%', threshold: '65-75%', status: 'Passed', details: 'Moisture content acceptable.' } // Changed value
        ],
        compliances: [
          { name: 'UAE Import Standards', status: 'Passed', details: 'Meets UAE import requirements.' },
          { name: 'Food Safety Standards', status: 'Passed', details: 'Compliant with UAE food safety regulations.' }
        ],
        inspectionTools: [
          'Digital Thermometer',
          'Moisture Meter',
          'Quality Assessment Kit',
          'Documentation Scanner'
        ],
        notes: 'Shipment received and cleared. Minor bruising noted, consistent with minor temperature fluctuation during transit. Overall acceptable.', // Modified notes
        postOfImportDetails: { // Updated nested details consistently
          shipmentDetails: { // Updated details
            inspectionDateTime: '2023-05-15T09:00:00Z', // Changed time
            inspectorName: 'Fatima Al-Ali', // Changed name
            inspectorId: 'UAE-INSP-2023-789', // Changed ID
            shipmentId: 'SHP-2023-1011', // Changed ID
            containerId: 'HLCU-1234567', // Changed container
            vesselInfo: 'Maersk Green / VOY-ABC-23', // Changed vessel/voyage
            importerInfo: {
              name: 'Gulf Fresh Imports', // Changed importer
              licenseNo: 'UAE-IMP-2023-101' // Changed license
            },
            exporterName: 'Rift Valley Avocado Growers', // Changed exporter
            commodity: 'Fresh Hass Avocados',
            quantity: {
              cartons: 1834, // Changed cartons
              weight: 22000, // Changed weight
              unit: 'kg'
            },
            photos: [
              { type: 'container_arrival', url: 'https://example.com/arrival-hlcu.jpg', timestamp: '2023-05-15T08:45:00Z' }, // Different image URL example
              { type: 'documentation', url: 'https://example.com/docs-uae.jpg', timestamp: '2023-05-15T08:50:00Z' } // Different image URL example
            ]
          },
          documentVerification: { // Updated cert number
            importPermit: {
              present: true,
              checkNumber: 'UAE-IMP-2023-789' // Changed number
            },
            commercialInvoice: {
              present: true,
              quantityMatch: true,
              valueMatch: true
            },
            packingList: {
              present: true,
              cartonCountMatch: true
            },
            billOfLading: {
              present: true,
              matchesShipmentId: true
            },
            phytosanitaryCert: {
              present: true,
              valid: true,
              pestFree: true,
              dateCorrect: true,
              certNumber: 'KEPHIS-PC-2023-1011' // Changed number
            },
            certificateOfOrigin: {
              present: true,
              consistentWithInvoice: true
            },
            photos: [
              { type: 'import_permit', url: 'https://example.com/permit-uae.jpg', timestamp: '2023-05-15T09:05:00Z' }, // Different image URL example
              { type: 'certificates', url: 'https://example.com/certs-uae.jpg', timestamp: '2023-05-15T09:06:00Z' } // Different image URL example
            ]
          },
          containerSealIntegrity: { // Updated seal number
            containerCondition: 'Good',
            documentSealNumber: 'SL-ABC12345', // Changed number
            actualSealNumber: 'SL-ABC12345', // Changed number
            sealIntegrity: 'Matches',
            photos: [
              { type: 'seal_intact', url: 'https://example.com/seal-hlcu.jpg', timestamp: '2023-05-15T09:10:00Z' }, // Different image URL example
              { type: 'container_condition', url: 'https://example.com/container-hlcu.jpg', timestamp: '2023-05-15T09:11:00Z' } // Different image URL example
            ]
          },
          productTemperatureCheck: { // Changed temps slightly
            temperatureRecorder: {
              deviceId: 'TEMP-789', // Changed ID
              reading: 5.9, // Changed reading
              inRange: true
            },
            pulpTemperature: {
              readings: [6.2, 6.0, 6.1], // Changed readings
              acceptable: true
            },
            containerAtmosphere: 'Normal',
            palletCondition: {
              status: 'Secure',
              notes: 'All pallets intact, minimal load shift.' // Changed notes
            },
            photos: [
              { type: 'temp_reading', url: 'https://example.com/temp-uae.jpg', timestamp: '2023-05-15T09:15:00Z' }, // Different image URL example
              { type: 'pulp_temp', url: 'https://example.com/pulp-uae.jpg', timestamp: '2023-05-15T09:16:00Z' } // Different image URL example
            ]
          },
          qualityInspection: { // Updated notes
            sampleCartons: ['D456', 'E789', 'F123'], // Changed IDs
            appearance: {
              color: 'Typical',
              uniformity: 'Good',
              defects: 'Minor bruising noted', // Added note
              pestPresence: {
                detected: false,
                description: ''
              }
            },
            packagingIntegrity: {
              status: 'Intact',
              notes: 'Cartons in good condition, labels clear.' // Simplified note
            },
            photos: [
              { type: 'sample_product', url: 'https://example.com/sample-uae.jpg', timestamp: '2023-05-15T09:20:00Z' }, // Different image URL example
              { type: 'packaging', url: 'https://example.com/packaging-uae.jpg', timestamp: '2023-05-15T09:21:00Z' } // Different image URL example
            ]
          },
          complianceDecision: { // Updated remarks
            overallCompliance: 'Compliant',
            nonComplianceReasons: {
              missingDocs: false,
              sealTampering: false,
              tempDeviation: false, // Although deviation occurred, it was minor & resolved
              pests: false,
              qualityIssues: false, // Minor bruising considered acceptable
              other: ''
            },
            action: 'Released',
            inspectorRemarks: 'Shipment meets import requirements. Minor bruising observed on arrival inspection, likely linked to transit temperature event. Quality acceptable for market release.' // Modified remarks
          }
        }
      }),

      formatInspection({ // Updated sixth inspection
        id: 'insp-012', // Changed ID
        type: 'Warehouse',
        date: '2023-05-16', // Changed date
        location: 'Gulf Fresh Distribution Hub, Dubai, UAE', // Changed location name
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Good', threshold: 'Good', status: 'Passed', details: 'Product condition consistent with arrival report, minor bruising stable.' }, // Updated details
          { type: 'Chemical', value: 'Within Spec', threshold: 'Within Spec', status: 'Passed', details: 'No issues detected.' }, // Simplified detail
          { type: 'Moisture', value: '72%', threshold: '65-75%', status: 'Passed', details: 'Moisture content good.' } // Changed value
        ],
        compliances: [
          { name: 'Storage Standards', status: 'Passed', details: 'Meets Gulf Fresh storage protocols.' }, // Changed standard name
          { name: 'Cold Chain', status: 'Passed', details: 'Temperature maintained.' } // Simplified detail
        ],
        inspectionTools: [
          'Digital Thermometer',
          'Penetrometer',
          'Moisture Meter',
          'Color Chart'
        ],
        notes: 'Product received into distribution center. Quality is good, minor bruising as noted on arrival. Accepted for standard storage.', // Modified notes
        distributionCenterDetails: { // Updated nested details consistently
          shipmentReceiving: { // Updated details
            inspectionDate: '2023-05-16T08:30:00Z', // Changed time
            inspectorName: 'Khalid Ibrahim', // Changed name
            inspectorId: 'GF-INSP-456', // Changed ID
            internalLotId: 'GF-LOT-2023-789', // Changed ID
            palletIds: ['GF-PLT-001', 'GF-PLT-002', 'GF-PLT-003'], // Changed IDs
            containerId: 'HLCU-1234567', // Changed container
            poReference: 'PO-2023-1011', // Changed PO ref
            supplierLotId: 'RV-LOT-2023-456', // Changed supplier lot
            supplierName: 'Rift Valley Avocado Growers', // Changed supplier
            variety: 'Hass',
            declaredGrade: 'Class I',
            dateReceived: '2023-05-16T08:00:00Z', // Changed time
            cartonsReceived: 1834, // Changed cartons
            cartonsSampled: 18, // Changed sampled cartons
            photos: [
              { type: 'receiving_area', url: 'https://example.com/receiving-gf.jpg' }, // Different image URL example
              { type: 'pallet_condition', url: 'https://example.com/pallets-gf.jpg' } // Different image URL example
            ]
          },
          storageConditions: { // Changed temps slightly
            deliveryTruckTemp: 5.8, // Changed temp
            pulpTemperatures: [
              { palletId: 'GF-PLT-001', temperature: 6.0, acceptable: true }, // Changed ID/temp
              { palletId: 'GF-PLT-002', temperature: 5.9, acceptable: true }, // Changed ID/temp
              { palletId: 'GF-PLT-003', temperature: 6.1, acceptable: true } // Changed ID/temp
            ],
            averagePulpTemp: 6.0, // Recalculated average
            initialStorageBay: 'Zone-A5', // Changed bay ID
            photos: [
              { type: 'temperature_reading', url: 'https://example.com/temp-gf.jpg' }, // Different image URL example
              { type: 'storage_bay', url: 'https://example.com/bay-gf.jpg' } // Different image URL example
            ]
          },
          packagingLabeling: { // Kept details
            cartonCondition: {
              status: 'Good',
              damageCount: 0,
              photos: [
                { type: 'carton_condition', url: 'https://example.com/cartons-gf.jpg' } // Different image URL example
              ]
            },
            labelAccuracy: {
              status: 'Correct',
              details: 'All labels clear and accurate'
            },
            palletCondition: 'Good',
            photos: [
              { type: 'labels', url: 'https://example.com/labels-gf.jpg' } // Different image URL example
            ]
          },
          externalQuality: { // Updated defect percentages
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
              sizeCode: '18', // Changed size code
              uniformity: 'Good',
              averageWeight: 230 // Changed weight
            },
            externalDefects: [
              { type: 'Bruising', percentageAffected: 1.5 }, // Increased bruising slightly
              { type: 'Cuts', percentageAffected: 0.6 } // Increased cuts slightly
            ],
            photos: [
              { type: 'external_quality', url: 'https://example.com/quality-gf.jpg' } // Different image URL example
            ]
          },
          internalQuality: { // Changed values slightly
            firmness: {
              readings: [7.0, 7.2, 7.1, 7.3, 7.0], // Changed readings
              average: 7.12 // Recalculated average
            },
            dryMatter: 24.2, // Changed value
            fleshColor: 'Creamy',
            internalDefects: [
              { type: 'Vascular Browning', severity: 'Slight Trace' }, // Added slight trace
              { type: 'Flesh Bruising', severity: 'None' }
            ],
            photos: [
              { type: 'internal_quality', url: 'https://example.com/internal-gf.jpg' } // Different image URL example
            ]
          },
          sensoryEvaluation: { // Kept details
            aroma: 'Fresh',
            texture: 'Firm-Creamy', // Slightly adjusted texture
            taste: 'Good',
            photos: [
              { type: 'cut_fruit', url: 'https://example.com/cut-gf.jpg' } // Different image URL example
            ]
          },
          finalAssessment: { // Updated remarks
            qualityRating: 'Good', // Downgraded slightly from Premium due to bruising/trace VB
            primaryIssues: ['Minor bruising', 'Trace vascular browning'], // Listed issues
            recommendedAction: 'Accept for Standard Storage - Prioritize for early dispatch', // Changed action
            actionDetails: 'Quality acceptable, but recommend faster turnaround due to minor defects.', // Changed details
            finalStorageBay: 'Zone-A5', // Changed bay ID
            inspectorRemarks: 'Good quality shipment, consistent with arrival report. Minor bruising and trace VB noted. Approved for storage, recommend prioritizing dispatch.', // Modified remarks
            photos: [
              { type: 'final_storage', url: 'https://example.com/storage-gf.jpg' } // Different image URL example
            ]
          }
        }
      }),

      formatInspection({ // Updated seventh inspection
        id: 'insp-013', // Changed ID
        type: 'Retail',
        date: '2023-05-18', // Changed date
        location: 'Gulf Fresh Hypermarket, Marina Mall, Abu Dhabi', // Changed location
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Good', threshold: 'Good', status: 'Passed', details: 'Display clean, product handled correctly.' }, // Updated details
          { type: 'Chemical', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Not applicable for retail inspection.' },
          { type: 'Moisture', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Firmness indicates good hydration.' } // Changed detail
        ],
        compliances: [
          { name: 'Display Standards', status: 'Passed', details: 'Meets Gulf Fresh retail display guidelines.' }, // Changed standard name
          { name: 'Product Labeling', status: 'Passed', details: 'Origin and pricing correctly displayed.' }
        ],
        inspectionTools: [
          'Digital Thermometer',
          'Firmness Tester',
          'Digital Camera',
          'Inspection Checklist'
        ],
        notes: 'Good retail presentation. Stock levels adequate. Slightly higher percentage of hard fruit noted.', // Modified notes
        retailShelfDetails: { // Updated nested details consistently
          auditMetadata: { // Updated details
            dateTime: '2023-05-18T11:00:00Z', // Changed time
            auditorName: 'Aisha Sharma', // Changed name
            auditorId: 'GF-RTL-456', // Changed ID
            storeName: 'Gulf Fresh Hypermarket', // Changed store name
            storeLocation: 'Marina Mall, Abu Dhabi', // Changed location
            storeContact: 'Ali Khan', // Changed contact
            weatherConditions: 'Indoor Climate Controlled',
            photos: [
              { type: 'store_front', url: 'https://example.com/store-gf-ad.jpg' } // Different image URL example
            ]
          },
          displayArea: { // Kept details similar
            location: 'Main Produce Section',
            displayType: 'Refrigerated',
            cleanliness: 'Excellent',
            lighting: 'Adequate',
            posPresent: true,
            posCondition: 'Good',
            posOriginAccuracy: 'Correct',
            overallAppeal: 'High',
            photos: [
              { type: 'display_area', url: 'https://example.com/display-gf-ad.jpg' }, // Different image URL example
              { type: 'pos_materials', url: 'https://example.com/pos-gf-ad.jpg' } // Different image URL example
            ]
          },
          looseAvocados: { // Updated ripeness mix
            variety: 'Hass',
            originLabeling: 'Clearly Labeled',
            priceLabeling: 'Clear & Correct',
            ripenessMix: {
              hardRipenAtHome: 40, // Increased hard
              breakingFirmRipe: 35, // Adjusted breaking
              readyToEat: 20, // Decreased ready
              overripe: 5 // Kept overripe
            },
            visualQuality: {
              sizeColorUniformity: 'Good',
              damagedFruit: {
                level: 'Some',
                count: 2 // Decreased damaged count slightly
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
              { type: 'loose_avocados', url: 'https://example.com/loose-gf-ad.jpg' }, // Different image URL example
              { type: 'ripeness_stages', url: 'https://example.com/ripeness-gf-ad.jpg' } // Different image URL example
            ]
          },
          prePackaged: { // Kept structure, maybe different package type
            packageType: '2-count tray', // Changed package type
            condition: 'Good',
            labelingAccuracy: 'Correct',
            fruitVisibility: 'Yes',
            inPackQuality: {
              uniformity: 'Good',
              visibleDamage: 'None'
            },
            fifoFollowed: true,
            photos: [
              { type: 'packaged_product', url: 'https://example.com/packaged-gf-ad.jpg' } // Different image URL example
            ]
          },
          summary: { // Updated recommendations
            stockLevel: 'Medium',
            overallQuality: 'Good', // Adjusted quality rating
            immediateActions: 'Removed 2 damaged fruits from display', // Adjusted action
            storeRecommendations: 'Monitor ripeness mix, may need to adjust based on sales velocity. Ensure adequate space for ripening.', // Changed recommendations
            tfcRecommendations: 'Review delivery schedule and quantity based on higher proportion of hard fruit, ensure alignment with store needs.', // Changed recommendations (using TFC placeholder as example source)
            auditorComments: 'Good display and product handling. Ripeness mix leans towards harder fruit currently.' // Modified comments
          }
        }
      })
    ]
  },
  {
    id: '3', // Changed ID
    tradeNumber: 'TRD-AVG-2023-003', // Incremented trade number
    supplier: 'Kenyan Sunrise Avocados', // Changed supplier name
    supplierCountry: 'Kenya', // Kept constraint
    buyer: 'Arabian Delights Trading', // Changed buyer name
    buyerCountry: 'UAE', // Kept constraint
    productType: 'Fuerte Avocados', // Changed product type
    quantity: '10,000 kg (approx 834 cartons)', // Changed quantity and type
    shipDate: new Date('2023-06-15').toISOString(), // Changed ship date
    arrivalDate: new Date('2023-06-25').toISOString(), // Changed arrival date (longer transit implied)
    status: 'Completed', // Kept status, issues detailed in inspections
    value: '$32,000', // Adjusted value for Fuerte/quantity
    inspections: [
      formatInspection({
        id: 'insp-014', // Changed ID
        type: 'Post-Harvest',
        date: '2023-06-01', // Changed date
        location: 'Thika, Kenya', // Changed location
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Good', threshold: 'Good', status: 'Passed', details: 'Fuerte avocados show good size and shape, minimal skin blemishes.' }, // Updated for Fuerte
          { type: 'Chemical', value: 'Optimal', threshold: 'Optimal', status: 'Passed', details: 'Oil content analysis confirms harvest readiness for Fuerte.' }, // Updated for Fuerte
          { type: 'Moisture', value: '76%', threshold: '70-80%', status: 'Passed', details: 'Moisture content typical for Fuerte.' } // Updated for Fuerte
        ],
        compliances: [
          { name: 'GLOBALG.A.P', status: 'Passed', details: 'Farm compliant with GLOBALG.A.P standards.' },
          { name: 'SMETA', status: 'Passed', details: 'Ethical trade audit passed.' } // Added different compliance type
        ],
        inspectionTools: [
          'Oil Content Tester', // Added relevant tool
          'Digital Scale',
          'Color Chart (Fuerte specific)', // Specified tool
          'Sizing Gauge', // Changed tool name
          'Penetrometer',
          'Moisture Meter'
        ],
        notes: 'Farm audit passed. Fuerte harvest quality meets export standards. Packhouse schedule confirmed.', // Updated notes
        inspector: {
          name: 'Samuel Otieno', // Changed inspector name
          affiliatedBody: 'KEPHIS',
          inspectionDate: '2023-06-01' // Changed date
        },
        postHarvestDetails: { // Updated nested details for new farm/scenario
          farmIdentification: {
            farmName: 'Kenyan Sunrise Avocados', // Changed farm name
            growerName: 'Esther Wambui', // Changed grower name
            registrationNumbers: [
              { type: 'KEPHIS', value: 'KE-AVO-2025-ABC' }, // Changed number
              { type: 'HCD', value: 'HCD-2025-XYZ' } // Changed number
            ],
            location: {
              coordinates: '-1.0471,37.0834', // Changed coordinates (Thika)
              address: 'Kiambu County, Thika, Kenya' // Changed address
            },
            areas: {
              total: 80, // Changed area
              avocado: 55 // Changed area
            },
            varieties: ['Fuerte', 'Hass'], // Changed primary variety
            targetMarkets: ['UAE', 'Saudi Arabia', 'Europe'], // Changed markets
            associatedPackhouse: 'Thika Packers Ltd', // Changed packhouse
            photos: [
              { type: 'farm_entrance', url: 'https://example.com/farm-entrance-ksa.jpg' },
              { type: 'orchard_overview', url: 'https://example.com/orchard-ksa.jpg' }
            ]
          },
          traceability: {
            systemType: 'Combination Paper & Digital Log', // Changed system type
            recordsAvailable: true,
            recordTypes: [
              'Farm Activities',
              'Input Applications',
              'Harvest Records',
              'Worker Training',
              'Pest Scouting'
            ],
            photos: [
              { type: 'block_markers', url: 'https://example.com/block-markers-ksa.jpg' },
              { type: 'record_system', url: 'https://example.com/records-ksa.jpg' }
            ]
          },
          gap: { // Updated dates and details
            siteHistory: 'Long-established mixed farm, Fuerte avocados dominant',
            soilManagement: {
              fertilizers: [
                { type: 'Chicken Manure', applicationDate: '2025-03-10', rate: '3.0 tons/ha' }, // Changed type/date/rate
                { type: 'NPK 10:20:10', applicationDate: '2025-04-01', rate: '150 kg/ha' } // Changed type/date/rate
              ],
              storageCompliance: true
            },
            waterManagement: {
              source: 'River Abstraction (Licensed)', // Changed source
              qualityTestDate: '2025-04-15', // Changed date
              irrigationMethod: 'Sprinkler Irrigation', // Changed method
              testResults: 'Potable, suitable for irrigation' // Changed results slightly
            },
            photos: [
              { type: 'fertilizer_storage', url: 'https://example.com/fertilizer-ksa.jpg' },
              { type: 'irrigation_system', url: 'https://example.com/irrigation-ksa.jpg' }
            ]
          },
          pestManagement: { // Updated dates and details
            ipmStrategyPresent: true,
            monitoringLogs: [
              { date: '2025-05-10', findings: 'Moderate thrips activity', action: 'Biocontrol agents released' }, // Changed findings/action
              { date: '2025-05-20', findings: 'Thrips levels reduced', action: 'Continued monitoring' }
            ],
            pesticides: {
              storage: {
                secure: true,
                conditions: 'Well-ventilated, locked shed, spill kit present' // Added detail
              },
              records: [
                { product: 'Abamectin', applicationDate: '2025-04-25', phi: 14 }, // Changed product/date
                { product: 'Mancozeb', applicationDate: '2025-04-10', phi: 21 } // Changed product/date
              ],
              disposal: 'Designated collection point for hazardous waste' // Changed detail
            },
            calibrationRecords: [
              { equipment: 'Mist Blower', date: '2025-03-15', result: 'Calibrated' } // Changed equipment/date
            ],
            photos: [
              { type: 'pesticide_storage', url: 'https://example.com/pesticide-store-ksa.jpg' },
              { type: 'pest_traps', url: 'https://example.com/traps-ksa.jpg' }
            ]
          },
          preHarvest: { // Updated dates and details
            maturityMethod: 'Oil Content Testing and Firmness', // Changed method for Fuerte
            dryMatterPercentage: 20, // Changed value (Fuerte typically lower DM/higher oil)
            equipment: [
              { type: 'Picking Poles', condition: 'Good', lastMaintenance: '2025-05-01' }, // Changed tool
              { type: 'Field Bins', condition: 'Good', lastMaintenance: '2025-05-01' } // Changed tool
            ],
            trainingRecords: [
              { topic: 'Fuerte Handling', date: '2025-05-15', attendees: 10 }, // Changed topic/attendees
              { topic: 'Hygiene Procedures', date: '2025-05-16', attendees: 10 }
            ],
            heatRemovalPlan: 'Harvest during cool morning hours, transfer to packhouse within 4 hours', // Changed plan
            photos: [
              { type: 'harvesting_tools', url: 'https://example.com/tools-ksa.jpg' },
              { type: 'collection_crates', url: 'https://example.com/bins-ksa.jpg' }
            ]
          },
          workerWelfare: { // Updated dates and details
            hygieneTraining: [
              { date: '2025-04-20', topics: ['Personal Hygiene', 'Safe Handling'], trainer: 'John Doe' } // Changed date/trainer
            ],
            facilities: [
              { type: 'Toilets', count: 2, condition: 'Good', supplies: ['Toilet Paper', 'Soap', 'Water'] }, // Changed count
              { type: 'Handwashing Stations', count: 3, condition: 'Good', supplies: ['Soap', 'Towels'] } // Changed count/supplies
            ],
            firstAid: {
              kitsAvailable: 1, // Changed count
              trainedPersonnel: 1, // Changed count
              lastInspection: '2025-05-01' // Changed date
            },
            waterAccess: {
              points: 3, // Changed count
              potable: true,
              testDate: '2025-04-15' // Changed date
            },
            photos: [
              { type: 'sanitation_facilities', url: 'https://example.com/facilities-ksa.jpg' },
              { type: 'handwashing_stations', url: 'https://example.com/handwashing-ksa.jpg' }
            ]
          },
          environmental: { // Updated dates and details
            wasteManagement: {
              plan: 'Segregation, composting organic, collection by licensed service',
              collectionAreas: [
                { type: 'Organic Waste', condition: 'Fair', lastCleaned: '2025-05-25' }, // Changed condition/date
                { type: 'General Waste', condition: 'Good', lastCleaned: '2025-05-25' } // Changed type/date
              ]
            },
            waterProtection: {
              bufferZones: [
                { location: 'River Boundary', width: 8 }, // Changed location/width
                { location: 'Pesticide Store', width: 10 } // Changed location/width
              ],
              measures: ['Vegetative Strips', 'Silt Traps'] // Changed measures
            },
            biodiversity: {
              zones: [
                { type: 'Riparian Area', area: 3, species: ['Native grasses', 'Reeds'] }, // Changed type/area/species
                { type: 'Windbreaks', area: 1, species: ['Grevillea'] } // Changed type/area/species
              ]
            },
            photos: [
              { type: 'waste_management', url: 'https://example.com/waste-ksa.jpg' },
              { type: 'buffer_zones', url: 'https://example.com/buffer-ksa.jpg' }
            ]
          },
          finalEvaluation: { // Updated evaluation
            strengths: [
              'Good Fuerte quality',
              'Compliant with ethical standards (SMETA)',
              'Established farm practices'
            ],
            weaknesses: [
              'Waste collection area needs more frequent cleaning',
              'Fewer worker facilities compared to larger farms'
            ],
            nonConformities: [
              {
                severity: 'Minor',
                description: 'Organic waste collection area overflowing slightly',
                correctiveAction: 'Increase collection frequency or provide larger bin',
                deadline: '2025-06-15' // Changed deadline
              }
            ],
            exportReadiness: 'Passed with Minor Corrections', // Changed readiness
            evaluator: {
              name: 'Samuel Otieno', // Changed name
              organization: 'KEPHIS',
              date: '2025-06-01' // Changed date
            }
          }
        }
      }),

      formatInspection({ // Updated second inspection
        id: 'insp-015', // Changed ID
        type: 'Pre-Shipment',
        date: '2023-06-10', // Changed date
        location: 'Thika Packers Ltd, Thika, Kenya', // Changed location
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Good', threshold: 'Good', status: 'Passed', details: 'Fuerte avocados properly sorted and packed.' }, // Updated details
          { type: 'Chemical', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Post-harvest checks confirmed.' }, // Changed detail
          { type: 'Moisture', value: '76%', threshold: '70-80%', status: 'Passed', details: 'Moisture levels consistent.' } // Changed value
        ],
        compliances: [
          { name: 'Packhouse Standards (HACCP)', status: 'Passed', details: 'Facility meets HACCP requirements.' }, // Updated compliance name
          { name: 'Traceability Check', status: 'Passed', details: 'Lot codes correctly applied.' } // Added specific check
        ],
        inspectionTools: [
          'Temperature Probe', // Changed tool name
          'Digital Camera',
          'Label Verification Scanner', // Added tool
          'Carton Inspection Checklist' // Added tool
        ],
        notes: 'Packhouse operations running smoothly. Product packed to specification for UAE market.', // Updated notes
        preShipmentDetails: { // Updated nested details for new packhouse/scenario
          facilityIdentification: {
            facilityName: "Thika Packers Ltd", // Changed name
            registrationNumber: "PKH-2023-11223", // Changed number
            address: "Industrial Area, Thika, Kenya", // Changed address
            contactPerson: "Joseph Mwangi", // Changed contact
            phone: "+254 700 111 222", // Changed phone
            email: "manager@thikapackers.co.ke", // Changed email
            photos: [
              { type: "facility_exterior", url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952" },
              { type: "facility_signage", url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" }
            ]
          },
          regulatoryCompliance: { // Updated numbers/dates
            documentsValid: true,
            certifications: [
              { type: "HACCP", number: "HC-987-KE", expiryDate: "2024-02-28" }, // Changed number/date
              { type: "ISO 9001", number: "ISO9001-456-2023", expiryDate: "2024-08-31" } // Changed type/number/date
            ],
            permits: [
              { type: "Export Permit", number: "EXP-2023-1A2B", validUntil: "2023-07-10" }, // Changed number/date
              { type: "Phytosanitary Certificate", number: "KEPHIS-PC-2023-3C4D", validUntil: "2023-06-25" } // Changed number/date
            ],
            photos: [
              { type: "certifications", url: "https://images.unsplash.com/photo-1556761175-b413da4baf72" }
            ]
          },
          facilityCondition: { // Minor changes
            maintenanceStatus: "Good",
            cleanlinessRating: 8,
            pestControl: {
              program: "Monthly Professional Service", // Changed program
              lastInspection: "2023-05-25", // Changed date
              findings: "No pest activity observed"
            },
            repairs: [],
            photos: [
              { type: "facility_interior", url: "https://images.unsplash.com/photo-1507207611509-ec014333ff52" },
              { type: "pest_control", url: "https://images.unsplash.com/photo-1591696205602-2f950c417cb1" }
            ]
          },
          receivingArea: { // Minor changes
            temperature: {
              current: 21,
              required: "18-22",
              withinRange: true
            },
            loadingDocks: [
              { number: 1, condition: "Good", cleanliness: "Clean" }
            ],
            photos: [
              { type: "receiving_area", url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623" }
            ]
          },
          processingLine: { // Updated dates
            equipmentCondition: "Operational",
            stations: [
              { name: "Dry Brush Station", status: "Operational", lastMaintenance: "2023-05-15", notes: "Brushes replaced recently" }, // Changed station name/note
              { name: "Sorting Belt", status: "Operational", lastMaintenance: "2023-05-20", notes: "Standard operation" }, // Changed station name
              { name: "Packing Station", status: "Operational", lastMaintenance: "2023-05-20", notes: "Calibrated scales" } // Changed station name/note
            ],
            calibration: [
              { equipment: "Packing Scale", lastCalibrated: "2023-05-20", nextDue: "2023-06-20" }, // Changed equipment/dates
              { equipment: "Temperature Probes", lastCalibrated: "2023-05-01", nextDue: "2023-11-01" } // Changed equipment/dates
            ],
            photos: [
              { type: "processing_line", url: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890" },
              { type: "washing_station", url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" } // Placeholder, maybe dry brush photo instead
            ]
          },
          qualityControl: { // Updated dates
            proceduresFollowed: true,
            checkpoints: [
              {
                station: "Receiving",
                parameters: ["Quality", "Lot ID Verification"], // Changed params
                frequency: "Each delivery",
                responsible: "QC Intake Officer" // Changed title
              },
              {
                station: "Final Packing", // Changed station
                parameters: ["Weight", "Labeling", "Packaging Integrity"], // Changed params
                frequency: "Hourly random sample", // Changed freq
                responsible: "QC Packing Lead" // Changed title
              }
            ],
            samples: [
              { type: "Final Product Check", quantity: "5 cartons per pallet", results: "Meets specifications", date: "2023-06-10" }, // Changed type/quantity/date
            ],
            photos: [
              { type: "quality_check", url: "https://images.unsplash.com/photo-1576153119370-d59cb43b748b" }
            ]
          },
          packingLabeling: { // Minor changes
            materialsCompliant: true,
            packaging: [
              { type: "4kg Cartons", condition: "New", quantity: "Sufficient" }, // Changed type
              { type: "Protective Liners", condition: "New", quantity: "Sufficient" } // Changed type
            ],
            labels: [
              { type: "Box End Labels", compliance: true, notes: "Includes Lot Code, Pack Date, Variety" }, // Changed type/note
              { type: "Pallet Labels", compliance: true, notes: "SSCC compliant" } // Changed type/note
            ],
            photos: [
              { type: "packaging_materials", url: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f" },
              { type: "labeled_carton", url: "https://images.unsplash.com/photo-1606168010845-77063f718a0a" }
            ]
          },
          storage: { // Minor changes
            temperature: {
              current: 6.0, // Changed temp
              required: "5-7", // Fuerte often stored slightly warmer than Hass
              withinRange: true
            },
            humidity: {
              current: 90,
              required: "85-95",
              withinRange: true
            },
            areas: [
              { name: "Pre-Cooling Chamber 1", capacity: "5,000 kg", currentUsage: "80%", condition: "Good" }, // Changed name/capacity/usage
              { name: "Dispatch Cold Store", capacity: "15,000 kg", currentUsage: "60%", condition: "Good" } // Changed name/capacity/usage
            ],
            photos: [
              { type: "cold_storage", url: "https://images.unsplash.com/photo-1587145820266-a595ee46be15" }
            ]
          },
          workerHygiene: { // Updated dates
            trainingCurrent: true,
            personnel: [
              { role: "Packers", certified: true, lastTraining: "2023-04-15" }, // Changed role/date
              { role: "QC Staff", certified: true, lastTraining: "2023-04-15" }, // Changed role/date
              { role: "Supervisors", certified: true, lastTraining: "2023-03-20" } // Changed date
            ],
            facilities: [
              { type: "Handwashing Stations", condition: "Good", adequacy: "Sufficient" },
              { type: "Sanitation Facilities", condition: "Good", adequacy: "Sufficient" },
              { type: "Canteen", condition: "Good", adequacy: "Sufficient" } // Added facility type
            ],
            photos: [
              { type: "worker_ppe", url: "https://images.unsplash.com/photo-1600880291147-1f650a44f0b5" },
              { type: "handwashing_station", url: "https://images.unsplash.com/photo-1580910277621-792d7ef1a57f" }
            ]
          },
          finalAssessment: { // Updated name/date
            readyForShipment: true,
            issues: [], // No issues this time
            recommendations: [
              "Ensure consistent pre-cooling before container stuffing."
            ],
            approver: {
              name: "Joseph Mwangi", // Changed name
              position: "Packhouse Manager", // Changed position
              date: "2023-06-10" // Changed date
            },
            photos: [
              { type: "container_loading", url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec" }
            ]
          }
        }
      }),

      formatInspection({ // Updated third inspection
        id: 'insp-016', // Changed ID
        type: 'Port-Export',
        date: '2023-06-14', // Changed date
        location: 'Port of Mombasa, Kenya',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', value: 'Pass', threshold: 'Pass', status: 'Passed', details: 'Container exterior good, seals intact.' }, // Updated details
          { type: 'Chemical', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Not applicable.' },
          { type: 'Moisture', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Reefer humidity setting verified.' } // Changed detail
        ],
        compliances: [
          { name: 'Export Documentation', status: 'Passed', details: 'Phyto, COO, Export Permit checked and valid.' }, // Updated details
          { name: 'Container Seal Verification', status: 'Passed', details: 'Seal number matches documentation.' } // Added specific check
        ],
        inspectionTools: [
          'Digital Thermometer',
          'Seal Cutters (for verification if needed, unused)', // Added detail
          'Container Inspection Checklist', // Changed tool name
          'Document Scanner' // Added tool
        ],
        notes: 'Container loaded onto vessel. Temperature confirmed at setpoint. All documents cleared.', // Updated notes
        portOfExportDetails: { // Updated nested details consistently
          inspectorInfo: {
            name: "Martin Oloo", // Changed name
            inspectionDate: "2023-06-14", // Changed date
            inspectionTime: "11:00", // Changed time
            affiliatedBody: "Port Authority Inspectorate", // Changed body
            portLocation: "Port of Mombasa, Berth 5", // Changed berth
            photos: [
              { type: "inspector_id", url: "https://example.com/inspector-badge-mo.jpg" }
            ]
          },
          consignmentInfo: { // Updated details
            bookingReference: "CMA-BOK-2023-XYZ", // Changed ref
            exporterName: "Kenyan Sunrise Avocados", // Changed exporter
            importerName: "Arabian Delights Trading", // Changed importer
            containerId: "CMAU-9876543", // Changed container ID
            vesselInfo: {
              name: "CMA CGM Nile", // Changed vessel
              voyageNumber: "VOY-NLE-23" // Changed voyage
            },
            phytosanitaryCertificate: true,
            exportPermit: true,
            photos: [
              { type: "container_number", url: "https://example.com/container-cmau.jpg" },
              { type: "documents", url: "https://example.com/documents-ksa.jpg" }
            ]
          },
          containerCondition: { // Kept details
            containerType: "Reefer",
            externalCondition: "Pass",
            internalCleanliness: "Pass",
            doorSealsCondition: "Pass",
            reeferUnitFunctionality: "Pass",
            photos: [
              { type: "container_external", url: "https://example.com/container-ext-cmau.jpg" },
              { type: "container_internal", url: "https://example.com/container-int-cmau.jpg" }
            ]
          },
          temperatureVerification: { // Changed temps slightly for Fuerte
            setTemperature: 6.0, // Higher setpoint for Fuerte
            actualTemperature: 6.1, // Changed temp
            preCooled: true,
            pulpTemperatures: {
              location1: 6.2,
              location2: 6.0,
              location3: 6.1,
              location4: 6.1,
              location5: 6.2,
              average: 6.12 // Recalculated average
            },
            temperatureLoggerPlaced: true,
            loggerPosition: "Center stack, top layer", // Changed position
            photos: [
              { type: "temp_display", url: "https://example.com/temp-cmau.jpg" },
              { type: "logger_placement", url: "https://example.com/logger-cmau.jpg" }
            ]
          },
          loadingProcess: { // Kept details
            loadingMethod: "Palletized",
            handlingPractices: "Good",
            stackingPattern: "Pass",
            cartonCondition: "Good",
            dunnageMaterial: "Cardboard corner posts", // Changed dunnage
            timeframeAcceptable: true,
            photos: [
              { type: "loading_process", url: "https://example.com/loading-cmau.jpg" },
              { type: "stacking_pattern", url: "https://example.com/stacking-cmau.jpg" }
            ]
          },
          finalSealing: { // Updated details
            totalUnits: {
              pallets: 9, // Changed pallets
              cartons: 834 // Changed cartons (approx)
            },
            doorsClosed: true,
            highSecuritySeal: true,
            sealNumber: "CMA-SEAL-5678", // Changed seal number
            sealType: "Cable", // Changed seal type
            photos: [
              { type: "seal_applied", url: "https://example.com/seal-cmau.jpg" },
              { type: "final_closure", url: "https://example.com/closure-cmau.jpg" }
            ]
          },
          overallAssessment: { // Kept details
            findings: "Container inspection, loading, and sealing completed successfully. Ready for vessel loading.", // Updated finding slightly
            correctiveActions: "None required",
            exportClearance: true
          }
        }
      }),

      formatInspection({ // Updated fourth inspection - DELAY & TEMP ISSUE
        id: 'insp-017', // Changed ID
        type: 'Transit',
        date: '2023-06-20', // Changed date (mid-transit, delay occurred)
        location: 'Arabian Sea (Delayed)', // Added delay info
        status: 'Passed with Issues Noted', // Changed status
        qualityChecks: [
          { type: 'Physical', value: 'Stable', threshold: 'Stable', status: 'Passed', details: 'Container position and seal integrity confirmed via GPS/sensors.' }, // Updated details
          { type: 'Chemical', value: 'Fluctuated', threshold: 'Within Range', status: 'Failed', details: 'Temperature excursion recorded on June 18-19. See notes.' }, // Marked as failed due to temp issue
          { type: 'Moisture', value: '80-95%', threshold: '85-95%', status: 'Passed', details: 'Humidity levels varied but generally within acceptable bounds.' } // Changed range slightly
        ],
        compliances: [
          { name: 'Temperature Control', status: 'Failed', details: 'Setpoint 6.0C. Deviation recorded up to 9.0C for 12 hours due to temporary reefer malfunction. Issue resolved.' }, // Marked as failed, detailed issue
          { name: 'ETA Management', status: 'Failed', details: 'Original ETA June 22, revised multiple times due to port congestion. Current ETA June 25.' } // Marked as failed, detailed issue
        ],
        inspectionTools: [
          'Remote Temperature Logger',
          'Humidity Sensor',
          'GPS Tracker',
          'Reefer Unit Diagnostics Log' // Added tool
        ],
        notes: 'Significant transit delay due to port congestion at intermediate port. Additionally, a reefer unit malfunction occurred on June 18, causing temperature to rise to 9.0C for approx 12 hours before being remotely diagnosed and reset. Potential impact on Fuerte avocado quality expected.', // Detailed issues in notes
        transitDetails: { // Updated nested details consistently
          monitorInfo: {
            monitorName: "Transit Monitoring Center", // Changed name
            monitorId: "TMC-GLOBAL-01", // Changed ID
            startDate: "2023-06-15", // Changed date
            endDate: "2023-06-25", // Changed date (reflects delay)
            company: "SeaGuard Solutions", // Changed company
            photos: [
              { type: "monitor_id", url: "https://example.com/monitor-badge-tmc.jpg" }
            ]
          },
          shipmentIdentification: { // Updated details
            containerId: "CMAU-9876543", // Changed container
            bookingReference: "CMA-BOK-2023-XYZ", // Changed booking ref
            exporterName: "Kenyan Sunrise Avocados", // Changed exporter
            importerName: "Arabian Delights Trading", // Changed importer
            sealNumber: "CMA-SEAL-5678", // Changed seal
            photos: [
              { type: "container_seal", url: "https://example.com/seal-cmau.jpg" },
              { type: "container_number", url: "https://example.com/container-cmau.jpg" }
            ]
          },
          vesselDetails: { // Updated details - Added transshipment and ETA changes
            vesselName: "CMA CGM Nile", // Changed vessel
            imoNumber: "IMO-7654321", // Changed IMO
            voyageNumber: "VOY-NLE-23", // Changed voyage
            shippingLine: "CMA CGM", // Changed line
            portOfLoading: {
              name: "Mombasa Port",
              actualDeparture: "2023-06-15T09:00:00Z" // Changed time
            },
            transshipments: [ // Added transshipment detail (cause of delay)
              {
                port: "Salalah, Oman",
                eta: "2023-06-20T06:00:00Z",
                ata: "2023-06-21T18:00:00Z", // Arrived late
                atd: "2023-06-23T12:00:00Z" // Departed very late
              }
            ],
            portOfDischarge: {
              name: "Jebel Ali Port, Dubai", // Changed port name
              originalEta: "2023-06-22T08:00:00Z", // Original ETA
              currentEta: "2023-06-25T14:00:00Z", // Current delayed ETA
              etaChanges: [ // Added ETA changes
                {
                  date: "2023-06-21T20:00:00Z",
                  newEta: "2023-06-24T06:00:00Z",
                  reason: "Port congestion at Salalah"
                },
                 {
                  date: "2023-06-23T14:00:00Z",
                  newEta: "2023-06-25T14:00:00Z",
                  reason: "Extended berthing delay at Salalah"
                }
              ]
            },
            photos: [
              { type: "vessel_departure", url: "https://example.com/departure-cma.jpg" }
            ]
          },
          monitoringSources: { // Changed source type
            primarySource: {
              type: "Carrier TRAXENS Monitoring", // Changed source
              details: "Container monitored via CMA CGM TRAXENS system"
            },
            secondarySource: {
              type: "Manual Checkpoints", // Changed source
              details: "Port-based checks during transshipment"
            },
            reviewFrequency: "Continuous (Alert-based) & Daily Summary", // Changed frequency
            photos: [
              { type: "monitoring_device", url: "https://example.com/device-traxens.jpg" }
            ]
          },
          environmentalConditions: { // Updated temp range due to excursion
            temperature: {
              setPoint: 6.0,
              dataAvailability: "Continuous",
              reviewMethod: "Portal Alerts & Logs", // Changed method
              minTemperature: 5.5, // Min was ok
              maxTemperature: 9.1, // Max reflects excursion
              deviationsNoted: true, // Changed to true
              evidence: [
                { type: "temp_graph_excursion", url: "https://example.com/temperature-excursion-cma.jpg" } // Changed evidence type/URL
              ]
            },
            controlledAtmosphere: { // Fuerte often doesn't use CA, set to false
              required: false, // Changed to false
              o2SetPoint: null, // Nullified
              co2SetPoint: null, // Nullified
              dataAvailable: false, // Changed to false
              o2Range: null,
              co2Range: null,
              deviationsNoted: false,
              evidence: []
            },
            relativeHumidity: {
              dataReviewed: true,
              range: { // Wider range due to temp fluctuation
                min: 80,
                max: 95
              }
            },
            reeferUnit: {
              powerStatus: "On (Interrupted)", // Changed status
              outages: [ // Added outage detail
                  { start: "2023-06-18T22:00:00Z", end: "2023-06-19T10:00:00Z", duration: "12 hours", reason: "Reefer Controller Malfunction (Reset remotely)"}
              ]
            },
            photos: [
              { type: "reefer_display", url: "https://example.com/reefer-cma.jpg" }
            ]
          },
          eventMonitoring: { // Updated alerts/delays
            hasAlerts: true, // Kept true
            alerts: [ // Updated alert
              { timestamp: "2023-06-18T22:15:00Z", type: "Reefer Malfunction", description: "Temperature rising above setpoint. Controller unresponsive.", actionTaken: "Remote diagnostics initiated, reset command sent. Resolved after 12 hours."}
            ],
            hasDelays: true, // Kept true
            delays: [ // Updated delay info
              {
                description: "Severe port congestion and extended berthing time at Salalah transshipment port.",
                impact: "Approximately 3-day delay to final ETA."
              }
            ],
            photos: [
              { type: "port_congestion_salalah", url: "https://example.com/port-salalah.jpg" }, // Changed photo type/URL
              { type: "alert_log_reefer", url: "https://example.com/alert-reefer.jpg" } // Changed photo type/URL
            ]
          },
          transitSummary: { // Updated dates/summary
            overallCondition: "Compromised", // Changed condition
            communicationLog: [
              "2023-06-15 09:00 - Container departed Mombasa",
              "2023-06-18 22:15 - Reefer malfunction alert triggered",
              "2023-06-19 10:00 - Reefer function restored",
              "2023-06-21 18:00 - Delayed arrival Salalah",
              "2023-06-23 12:00 - Delayed departure Salalah",
              "2023-06-25 14:00 - Revised ETA at Jebel Ali"
            ],
            finalEta: "2023-06-25T14:00:00Z", // Changed date/time
            photos: [
              { type: "final_status_compromised", url: "https://example.com/status-cma-compromised.jpg" } // Changed photo type/URL
            ]
          }
        }
      }),

      formatInspection({ // Updated fifth inspection - reflects issues
        id: 'insp-018', // Changed ID
        type: 'On-Arrival',
        date: '2023-06-25', // Changed date (delayed arrival)
        location: 'Jebel Ali Port, Dubai, UAE',
        status: 'Failed - Requires Sorting/Assessment', // Changed status significantly
        qualityChecks: [
          { type: 'Physical', value: 'Fair', threshold: 'Good', status: 'Failed', details: 'Uneven ripening apparent. ~10% show signs of chilling injury (skin blackening). Higher than normal bruising.' }, // Downgraded quality, detailed issues
          { type: 'Chemical', value: 'Variable', threshold: 'Within Spec', status: 'Failed', details: 'Pulp temperatures varied widely. Some fruit overly soft.' }, // Noted variability
          { type: 'Moisture', value: '78%', threshold: '70-80%', status: 'Passed', details: 'Average moisture okay, but texture inconsistent.' } // Passed but added note
        ],
        compliances: [
          { name: 'UAE Import Standards', status: 'Pending', details: 'Release pending further quality assessment by importer.' }, // Changed status
          { name: 'Food Safety Standards', status: 'Passed', details: 'No signs of pests or decay, but quality compromised.' }
        ],
        inspectionTools: [
          'Digital Thermometer',
          'Penetrometer (Firmness Tester)', // Added detail
          'Quality Assessment Score Sheet', // Added tool
          'Digital Camera' // Added tool
        ],
        notes: 'Shipment arrived significantly delayed and after temperature excursion. Visual inspection reveals uneven ripening, signs of chilling injury on some Fuerte avocados, and increased bruising. Product failed initial quality check against import standards. Importer notified for joint inspection and decision on sorting/disposal.', // Detailed failure reason
        postOfImportDetails: { // Updated nested details consistently
          shipmentDetails: { // Updated details
            inspectionDateTime: '2023-06-25T15:00:00Z', // Changed time
            inspectorName: 'Ali Hassan', // Changed name
            inspectorId: 'UAE-INSP-2023-XYZ', // Changed ID
            shipmentId: 'SHP-2023-AB12', // Changed ID
            containerId: 'CMAU-9876543', // Changed container
            vesselInfo: 'CMA CGM Nile / VOY-NLE-23', // Changed vessel/voyage
            importerInfo: {
              name: 'Arabian Delights Trading', // Changed importer
              licenseNo: 'UAE-IMP-2023-AD1' // Changed license
            },
            exporterName: 'Kenyan Sunrise Avocados', // Changed exporter
            commodity: 'Fresh Fuerte Avocados', // Changed commodity name
            quantity: {
              cartons: 834, // Changed cartons
              weight: 10000, // Changed weight
              unit: 'kg'
            },
            photos: [
              { type: 'container_arrival_delayed', url: 'https://example.com/arrival-cmau-delayed.jpg', timestamp: '2023-06-25T14:30:00Z' },
              { type: 'documentation_arrival', url: 'https://example.com/docs-uae-ad.jpg', timestamp: '2023-06-25T14:45:00Z' }
            ]
          },
          documentVerification: { // Updated cert number
            importPermit: {
              present: true,
              checkNumber: 'UAE-IMP-2023-999' // Changed number
            },
            commercialInvoice: {
              present: true,
              quantityMatch: true,
              valueMatch: true
            },
            packingList: {
              present: true,
              cartonCountMatch: true
            },
            billOfLading: {
              present: true,
              matchesShipmentId: true
            },
            phytosanitaryCert: {
              present: true,
              valid: true, // Cert itself is valid, issue is quality
              pestFree: true,
              dateCorrect: true,
              certNumber: 'KEPHIS-PC-2023-3C4D' // Changed number
            },
            certificateOfOrigin: {
              present: true,
              consistentWithInvoice: true
            },
            photos: [
              { type: 'import_permit_ad', url: 'https://example.com/permit-uae-ad.jpg', timestamp: '2023-06-25T15:05:00Z' },
              { type: 'certificates_ad', url: 'https://example.com/certs-uae-ad.jpg', timestamp: '2023-06-25T15:06:00Z' }
            ]
          },
          containerSealIntegrity: { // Updated seal number
            containerCondition: 'Good (External)', // Added qualifier
            documentSealNumber: 'CMA-SEAL-5678', // Changed number
            actualSealNumber: 'CMA-SEAL-5678', // Changed number
            sealIntegrity: 'Matches',
            photos: [
              { type: 'seal_intact_cmau', url: 'https://example.com/seal-cmau.jpg', timestamp: '2023-06-25T15:10:00Z' },
              { type: 'container_condition_ext', url: 'https://example.com/container-cmau.jpg', timestamp: '2023-06-25T15:11:00Z' }
            ]
          },
          productTemperatureCheck: { // Changed temps, noted issues
            temperatureRecorder: {
              deviceId: 'TR-CMA-123', // Changed ID
              reading: 7.5, // Higher reading on arrival door opening
              inRange: false // Marked as out of range (expecting 6C)
            },
            pulpTemperature: {
              readings: [7.8, 8.0, 7.2, 9.0, 6.5], // Wide range, reflecting issue
              acceptable: false // Marked as unacceptable
            },
            containerAtmosphere: 'Smell slightly stale', // Noted issue
            palletCondition: {
              status: 'Secure',
              notes: 'Pallets stable, but some condensation visible on cartons.' // Noted issue
            },
            photos: [
              { type: 'temp_reading_high', url: 'https://example.com/temp-uae-high.jpg', timestamp: '2023-06-25T15:15:00Z' },
              { type: 'pulp_temp_variable', url: 'https://example.com/pulp-uae-variable.jpg', timestamp: '2023-06-25T15:16:00Z' },
              { type: 'condensation_cartons', url: 'https://example.com/carton-condensation.jpg', timestamp: '2023-06-25T15:17:00Z'} // Added photo type
            ]
          },
          qualityInspection: { // Detailed quality issues
            sampleCartons: ['GHI1', 'JKL2', 'MNO3', 'PQR4'], // Changed IDs
            appearance: {
              color: 'Variable (Green to Yellowish, some black spots)', // Noted variability and defects
              uniformity: 'Poor', // Downgraded uniformity
              defects: 'Chilling injury (skin blackening), bruising, uneven ripening (~15% affected)', // Quantified defects
              pestPresence: {
                detected: false,
                description: ''
              }
            },
            packagingIntegrity: {
              status: 'Mostly Intact', // Downgraded slightly
              notes: 'Some cartons show moisture staining. Labels legible.' // Noted issue
            },
            photos: [
              { type: 'sample_product_damaged', url: 'https://example.com/sample-uae-damaged.jpg', timestamp: '2023-06-25T15:25:00Z' }, // Changed photo type/URL
              { type: 'chilling_injury_fuerte', url: 'https://example.com/fuerte-chilling.jpg', timestamp: '2023-06-25T15:26:00Z' }, // Added photo type
              { type: 'packaging_stained', url: 'https://example.com/packaging-uae-stained.jpg', timestamp: '2023-06-25T15:27:00Z' } // Changed photo type/URL
            ]
          },
          complianceDecision: { // Detailed failure and next steps
            overallCompliance: 'Non-Compliant (Quality)', // Changed compliance
            nonComplianceReasons: {
              missingDocs: false,
              sealTampering: false,
              tempDeviation: true, // Marked true
              pests: false,
              qualityIssues: true, // Marked true (chilling injury, uneven ripening, bruising)
              other: 'Significant transit delay contributing factor' // Added other reason
            },
            action: 'Hold for Importer Assessment/Sorting', // Changed action
            inspectorRemarks: 'Shipment failed import quality inspection due to significant quality defects likely caused by recorded temperature excursion and transit delays. Product exhibits chilling injury, uneven ripening, and bruising exceeding acceptable limits. Importer Arabian Delights Trading notified to arrange joint inspection and determine salvageability/sorting requirements or rejection/disposal.' // Detailed remarks
          }
        }
      }),

      formatInspection({ // Updated sixth inspection - reflects sorting/issues
        id: 'insp-019', // Changed ID
        type: 'Warehouse',
        date: '2023-06-27', // Changed date (after assessment/sorting)
        location: 'Arabian Delights Sorting Facility, Dubai', // Changed location type
        status: 'Partial Acceptance after Sorting', // Changed status
        qualityChecks: [
          { type: 'Physical', value: 'Variable - Sorted', threshold: 'Acceptable (Post-Sorting)', status: 'Passed', details: 'Lot sorted. Approx 60% accepted (Grade 2), 30% downgraded (Processing), 10% rejected.' }, // Detailed sorting results
          { type: 'Chemical', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Sorted based on firmness and visual defects.' },
          { type: 'Moisture', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Not primary sorting criteria.' }
        ],
        compliances: [
          { name: 'Storage Standards (Sorted Lots)', status: 'Passed', details: 'Accepted lots stored according to grade.' }, // Updated compliance name
          { name: 'Waste Management', status: 'Passed', details: 'Rejected product disposed of according to local regulations.' } // Added compliance aspect
        ],
        inspectionTools: [
          'Sorting Tables', // Added tool
          'Grading Staff', // Added 'tool'
          'Waste Bins', // Added tool
          'Inventory System' // Added tool
        ],
        notes: 'Following joint inspection, importer opted to sort the Fuerte avocados. Significant portion downgraded or rejected due to quality issues stemming from transit problems. Accepted fruit designated Grade 2 or for processing.', // Detailed notes
        distributionCenterDetails: { // Updated nested details consistently - focused on sorting outcome
          shipmentReceiving: { // Updated details - focused on receiving for sorting
            inspectionDate: '2023-06-26T10:00:00Z', // Changed date (when received for sorting)
            inspectorName: 'Importer QC Team (Ahmed)', // Changed inspector info
            inspectorId: 'ADT-QC-01', // Changed ID
            internalLotId: 'ADT-SORT-2023-01', // Changed ID
            palletIds: ['Original Pallets 1-9'], // Kept original pallet refs
            containerId: 'CMAU-9876543', // Kept container ID
            poReference: 'PO-2023-AD12', // Changed PO ref
            supplierLotId: 'KSA-LOT-2023-FU1', // Changed supplier lot
            supplierName: 'Kenyan Sunrise Avocados', // Kept supplier
            variety: 'Fuerte',
            declaredGrade: 'Class I (Failed on Arrival)', // Noted original grade and failure
            dateReceived: '2023-06-26T09:00:00Z', // Changed date
            cartonsReceived: 834, // Kept original carton count
            cartonsSampled: 834, // Sampled all for sorting
            photos: [
              { type: 'unloading_for_sorting', url: 'https://example.com/unloading-adt.jpg' }, // Changed photo type
              { type: 'initial_condition_wh', url: 'https://example.com/pallets-adt-initial.jpg' } // Changed photo type
            ]
          },
          // Sections below simplified or repurposed for sorting context
          storageConditions: { // Details about post-sorting storage
            deliveryTruckTemp: null, // N/A here
            pulpTemperatures: [], // N/A before sorting
            averagePulpTemp: null, // N/A
            initialStorageBay: 'Sorting Area', // Changed bay ID
            photos: [
              { type: 'sorting_in_progress', url: 'https://example.com/sorting-adt.jpg' }, // Changed photo type
              { type: 'rejected_product', url: 'https://example.com/rejected-adt.jpg' } // Changed photo type
            ]
          },
          packagingLabeling: { // Condition before sorting
            cartonCondition: {
              status: 'Fair (Some stained/damp)', // Downgraded status
              damageCount: null, // Damage assessed during sorting
              photos: [
                { type: 'carton_condition_presort', url: 'https://example.com/cartons-adt-presort.jpg' } // Changed photo type
              ]
            },
            labelAccuracy: {
              status: 'Correct',
              details: 'Original labels correct'
            },
            palletCondition: 'Fair', // Downgraded
            photos: [
              { type: 'labels_original', url: 'https://example.com/labels-adt-original.jpg' } // Changed photo type
            ]
          },
          // Quality sections reflect sorting outcome, not detailed checks
          externalQuality: { // Summary of sorting results
            appearance: {
              uniformity: 'Poor (Pre-sort)',
              colorStage: 'Variable',
              gloss: 'Variable'
            },
            shape: {
              status: 'Typical',
              percentageAffected: 0 // Shape not the main issue
            },
            size: {
              sizeCode: 'Mixed (as per packing list)', // Size not the main issue
              uniformity: 'Fair',
              averageWeight: null // Not measured here
            },
            externalDefects: [ // Summary of defects found
              { type: 'Chilling Injury', percentageAffected: '~10% (Rejected)' },
              { type: 'Severe Bruising/Soft', percentageAffected: '~5% (Rejected/Processing)' },
              { type: 'Minor Bruising/Surface Marks', percentageAffected: '~30% (Downgraded)' }
            ],
            photos: [
              { type: 'sorted_grade2', url: 'https://example.com/sorted-g2-adt.jpg' }, // Changed photo type
              { type: 'sorted_processing', url: 'https://example.com/sorted-proc-adt.jpg' } // Changed photo type
            ]
          },
          internalQuality: { // Less relevant post-sorting unless specific checks done
            firmness: {
              readings: [], // Not systematically measured post-sort this way
              average: null
            },
            dryMatter: null, // N/A
            fleshColor: 'Variable (some browning in rejected fruit)', // Noted internal issue
            internalDefects: [
              { type: 'Vascular Browning', severity: 'Present in some rejected' },
              { type: 'Flesh Bruising', severity: 'Present in some rejected/processing' }
            ],
            photos: [
              { type: 'internal_quality_rejected', url: 'https://example.com/internal-rejected-adt.jpg' } // Changed photo type
            ]
          },
          sensoryEvaluation: { // N/A
            aroma: null,
            texture: null,
            taste: null,
            photos: []
          },
          finalAssessment: { // Summarizes sorting outcome
            qualityRating: 'Sorted: 60% Grade 2 / 30% Processing / 10% Rejected', // Changed rating to outcome
            primaryIssues: ['Chilling Injury', 'Uneven Ripening', 'Bruising'], // Kept issues
            recommendedAction: 'Store accepted lots appropriately, process/dispose of others', // Changed action
            actionDetails: 'Grade 2 stored at 6C for quick sale. Processing grade sent to juicing facility. Rejected disposed.', // Changed details
            finalStorageBay: 'Grade 2: Bay D1 / Processing: Outbound / Rejected: Waste', // Changed bay info
            inspectorRemarks: 'Sorting completed. Significant loss due to transit issues. Accepted Grade 2 Fuerte requires careful handling and expedited sale. Financial claim initiated with shipping line.', // Detailed remarks and outcome
            photos: [
              { type: 'final_storage_grade2', url: 'https://example.com/storage-g2-adt.jpg' }, // Changed photo type
              { type: 'waste_disposal_log', url: 'https://example.com/waste-log-adt.jpg' } // Changed photo type
            ]
          }
        }
      }),

      formatInspection({ // Updated seventh inspection - reflects lower grade product
        id: 'insp-020', // Changed ID
        type: 'Retail',
        date: '2023-06-29', // Changed date
        location: 'Discount Fresh Market, Sharjah, UAE', // Changed retailer type/location
        status: 'Passed (as Grade 2)', // Changed status
        qualityChecks: [
          { type: 'Physical', value: 'Fair', threshold: 'Fair (Grade 2)', status: 'Passed', details: 'Product displayed as Grade 2/Value. Some visual defects present but acceptable for grade.' }, // Matched quality to grade
          { type: 'Chemical', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'N/A.' },
          { type: 'Moisture', value: 'N/A', threshold: 'N/A', status: 'Passed', details: 'Firmness variable but mostly breaking/ripe.' } // Noted variability
        ],
        compliances: [
          { name: 'Display Standards (Grade 2)', status: 'Passed', details: 'Clear signage indicating Grade 2 / Value price.' }, // Specified grade display
          { name: 'Stock Rotation', status: 'Passed', details: 'FIFO appears to be followed for this lot.' } // Added check
        ],
        inspectionTools: [
          'Visual Check', // Simplified tools
          'Firmness Check (Manual)',
          'Digital Camera'
        ],
        notes: 'Grade 2 Fuerte avocados from sorted lot displayed appropriately at discount retailer. Quality consistent with grade, priced accordingly. Store managing stock rotation.', // Updated notes
        retailShelfDetails: { // Updated nested details consistently
          auditMetadata: { // Updated details
            dateTime: '2023-06-29T16:00:00Z', // Changed time
            auditorName: 'Importer Sales Rep (Fatima)', // Changed auditor type/name
            auditorId: 'ADT-SALES-02', // Changed ID
            storeName: 'Discount Fresh Market', // Changed store name
            storeLocation: 'Industrial Area, Sharjah, UAE', // Changed location
            storeContact: 'Mr. Khan', // Changed contact
            weatherConditions: 'Indoor (Basic AC)', // Changed conditions slightly
            photos: [
              { type: 'store_front_discount', url: 'https://example.com/store-discount-shj.jpg' } // Changed photo type/URL
            ]
          },
          displayArea: { // Updated details
            location: 'Promotional End Cap', // Changed location
            displayType: 'Ambient Bin', // Changed display type (common for value grade)
            cleanliness: 'Acceptable', // Downgraded cleanliness
            lighting: 'Basic', // Downgraded lighting
            posPresent: true,
            posCondition: 'Handwritten Sign', // Changed POS type
            posOriginAccuracy: 'Correct (Kenya)',
            overallAppeal: 'Fair (Value Proposition)', // Downgraded appeal
            photos: [
              { type: 'display_area_discount', url: 'https://example.com/display-discount-shj.jpg' },
              { type: 'pos_materials_value', url: 'https://example.com/pos-discount-shj.jpg' }
            ]
          },
          looseAvocados: { // Updated details for Grade 2
            variety: 'Fuerte (Grade 2)', // Specified grade
            originLabeling: 'Present',
            priceLabeling: 'Clear & Correct (Value Price)', // Noted value price
            ripenessMix: { // Mostly ready/breaking due to issues
              hardRipenAtHome: 10,
              breakingFirmRipe: 40,
              readyToEat: 45,
              overripe: 5
            },
            visualQuality: {
              sizeColorUniformity: 'Fair', // Downgraded
              damagedFruit: { // Higher level expected for Grade 2
                level: 'Noticeable',
                count: '~8-10%' // Estimated percentage
              },
              overripeMoldyFruit: {
                level: 'Some', // Increased level
                count: 2 // Specific count removed
              },
              handlingDamage: 'Some evident' // Noted damage
            },
            firmnessConsistency: 'Variable', // Noted inconsistency
            stockRotation: {
              olderStockMixed: false, // Still checking FIFO
              removalPercentage: 10 // Higher removal rate expected
            },
            photos: [
              { type: 'loose_avocados_grade2', url: 'https://example.com/loose-g2-shj.jpg' },
              { type: 'ripeness_stages_variable', url: 'https://example.com/ripeness-g2-shj.jpg' }
            ]
          },
          prePackaged: { // N/A for this scenario
            packageType: 'N/A',
            condition: '',
            labelingAccuracy: '',
            fruitVisibility: false,
            inPackQuality: null,
            fifoFollowed: false,
            photos: []
          },
          summary: { // Updated summary
            stockLevel: 'High (Needs quick sale)', // Noted need for speed
            overallQuality: 'Fair (Acceptable for Grade 2)', // Matched quality to grade
            immediateActions: 'Removed 2 overripe/moldy fruits. Advised manager on visual defects.', // Updated action
            storeRecommendations: 'Maintain prominent value pricing. Check display multiple times daily for overripes. Aim to clear stock within 2-3 days.', // Changed recommendations
            tfcRecommendations: 'Monitor sales velocity of Grade 2. Assess financial recovery vs loss.', // Changed recommendations (using TFC placeholder)
            auditorComments: 'Product quality consistent with Grade 2 designation following sorting. Store is aware of the need for rapid sale. Pricing reflects quality.' // Updated comments
          }
        }
      })
    ]
  } // NOTE: Remember to add a comma after the previous object in the mockTrades array.

 // NOTE: You would add a comma after the first object in the mockTrades array before inserting this new object.
];
