// Canonical source for every transactional/drip email's HTML. Node-only
// (uses Buffer for the inline logo), so it must be called from a server
// context — an API route or a Server Component — never directly from a
// "use client" component.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://geniusmoneydaily.com";

// Absolute, publicly hosted logo — email clients (especially Outlook and
// Gmail image proxies) frequently strip or refuse to render data: URIs and
// inline <svg>, so the header logo must be a real hosted image. The source
// asset lives at public/logo-email.png and is served at this same path.
const LOGO_URL = "https://www.geniusmoneydaily.com/logo-email.png";

const EMAIL_WRAPPER = (body) => `
  <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background:#121833; padding: 24px; border-radius: 12px 12px 0 0; display:flex; align-items:center;">
      <img src="${LOGO_URL}" width="32" height="32" alt="GeniusMoneyDaily" style="border-radius:8px; margin-right:10px; vertical-align:middle;" />
      <span style="color:#00D29F; font-weight:800; font-size:22px; vertical-align:middle;">GeniusMoney<span style="color:#ffffff;">Daily</span></span>
    </div>
    <div style="padding: 32px 24px; background:#ffffff; border:1px solid #e2e8f0; border-top:none; border-radius: 0 0 12px 12px;">
      ${body}
    </div>
  </div>
`;

const eyebrow = (label) => `
  <p style="margin:0 0 8px; font-size:10px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:#00A87F;">
    ${label}
  </p>
`;

const ctaButton = (href, label) => `
  <a href="${href}" style="display:inline-block; background:#00D29F; color:#ffffff; font-weight:800; font-size:14px; padding:14px 28px; border-radius:10px; text-decoration:none; margin-top:8px;">
    ${label}
  </a>
`;

// ---------------------------------------------------------------------------
// 5-Day Onboarding Drip
// ---------------------------------------------------------------------------

export function getWelcomeEmail({ firstName } = {}) {
  return {
    subject: "Welcome to GeniusMoneyDaily — Your Free Briefing is Confirmed",
    html: EMAIL_WRAPPER(`
      ${eyebrow("Day 1 of 5 — Welcome")}
      <h1 style="color:#121833; font-size:22px; margin:0 0 16px;">
        ${firstName ? `Welcome, ${firstName}!` : "Welcome to GeniusMoneyDaily!"}
      </h1>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        Your free daily financial briefing is confirmed. Over the next few days we'll send you our best strategies
        for high-yield savings, credit optimization, and protecting what matters most.
      </p>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        Up first tomorrow: how to shield your cash from inflation with today's top high-yield APY picks.
      </p>
      ${ctaButton(`${SITE_URL}/articles`, "Read Today's Briefing")}
    `),
  };
}

export function getHighYieldEmail({ firstName } = {}) {
  return {
    subject: "Your Cash Could Be Earning More: High-Yield APY Picks Inside",
    html: EMAIL_WRAPPER(`
      ${eyebrow("Day 2 of 5 — High-Yield Savings")}
      <h1 style="color:#121833; font-size:22px; margin:0 0 16px;">
        ${firstName ? `${firstName}, is` : "Is"} your cash actually working for you?
      </h1>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        Most checking accounts still pay close to nothing while inflation quietly erodes your balance. Moving idle
        cash into a high-yield account can mean hundreds of extra dollars a year — with zero added risk.
      </p>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        We've matched today's top APY offers so you can see what your money could be earning instead.
      </p>
      ${ctaButton(`${SITE_URL}/signup`, "See My Matched Savings Offers")}
    `),
  };
}

export function getDebtConsolidationEmail({ firstName } = {}) {
  return {
    subject: "Credit Hacks: Consolidate Your Debt and Lower Your Rate",
    html: EMAIL_WRAPPER(`
      ${eyebrow("Day 3 of 5 — Credit Hacks & Debt Consolidation")}
      <h1 style="color:#121833; font-size:22px; margin:0 0 16px;">
        ${firstName ? `${firstName}, stop` : "Stop"} overpaying on high-interest debt
      </h1>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        Carrying a balance at 20%+ APR? Rolling multiple balances into a single fixed-rate consolidation loan can
        cut your interest costs dramatically and simplify your monthly payments into one.
      </p>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        See if you're pre-qualified for a lower rate in under 2 minutes.
      </p>
      ${ctaButton("https://safebetloans.com/", "Consolidate My Debt Now →")}
    `),
  };
}

export function getAutoInsuranceEmail({ firstName } = {}) {
  return {
    subject: "Free Up Cash for the Life You Actually Want to Live",
    html: EMAIL_WRAPPER(`
      ${eyebrow("Day 4 of 5 — Elevated Living & Smart Expense Optimization")}
      <h1 style="color:#121833; font-size:22px; margin:0 0 16px;">
        ${firstName ? `${firstName}, your` : "Your"} auto insurance bill is quietly competing with your lifestyle budget
      </h1>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        Elevated living isn't just about what you spend on — it's about what you stop overspending on. Auto
        insurance premiums creep up every renewal even when your driving record hasn't changed, quietly crowding out
        the budget for the gym membership, the wellness routine, or the wardrobe refresh you've been putting off.
      </p>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        Drivers who compare quotes across carriers save an average of hundreds of dollars a year on the same
        coverage — cash that's better spent on the fitness, style, and experiences that actually move your life
        forward. Get matched with competitive quotes based on your vehicle and driving profile, no obligation.
      </p>
      ${ctaButton("https://safebetauto.com/", "Compare My Auto Insurance Rates →")}
    `),
  };
}

export function getLifeInsuranceEmail({ firstName } = {}) {
  return {
    subject: "Protect Your Family: Term Life Coverage in Minutes",
    html: EMAIL_WRAPPER(`
      ${eyebrow("Day 5 of 5 — Family Security & Term Life Coverage")}
      <h1 style="color:#121833; font-size:22px; margin:0 0 16px;">
        ${firstName ? `${firstName}, does` : "Does"} your family have a financial safety net?
      </h1>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        Term life insurance is one of the most affordable ways to make sure your mortgage, debts, and your family's
        day-to-day needs are covered if the unexpected happens — often for less than the cost of a streaming
        subscription.
      </p>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        See your rate in minutes, with no medical exam required for most applicants.
      </p>
      ${ctaButton("http://safebetlife.com/", "Get My Free Life Insurance Quote →")}
    `),
  };
}

// ---------------------------------------------------------------------------
// Transactional (triggered by user actions elsewhere in the app)
// ---------------------------------------------------------------------------

export function getNewsletterWelcomeEmail() {
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
      ${ctaButton(`${SITE_URL}/signup`, "Check My Eligibility")}
    `),
  };
}

export function getContactAcknowledgementEmail({ firstName, reasonToConnect } = {}) {
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

const NO_MATCHES_CARD = `
  <div style="border:1px solid #e2e8f0; border-radius:12px; padding:24px; text-align:center;">
    <h3 style="margin:0 0 8px; font-size:16px; color:#121833;">No Direct Matches Found</h3>
    <p style="margin:0 0 20px; font-size:13px; color:#64748b; line-height:1.5;">
      We couldn't find exact matches for your specific criteria today, but you can explore our full directory of
      pre-qualified rate tools anytime.
    </p>
    <a href="https://www.geniusmoneydaily.com/#calculators" style="display:inline-block; background:#00D29F; color:#ffffff; font-weight:800; font-size:14px; padding:12px 22px; border-radius:8px; text-decoration:none;">
      Explore Financial Tools & Rates →
    </a>
  </div>
`;

export function getMatchedOffersEmail({ firstName, matchedOffers = [] } = {}) {
  const offerCards = matchedOffers
    .map(
      (offer) => `
      <div style="border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin-bottom:16px;">
        ${eyebrow("Matched Offer")}
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
    subject: "Your personalized financial options based on your profile",
    html: EMAIL_WRAPPER(`
      <h1 style="color:#121833; font-size:22px; margin-top:0;">
        Your Financial Profile Matches
      </h1>
      <p style="color:#475569; font-size:15px; line-height:1.6;">
        Hi ${firstName || "there"}, we've reviewed your inputs and gathered the top-matching financial products for
        your review below.
      </p>
      ${offerCards || NO_MATCHES_CARD}
    `),
  };
}
