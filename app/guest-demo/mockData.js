// Demo-only mock data for the guest-authors preview branch — lets Randy
// click through the feature on the Vercel preview even if MoneyAid hasn't
// published a real guest article / run the paid_placement migration yet.
// Not linked from anywhere in normal site navigation.

export const MOCK_AUTHOR = {
  id: "author-1",
  name: "Coopers Accounting Service",
  author_type: "organization",
  image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  summary:
    "Coopers Accounting Service helps individuals and small businesses navigate tax relief options, from IRS negotiations to long-term planning.",
  title_line: "Tax Relief Specialists",
  slug: "coopers-accounting",
  link_url: "https://www.postprogo.com/go/coopers-accounting?src=guest-author",
  paid_placement: false, // real value per MoneyAid: false for Coopers today
};

export const MOCK_AUTHOR_PERSON = {
  id: "author-2",
  name: "Jamie Rivera",
  author_type: "person",
  image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  summary: "Jamie Rivera is a financial writer covering debt relief and personal finance for over a decade.",
  title_line: "Contributing Writer",
  slug: "jamie-rivera",
  link_url: "https://www.postprogo.com/go/jamie-rivera?src=guest-author",
  paid_placement: false,
};

const FRAME_DISCLOSURES_FULL = [
  { kind: "tax_relief_note", text: "Tax relief options depend on your situation and IRS approval; results vary." },
  {
    kind: "before_you_decide",
    html: "<h4>Before you decide</h4><p>Compare at least two providers and confirm fees before signing anything.</p>",
  },
  { kind: "not_advice", text: "This is general information, not tax, legal or investment advice." },
  { kind: "cta", text: "Talk to Coopers Accounting Service", href: "https://www.postprogo.com/go/coopers-accounting?src=guest-author" },
  { kind: "originally_published", text: "yourfinancialfreedommatters.com", href: "https://www.yourfinancialfreedommatters.com/blog/tax-relief-2026" },
];

const BODY_CONTENT = `
<p>This is the author's own text, exactly as written. It should never have anything inserted into it.</p>
<p>A second paragraph of the guest article body.</p>
`;

const BASE_ARTICLE = {
  slug: "mock-guest-article",
  title: "What the New IRS Rules Mean for Tax Relief in 2026",
  excerpt: "A guest perspective on navigating the latest IRS guidance.",
  meta_description: "Guest article on 2026 IRS tax relief rules.",
  body_content: BODY_CONTENT,
  featured_image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
  vertical: "taxes",
  published_at: "2026-10-16T14:32:00.000Z",
  sources: [{ name: "IRS.gov", url: "https://www.irs.gov" }],
  disclaimer_note: "This note should NOT appear on guest articles.",
  schema_markup: null,
  offer_links: [],
  is_guest: true,
};

export const MOCK_SYNDICATED_ARTICLE = {
  ...BASE_ARTICLE,
  slug: "mock-guest-syndicated",
  guest_author_id: MOCK_AUTHOR.id,
  guest_mode: "syndicated",
  canonical_url: "https://www.yourfinancialfreedommatters.com/blog/tax-relief-2026",
  original_url: "https://www.yourfinancialfreedommatters.com/blog/tax-relief-2026",
  frame_disclosures: FRAME_DISCLOSURES_FULL,
};

export const MOCK_EXCLUSIVE_ARTICLE = {
  ...BASE_ARTICLE,
  slug: "mock-guest-exclusive",
  title: "A Contributing Writer's Take on Debt Relief Options",
  guest_author_id: MOCK_AUTHOR_PERSON.id,
  guest_mode: "exclusive",
  canonical_url: null,
  original_url: null,
  frame_disclosures: [
    { kind: "not_advice", text: "This is general information, not tax, legal or investment advice." },
    { kind: "cta", text: "See Debt Relief Options", href: "https://www.postprogo.com/go/debthunch?src=guest-author" },
  ],
};

export const MOCK_NON_GUEST_ARTICLE = {
  ...BASE_ARTICLE,
  slug: "mock-non-guest",
  title: "A Normal Staff-Written Article (Not a Guest Piece)",
  is_guest: false,
  guest_author_id: null,
  guest_mode: null,
  canonical_url: null,
  frame_disclosures: null,
  disclaimer_note: "This is the normal, non-guest disclaimer note — should still appear here, unchanged.",
};
