import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Where can I get a professional ZEISS eye test in Hyderabad?",
    answer: "Clear Sight Opticians is a proud ZEISS Certified Vision Expert — the first partner in Telangana. You can get advanced, precise vision profiling and professional eye tests using state-of-the-art ZEISS diagnostic equipment at all three premium stores: Kukatpally (KPHB), Nizampet, and Bowenpally. Eye tests are complimentary with any eyewear purchase.",
  },
  {
    question: "Can I get custom prescription lenses for Ray-Ban Meta AI glasses?",
    answer: "Yes, absolutely. We specialize in fitting custom, high-index prescription lenses into Ray-Ban Meta and Oakley Meta AI glasses. Whether you need single vision, progressive, blue-light filtering, or transition lenses, our in-house optical lab fits them precisely without affecting the open-ear audio or camera systems.",
  },
  {
    question: "What luxury designer eyewear brands do you stock?",
    answer: "We carry a curated edit of the world's finest eyewear brands, including Prada, Oakley, Ray-Ban, Maui Jim, Silhouette, Montblanc, ZEISS, and Essilor. Every frame we sell is 100% authentic and comes with its original case, certificate, and manufacturer warranty.",
  },
  {
    question: "Do you offer walk-in appointments for vision check-ups?",
    answer: "Yes, walk-ins are always welcome at all three of our locations. However, to minimize wait times during weekends or peak hours, we recommend booking a slot in advance by calling us or scheduling via WhatsApp through our Contact page.",
  },
  {
    question: "Do you offer lifetime support for frames purchased from your store?",
    answer: "Yes! Every frame purchased from Clear Sight Opticians qualifies for our complimentary lifetime fitting service. You can walk into any of our KPHB, Nizampet, or Bowenpally stores anytime for free frame adjustments, nose pad replacements, screw tightening, and ultrasonic deep cleaning.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 border-t border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Answers</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tighter">
            Frequently Asked <span className="font-serif italic font-medium text-electric">Questions.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about our clinical eye tests, premium eyewear, and AI glasses fittings.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-border/80 rounded-2xl overflow-hidden bg-background/50 hover:bg-background/80 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-lg pr-4 text-foreground/90">{faq.question}</span>
                  <span
                    className={`size-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-electric text-white border-electric" : ""
                      }`}
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[300px] border-t border-border/40" : "max-h-0"
                    }`}
                >
                  <p className="p-6 text-muted-foreground leading-relaxed text-sm bg-secondary/10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
