import React, { useState, useRef } from "react";
import { Button } from "../../components/ui/button";
import { ViewItemForm } from "./item-form";
import { RoundSpinner } from "../task/components/spinner";
import { Toaster } from "../../components/ui/toaster";
import { useToast } from "../../hooks/use-toast";
import * as XLSX from 'xlsx'; // Import SheetJS


async function createItem(newData) {
  try {
    const response = await fetch(`/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) throw new Error(`Failed to create item. Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}

export default function ItemEntryPage() {
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0); // Key to force re-render
  const formRef = useRef(null);
  const { toast } = useToast();

  const handleFormSubmit = async (newData) => {
    setLoading(true);
    try {
      await createItem(newData);
      toast({
        title: "Item Created",
        description: "The item has been successfully created.",
      });

      // Reset form fields and update formKey to re-render the form
      if (formRef.current) {
        formRef.current.reset({
          intPartNum: "",
          intName: "",
          reOrder: null,
          quantity: null,
          sloc: "",
          vendor: ""
        });
      }
      setFormKey((prevKey) => prevKey + 1); // Update key to re-render form
    } catch (error) {
      const status = error.message.match(/Status: (\d+)/)?.[1] || "unknown";
      toast({
        title: "Creation Failed",
        description: `Failed to create the item. Status: ${status}. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    if (formRef.current) {
      const formValues = formRef.current.getValues();

      if (!formValues.intPartNum || !formValues.intName || formValues.quantity <= 0) {
        toast({
          title: "Invalid Form Values",
          description: "Please ensure all required fields are filled correctly.",
        });
        return;
      }

      handleFormSubmit(formValues);
    }
  };

const handleImportClick = async () => {
  // Create a file input to select an XLSX file
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".xlsx, .xls";
  fileInput.onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Read the file as an ArrayBuffer
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });

      // Get the first worksheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert worksheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("Parsed JSON Data:", jsonData); // For debugging

      // Send the JSON data to the bulk import endpoint
      const response = await fetch("/items/bulk-import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) throw new Error(`Import failed with status ${response.status}`);

      const result = await response.json();
      toast({
        title: "Import Successful",
        description: `Bulk import completed. Created: ${result.createdItems.length}, Errors: ${result.errors.length}`,
      });

    } catch (error) {
      console.error("Error importing XLSX file:", error);
      toast({
        title: "Import Failed",
        description: "There was an error importing the file. Please try again.",
      });
    }
  };

  // Trigger the file input dialog
  fileInput.click();
};

  return (
    <div className="space-y-6 max-w-[75%] mx-auto my-10">
      <Toaster />
  
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Create New Item</h2>
        <Button onClick={handleImportClick} className="bg-green-500">
          Import from XLSX
        </Button>
      </div>
      
      <ViewItemForm key={formKey} ref={formRef} defaultValues={{}} onSubmit={handleFormSubmit} />
  
      <div className="flex justify-end mt-4">
        <Button onClick={handleCreateClick} className="bg-blue-500">
          {loading ? <RoundSpinner size="sm" /> : "Create Item"}
        </Button>
      </div>
    </div>
  );
}
