export default function PrivacyPage() {
  return (
    <div className="container section-padding max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground mt-4">
            Last updated: December 12, 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect information you provide directly to us, such as when you create an account,
              upload content, or contact support. This includes your name, email address, payment
              information, and any content you upload.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect to operate and improve our services, process payments,
              communicate with you, and ensure platform security. We do not sell your personal
              information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data. Your information
              is stored securely and encrypted during transmission. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience, analyze
              usage patterns, and remember your preferences. You can control cookie settings through
              your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use third-party services for payment processing, analytics, and infrastructure.
              These services have their own privacy policies and handle data according to their terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, update, or delete your personal information. You can
              manage most settings through your account dashboard or by contacting support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our service is not directed to children under 13 years of age. We do not knowingly
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any material
              changes by posting the new policy on this page and updating the date above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this privacy policy or our data practices, please contact
              our support team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
