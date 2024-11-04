export default function HelpPage() {
  return (
    <div className="space-y-6 max-w-[70%] lg:ml-[30%] lg:max-w-[50%] md:max-w-[70%] sm:max-w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Help</h2>

      <h3 className="text-xl mb-4">To add an item, use the add button on the inventory page.</h3>

      <h3 className="text-xl mb-4">
        When adding an item, you can either manually enter data or import an XLSX file with the correct columns.
      </h3>

      <h3 className="text-xl mb-4">
        To remove an item, select the item on the inventory detail page and hit the delete button.
      </h3>

      <h4 className="text-xl mb-4">
        Need more help? Contact us @ support@RheoInv.com
      </h4>
    </div>
    
  )
}