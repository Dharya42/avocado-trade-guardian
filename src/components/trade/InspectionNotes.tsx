
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { FileText } from 'lucide-react';

interface InspectionNotesProps {
  notes: string;
}

export const InspectionNotes = ({ notes }: InspectionNotesProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="text-base font-medium flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Notes
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="p-3 rounded-md bg-muted/30 border">
          <p className="text-sm text-muted-foreground leading-relaxed">{notes}</p>
        </div>
      </CardContent>
    </Card>
  );
};
