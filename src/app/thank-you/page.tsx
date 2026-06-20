import Link from "next/link";

export const metadata = {
  title: "Thank You — Ad Firms",
  description: "Thank you for contacting Ad Firms. Our business setup advisor will reach out shortly.",
};

export default function ThankYouPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse 60% 70% at 75% 50%, rgba(13, 79, 162, 0.15) 0%, transparent 70%), #FAFAF8",
        padding: "24px",
        fontFamily: "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          maxWidth: "550px",
          width: "100%",
          borderRadius: "24px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.03)",
          border: "1px solid rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Decorative Top Accent */}
        <div
          style={{
            background: "linear-gradient(135deg, #0B1F3A 0%, #1553A0 100%)",
            height: "8px",
            width: "100%",
          }}
        />

        <div style={{ padding: "48px 32px" }}>
          {/* Animated/Styled Checkmark Icon */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(22, 163, 74, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
              color: "#16A34A",
            }}
          >
            <svg
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-fraunces), 'Fraunces', serif",
              fontSize: "32px",
              fontWeight: "800",
              color: "#0B1F3A",
              lineHeight: "1.2",
              marginBottom: "16px",
            }}
          >
            Thank You! We&apos;ll Call You Shortly.
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "16px",
              color: "#6B7692",
              lineHeight: "1.6",
              marginBottom: "36px",
            }}
          >
            Our advisor will contact you within <strong>30 minutes</strong>.<br />
            Check your WhatsApp for a message from us.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a
              href="https://wa.me/971504486285?text=Hello%20AD%20Firms%2C%20I%20would%20like%20to%20enquire%20about%20business%20setup%20services%20in%20Dubai%2C%20UAE.%20Please%20provide%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #1cbd3f 0%, #16a34a 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "50px",
                padding: "16px 28px",
                fontSize: "16px",
                fontWeight: "700",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(28, 189, 63, 0.25)",
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.8 8.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.334-1.511A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.004-1.37l-.36-.213-3.76.896.955-3.648-.234-.376A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              Chat on WhatsApp &rarr;
            </a>

            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1553A0",
                borderRadius: "50px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
                marginTop: "8px",
              }}
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>

        {/* Footer / Branding in Thank You Card */}
        <div
          style={{
            background: "#F4F5F7",
            padding: "16px 24px",
            borderTop: "1px solid #E8EAED",
            fontSize: "12px",
            color: "#6B7692",
          }}
        >
          © 2026 Ad Firms. All rights reserved.
        </div>
      </div>
    </div>
  );
}
