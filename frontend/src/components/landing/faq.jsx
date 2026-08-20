import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/landing/features";

const faqs = [
  {
    q: "How accurate is the ATS score compared to real applicant systems?",
    a: "We model the same parsing behavior used by widely deployed ATS platforms — section detection, keyword weighting, and formatting penalties like tables or images that break text extraction. It's a strong proxy, not a guarantee, since every employer configures their system slightly differently.",
  },
  {
    q: "Can I practice interviews for a specific company, not just a role?",
    a: "Yes. Paste a job description or company name during interview setup and questions adapt to the seniority, industry, and skills implied by that posting.",
  },
  {
    q: "Do you store my voice recordings?",
    a: "Recordings are encrypted at rest and kept only, or until you delete them from your history. They are never sold or used to train third-party models.",
  },
  {
    q: "What happens when I cancel my subscription?",
    a: "You keep access until the end of your billing period, and your resume history and past reports stay available on the free tier afterward — nothing is deleted on downgrade.",
  },
  {
    q: "Is there a free plan, or just a trial?",
    a: "Starter is free forever, with a capped number of interviews and scans each month. No credit card required to begin.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="Still unsure? Reach out and we'll get back within a day."
        />
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
