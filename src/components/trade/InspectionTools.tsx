
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Wrench } from 'lucide-react';

interface InspectionToolsProps {
  tools: string[];
}

export const InspectionTools = ({ tools }: InspectionToolsProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="text-base font-medium flex items-center">
          <Wrench className="mr-2 h-4 w-4" />
          Inspection Tools
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="bg-muted/50 text-muted-foreground px-3 py-1.5 rounded-md text-sm flex items-center border"
            >
              <Wrench className="h-3 w-3 mr-1.5 opacity-70" />
              {tool}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
