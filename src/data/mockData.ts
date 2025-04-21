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
];
