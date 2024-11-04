import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

// Validation schema for the form
const addItemFormSchema = z.object({
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

type AddItemFormValues = z.infer<typeof addItemFormSchema>

const defaultValues: Partial<AddItemFormValues> = {}

export function AddItemForm() {
  const form = useForm<AddItemFormValues>({
    resolver: zodResolver(addItemFormSchema),
    defaultValues,
  })

  function onSubmit(data: AddItemFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6 max-w-[75%] mx-auto"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add Item</h2>
          <Button type="button" className="ml-4">Import XLSX</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Part Number */}
          <FormField
            control={form.control}
            name="intPartNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter part number" {...field} />
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
                  <Input placeholder="Enter item name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of the item being added.
                </FormDescription>
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
                <Input
                      type="number"
                      placeholder="Reorder quantity"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
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
                <Input
                      type="number"
                      placeholder="Item Quantity"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
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
                  <Input placeholder="Enter storage location" {...field} />
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
                  <Input placeholder="Enter vendor name" {...field} />
                </FormControl>
                <FormDescription>
                  The vendor providing this item (if any).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </div>

        <div className="flex justify-center">
          <Button type="submit">Add Item</Button>
        </div>
      </form>
    </Form>
  )
}
