import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "../../hooks/use-toast";
import { Toaster } from "../../components/ui/toaster";

import { Button } from "../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { ViewItemForm } from "./item-form";
import { RoundSpinner } from "../task/components/spinner";
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

// Function to fetch item data from the server by ID
async function fetchItemFromDb(id) {
  try {
    if (!id) {
      throw new Error("Item not found");
    }
    const response = await fetch(`/items/${id}`);
    if (!response.ok) {
      throw new Error("Item not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
}

// Function to delete item by ID
async function deleteItem(id) {
  try {
    const response = await fetch(`/items/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Failed to delete item. Status: ${response.status}`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}

export default function ViewItemPage() {
  const { id } = useParams<{ id: string }>(); // Get item ID from URL
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("Invalid item ID provided.");
      setLoading(false);
      return;
    }

    const getData = async () => {
      try {
        const data = await fetchItemFromDb(id);
        setItemData(data);
      } catch (error) {
        setError("Item not found or failed to load.");
        toast({
          title: "Error",
          description: "Item not found or failed to load.",
        });
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    if (itemData?.intPartNum) {
      document.title = `Item: ${itemData.intPartNum}`;
    }
  }, [itemData]);

  function onSubmit() {
    toast({
      title: "Item updated successfully",
      description: "The item details have been updated.",
    });
  }

  async function handleDelete() {
    if (!id) return; // Ensure the item ID is present
  
    try {
      console.log("Trying to delete item with ID:", id); // Log for debugging
      await deleteItem(id);
      toast({
        title: "Item deleted successfully",
        description: "The item has been removed from the system.",
      });
      
      // Delay the redirection by 5 seconds (5000 milliseconds)
      setTimeout(() => {
        window.location.href = "/inventory"; // Redirect to item list or another page after deletion
      }, 5000);
      
    } catch (error) {
      const status = error.message.match(/Status: (\d+)/)?.[1] || "unknown";
      toast({
        title: "Delete Failed",
        description: `Failed to delete the item. Status: ${status}. Please try again.`,
      });
    }
  }
  return (
    <div className="space-y-6 mxa-w-[75%] mx-auto my-10">
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
          <h2 className="text-2xl font-bold mb-4 text-center">
            View Item {itemData?.intPartNum ? `(${itemData.intPartNum})` : ""}
          </h2>
          <ViewItemForm defaultValues={itemData} />
        </>
      ) : (
        <p>Item not found.</p>
      )}

      {itemData && !error && (
        <div className="flex flex-row justify-between items-center mt-4">
          <Button
            type="submit"
            className="bg-blue-500"
            onClick={() =>
              window.open(`/inventory/edit/${itemData.id}`, "_blank", "noopener,noreferrer")
            }
          >
            Update Item
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-500 text-sm px-4 py-2">Delete</Button>
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
      )}
    </div>
  );
}
