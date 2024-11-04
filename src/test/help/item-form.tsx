"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "../../lib/utils"
import { toast } from "../../hooks/use-toast"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

const criticalLevels = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
] as const

// Schema to include the fields
const viewItemSchema = z.object({
  itemName: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }).max(50, {
    message: "Item name must not be longer than 50 characters.",
  }),
  itemQuantity: z.number({
    invalid_type_error: "Quantity must be a number",
    required_error: "Item quantity is required.",
  }).min(1, {
    message: "Quantity must be at least 1.",
  }),
  critical: z.string({
    required_error: "Please select a critical level.",
  }),
  lotNumber: z.string().min(1, {
    message: "Lot number is required.",
  }),
})

type ViewItemFormValues = z.infer<typeof viewItemSchema>

// Dummy data simulating an item from the database
const defaultValues: ViewItemFormValues = {
  itemName: "Tennis Balls",
  itemQuantity: 66,
  critical: "medium",
  lotNumber: "SKU1234567",
}

export function ViewItemPage() {
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
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6 max-w-[70%] lg:ml-[30%] lg:max-w-[50%] md:max-w-[70%] sm:max-w-full"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">View Item</h2>
        </div>
        
        {/* Item Name */}
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter item name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Item Quantity */}
        <FormField
          control={form.control}
          name="itemQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter item quantity" {...field} />
              </FormControl>
              <FormDescription>
                This specifies the number of available units.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Critical Level */}
        <FormField
          control={form.control}
          name="critical"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Critical Level</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className={cn("w-[200px]")}>
                    <SelectValue placeholder="Select critical level" />
                  </SelectTrigger>
                  <SelectContent>
                    {criticalLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                This defines the criticality of the item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Lot Number */}
        <FormField
          control={form.control}
          name="lotNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lot Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter lot number" {...field} />
              </FormControl>
              <FormDescription>
                The lot number for tracking purposes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          {/* Update Button */}
          <Button type="submit" className="bg-blue-500">Update Item</Button>

          {/* Delete Button */}
          <Button 
            type="button" 
            onClick={handleDelete} 
            className="bg-red-500"
          >
            Delete Item
          </Button>
        </div>
      </form>
    </Form>
  )
}
