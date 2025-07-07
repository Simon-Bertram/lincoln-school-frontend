import { neon } from "@neondatabase/serverless";
import { Student } from "@/lib/types";

type DatabaseResult =
  | { success: true; data: Student[] }
  | { success: false; error: string };

async function getStudents(): Promise<DatabaseResult> {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) throw new Error("DATABASE_URL is not set");
    const sql = neon(databaseUrl);

    // Test connection first
    await sql`SELECT 1`;

    const rows = await sql`SELECT * FROM students`;
    return { success: true, data: rows as Student[] };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown database error",
    };
  }
}

export default async function Page() {
  const result = await getStudents();

  if (!result.success) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-600 mb-2">Database Error</h1>
        <p className="text-gray-600">{result.error}</p>
        <p className="text-sm text-gray-500 mt-2">
          Please check your DATABASE_URL environment variable and ensure your
          Neon database is accessible.
        </p>
      </div>
    );
  }

  const students = result.data;

  if (students.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">Students</h1>
        <p className="text-gray-600">No students found in the database.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Students ({students.length})</h1>
      <ul className="space-y-2">
        {students.map((student) => (
          <li key={student.id} className="p-2 border rounded">
            {student.family_name || "No name"}
          </li>
        ))}
      </ul>
    </div>
  );
}
