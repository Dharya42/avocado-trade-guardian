
// Helper function to ensure all inspection objects have createdAt and updatedAt properties
export const formatInspection = (inspection: any) => {
  // If createdAt and updatedAt don't exist, add them based on the date
  if (!inspection.createdAt) {
    const date = new Date(inspection.date);
    inspection.createdAt = date.toISOString();
    inspection.updatedAt = date.toISOString();
  }
  
  return inspection;
};
