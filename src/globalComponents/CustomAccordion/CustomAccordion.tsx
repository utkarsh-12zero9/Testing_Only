import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

import styles from './CustomAccordion.module.css'

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function CustomAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full mx-auto">
      {
        items.map((item, index)=>(
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={styles.item}
          >
            <AccordionTrigger className={styles.trigger}>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className={styles.content}>
              <hr />
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}
