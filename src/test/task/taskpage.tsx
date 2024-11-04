import { useEffect, useState } from "react";
import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { RoundSpinner } from "./components/spinner";
import { HelpBar } from "./components/helpMenu";

export const metadata: Metadata = {
  title: "Items",
  description: "An inventory item tracker built using Tanstack Table.",
};

type Item = {
  id?: number;
  intPartNum?: string | null;
  intName?: string;
  reOrder?: number | null;
  vendor?: string | null;
  quantity?: number;
  sloc?: string | null;
  QrCode?: string | null;
  Label?: string | null;
  active?: boolean;
};

export default function TaskPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/allItems');
        if (response.ok) {
          const fetchedItems = await response.json();
          setItems(fetchedItems);
        } else {
          console.error("Failed to fetch items from server.");
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or an error occurs
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here is the current inventory
            </p>
            <HelpBar/>
          </div>
        </div>
        {loading ? (
  <div className="center">
    <RoundSpinner size="xl" />
  </div>
) : (
  <DataTable data={items} columns={columns} />
)}
      </div>
    </>
  );
}
