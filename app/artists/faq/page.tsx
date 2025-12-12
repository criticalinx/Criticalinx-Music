import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How do I get paid?',
      answer: 'Payments are processed automatically when listeners purchase your tracks. You keep 99% of the revenue, and funds are deposited directly to your connected payment account.',
    },
    {
      question: 'What file formats do you accept?',
      answer: 'We accept MP3, WAV, and FLAC audio files up to 500MB in size. We recommend using high-quality formats for the best listener experience.',
    },
    {
      question: 'Can I upload covers or remixes?',
      answer: 'Yes, but you must have proper licensing for the original composition. Make sure you have the necessary rights and permissions before uploading any covers or remixes.',
    },
    {
      question: 'How long does it take for my music to go live?',
      answer: 'Once you publish a track, it typically appears on the platform immediately. However, our team may review content to ensure it meets our guidelines.',
    },
    {
      question: 'Can I edit my tracks after uploading?',
      answer: 'Yes, you can update track metadata, descriptions, and pricing at any time. If you need to replace the audio file, please contact support.',
    },
    {
      question: 'Is there a limit to how many tracks I can upload?',
      answer: 'No, there are no upload limits. You can share as much positive music as you create!',
    },
    {
      question: 'How do I promote my music on the platform?',
      answer: 'Focus on creating great content with accurate descriptions and tags. Engaged listeners and quality music naturally rise in our discovery features.',
    },
    {
      question: 'What happens if someone reports my content?',
      answer: 'Our team will review reported content to ensure it meets our guidelines. If content violates our policies, we may remove it and contact you with details.',
    },
    {
      question: 'Can I offer my music for free?',
      answer: 'Absolutely! You can set any track to free streaming. Listeners can still choose to support you through tips or by purchasing your other tracks.',
    },
    {
      question: 'How do I delete my account?',
      answer: 'You can request account deletion by contacting our support team. Please note that this action is permanent and will remove all your content from the platform.',
    },
  ];

  return (
    <div className="container section-padding max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1>Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Find answers to common questions about uploading and sharing your music.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="bg-card border rounded-lg p-6 mt-8">
          <h3 className="font-semibold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground text-sm">
            Contact our support team and we'll be happy to help you get started.
          </p>
        </div>
      </div>
    </div>
  );
}
