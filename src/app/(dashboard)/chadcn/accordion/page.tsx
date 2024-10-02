
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "item-1",
    question: "is It accessible",
    answer: "yes. It adheres to the WAI-ARIA desing patterns",
  },
  {
    id: "item-2",
    question: "how do i get started",
    answer: "yes. It adheres to the WAI-ARIA desing patterns",
  },
  {
    id: "item-3",
    question: "Can I use it on multiple projects",
    answer: "yes. it's licensed under the MIT licence.",
  },
];

export default function AccordionPage() {
  return (
    <div>
      <Accordion type="single" className="w-full">
        {
          items.map(item => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))
        }
      </Accordion>
    </div>
  );
}
