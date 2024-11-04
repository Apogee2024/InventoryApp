import { useEffect, useState } from "react";
import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
export const metadata: Metadata = {
  title: "Items",
  description: "An intentory item tracker built using Tanstack Table.",
};


type Item = {
  id?: number;
  intPartNum?: string | null;
  intName?: string;
  reOrder?: number| null;
  vendor?: string| null;
  quantity?: number;
  sloc?: string | null;
  QrCode?: string  | null;
  Label?: string | null;
  active?: boolean;
};
// Simulate a database read for tasks with hardcoded tasks
function getItems() {
  const items: Item[] = [
    {
      "id": 3,
      "intPartNum": "aafd",
      "intName": "Part-B",
      "reOrder": 4,
      "quantity": 15,
      "sloc": "S4"
    },
    {
      "id": 4,
      "intPartNum": "aafd",
      "intName": "Part-B",
      "reOrder": 4,
      "quantity": 15,
      "sloc": "S4"
    },
    {
      "id": 5,
      "intPartNum": "aafd",
      "intName": "Part-B",
      "reOrder": 4,
      "quantity": 15,
      "sloc": "B1"
    },
    {
      "id": 6,
      "intPartNum": "aafd",
      "intName": "Part-B",
      "reOrder": 4,
      "quantity": 15,
      "sloc": "B1"
    },
    {
      "id": 7,
      "intPartNum": "aafd",
      "intName": "Part-B",
      "reOrder": 4,
      "quantity": 15,
      "sloc": "B1"
    },
    {
      "id": 8,
      "intPartNum": null,
      "intName": "Part-C",
      "reOrder": null,
      "quantity": 20,
      "sloc": "C1"
    },
    {
      "id": 9,
      "intPartNum": null,
      "intName": "Part-D",
      "reOrder": null,
      "quantity": -10,
      "sloc": "D1"
    },
    {
      "id": 10,
      "intPartNum": "aafd",
      "intName": "Part-B",
      "reOrder": 4,
      "quantity": 15,
      "sloc": "B1"
    },
    {
      "id": 11,
      "intPartNum": "aafd",
      "intName": "Part-B",
      "reOrder": 4,
      "quantity": 15,
      "sloc": "B1"
    },
    {
      "id": 12,
      "intPartNum": null,
      "intName": "Part-C",
      "reOrder": null,
      "quantity": 20,
      "sloc": "C1"
    },
    {
      "id": 13,
      "intPartNum": null,
      "intName": "Part-D",
      "reOrder": null,
      "quantity": -10,
      "sloc": "D1"
    },
    {
      "id": 14,
      "intPartNum": "Wife",
      "intName": "Grace",
      "reOrder": 0,
      "quantity": 1,
      "sloc": "B1"
    },
    {
      "id": 15,
      "intPartNum": "aafd",
      "intName": "Part-A",
      "reOrder": 4,
      "quantity": 12,
      "sloc": "A1"
    },
    {
      "id": 16,
      "intPartNum": "Wife",
      "intName": "Grace",
      "reOrder": 0,
      "quantity": 1,
      "sloc": "B1"
    },
    {
      "id": 17,
      "intPartNum": null,
      "intName": "Part-C",
      "reOrder": null,
      "quantity": 20,
      "sloc": "C1"
    }
    
  ];

  return items;
}

export default function TaskPage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems= async () => {
      const fetchedItems = getItems();
      setItems(fetchedItems);
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
          </div>
          <div className="flex items-center space-x-2">
          </div>
        </div>
        {/* Display the DataTable with the fetched items*/}
        <DataTable data={items} columns={columns} />
      </div>
    </>
  );
}
