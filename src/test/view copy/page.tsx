"use client"

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

// Dummy data simulating an item from the database
const defaultValues = {
  intPartNum: "0PWR0006",
  intName: "Australia/China Power Adapter",
  reOrder: 2,
  quantity: 66,
  sloc: "2S",
  vendor: "Amazon",
}

export default function ViewItemPage() {

  function onSubmit() {
    toast({
      title: "Item updated successfully",
      description: "The item details have been updated.",
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

      {/* Buttons aligned for different screen sizes */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4">
        {/* Update Button */}
        <Button type="submit" className="bg-blue-500 mb-4 sm:mb-0" onClick={onSubmit}>
          Update Item
        </Button>

        {/* Delete Button with AlertDialog (smaller button, aligned right on larger screens) */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-500 text-sm px-4 py-2 self-end sm:self-auto">
              Delete
            </Button>
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
