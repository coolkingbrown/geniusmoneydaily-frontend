import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "hello@geniusmoneydaily.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://geniusmoneydaily.com";

// Mirrors components/LogoIcon.js as a static data URI, since email HTML
// can't render a React component. Inline <svg> is stripped by some email
// clients (notably Outlook desktop), so this ships as a base64 raster-safe
// data URI <img> instead for broader compatibility.
function buildLogoDataUri() {
  const svg =
    '<svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="48" height="48" rx="12" fill="#121833"/>' +
    '<path d="M22 15C17.5817 15 14 18.5817 14 23C14 26.5 16.2 29.5 19.3 30.5L20 33H22V15Z" fill="#00D29F"/>' +
    '<path d="M26 15C30.4183 15 34 18.5817 34 23C34 26.5 31.8 29.5 28.7 30.5L28 33H26V15Z" fill="#00D29F" fill-opacity="0.8"/>' +
    "</svg>";

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

const EMAIL_WRAPPER = (body) => `
  <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background:#121833; padding: 24px; border-radius: 12px 12px 0 0; display:flex; align-items:center;">
      <img src="${buildLogoDataUri()}" width="32" height="32" alt="GeniusMoneyDaily" style="border-radius:8px; margin-right:10px; vertical-align:middle;" />
      <span style="color:#00D29F; font-weight:800; font-size:22px; vertical-align:middle;">GeniusMoney<span style="color:#ffffff;">Daily</span></span>
    </div>
    <div style="padding: 32px 24px; background:#ffffff; border:1px solid #e2e8f0; border-top:none; border-radius: 0 0 12px 12px;">
      ${body}
    </div>
  </div>
`;

function newsletterWelcomeEmail() {
  return {
    subject: "Welcome to GeniusMoneyDaily — Your Free Briefing is Confirmed",
    html: EMAIL_WRAPPER(`
      <h1 style="color:#121833; font-size:22px; margin-top:0;">You're Confirmed!</h1>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        Thanks for subscribing to GeniusMoneyDaily. Starting tomorrow morning, you'll receive breaking interest
        rate alerts, credit score hacks, and market intelligence delivered straight to your inbox at 7 AM.
      </p>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        Want to see if you're pre-qualified for exclusive financial offers while you wait?
      </p>
      <a href="${SITE_URL}/signup" style="display:inline-block; background:#00D29F; color:#ffffff; font-weight:800; font-size:14px; padding:14px 28px; border-radius:10px; text-decoration:none; margin-top:8px;">
        Check My Eligibility
      </a>
    `),
  };
}

function contactAcknowledgementEmail({ firstName, reasonToConnect }) {
  return {
    subject: "We Received Your Message — GeniusMoneyDaily Support",
    html: EMAIL_WRAPPER(`
      <h1 style="color:#121833; font-size:22px; margin-top:0;">
        ${firstName ? `Thanks, ${firstName}!` : "We've Got Your Message"}
      </h1>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        We've received your message${
          reasonToConnect ? ` regarding <strong>${reasonToConnect}</strong>` : ""
        }. Our editorial team reviews every inquiry and will respond within <strong>1 business day</strong>.
      </p>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        In the meantime, feel free to browse our latest financial insights at
        <a href="${SITE_URL}/articles" style="color:#00A87F; font-weight:600;">geniusmoneydaily.com/articles</a>.
      </p>
    `),
  };
}

function surveyMatchedOffersEmail({ firstName, matchedOffers = [] }) {
  const offerCards = matchedOffers
    .map(
      (offer) => `
      <div style="border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin-bottom:16px;">
        <p style="margin:0 0 4px; font-size:10px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:#00A87F;">
          Matched Offer
        </p>
        <h3 style="margin:0 0 8px; font-size:18px; color:#121833;">${offer.offer_name}</h3>
        <p style="margin:0 0 16px; font-size:13px; color:#64748b; line-height:1.5;">
          A pre-qualified offer selected based on your survey responses.
        </p>
        <a href="${offer.offer_url}" style="display:inline-block; background:#00D29F; color:#ffffff; font-weight:800; font-size:14px; padding:12px 22px; border-radius:8px; text-decoration:none;">
          Claim Your Match →
        </a>
      </div>
    `
    )
    .join("");

  return {
    subject: `Congratulations ${firstName || "there"}! Your Matched Financial Offers Are Ready`,
    html: EMAIL_WRAPPER(`
      <h1 style="color:#121833; font-size:22px; margin-top:0;">
        Congratulations${firstName ? `, ${firstName}` : ""}!
      </h1>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        You've completed your financial profile, and we've matched you with the offers below based on your answers.
      </p>
      ${offerCards || `<p style="color:#94a3b8; font-size:14px;">No matched offers to display.</p>`}
    `),
  };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { type, to } = body;

  if (!to) {
    return NextResponse.json({ error: "Missing 'to' email address" }, { status: 400 });
  }

  let emailContent;
  switch (type) {
    case "newsletter_welcome":
      emailContent = newsletterWelcomeEmail();
      break;
    case "contact_acknowledgement":
      emailContent = contactAcknowledgementEmail({
        firstName: body.firstName,
        reasonToConnect: body.reasonToConnect,
      });
      break;
    case "survey_matched_offers":
      emailContent = surveyMatchedOffersEmail({
        firstName: body.firstName,
        matchedOffers: Array.isArray(body.matchedOffers) ? body.matchedOffers : [],
      });
      break;
    default:
      return NextResponse.json({ error: `Unknown email type: ${type}` }, { status: 400 });
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.warn("SENDGRID_API_KEY is not set; skipping email send.", { type, to });
    return NextResponse.json({ sent: false, reason: "SendGrid not configured" });
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sgMail.send({
      to,
      from: FROM_EMAIL,
      subject: emailContent.subject,
      html: emailContent.html,
    });
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("SendGrid send error:", err?.response?.body || err);
    return NextResponse.json({ sent: false, error: "Failed to send email" }, { status: 502 });
  }
}
