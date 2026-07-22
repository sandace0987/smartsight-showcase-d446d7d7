import { CONTACT_PHONE, CONTACT_PHONE_RAW } from "./contact-config";

export interface ChatQA {
  question: string;
  answer: string;
}

export const chatbotQA: ChatQA[] = [
  {
    question: "📍 Where are your stores located?",
    answer:
      "We have three state-of-the-art premium stores open daily from <strong>9:00 AM to 9:30 PM</strong>:<br/><br/>• <strong>KPHB Colony</strong> (Near JNTU Metro)<br/>• <strong>Nizampet</strong> (Main Road)<br/>• <strong>Bowenpally</strong> (Near Diamond Point)<br/><br/>You can get directions and phone numbers on our <a href=\"/stores\" class=\"text-electric underline font-semibold\">Stores Page</a>.",
  },
  {
    question: "👓 Which designer brands do you carry?",
    answer:
      "We stock authentic collections from the world's finest designer eyewear houses, including <strong>Ray-Ban, Oakley, Prada, Montblanc, Burberry, Philipp Plein, Maui Jim, Police, and Vogue Eyewear</strong>.<br/><br/>Other premium lines like <strong>Tom Ford, Carrera, Versace, and Porsche Design</strong> are available in-store with online inventory coming soon. If you're looking for a specific model, we can source it for you!",
  },
  {
    question: "📅 How do I book an eye test?",
    answer:
      `Eye testing at Clear Sight is <strong>computerized, precision-calibrated, and free of charge</strong> with any frame or lens purchase! Bookings take under a minute:<br/><br/>• Tap <a href="/" class="text-electric underline font-semibold">Book Eye Test</a> in the menu<br/>• Call us directly at <a href="tel:+${CONTACT_PHONE_RAW}" class="text-electric underline font-semibold">${CONTACT_PHONE}</a><br/>• Walk-ins are always welcome!`,
  },
  {
    question: "⚡ Do you have Ray-Ban Meta AI glasses?",
    answer:
      "Yes! We have in-store display models and active stock for both <strong>Ray-Ban Meta Wayfarer</strong> and <strong>Oakley Meta HSTN</strong> AI glasses. Drop by any branch for a live hands-free demo of photo/video capture, calling, and Meta AI features.",
  },
  {
    question: "🔬 What prescription lenses do you recommend?",
    answer:
      "We are proud <strong>ZEISS Certified Vision Experts</strong>, offering the absolute best in optics:<br/><br/>• <strong>ZEISS SmartLife & ClearMind</strong>: Advanced single-vision & progressives optimized for digital lifestyles.<br/>• <strong>Specialty Coatings</strong>: DuraVision Anti-Reflective, BlueGuard digital protection, and UVProtect.<br/>• We also carry premium progressives and myopia control options from <strong>Hoya and Essilor</strong>.",
  },
  {
    question: "👶 Do you offer eye care for kids?",
    answer:
      "Yes, we specialize in pediatric eye care and myopia control! We fit advanced pediatric lenses like <strong>ZEISS MyoCare</strong> and <strong>Hoya MiYOSMART</strong> to help slow down myopia progression in children, paired with extremely durable and flexible child-safe frames.",
  },
  {
    question: "💬 Can I check frame price and stock availability?",
    answer:
      `Absolutely! We can check live stock across our three Hyderabad warehouses instantly. Simply tap the <strong>WhatsApp</strong> button below or call us with the model name/number, and our opticians will assist you right away.`,
  },
];

export const FALLBACK_MESSAGE =
  `We'd love to help! Reach out directly to our opticians on <a href="https://wa.me/${CONTACT_PHONE_RAW}" target="_blank" rel="noopener noreferrer" class="text-electric underline font-semibold">WhatsApp</a>, call us at <a href="tel:+${CONTACT_PHONE_RAW}" class="text-electric underline font-semibold">${CONTACT_PHONE}</a>, or visit any of our three stores in KPHB, Nizampet, or Bowenpally.`;



