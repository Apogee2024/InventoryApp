import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

// Define validation schema for the form
const addItemFormSchema = z.object({
  intPartNum: z.string().optional().nullable(),
  intName: z.string()
    .min(2, { message: "Item name must be at least 2 characters." })
    .max(50, { message: "Item name must not exceed 50 characters." })
    .nullable(),
  reOrder: z.number()
    .min(0, { message: "Reorder quantity must be 0 or higher." })
    .optional()
    .nullable(),
  quantity: z.number()
    .min(0, { message: "Quantity must be at least 0." })
    .optional(),
  sloc: z.string().optional().nullable(),
  vendor: z.string().optional().nullable(),
});

type AddItemFormValues = z.infer<typeof addItemFormSchema>;

// Define interface for the form ref methods
interface ViewItemFormRef {
  getValues: UseFormReturn<AddItemFormValues>["getValues"];
  reset: () => void; // Add reset method here
  submit: () => void;
}

interface AddItemFormProps {
  defaultValues: AddItemFormValues;
  onSubmit: (data: AddItemFormValues) => void;
}

export const ViewItemForm = forwardRef<ViewItemFormRef, AddItemFormProps>(
  ({ defaultValues, onSubmit }, ref) => {
    const form = useForm<AddItemFormValues>({
      resolver: zodResolver(addItemFormSchema),
      defaultValues,
      mode: "onBlur", // Validation will happen after fields are touched
    });

    useEffect(() => {
      if (defaultValues) {
        form.reset(defaultValues);
      }
    }, [defaultValues, form]);

    // Expose form methods using useImperativeHandle
    useImperativeHandle(ref, () => ({
      getValues: form.getValues,
      reset: () => form.reset(), // Expose the reset method to clear the form
      submit: () => form.handleSubmit(onSubmit)(),
    }));

    return (
      <Form {...form}>
        <form
          id="view-item-form"
          className="space-y-6 max-w-full mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Part Number */}
            <FormField
              control={form.control}
              name="intPartNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Part Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Part number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Internal part number for this item.
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.intPartNum?.message}
                  </FormMessage>
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
                    <Input placeholder="Item name" {...field} />
                  </FormControl>
                  <FormDescription>This is the name of the item.</FormDescription>
                  <FormMessage>
                    {form.formState.errors.intName?.message}
                  </FormMessage>
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
                  <FormMessage>
                    {form.formState.errors.reOrder?.message}
                  </FormMessage>
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
                      placeholder="Item quantity"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormDescription>
                    Specify how many units of the item are available.
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.quantity?.message}
                  </FormMessage>
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
                    <Input placeholder="Storage location" {...field} />
                  </FormControl>
                  <FormDescription>
                    Specify the storage location for this item.
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.sloc?.message}
                  </FormMessage>
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
                    <Input placeholder="Vendor name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The vendor providing this item (if any).
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.vendor?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    );
  }
);

ViewItemForm.displayName = "ViewItemForm";
