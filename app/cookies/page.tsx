export default function CookiesPage() {
  return (
    <div className="container section-padding max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1>Cookie Policy</h1>
          <p className="text-muted-foreground mt-4">
            Last updated: December 12, 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">What Are Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are stored on your device when you visit our website.
              They help us provide you with a better experience by remembering your preferences and
              understanding how you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">How We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies for various purposes:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Essential Cookies:</strong> Required for basic site functionality, such as maintaining your session and security features.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Preference Cookies:</strong> Remember your settings and preferences, such as language and playback settings.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website to improve user experience.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Authentication Cookies:</strong> Keep you signed in and remember your authentication state.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may use third-party services that set their own cookies, such as analytics providers
              and payment processors. These cookies are governed by the respective third-party privacy
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can control and manage cookies through your browser settings. Most browsers allow you
              to block or delete cookies. However, please note that disabling cookies may affect your
              ability to use certain features of our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Browser Settings</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Here's how to manage cookies in popular browsers:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Cookie Policy from time to time. Any changes will be posted on this
              page with an updated revision date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
