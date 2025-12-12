export default function AboutPage() {
  return (
    <div className="container section-padding max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1>About Uplifting Vibes</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            A platform dedicated to positive music and fair artist compensation.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe music has the power to uplift, inspire, and bring joy to people's lives.
            Uplifting Vibes was created to provide a home for positive music and ensure artists
            are fairly compensated for their work.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why We're Different</h2>
          <p className="text-muted-foreground leading-relaxed">
            Unlike traditional streaming platforms that take significant cuts, we give artists
            99% of the revenue from their music. We believe creators deserve to be rewarded
            fairly for the joy they bring to the world.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Community</h2>
          <p className="text-muted-foreground leading-relaxed">
            Join a growing community of artists and listeners who value positive, uplifting
            content. Together, we're building a better music ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}
