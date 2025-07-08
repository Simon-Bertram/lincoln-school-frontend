"use client";
import { useState } from "react";
import { Student } from "@/lib/types";
import Navbar from "@/components/navbar";
import StudentCardList from "@/components/student-card-list";
import StudentTableList from "@/components/student-table-list";

export default function StudentViewSwitcher({
  students,
}: {
  students: Student[];
}) {
  const [view, setView] = useState<"card" | "table">("card");
  return (
    <>
      <Navbar view={view} onViewChange={setView} />
      <h1 className="text-xl font-bold mb-4">Students ({students.length})</h1>
      {view === "card" ? (
        <StudentCardList students={students} />
      ) : (
        <StudentTableList students={students} />
      )}
    </>
  );
}
