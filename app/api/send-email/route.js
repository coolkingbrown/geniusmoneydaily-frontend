import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import {
  getNewsletterWelcomeEmail,
  getContactAcknowledgementEmail,
  getMatchedOffersEmail,
  getWelcomeEmail,
  getHighYieldEmail,
  getDebtConsolidationEmail,
  getAutoInsuranceEmail,
  getLifeInsuranceEmail,
} from "@/lib/emailTemplates";

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "hello@geniusmoneydaily.com";

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
      emailContent = getNewsletterWelcomeEmail();
      break;
    case "contact_acknowledgement":
      emailContent = getContactAcknowledgementEmail({
        firstName: body.firstName,
        reasonToConnect: body.reasonToConnect,
      });
      break;
    case "survey_matched_offers":
      emailContent = getMatchedOffersEmail({
        firstName: body.firstName,
        matchedOffers: Array.isArray(body.matchedOffers) ? body.matchedOffers : [],
      });
      break;
    case "drip_day1":
      emailContent = getWelcomeEmail({ firstName: body.firstName });
      break;
    case "drip_day2":
      emailContent = getHighYieldEmail({ firstName: body.firstName });
      break;
    case "drip_day3":
      emailContent = getDebtConsolidationEmail({ firstName: body.firstName });
      break;
    case "drip_day4":
      emailContent = getAutoInsuranceEmail({ firstName: body.firstName });
      break;
    case "drip_day5":
      emailContent = getLifeInsuranceEmail({ firstName: body.firstName });
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
