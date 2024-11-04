import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ViewItemForm } from "./item-form";
import { RoundSpinner } from "../task/components/spinner";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Toaster } from "../../components/ui/toaster";
import { useToast } from "../../hooks/use-toast";
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
} from "../../components/ui/alert-dialog";

// Function to fetch item by ID
async function fetchItemFromDb(id) {
  try {
    const response = await fetch(`/items/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch item. Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
}

// Function to update item
async function updateItem(id, updatedData) {
  try {
    const response = await fetch(`/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error(`Failed to update item. Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
}

async function deleteItem(id) {
  try {
    const response = await fetch(`/items/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Failed to delete item. Status: ${response.status}`);
    return response; // No need to parse response as JSON if we don't expect any content
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}


export default function ViewItemPage() {
  const { id } = useParams<{ id: string }>();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("Invalid item ID provided.");
      setLoading(false);
      toast({ title: "Invalid ID", description: "The provided item ID is invalid." });
      return;
    }

    fetchItemFromDb(id)
      .then(setItemData)
      .catch((error) => {
        setError(error.message);
        const status = error.message.match(/Status: (\d+)/)?.[1] || "unknown";
        toast({ title: "Load Failed", description: `Failed to load item. Status: ${status}. Please try again.` });
      })
      .finally(() => setLoading(false));
  }, [id, toast]);

  const handleFormSubmit = async (updatedData) => {
    if (!id) return;
    try {
      await updateItem(id, updatedData).then(setItemData);
      toast({ title: "Update Successful", description: "The item has been successfully updated." });
    } catch (error) {
      const status = error.message.match(/Status: (\d+)/)?.[1] || "unknown";
      toast({ title: "Update Failed", description: `Failed to update the item. Status: ${status}. Please try again.` });
    }
  };

  const handleUpdateClick = () => {
    if (formRef.current) {
      const formValues = formRef.current.getValues();

      // Validate form values
      if (!formValues.intPartNum || !formValues.intName || formValues.quantity <= 0) {
        toast({ title: "Invalid Form Values", description: "Please ensure all required fields are filled correctly." });
        return;
      }

      // Submit form if values are valid
      handleFormSubmit(formValues);
    }
  };

  const handleDeleteClick = async () => {

    console.log("delete clicked")
    if (!id) return; // Ensure the item ID is present
    console.log("Trying to delete item with ID:", id); // Log the ID before attempting deletion

    try {
      await deleteItem(id); // Call the delete function with the item ID
      toast({
        title: "Delete Successful",
        description: "The item has been successfully deleted.",
      });
      window.location.href = "/inventory"; // Redirect to another page after deletion
    } catch (error) {
      const status = error.message.match(/Status: (\d+)/)?.[1] || "unknown";
      toast({
        title: "Delete Failed",
        description: `Failed to delete the item. Status: ${status}. Please try again.`,
      });
    }
  };

  return (
    <div className="space-y-6 max-w-[75%] mx-auto my-10">
      
      <Toaster />

      {loading ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">Loading Item</h2>
          <div className="flex justify-center items-center h-40">
            <RoundSpinner size="xl" />
          </div>
        </>
      ) : error ? (
        <Alert className="flex flex-col justify-center items-center bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 max-w-md mx-auto">
          <AlertTitle className="font-bold text-red-700 mb-2">Invalid Item!</AlertTitle>
          <AlertDescription className="text-red-500">{error}</AlertDescription>
        </Alert>
      ) : itemData ? (
        <>
        
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Item {itemData.intPartNum ? `(${itemData.intPartNum})` : ""}</h2>
          
          <ViewItemForm ref={formRef} defaultValues={itemData} onSubmit={handleFormSubmit} />
          <div className="flex flex-row justify-between items-center mt-4">
            <Button onClick={handleUpdateClick} className="bg-blue-500">Update Item</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-500 text-sm px-4 py-2">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone. This will permanently delete the item and remove its data from the system.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteClick}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      ) : (
        <p>Item not found.</p>
      )}
      
    </div>
  );
}
