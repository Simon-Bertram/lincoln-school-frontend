import { Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentCardList({ students }: { students: Student[] }) {
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {students.map((student) => (
          <li key={student.id}>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>
                  {student.english_given_name} {student.family_name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {student.indian_name ? (
                  <p>Tribal name: {student.indian_name}</p>
                ) : null}
                {student.band ? <p>Band: {student.band}</p> : null}
                {student.nation ? <p>Nation: {student.nation}</p> : null}
                <CardAction className="mt-4">
                  <Button>More Details</Button>
                </CardAction>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
