import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../../components/ui/accordion";
  
  export function HelpBar() {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Need Help? </AccordionTrigger>
          <AccordionContent>
            You can add items, receive items, and use build plans! For more help use the Help button in the navbar!
  
            {/* Nested Accordion - operates independently */}
            <Accordion type="multiple">
              <AccordionItem value="nested-item-1">
                <AccordionTrigger>How do I add an Item?</AccordionTrigger>
                <AccordionContent>
                    To add an item, hit the add item button, you can manually input your data or import from an xlsx.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="nested-item-2">
                <AccordionTrigger>How do I receive items?</AccordionTrigger>
                <AccordionContent>
                  You can manually input your data or you can import from an excel sheet, please note the names of the items must match from when you imported.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="nested-item-3">
                <AccordionTrigger>How do I access builds plans?</AccordionTrigger>
                <AccordionContent>
                    you can select, create and view builds plans here.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
  
        {/* <AccordionItem value="item-2">
          <AccordionTrigger>Can I add more items?</AccordionTrigger>
          <AccordionContent>
            Absolutely. This example is flexible and can have multiple accordion items.
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    );
  }
  