import { neon } from "@neondatabase/serverless";
import { Student } from "@/lib/types";
import StudentViewSwitcher from "@/components/student-view-switcher";

async function getStudents(): Promise<Student[]> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not set");
  const sql = neon(databaseUrl);
  await sql`SELECT 1`;
  const rows = await sql`SELECT * FROM students`;
  return rows as Student[];
}

export default async function Page() {
  const students = await getStudents();
  return (
    <div className="p-4">
      <StudentViewSwitcher students={students} />
    </div>
  );
}
