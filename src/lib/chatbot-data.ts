export interface ChatQA {
  question: string;
  answer: string;
}

export const chatbotQA: ChatQA[] = [
  {
    question: "Which brands do you stock?",
    answer:
      "We carry the world's finest eyewear houses — Ray-Ban, Oakley, Prada, Tom Ford, Burberry, Versace, Maui Jim, Carrera, Police and more, plus Ray-Ban Meta & Oakley Meta smart glasses.",
  },
  {
    question: "How do I book an eye test?",
    answer:
      'Booking takes a minute — tap "Book Eye Test" in the menu, or call us on <a href="tel:+919440525789" class="underline font-medium">+91 94405 25789</a>. Walk-ins are welcome too!',
  },
  {
    question: "Are you ZEISS certified?",
    answer:
      "Yes! We are ZEISS Certified Vision Experts — the first eye-care professionals in Telangana to partner with ZEISS. We fit ClearMind and SmartLife lenses with DuraVision, BlueGuard and UVProtect coatings.",
  },
  {
    question: "What are your shop timings?",
    answer:
      "We're open <strong>Monday to Sunday, 9:00 AM to 9:30 PM</strong> across all three studios. Walk-ins are welcome, and we recommend booking an eye test in advance during weekends.",
  },
  {
    question: "Where are your stores located?",
    answer:
      "We have three Hyderabad studios:<br/>• <strong>Kukatpally (KPHB)</strong><br/>• <strong>Nizampet</strong><br/>• <strong>Bowenpally</strong><br/>Open Mon–Sun, 9:00 AM – 9:30 PM. Visit the Stores page for maps and directions.",
  },
  {
    question: "Do you have smart glasses?",
    answer:
      "We do — Ray-Ban Meta and Oakley Meta with in-store demos and launch pricing. Capture, call and ask Meta AI, all hands-free.",
  },
  {
    question: "Do you sell lenses for kids?",
    answer:
      "Yes — including myopia-control options like ZEISS MyoCare and Hoya MiYOSMART, plus durable kids frames. Our full kids range is expanding — enquire in store.",
  },
];

export const FALLBACK_MESSAGE =
  'Happy to help! Reach us directly on <a href="https://wa.me/919440525789" target="_blank" rel="noopener noreferrer" class="underline font-medium">WhatsApp</a> or call <a href="tel:+919440525789" class="underline font-medium">+91 94405 25789</a>, or drop by any of our three Hyderabad studios and our team will assist you.';

