import { Student } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentCardList({ students }: { students: Student[] }) {
  return (
    <div>
      {students.map((student) => (
        <Card key={student.id}>
          <CardHeader>
            <CardTitle>
              {student.english_given_name} {student.family_name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{student.indian_name}</p>
            <p>{student.census_record_1900}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
