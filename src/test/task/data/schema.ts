import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export const tasksArraySchema = z.array(taskSchema);


// Define the Item schema using zod
export const itemSchema = z.object({
  id: z.number().int().optional().nullable(),                // Optional integer ID, can be null
  intPartNum: z.string().optional().nullable(),              // Optional part number, can be null
  intName: z.string().optional().nullable(),                 // Optional name, can be null
  reOrder: z.number().int().optional().nullable(),           // Optional reorder threshold, can be null
  vendor: z.string().optional().nullable(),                  // Optional vendor name, can be null
  quantity: z.number().int().optional(),                     // Optional quantity, must be integer
  sloc: z.string().optional().nullable(),                    // Optional storage location, can be null
  QrCode: z.string().optional().nullable(),                  // Optional QR code, can be null
  Label: z.string().optional().nullable(),                   // Optional label, can be null
  active: z.boolean().optional().nullable(),                 // Optional active status, can be null
});

// Define an array schema for multiple items if needed
export const itemsArraySchema = z.array(itemSchema);

// Infer TypeScript type from the schema
export type Item = z.infer<typeof itemSchema>;
