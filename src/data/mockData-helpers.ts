
// Helper function to ensure all inspection objects have createdAt and updatedAt properties
export const formatInspection = (inspection: any) => {
  // If createdAt and updatedAt don't exist, add them based on the date
  if (!inspection.createdAt) {
    const date = new Date(inspection.date);
    inspection.createdAt = date.toISOString();
    inspection.updatedAt = date.toISOString();
  }
  
  // Make sure the postHarvestDetails object has all required nested objects initialized
  // if (inspection.type === 'Post-Harvest' && inspection.postHarvestDetails) {
  //   const details = inspection.postHarvestDetails;
    
  //   // Ensure all required nested objects exist to prevent "cannot read property of undefined" errors
  //   details.farmIdentification = details.farmIdentification || {
  //     farmName: 'N/A',
  //     growerName: 'N/A',
  //     registrationNumbers: [],
  //     location: { coordinates: 'N/A', address: 'N/A' },
  //     areas: { total: 0, avocado: 0 },
  //     varieties: [],
  //     targetMarkets: [],
  //     associatedPackhouse: 'N/A',
  //     photos: []
  //   };
    
  //   details.traceability = details.traceability || {
  //     systemType: 'N/A',
  //     recordsAvailable: false,
  //     recordTypes: [],
  //     photos: []
  //   };
    
  //   details.gap = details.gap || {
  //     siteHistory: 'N/A',
  //     soilManagement: { fertilizers: [], storageCompliance: false },
  //     waterManagement: { source: 'N/A', qualityTestDate: new Date().toISOString(), irrigationMethod: 'N/A', testResults: 'N/A' },
  //     photos: []
  //   };
    
  //   details.pestManagement = details.pestManagement || {
  //     ipmStrategyPresent: false,
  //     monitoringLogs: [],
  //     pesticides: { 
  //       storage: { secure: false, conditions: 'N/A' },
  //       records: [],
  //       disposal: 'N/A'
  //     },
  //     calibrationRecords: [],
  //     photos: []
  //   };
    
  //   details.preHarvest = details.preHarvest || {
  //     maturityMethod: 'N/A',
  //     dryMatterPercentage: 0,
  //     equipment: [],
  //     trainingRecords: [],
  //     heatRemovalPlan: 'N/A',
  //     photos: []
  //   };
    
  //   details.workerWelfare = details.workerWelfare || {
  //     hygieneTraining: [],
  //     facilities: [],
  //     firstAid: { kitsAvailable: 0, trainedPersonnel: 0, lastInspection: new Date().toISOString() },
  //     waterAccess: { points: 0, potable: false, testDate: new Date().toISOString() },
  //     photos: []
  //   };
    
  //   details.environmental = details.environmental || {
  //     wasteManagement: { plan: 'N/A', collectionAreas: [] },
  //     waterProtection: { bufferZones: [], measures: [] },
  //     biodiversity: { zones: [] },
  //     photos: []
  //   };
    
  //   details.finalEvaluation = details.finalEvaluation || {
  //     strengths: [],
  //     weaknesses: [],
  //     nonConformities: [],
  //     exportReadiness: 'Not Ready',
  //     evaluator: { name: 'N/A', organization: 'N/A', date: new Date().toISOString() }
  //   };
  // }
  
  return inspection;
};
