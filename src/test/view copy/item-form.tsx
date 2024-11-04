"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "../../hooks/use-toast"
import { Button } from "../../components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../components/ui/alert-dialog"

const criticalLevels = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
] as const

// Schema to include the fields
const viewItemSchema = z.object({
  intPartNum: z
    .string()
    .min(1, {
      message: "Part number is required.",
    }),
  intName: z
    .string()
    .min(2, {
      message: "Item name must be at least 2 characters.",
    })
    .max(50, {
      message: "Item name must not be longer than 50 characters.",
    }),
  reOrder: z
    .number()
    .min(0, {
      message: "Reorder quantity must be 0 or higher.",
    })
    .optional(),
  quantity: z
    .number({
      invalid_type_error: "Quantity must be a number",
      required_error: "Item quantity is required.",
    })
    .min(1, {
      message: "Quantity must be at least 1.",
    }),
  sloc: z.string().optional(),
  vendor: z.string().optional(),
})

type ViewItemFormValues = z.infer<typeof viewItemSchema>

// Dummy data simulating an item from the database
const defaultValues: ViewItemFormValues = {
  intPartNum: "0PWR0006",
  intName: "Australia/China Power Adapter",
  reOrder: 2,
  quantity: 66,
  sloc: "2S",
  vendor: "Amazon",
}

export default function ViewItemPage() {
  const form = useForm<ViewItemFormValues>({
    resolver: zodResolver(viewItemSchema),
    defaultValues,
  })

  function onSubmit(data: ViewItemFormValues) {
    toast({
      title: "Item updated successfully",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  function handleDelete() {
    toast({
      title: "Item deleted successfully",
      description: "The item has been removed from the system.",
    })
  }

  return (
    <div className="space-y-6 max-w-[75%] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">View Item</h2>
      
      {/* Table displaying item details */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Part Number</TableCell>
            <TableCell>{defaultValues.intPartNum}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>{defaultValues.intName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reorder Quantity</TableCell>
            <TableCell>{defaultValues.reOrder}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item Quantity</TableCell>
            <TableCell>{defaultValues.quantity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Storage Location</TableCell>
            <TableCell>{defaultValues.sloc}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vendor</TableCell>
            <TableCell>{defaultValues.vendor}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {/* Update Button */}
        <Button type="submit" className="bg-blue-500" onClick={form.handleSubmit(onSubmit)}>
          Update Item
        </Button>

        {/* Delete Button with AlertDialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-500">Delete Item</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the item and remove its data from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
