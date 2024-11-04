"use client"


import { Badge } from "../../../components/ui/badge"
import { Checkbox } from "../../../components/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

// export const columns: ColumnDef<Task>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//       checked={
//         table.getIsAllPageRowsSelected()
//           ? true
//           : table.getIsSomePageRowsSelected()
//           ? "indeterminate"
//           : false
//       }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//         className="translate-y-[2px]"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//         className="translate-y-[2px]"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "id",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Task" />
//     ),
//     cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "title",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Title" />
//     ),
//     cell: ({ row }) => {
//       const label = labels.find((label) => label.value === row.original.label)

//       return (
//         <div className="flex space-x-2">
//           {label && <Badge variant="outline">{label.label}</Badge>}
//           <span className="max-w-[500px] truncate font-medium">
//             {row.getValue("title")}
//           </span>
//         </div>
//       )
//     },
//   },
//   {
//     accessorKey: "status",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Status" />
//     ),
//     cell: ({ row }) => {
//       const status = statuses.find(
//         (status) => status.value === row.getValue("status")
//       )

//       if (!status) {
//         return null
//       }

//       return (
//         <div className="flex w-[100px] items-center">
//           {status.icon && (
//             <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//           )}
//           <span>{status.label}</span>
//         </div>
//       )
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id))
//     },
//   },
//   {
//     accessorKey: "priority",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Priority" />
//     ),
//     cell: ({ row }) => {
//       const priority = priorities.find(
//         (priority) => priority.value === row.getValue("priority")
//       )

//       if (!priority) {
//         return null
//       }

//       return (
//         <div className="flex items-center">
//           {priority.icon && (
//             <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//           )}
//           <span>{priority.label}</span>
//         </div>
//       )
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id))
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => <DataTableRowActions row={row} />,
//   },
// ]
import { ColumnDef } from "@tanstack/react-table";
import { Item } from "../data/schema"; // Adjust path if necessary

// basic
// export const columns: ColumnDef<Item>[] = [
//   {
//     accessorKey: "intPartNum",
//     header: "Internal Part #",
//     enableSorting: true,
//   },
//   {
//     accessorKey: "intName",
//     header: "Internal Name",
//     enableSorting: true,
//   },
//   {
//     accessorKey: "reOrder",
//     header: "Reorder Quantity",
//     enableSorting: false, // Disable sorting if you don't want this field to be sortable
//   },
//   {
//     accessorKey: "quantity",
//     header: "Quantity",
//     enableSorting: true,
//   },
//   {
//     accessorKey: "sloc",
//     header: "Storage Location",
//     enableSorting: true,
//   },
// ];



// export const columns: ColumnDef<Item>[] = [
//   {
//     accessorKey: "intPartNum",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Internal Part #" />
//     ),
//     cell: ({ row }) => (
//       <Badge variant="outline">{row.getValue("intPartNum") || "N/A"}</Badge>
//     ),
//     enableSorting: true,
//   },
//   {
//     accessorKey: "intName",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Internal Name" />
//     ),
//     cell: ({ row }) => (
//       <span className="font-medium">{row.getValue("intName")}</span>
//     ),
//     enableSorting: true,
//   },
//   {
//     accessorKey: "quantity",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Quantity" />
//     ),
//     cell: ({ row }) => (
//       <span>{row.getValue("quantity")}</span>
//     ),
//     enableSorting: true,
//   },
//   {
//     accessorKey: "sloc",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Storage Location" />
//     ),
//     cell: ({ row }) => (
//       <Badge variant="secondary">{row.getValue("sloc") || "N/A"}</Badge>
//     ),
//     enableSorting: true,
//   },
//   {
//     accessorKey: "reOrder",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Reorder Quantity" />
//     ),
//     cell: ({ row }) => (
//       <span>{row.getValue("reOrder") || "N/A"}</span>
//     ),
//     enableSorting: true,
//   },
// ];


export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "intPartNum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Internal Part #" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("intPartNum") || "N/A"}</Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "intName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Internal Name" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("intName")}</span>
    ),
    enableSorting: true,
    enableColumnFilter: true, // Ensure filtering is enabled

  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue("quantity")}</span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "sloc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Storage Location" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("sloc") || "N/A"}</Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "reOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reorder Quantity" />
    ),
    cell: ({ row }) => (
      <span>{row.getValue("reOrder") || "N/A"}</span>
    ),
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
