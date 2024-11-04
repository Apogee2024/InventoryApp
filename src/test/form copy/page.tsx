import { Separator } from "../../components/ui/separator"
import {  AddItemForm } from "./item-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6 ">
      <br></br>
      <div className="text-center">
        {/* <h3 className="text-lg font-medium">Add Item</h3> */}
        <p className="text-sm text-muted-foreground">
          Input Your Item Details, you can also import from an xlsx.
        </p>
      </div>
      <Separator />
      <AddItemForm  />
    </div>
  )
}
