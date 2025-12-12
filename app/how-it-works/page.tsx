import { Upload, Music, DollarSign, Users } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Music',
      description: 'Share your positive tracks with our community. We accept MP3, WAV, and FLAC files.',
    },
    {
      icon: Music,
      title: 'Set Your Price',
      description: 'Choose to offer your music for free or set a price. You have full control over your content.',
    },
    {
      icon: DollarSign,
      title: 'Keep 99% Revenue',
      description: 'We only take 1% to cover platform costs. The rest goes directly to you.',
    },
    {
      icon: Users,
      title: 'Grow Your Audience',
      description: 'Connect with listeners who appreciate positive, uplifting music.',
    },
  ];

  return (
    <div className="container section-padding max-w-6xl">
      <div className="space-y-12">
        <div className="text-center">
          <h1>How It Works</h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Getting started on Uplifting Vibes is simple. Follow these steps to share your music
            and start earning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-semibold mb-4">For Listeners</h2>
          <p className="text-muted-foreground leading-relaxed">
            Discover and stream positive music from talented artists around the world. Support
            creators directly by purchasing their tracks or enjoy free streaming options.
          </p>
        </div>
      </div>
    </div>
  );
}
