
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wrench } from 'lucide-react';

interface InspectionToolsProps {
  tools: string[];
}

export const InspectionTools = ({ tools }: InspectionToolsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Wrench className="mr-2 h-5 w-5" />
          Inspection Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <div key={index} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm flex items-center">
              <Wrench className="h-4 w-4 mr-1" />
              {tool}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
