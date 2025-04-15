
import { Trade, KPIData } from '../types';

export const mockTrades: Trade[] = [
  {
    id: '1',
    tradeNumber: 'AVT-2023-001',
    supplier: 'Green Highlands Avocado Farm',
    supplierCountry: 'Kenya',
    buyer: 'Fresh Emirates Trading LLC',
    buyerCountry: 'United Arab Emirates',
    productType: 'Hass Avocado',
    quantity: '12,000 kg',
    departureDate: '2023-04-01',
    arrivalDate: '2023-04-08',
    status: 'Completed',
    inspections: [
      {
        id: 'insp-001',
        type: 'Post-Harvest',
        date: '2023-03-28',
        location: 'Nairobi, Kenya',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '8.5/10', 
            threshold: '7/10',
            details: 'Size uniformity (95%), Color development (dark green), Skin damage (<3%), Maturity stage (proper), No pest damage'
          },
          { 
            type: 'Chemical', 
            status: 'Passed', 
            value: '0.02 ppm', 
            threshold: '< 0.05 ppm',
            details: 'Pesticide residue (0.02 ppm), Heavy metals (below detection limit), No prohibited chemicals'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '72%', 
            threshold: '70-75%',
            details: 'Optimal moisture content for transport and shelf life'
          }
        ],
        compliances: [
          { 
            name: 'UAE Food Import Standards', 
            status: 'Passed', 
            details: 'Certificate #UAE-ADAFSA-2023-456, meets all Gulf Standard Organization requirements' 
          },
          { 
            name: 'KEPHIS Phytosanitary Certificate', 
            status: 'Passed', 
            details: 'Certificate #KE-PHY-2023-789, pest-free declaration issued' 
          },
          { 
            name: 'Global GAP', 
            status: 'Passed', 
            details: 'Certificate #GG-2023-789, all good agricultural practices verified' 
          }
        ],
        inspectionTools: ['AvocaDrone X3', 'QualityScan Pro', 'MoistureMeter 2000'],
        lab: {
          name: 'Kenya Agricultural Labs',
          location: 'Nairobi, Kenya',
          contactPerson: 'Dr. Kimani'
        },
        notes: 'Excellent quality batch, properly sorted and graded according to UAE market preferences. Extra care taken with cold chain management.'
      },
      {
        id: 'insp-002',
        type: 'Pre-Shipment',
        date: '2023-03-30',
        location: 'Mombasa Port, Kenya',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '8.2/10', 
            threshold: '7/10',
            details: 'Package integrity (100%), Palletization quality (excellent), Proper labeling (complete)'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '71%', 
            threshold: '70-75%',
            details: 'Stable moisture levels maintain fruit quality during transit'
          }
        ],
        compliances: [
          { 
            name: 'Container Integrity', 
            status: 'Passed', 
            details: 'Temperature control operational, set at 5.5°C, humidity at 90%' 
          },
          { 
            name: 'Packaging Compliance', 
            status: 'Passed', 
            details: 'All packaging materials food-grade and halal-certified as per UAE requirements' 
          },
          { 
            name: 'Export Documentation', 
            status: 'Passed', 
            details: 'Certificate of Origin, Commercial Invoice, Packing List verified' 
          }
        ],
        inspectionTools: ['TempTrack Pro', 'ContainerScan X2', 'HumidityLogger'],
        notes: 'Container properly sealed and maintained at optimal temperature. All documentation in order for UAE customs clearance.'
      },
      {
        id: 'insp-003',
        type: 'On-Arrival',
        date: '2023-04-08',
        location: 'Dubai, UAE',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '8.0/10', 
            threshold: '7/10',
            details: 'Ripeness stage (ideal), Firmness (good), Overall appearance (excellent)'
          },
          { 
            type: 'Chemical', 
            status: 'Passed', 
            value: '0.03 ppm', 
            threshold: '< 0.05 ppm',
            details: 'Pesticide residue (0.03 ppm), Ethylene levels (normal)'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '70%', 
            threshold: '68-75%',
            details: 'Moisture content appropriate for UAE market conditions'
          }
        ],
        compliances: [
          { 
            name: 'UAE ADAFSA Inspection', 
            status: 'Passed', 
            details: 'Dubai Municipality food safety team verified compliance with UAE.S GSO 2203:2017 standard' 
          },
          { 
            name: 'Halal Certification', 
            status: 'Passed', 
            details: 'Handling processes verified to maintain halal integrity' 
          },
          { 
            name: 'Customs Clearance', 
            status: 'Passed', 
            details: 'All import duties paid and documentation verified' 
          }
        ],
        inspectionTools: ['QualityScan Pro', 'AvocaDrone X3', 'TempTrack Pro'],
        lab: {
          name: 'UAE Food Control Laboratory',
          location: 'Dubai, UAE',
          contactPerson: 'Dr. Al-Mansoori'
        }
      },
      {
        id: 'insp-004',
        type: 'Warehouse',
        date: '2023-04-09',
        location: 'Fresh Emirates Warehouse, Dubai',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '7.9/10', 
            threshold: '7/10',
            details: 'Display quality (excellent), Shelf arrangement (optimal), Consumer packaging integrity (100%)'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '69%', 
            threshold: '65-75%',
            details: 'Moisture levels appropriate for UAE retail environment'
          }
        ],
        compliances: [
          { 
            name: 'Storage Conditions', 
            status: 'Passed', 
            details: 'Temperature (5°C) and humidity (85%) optimal for UAE climate conditions' 
          },
          { 
            name: 'Shelf Life Assessment', 
            status: 'Passed', 
            details: 'Estimated 7 days remaining in ideal retail conditions' 
          },
          { 
            name: 'UAE Retail Standards', 
            status: 'Passed', 
            details: 'All labeling in Arabic and English, nutrition facts compliant with UAE regulations' 
          }
        ],
        inspectionTools: ['RipeScan Pro', 'TempTrack Pro', 'ShelfLife Analyzer'],
        notes: 'Product properly stored in temperature-controlled environment optimized for UAE market conditions.'
      }
    ]
  },
  {
    id: '2',
    tradeNumber: 'AVT-2023-002',
    supplier: 'Kenyan Avocado Cooperative',
    supplierCountry: 'Kenya',
    buyer: 'Royal Greens Trading',
    buyerCountry: 'United Arab Emirates',
    productType: 'Hass Avocado',
    quantity: '8,500 kg',
    departureDate: '2023-04-15',
    arrivalDate: '2023-04-25',
    status: 'Completed',
    inspections: [
      {
        id: 'insp-005',
        type: 'Post-Harvest',
        date: '2023-04-12',
        location: 'Nakuru, Kenya',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '8.7/10', 
            threshold: '7/10',
            details: 'Size grading (premium), External appearance (excellent), Weight consistency (92%)'
          },
          { 
            type: 'Chemical', 
            status: 'Passed', 
            value: '0.01 ppm', 
            threshold: '< 0.05 ppm',
            details: 'Pesticide residue (minimal), Fungicide levels (within limits), No prohibited substances'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '73%', 
            threshold: '70-75%',
            details: 'Ideal moisture levels for export quality'
          }
        ],
        compliances: [
          { 
            name: 'UAE Food Import Standards', 
            status: 'Passed', 
            details: 'Certificate #UAE-ADAFSA-2023-789, meets all Gulf Standard Organization requirements' 
          },
          { 
            name: 'KEPHIS Certification', 
            status: 'Passed', 
            details: 'Certificate #KE-PHY-2023-456, pest-free declaration issued' 
          },
          { 
            name: 'Global GAP', 
            status: 'Passed', 
            details: 'Certificate #GG-2023-123, all good agricultural practices verified' 
          }
        ],
        inspectionTools: ['AvocaDrone X3', 'QualityScan Pro', 'ResidueAnalyzer 3000'],
        lab: {
          name: 'Kenya Plant Health Inspection Service',
          location: 'Nakuru, Kenya',
          contactPerson: 'Dr. Omondi'
        }
      },
      {
        id: 'insp-006',
        type: 'Pre-Shipment',
        date: '2023-04-14',
        location: 'Mombasa Port, Kenya',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '8.5/10', 
            threshold: '7/10',
            details: 'Packaging quality (excellent), Carton strength (superior), Stacking arrangement (optimal)'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '72%', 
            threshold: '70-75%',
            details: 'Consistent moisture levels across all pallets'
          }
        ],
        compliances: [
          { 
            name: 'Container Integrity', 
            status: 'Passed', 
            details: 'Temperature control operational, set at 5.0°C, humidity at 90%' 
          },
          { 
            name: 'Packaging Compliance', 
            status: 'Passed', 
            details: 'All packaging materials food-grade and halal-certified as per UAE requirements' 
          },
          { 
            name: 'Export Documentation', 
            status: 'Passed', 
            details: 'All required documents for UAE customs verified and complete' 
          }
        ],
        inspectionTools: ['TempTrack Pro', 'ContainerScan X2', 'DocVerify System']
      },
      {
        id: 'insp-007',
        type: 'On-Arrival',
        date: '2023-04-25',
        location: 'Abu Dhabi, UAE',
        status: 'Failed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Failed', 
            value: '6.5/10', 
            threshold: '7/10',
            details: 'Evidence of poor temperature control during transit, 15% of fruit showing cold damage'
          },
          { 
            type: 'Chemical', 
            status: 'Passed', 
            value: '0.02 ppm', 
            threshold: '< 0.05 ppm',
            details: 'Chemical analysis within acceptable parameters'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '71%', 
            threshold: '70-75%',
            details: 'Moisture content acceptable despite temperature issues'
          }
        ],
        compliances: [
          { 
            name: 'ADAFSA Regulations', 
            status: 'Passed', 
            details: 'Meets basic import requirements' 
          },
          { 
            name: 'Temperature Log', 
            status: 'Failed', 
            details: 'Temperature fluctuations detected during transit, fell below 2°C for 6 hours' 
          },
          { 
            name: 'UAE Quality Standards', 
            status: 'Failed', 
            details: 'Physical condition does not meet premium grade requirements as specified in contract' 
          }
        ],
        inspectionTools: ['QualityScan Pro', 'TempTrack Pro', 'ColdDamage Analyzer'],
        lab: {
          name: 'Abu Dhabi Food Control Authority Lab',
          location: 'Abu Dhabi, UAE',
          contactPerson: 'Dr. Al-Hashimi'
        },
        notes: 'Temperature monitoring equipment failure identified. Shipment placed on hold pending negotiation with supplier.'
      }
    ]
  },
  {
    id: '3',
    tradeNumber: 'AVT-2023-003',
    supplier: 'Rift Valley Avocado Farms',
    supplierCountry: 'Kenya',
    buyer: 'Al Wahat Fresh Produce',
    buyerCountry: 'United Arab Emirates',
    productType: 'Hass Avocado',
    quantity: '12,000 kg',
    departureDate: '2023-05-01',
    status: 'In Transit',
    inspections: [
      {
        id: 'insp-008',
        type: 'Post-Harvest',
        date: '2023-04-28',
        location: 'Eldoret, Kenya',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '8.3/10', 
            threshold: '7/10',
            details: 'Fruit size uniformity (90%), Shape consistency (excellent), Color development (proper)'
          },
          { 
            type: 'Chemical', 
            status: 'Passed', 
            value: '0.02 ppm', 
            threshold: '< 0.05 ppm',
            details: 'Pesticide residue below UAE tolerance limits, No banned substances detected'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '72%', 
            threshold: '70-75%',
            details: 'Optimal moisture content for long-distance shipping'
          }
        ],
        compliances: [
          { 
            name: 'UAE Import Standards', 
            status: 'Passed', 
            details: 'Certificate #UAE-ADAFSA-2023-901, meets all Gulf Standard Organization requirements' 
          },
          { 
            name: 'KEPHIS Phytosanitary', 
            status: 'Passed', 
            details: 'Certificate #KE-PHY-2023-789, all pest control measures verified' 
          },
          { 
            name: 'Global GAP', 
            status: 'Passed', 
            details: 'Certificate #GG-2023-456, sustainable farming practices confirmed' 
          }
        ],
        inspectionTools: ['AvocaDrone X3', 'QualityScan Pro', 'PesticideDetector 2000'],
        lab: {
          name: 'Kenya Agricultural Research Lab',
          location: 'Eldoret, Kenya',
          contactPerson: 'Dr. Wangari'
        }
      },
      {
        id: 'insp-009',
        type: 'Pre-Shipment',
        date: '2023-04-30',
        location: 'Mombasa Port, Kenya',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '8.1/10', 
            threshold: '7/10',
            details: 'Packaging integrity (100%), Label compliance (complete), Palletization quality (excellent)'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '71%', 
            threshold: '70-75%',
            details: 'Consistent moisture readings across sample points'
          }
        ],
        compliances: [
          { 
            name: 'Container Integrity', 
            status: 'Passed', 
            details: 'Temperature control operational, set at 5.5°C, humidity at 90%, new calibrated sensors installed' 
          },
          { 
            name: 'Packaging Compliance', 
            status: 'Passed', 
            details: 'All packaging materials food-grade and halal-certified as per UAE requirements' 
          },
          { 
            name: 'UAE Documentation', 
            status: 'Passed', 
            details: 'All required documentation for UAE market entry complete and verified' 
          }
        ],
        inspectionTools: ['TempTrack Pro', 'ContainerScan X2', 'HumidityMonitor Advanced'],
        notes: 'Container properly sealed and maintained at optimal temperature. Additional temperature monitoring equipment installed due to previous shipment issues. All UAE import documentation prepared.'
      }
    ]
  },
  {
    id: '4',
    tradeNumber: 'AVT-2023-004',
    supplier: 'Mount Kenya Organics',
    supplierCountry: 'Kenya',
    buyer: 'Emirates Organic Foods',
    buyerCountry: 'United Arab Emirates',
    productType: 'Hass Avocado',
    quantity: '15,000 kg',
    departureDate: '2023-03-15',
    arrivalDate: '2023-03-28',
    status: 'Rejected',
    inspections: [
      {
        id: 'insp-010',
        type: 'Post-Harvest',
        date: '2023-03-12',
        location: 'Nyeri, Kenya',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '8.0/10', 
            threshold: '7/10',
            details: 'Size grading (premium), External appearance (excellent), Stem cut quality (clean)'
          },
          { 
            type: 'Chemical', 
            status: 'Passed', 
            value: '0.03 ppm', 
            threshold: '< 0.05 ppm',
            details: 'Organic certification verified, No synthetic pesticides detected'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '72%', 
            threshold: '70-75%',
            details: 'Moisture content within optimal range for export'
          }
        ],
        compliances: [
          { 
            name: 'UAE Organic Import Standards', 
            status: 'Passed', 
            details: 'Certificate #UAE-ORG-2023-123, meets Emirates Authority for Standardization & Metrology requirements' 
          },
          { 
            name: 'KEPHIS Organic Certification', 
            status: 'Passed', 
            details: 'Certificate #KE-ORG-2023-456, organic growing practices verified' 
          },
          { 
            name: 'Global GAP', 
            status: 'Passed', 
            details: 'Certificate #GG-2023-789, sustainable farming practices confirmed' 
          }
        ],
        inspectionTools: ['OrganicVerifier Pro', 'QualityScan Pro', 'AvocaDrone X3'],
        lab: {
          name: 'Kenya Organic Certification Lab',
          location: 'Nyeri, Kenya',
          contactPerson: 'Dr. Njoroge'
        }
      },
      {
        id: 'insp-011',
        type: 'Pre-Shipment',
        date: '2023-03-14',
        location: 'Mombasa Port, Kenya',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '7.8/10', 
            threshold: '7/10',
            details: 'Packaging integrity (good), Stacking arrangement (proper), Label compliance (complete)'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '71%', 
            threshold: '70-75%',
            details: 'Moisture readings consistent across all pallets'
          }
        ],
        compliances: [
          { 
            name: 'Container Integrity', 
            status: 'Passed', 
            details: 'Temperature control operational, set at 5.5°C, humidity at 90%' 
          },
          { 
            name: 'Organic Packaging Compliance', 
            status: 'Passed', 
            details: 'All packaging materials eco-friendly and compliant with UAE organic standards' 
          },
          { 
            name: 'Export Documentation', 
            status: 'Passed', 
            details: 'All organic certification and export documents verified' 
          }
        ],
        inspectionTools: ['TempTrack Pro', 'ContainerScan X2', 'OrganicVerifier Pro']
      },
      {
        id: 'insp-012',
        type: 'On-Arrival',
        date: '2023-03-28',
        location: 'Dubai, UAE',
        status: 'Failed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Failed', 
            value: '5.5/10', 
            threshold: '7/10',
            details: 'Extensive fungal growth detected on 40% of fruit, Black spots present, Accelerated ripening'
          },
          { 
            type: 'Chemical', 
            status: 'Failed', 
            value: '0.08 ppm', 
            threshold: '< 0.05 ppm',
            details: 'Elevated ethylene levels, Mycotoxin presence detected at 0.08 ppm (above UAE limits)'
          },
          { 
            type: 'Moisture', 
            status: 'Failed', 
            value: '80%', 
            threshold: '70-75%',
            details: 'Excessive moisture content indicating improper ventilation during transit'
          }
        ],
        compliances: [
          { 
            name: 'UAE Food Safety Compliance', 
            status: 'Failed', 
            details: 'Mycotoxin levels exceed UAE maximum residue limits' 
          },
          { 
            name: 'ADAFSA Regulations', 
            status: 'Failed', 
            details: 'Visual quality standards not met, potential health risk identified' 
          },
          { 
            name: 'Organic Certification', 
            status: 'Failed', 
            details: 'Product condition compromised, no longer suitable for premium organic market' 
          }
        ],
        inspectionTools: ['QualityScan Pro', 'ChemAnalyzer X1', 'MycotoxinDetector'],
        lab: {
          name: 'Dubai Central Food Lab',
          location: 'Dubai, UAE',
          contactPerson: 'Dr. Al-Falasi'
        },
        notes: 'Significant quality deterioration during transit. Signs of fungal growth and excessive ripening. Container temperature log shows multiple critical failures. Full shipment rejected and documentation submitted to Kenyan authorities for investigation. Humidity control system failure suspected.'
      }
    ]
  },
  {
    id: '5',
    tradeNumber: 'AVT-2023-005',
    supplier: 'Machakos Avocado Growers',
    supplierCountry: 'Kenya',
    buyer: 'Sharjah Fruit Importers',
    buyerCountry: 'United Arab Emirates',
    productType: 'Hass Avocado',
    quantity: '9,000 kg',
    departureDate: '2023-05-10',
    status: 'In Transit',
    inspections: [
      {
        id: 'insp-013',
        type: 'Post-Harvest',
        date: '2023-05-07',
        location: 'Machakos, Kenya',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '8.6/10', 
            threshold: '7/10',
            details: 'Size uniformity (excellent), Color consistency (proper), Defect-free (95%)'
          },
          { 
            type: 'Chemical', 
            status: 'Passed', 
            value: '0.01 ppm', 
            threshold: '< 0.05 ppm',
            details: 'Pesticide residue minimal, No prohibited substances for UAE market detected'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '73%', 
            threshold: '70-75%',
            details: 'Optimal moisture content for long-distance shipping'
          }
        ],
        compliances: [
          { 
            name: 'UAE Import Standards', 
            status: 'Passed', 
            details: 'Certificate #UAE-ADAFSA-2023-567, meets all Gulf Standard Organization requirements' 
          },
          { 
            name: 'KEPHIS Certification', 
            status: 'Passed', 
            details: 'Certificate #KE-PHY-2023-234, pest-free declaration issued' 
          },
          { 
            name: 'Global GAP', 
            status: 'Passed', 
            details: 'Certificate #GG-2023-890, good agricultural practices verified' 
          }
        ],
        inspectionTools: ['AvocaDrone X3', 'QualityScan Pro', 'DensityAnalyzer'],
        lab: {
          name: 'Kenya Agriculture and Food Authority Lab',
          location: 'Machakos, Kenya',
          contactPerson: 'Dr. Mwangi'
        }
      },
      {
        id: 'insp-014',
        type: 'Pre-Shipment',
        date: '2023-05-09',
        location: 'Mombasa Port, Kenya',
        status: 'Passed',
        qualityChecks: [
          { 
            type: 'Physical', 
            status: 'Passed', 
            value: '8.4/10', 
            threshold: '7/10',
            details: 'Packaging quality (superior), Carton strength (excellent), Labeling compliance (100%)'
          },
          { 
            type: 'Moisture', 
            status: 'Passed', 
            value: '72%', 
            threshold: '70-75%',
            details: 'Consistent moisture levels appropriate for sea transportation'
          }
        ],
        compliances: [
          { 
            name: 'Container Integrity', 
            status: 'Passed', 
            details: 'Temperature control operational, set at 5.0°C, humidity at 90%, triple redundant monitoring installed' 
          },
          { 
            name: 'Packaging Compliance', 
            status: 'Passed', 
            details: 'All packaging materials food-grade and halal-certified as per UAE requirements' 
          },
          { 
            name: 'UAE Custom Requirements', 
            status: 'Passed', 
            details: 'All documentation prepared according to latest UAE import regulations' 
          }
        ],
        inspectionTools: ['TempTrack Pro', 'ContainerScan X2', 'SmartSensor Network'],
        notes: 'Container properly sealed and maintained at optimal temperature. Enhanced temperature and humidity monitoring systems installed with satellite reporting. All UAE import documentation prepared with additional verification steps.'
      }
    ]
  }
];

export const mockKPIData: KPIData = {
  rejectionRates: {
    quantity: 2,
    percentage: 22.2,
    byRegion: [
      { region: 'Nairobi, Kenya', quantity: 0, percentage: 0 },
      { region: 'Nakuru, Kenya', quantity: 1, percentage: 50 },
      { region: 'Nyeri, Kenya', quantity: 1, percentage: 100 },
      { region: 'Eldoret, Kenya', quantity: 0, percentage: 0 },
      { region: 'Machakos, Kenya', quantity: 0, percentage: 0 }
    ],
    bySupplier: [
      { supplier: 'Green Highlands Avocado Farm', quantity: 0, percentage: 0 },
      { supplier: 'Kenyan Avocado Cooperative', quantity: 1, percentage: 100 },
      { supplier: 'Rift Valley Avocado Farms', quantity: 0, percentage: 0 },
      { supplier: 'Mount Kenya Organics', quantity: 1, percentage: 100 },
      { supplier: 'Machakos Avocado Growers', quantity: 0, percentage: 0 }
    ]
  },
  complianceBreaches: {
    quantity: 3,
    percentage: 33.3,
    byRegion: [
      { region: 'Nairobi, Kenya', quantity: 0, percentage: 0 },
      { region: 'Nakuru, Kenya', quantity: 1, percentage: 50 },
      { region: 'Nyeri, Kenya', quantity: 2, percentage: 100 },
      { region: 'Eldoret, Kenya', quantity: 0, percentage: 0 },
      { region: 'Machakos, Kenya', quantity: 0, percentage: 0 }
    ],
    bySupplier: [
      { supplier: 'Green Highlands Avocado Farm', quantity: 0, percentage: 0 },
      { supplier: 'Kenyan Avocado Cooperative', quantity: 1, percentage: 100 },
      { supplier: 'Rift Valley Avocado Farms', quantity: 0, percentage: 0 },
      { supplier: 'Mount Kenya Organics', quantity: 2, percentage: 100 },
      { supplier: 'Machakos Avocado Growers', quantity: 0, percentage: 0 }
    ]
  }
};
