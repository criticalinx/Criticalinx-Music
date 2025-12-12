import { CheckCircle, XCircle } from 'lucide-react';

export default function GuidelinesPage() {
  return (
    <div className="container section-padding max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1>Content Guidelines</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            To maintain a positive and uplifting community, we ask all artists to follow these guidelines.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              What We Welcome
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-green-500 mt-1">•</span>
                <span>Positive, uplifting, and inspiring music</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-1">•</span>
                <span>Original compositions and properly licensed covers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-1">•</span>
                <span>Music that promotes hope, joy, and well-being</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-1">•</span>
                <span>Content that encourages and motivates</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 mt-1">•</span>
                <span>High-quality audio files (MP3, WAV, or FLAC)</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <XCircle className="h-6 w-6 text-red-500" />
              What's Not Allowed
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>Content promoting violence, hate, or discrimination</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>Explicit or inappropriate language</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>Copyrighted material without proper licensing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>Content that promotes harmful behaviors</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span>Misleading metadata or impersonation</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-3">Quality Standards</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We encourage high-quality uploads with clear audio, accurate metadata, and appropriate
              cover art. While we welcome artists at all skill levels, please ensure your submissions
              meet basic quality standards for the best listener experience.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-3">Copyright & Licensing</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You must own or have proper licensing for all content you upload. This includes the
              music, lyrics, and any samples used. Violation of copyright can result in content
              removal and account suspension.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
