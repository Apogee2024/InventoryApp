"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "../../hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"

// Validation schema for the form
const addItemFormSchema = z.object({
  intPartNum: z.string().min(1, { message: "Part number is required." }),
  intName: z.string().min(2, { message: "Item name must be at least 2 characters." }).max(50),
  reOrder: z.number().min(0, { message: "Reorder quantity must be 0 or higher." }).optional(),
  quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
  sloc: z.string().optional(),
  vendor: z.string().optional(),
})

type AddItemFormValues = z.infer<typeof addItemFormSchema>

export function ViewItemForm({ defaultValues }) {
  const form = useForm<AddItemFormValues>({
    resolver: zodResolver(addItemFormSchema),
    defaultValues,
  });

  // Use the reset function to update form with new values
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues); // Reset form with fetched values
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form className="space-y-6 max-w-full mx-auto">
        {/* Make sure the form is responsive with different column layouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Part Number */}
          <FormField
            control={form.control}
            name="intPartNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Number</FormLabel>
                <FormControl>
                  <Input placeholder="Part number" {...field} readOnly />
                </FormControl>
                <FormDescription>
                  Internal part number for this item.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Item Name */}
          <FormField
            control={form.control}
            name="intName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Item name" {...field} readOnly />
                </FormControl>
                <FormDescription>This is the name of the item.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reorder Quantity */}
          <FormField
            control={form.control}
            name="reOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reorder Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Reorder quantity" {...field} readOnly />
                </FormControl>
                <FormDescription>
                  Specify the reorder quantity for this item (if any).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Item Quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Item quantity" {...field} readOnly />
                </FormControl>
                <FormDescription>
                  Specify how many units of the item are available.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Storage Location */}
          <FormField
            control={form.control}
            name="sloc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage Location (SLOC)</FormLabel>
                <FormControl>
                  <Input placeholder="Storage location" {...field} readOnly />
                </FormControl>
                <FormDescription>
                  Specify the storage location for this item.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vendor */}
          <FormField
            control={form.control}
            name="vendor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor</FormLabel>
                <FormControl>
                  <Input placeholder="Vendor name" {...field} readOnly />
                </FormControl>
                <FormDescription>
                  The vendor providing this item (if any).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
