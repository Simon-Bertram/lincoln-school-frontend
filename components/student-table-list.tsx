import { Student } from "@/lib/types";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";

const studentColumns: ColumnDef<Student>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "census_record_1900", header: "Census Record 1900" },
  { accessorKey: "indian_name", header: "Indian Name" },
  { accessorKey: "family_name", header: "Family Name" },
  { accessorKey: "english_given_name", header: "English Given Name" },
  { accessorKey: "alias", header: "Alias" },
  {
    accessorKey: "sex",
    header: "Sex",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "year_of_birth",
    header: "Year of Birth",
    enableSorting: true,
    enableColumnFilter: true,
  },
  { accessorKey: "year_of_birth_uncertain", header: "Year of Birth Uncertain" },
  {
    accessorKey: "year_of_birth_uncertainty_type",
    header: "Year of Birth Uncertainty Type",
  },
  {
    accessorKey: "year_of_birth_original_text",
    header: "Year of Birth Original Text",
  },
  {
    accessorKey: "arrival_at_lincoln",
    header: "Arrival at Lincoln",
    enableSorting: true,
    enableColumnFilter: true,
    cell: (info) =>
      info.getValue()
        ? new Date(info.getValue() as string).toLocaleDateString()
        : "",
  },
  {
    accessorKey: "arrival_at_lincoln_uncertain",
    header: "Arrival at Lincoln Uncertain",
  },
  {
    accessorKey: "arrival_at_lincoln_uncertainty_type",
    header: "Arrival at Lincoln Uncertainty Type",
  },
  {
    accessorKey: "arrival_at_lincoln_original_text",
    header: "Arrival at Lincoln Original Text",
  },
  {
    accessorKey: "departure_from_lincoln",
    header: "Departure from Lincoln",
    enableSorting: true,
    enableColumnFilter: true,
    cell: (info) =>
      info.getValue()
        ? new Date(info.getValue() as string).toLocaleDateString()
        : "",
  },
  {
    accessorKey: "departure_from_lincoln_uncertain",
    header: "Departure from Lincoln Uncertain",
  },
  {
    accessorKey: "departure_from_lincoln_uncertainty_type",
    header: "Departure from Lincoln Uncertainty Type",
  },
  {
    accessorKey: "departure_from_lincoln_original_text",
    header: "Departure from Lincoln Original Text",
  },
  {
    accessorKey: "nation",
    header: "Nation",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "band",
    header: "Band",
    enableSorting: true,
    enableColumnFilter: true,
  },
  { accessorKey: "agency", header: "Agency" },
  { accessorKey: "trade", header: "Trade" },
  { accessorKey: "source", header: "Source" },
  { accessorKey: "comments", header: "Comments" },
  { accessorKey: "cause_of_death", header: "Cause of Death" },
  { accessorKey: "cemetery_burial", header: "Cemetery Burial" },
  { accessorKey: "relevant_links", header: "Relevant Links" },
];

export default function StudentTableList({
  students,
}: {
  students: Student[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: students,
    columns: studentColumns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Render filter inputs for filterable columns
  const filterable = [
    "sex",
    "year_of_birth",
    "arrival_at_lincoln",
    "departure_from_lincoln",
    "nation",
    "band",
  ];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Lincoln School Students</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="sticky top-0 bg-white z-10"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="min-w-[120px]">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {filterable.includes(header.column.id) ? (
                    <div>
                      <input
                        type="text"
                        placeholder={`Filter...`}
                        value={(header.column.getFilterValue() ?? "") as string}
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                        className="mt-1 block w-full rounded border px-2 py-1 text-xs"
                      />
                    </div>
                  ) : null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={studentColumns.length}
                className="text-center"
              >
                No students found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
