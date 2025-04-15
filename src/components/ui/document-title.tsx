
import { useEffect } from 'react';

interface DocumentTitleProps {
  title: string;
}

export const DocumentTitle = ({ title }: DocumentTitleProps) => {
  useEffect(() => {
    // Save the original title
    const originalTitle = document.title;
    
    // Update the title
    document.title = `${title} | Avocado Trade Guardian`;
    
    // Clean up when the component unmounts
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
  
  // This component doesn't render anything
  return null;
};
