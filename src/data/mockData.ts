
import { Trade, KPIData } from '../types';

export const mockTrades: Trade[] = [
  {
    id: '1',
    tradeNumber: 'AVT-2023-001',
    supplier: 'Green Avocado Farms',
    supplierCountry: 'Mexico',
    buyer: 'Fresh & Healthy Ltd',
    buyerCountry: 'United States',
    productType: 'Hass Avocado',
    quantity: '10,000 kg',
    departureDate: '2023-04-01',
    arrivalDate: '2023-04-08',
    status: 'Completed',
    inspections: [
      {
        id: 'insp-001',
        type: 'Post-Harvest',
        date: '2023-03-28',
        location: 'Michoacán, Mexico',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '8.5/10', threshold: '7/10' },
          { type: 'Chemical', status: 'Passed', value: '0.02 ppm', threshold: '< 0.05 ppm' },
          { type: 'Moisture', status: 'Passed', value: '72%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'USDA Organic', status: 'Passed', details: 'Certificate #ORG-2023-456' },
          { name: 'Global GAP', status: 'Passed', details: 'Certificate #GG-2023-789' }
        ],
        inspectionTools: ['AvocaDrone X3', 'QualityScan Pro'],
        lab: {
          name: 'AgriLab Mexico',
          location: 'Mexico City',
          contactPerson: 'Dr. Martinez'
        },
        notes: 'Excellent quality batch, properly sorted and graded.'
      },
      {
        id: 'insp-002',
        type: 'Pre-Shipment',
        date: '2023-03-30',
        location: 'Veracruz Port, Mexico',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '8.2/10', threshold: '7/10' },
          { type: 'Moisture', status: 'Passed', value: '71%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'Container Integrity', status: 'Passed', details: 'Temperature control operational' },
          { name: 'Packaging Compliance', status: 'Passed', details: 'All packaging materials food-grade' }
        ],
        inspectionTools: ['TempTrack Pro', 'ContainerScan X2'],
        notes: 'Container properly sealed and maintained at optimal temperature.'
      },
      {
        id: 'insp-003',
        type: 'On-Arrival',
        date: '2023-04-08',
        location: 'Los Angeles, USA',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '8.0/10', threshold: '7/10' },
          { type: 'Chemical', status: 'Passed', value: '0.03 ppm', threshold: '< 0.05 ppm' },
          { type: 'Moisture', status: 'Passed', value: '70%', threshold: '68-75%' }
        ],
        compliances: [
          { name: 'FDA Compliance', status: 'Passed', details: 'Meets all import requirements' },
          { name: 'USDA Regulations', status: 'Passed', details: 'All paperwork in order' }
        ],
        inspectionTools: ['QualityScan Pro', 'AvocaDrone X3'],
        lab: {
          name: 'US AgroTech Labs',
          location: 'Los Angeles',
          contactPerson: 'Dr. Johnson'
        }
      },
      {
        id: 'insp-004',
        type: 'Warehouse',
        date: '2023-04-09',
        location: 'Fresh & Healthy Warehouse, CA',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '7.9/10', threshold: '7/10' },
          { type: 'Moisture', status: 'Passed', value: '69%', threshold: '65-75%' }
        ],
        compliances: [
          { name: 'Storage Conditions', status: 'Passed', details: 'Temperature and humidity optimal' },
          { name: 'Shelf Life Assessment', status: 'Passed', details: 'Estimated 7 days remaining' }
        ],
        inspectionTools: ['RipeScan Pro', 'TempTrack Pro'],
        notes: 'Product properly stored in temperature-controlled environment.'
      }
    ]
  },
  {
    id: '2',
    tradeNumber: 'AVT-2023-002',
    supplier: 'Avocado Elite Farm',
    supplierCountry: 'Peru',
    buyer: 'Organica Grocery Chain',
    buyerCountry: 'Canada',
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
        location: 'Lima, Peru',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '8.7/10', threshold: '7/10' },
          { type: 'Chemical', status: 'Passed', value: '0.01 ppm', threshold: '< 0.05 ppm' },
          { type: 'Moisture', status: 'Passed', value: '73%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'Organic Certification', status: 'Passed', details: 'Certificate #ORG-2023-789' },
          { name: 'Global GAP', status: 'Passed', details: 'Certificate #GG-2023-456' }
        ],
        inspectionTools: ['AvocaDrone X3', 'QualityScan Pro'],
        lab: {
          name: 'PeruLab',
          location: 'Lima',
          contactPerson: 'Dr. Rodriguez'
        }
      },
      {
        id: 'insp-006',
        type: 'Pre-Shipment',
        date: '2023-04-14',
        location: 'Callao Port, Peru',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '8.5/10', threshold: '7/10' },
          { type: 'Moisture', status: 'Passed', value: '72%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'Container Integrity', status: 'Passed', details: 'Temperature control operational' },
          { name: 'Packaging Compliance', status: 'Passed', details: 'All packaging materials food-grade' }
        ],
        inspectionTools: ['TempTrack Pro', 'ContainerScan X2']
      },
      {
        id: 'insp-007',
        type: 'On-Arrival',
        date: '2023-04-25',
        location: 'Vancouver, Canada',
        status: 'Failed',
        qualityChecks: [
          { type: 'Physical', status: 'Failed', value: '6.5/10', threshold: '7/10' },
          { type: 'Chemical', status: 'Passed', value: '0.02 ppm', threshold: '< 0.05 ppm' },
          { type: 'Moisture', status: 'Passed', value: '71%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'CFIA Regulations', status: 'Passed', details: 'Meets all import requirements' },
          { name: 'Temperature Log', status: 'Failed', details: 'Temperature fluctuations detected during transit' }
        ],
        inspectionTools: ['QualityScan Pro', 'TempTrack Pro'],
        lab: {
          name: 'Canadian Food Safety Lab',
          location: 'Vancouver',
          contactPerson: 'Dr. Thompson'
        },
        notes: 'Some physical damage detected, likely due to temperature fluctuations during shipping.'
      }
    ]
  },
  {
    id: '3',
    tradeNumber: 'AVT-2023-003',
    supplier: 'Sunshine Avocado Co.',
    supplierCountry: 'Colombia',
    buyer: 'European Fruit Distributors',
    buyerCountry: 'Spain',
    productType: 'Hass Avocado',
    quantity: '12,000 kg',
    departureDate: '2023-05-01',
    status: 'In Transit',
    inspections: [
      {
        id: 'insp-008',
        type: 'Post-Harvest',
        date: '2023-04-28',
        location: 'Bogotá, Colombia',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '8.3/10', threshold: '7/10' },
          { type: 'Chemical', status: 'Passed', value: '0.02 ppm', threshold: '< 0.05 ppm' },
          { type: 'Moisture', status: 'Passed', value: '72%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'EU Import Standards', status: 'Passed', details: 'Certificate #EU-2023-123' },
          { name: 'Global GAP', status: 'Passed', details: 'Certificate #GG-2023-789' }
        ],
        inspectionTools: ['AvocaDrone X3', 'QualityScan Pro'],
        lab: {
          name: 'AgroLab Colombia',
          location: 'Bogotá',
          contactPerson: 'Dr. Santos'
        }
      },
      {
        id: 'insp-009',
        type: 'Pre-Shipment',
        date: '2023-04-30',
        location: 'Cartagena Port, Colombia',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '8.1/10', threshold: '7/10' },
          { type: 'Moisture', status: 'Passed', value: '71%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'Container Integrity', status: 'Passed', details: 'Temperature control operational' },
          { name: 'Packaging Compliance', status: 'Passed', details: 'All packaging materials food-grade and EU compliant' }
        ],
        inspectionTools: ['TempTrack Pro', 'ContainerScan X2'],
        notes: 'Container properly sealed and maintained at optimal temperature. All EU import documentation prepared.'
      }
    ]
  },
  {
    id: '4',
    tradeNumber: 'AVT-2023-004',
    supplier: 'Green Valley Farms',
    supplierCountry: 'Chile',
    buyer: 'Premium Foods Inc.',
    buyerCountry: 'United States',
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
        location: 'Santiago, Chile',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '8.0/10', threshold: '7/10' },
          { type: 'Chemical', status: 'Passed', value: '0.03 ppm', threshold: '< 0.05 ppm' },
          { type: 'Moisture', status: 'Passed', value: '72%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'USDA Organic', status: 'Passed', details: 'Certificate #ORG-2023-123' },
          { name: 'Global GAP', status: 'Passed', details: 'Certificate #GG-2023-456' }
        ],
        inspectionTools: ['AvocaDrone X3', 'QualityScan Pro'],
        lab: {
          name: 'ChileLab Agricola',
          location: 'Santiago',
          contactPerson: 'Dr. Fernandez'
        }
      },
      {
        id: 'insp-011',
        type: 'Pre-Shipment',
        date: '2023-03-14',
        location: 'Valparaíso Port, Chile',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '7.8/10', threshold: '7/10' },
          { type: 'Moisture', status: 'Passed', value: '71%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'Container Integrity', status: 'Passed', details: 'Temperature control operational' },
          { name: 'Packaging Compliance', status: 'Passed', details: 'All packaging materials food-grade' }
        ],
        inspectionTools: ['TempTrack Pro', 'ContainerScan X2']
      },
      {
        id: 'insp-012',
        type: 'On-Arrival',
        date: '2023-03-28',
        location: 'Miami, USA',
        status: 'Failed',
        qualityChecks: [
          { type: 'Physical', status: 'Failed', value: '5.5/10', threshold: '7/10' },
          { type: 'Chemical', status: 'Failed', value: '0.08 ppm', threshold: '< 0.05 ppm' },
          { type: 'Moisture', status: 'Failed', value: '80%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'FDA Compliance', status: 'Failed', details: 'Chemical residue exceeds limits' },
          { name: 'USDA Regulations', status: 'Failed', details: 'Quality standards not met' }
        ],
        inspectionTools: ['QualityScan Pro', 'ChemAnalyzer X1'],
        lab: {
          name: 'US AgroTech Labs',
          location: 'Miami',
          contactPerson: 'Dr. Williams'
        },
        notes: 'Significant quality deterioration during transit. Signs of fungal growth and excessive ripening. Container temperature log shows multiple critical failures.'
      }
    ]
  },
  {
    id: '5',
    tradeNumber: 'AVT-2023-005',
    supplier: 'Pure Avocado Farms',
    supplierCountry: 'Mexico',
    buyer: 'Green Grocers Ltd',
    buyerCountry: 'United Kingdom',
    productType: 'Hass Avocado',
    quantity: '9,000 kg',
    departureDate: '2023-05-10',
    status: 'In Transit',
    inspections: [
      {
        id: 'insp-013',
        type: 'Post-Harvest',
        date: '2023-05-07',
        location: 'Jalisco, Mexico',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '8.6/10', threshold: '7/10' },
          { type: 'Chemical', status: 'Passed', value: '0.01 ppm', threshold: '< 0.05 ppm' },
          { type: 'Moisture', status: 'Passed', value: '73%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'UK Organic Standards', status: 'Passed', details: 'Certificate #UK-2023-789' },
          { name: 'Global GAP', status: 'Passed', details: 'Certificate #GG-2023-123' }
        ],
        inspectionTools: ['AvocaDrone X3', 'QualityScan Pro'],
        lab: {
          name: 'MexicoLab Quality',
          location: 'Guadalajara',
          contactPerson: 'Dr. Lopez'
        }
      },
      {
        id: 'insp-014',
        type: 'Pre-Shipment',
        date: '2023-05-09',
        location: 'Manzanillo Port, Mexico',
        status: 'Passed',
        qualityChecks: [
          { type: 'Physical', status: 'Passed', value: '8.4/10', threshold: '7/10' },
          { type: 'Moisture', status: 'Passed', value: '72%', threshold: '70-75%' }
        ],
        compliances: [
          { name: 'Container Integrity', status: 'Passed', details: 'Temperature control operational' },
          { name: 'Packaging Compliance', status: 'Passed', details: 'All packaging materials food-grade and UK compliant' }
        ],
        inspectionTools: ['TempTrack Pro', 'ContainerScan X2'],
        notes: 'All UK import documentation properly prepared. Container equipped with advanced temperature monitoring system.'
      }
    ]
  }
];

export const mockKPIData: KPIData = {
  rejectionRates: {
    quantity: 2,
    percentage: 22.2,
    byRegion: [
      { region: 'Mexico', quantity: 0, percentage: 0 },
      { region: 'Peru', quantity: 1, percentage: 50 },
      { region: 'Chile', quantity: 1, percentage: 100 },
      { region: 'Colombia', quantity: 0, percentage: 0 }
    ],
    bySupplier: [
      { supplier: 'Green Avocado Farms', quantity: 0, percentage: 0 },
      { supplier: 'Avocado Elite Farm', quantity: 1, percentage: 100 },
      { supplier: 'Sunshine Avocado Co.', quantity: 0, percentage: 0 },
      { supplier: 'Green Valley Farms', quantity: 1, percentage: 100 },
      { supplier: 'Pure Avocado Farms', quantity: 0, percentage: 0 }
    ]
  },
  complianceBreaches: {
    quantity: 3,
    percentage: 33.3,
    byRegion: [
      { region: 'Mexico', quantity: 0, percentage: 0 },
      { region: 'Peru', quantity: 1, percentage: 50 },
      { region: 'Chile', quantity: 2, percentage: 100 },
      { region: 'Colombia', quantity: 0, percentage: 0 }
    ],
    bySupplier: [
      { supplier: 'Green Avocado Farms', quantity: 0, percentage: 0 },
      { supplier: 'Avocado Elite Farm', quantity: 1, percentage: 100 },
      { supplier: 'Sunshine Avocado Co.', quantity: 0, percentage: 0 },
      { supplier: 'Green Valley Farms', quantity: 2, percentage: 100 },
      { supplier: 'Pure Avocado Farms', quantity: 0, percentage: 0 }
    ]
  }
};
