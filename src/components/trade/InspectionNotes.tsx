
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InspectionNotesProps {
  notes: string;
}

export const InspectionNotes = ({ notes }: InspectionNotesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{notes}</p>
      </CardContent>
    </Card>
  );
};
