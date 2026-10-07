import PersonalLoanCalculator from "@/components/PersonalLoanCalculator";
import CreditCardPayoffCalculator from "@/components/CreditCardPayoffCalculator";
import HomeUpgradeCalculator from "@/components/HomeUpgradeCalculator";
import AutoInsuranceCalculator from "@/components/AutoInsuranceCalculator";
import LifeInsuranceCalculator from "@/components/LifeInsuranceCalculator";
import MortgageCalculator from "@/components/MortgageCalculator";
import DebtCalculator from "@/components/DebtCalculator";
import BudgetCalculator from "@/components/BudgetCalculator";

// Central registry for every /tools/[slug] page. Each entry is the single
// source of truth for that tool's metadata, long-form content, FAQ, and
// which query-param / embed data-attribute keys it accepts for pre-fill.
// `paramKeys` lists the keys this tool reads from both URL search params
// (full page) and data-* attributes (article embed) — see
// lib/toolEmbeds.js for how those are parsed into `initialValues`.
export const TOOLS_CONFIG = {
  "personal-loan-calculator": {
    slug: "personal-loan-calculator",
    navLabel: "Personal Loan",
    title: "Personal Loan Payment Calculator",
    metaTitle: "Personal Loan Calculator — Estimate Your Monthly Payment | GeniusMoneyDaily",
    metaDescription:
      "Calculate your estimated monthly payment, total interest, and total cost on a fixed-rate personal loan. Free, instant, no credit check required.",
    dek: "See your estimated monthly payment, total interest, and total cost before you apply.",
    Component: PersonalLoanCalculator,
    paramKeys: ["amount", "apr", "term"],
    content: {
      howItUse: [
        "Enter the loan amount you're considering, the APR (annual percentage rate) a lender has quoted you or that you expect to qualify for, and the repayment term in months. The calculator updates instantly as you type — there's no submit button and nothing is sent anywhere.",
        "Use this tool before you apply to compare offers on equal footing. Two loans with the same monthly payment can have very different total costs depending on term length, and two loans with the same APR can have different monthly payments depending on how the lender structures fees.",
      ],
      inputsExplained: [
        { label: "Loan Amount", text: "The amount you're borrowing, before any origination fees a lender might deduct." },
        { label: "APR", text: "Annual percentage rate — the yearly cost of the loan including interest, expressed as a percentage. This is different from a lender's \"interest rate,\" which can exclude fees." },
        { label: "Term", text: "The number of months you have to repay the loan. Longer terms lower your monthly payment but increase total interest paid." },
      ],
      assumptions: [
        "This calculator assumes a standard fixed-rate, fully amortizing loan — the same calculation method used for most personal loans, meaning your payment is the same every month and is split between principal and interest according to a standard amortization schedule.",
        "It does not account for origination fees, which some lenders deduct from your disbursed amount or add to your APR. Always compare the APR, not just the stated interest rate, since APR is required by law to include most fees.",
        "Results are estimates for planning purposes only and are not a loan offer or a guarantee of approval or rate.",
      ],
      formula:
        "Monthly payment = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1], where P is the loan amount, r is the monthly interest rate (APR ÷ 12 ÷ 100), and n is the number of monthly payments — the standard fixed-rate amortization formula used throughout consumer lending.",
      workedExample:
        "Say you're borrowing $15,000 at 11.5% APR over 48 months. Plugging those numbers in: the monthly rate is 11.5% ÷ 12 ≈ 0.958%. The amortization formula returns a monthly payment of about $392. Over 48 months that's roughly $18,816 total, meaning about $3,816 of the total is interest. Shortening the term to 36 months raises the monthly payment to around $495 but cuts total interest to about $2,820 — a direct trade-off between monthly affordability and total cost that this calculator lets you test instantly.",
      faqs: [
        {
          q: "Does this calculator check my credit or affect my credit score?",
          a: "No. This tool performs a plain math calculation in your browser — it doesn't connect to any credit bureau, doesn't perform a soft or hard credit pull, and doesn't share your inputs with anyone.",
        },
        {
          q: "Why is my actual quoted payment different from this estimate?",
          a: "Lenders may charge an origination fee that's deducted from your loan proceeds or folded into your effective APR, and some round payments or compounding slightly differently. Use your lender's official APR (not just the interest rate) for the closest match.",
        },
        {
          q: "What's a good APR for a personal loan?",
          a: "It depends heavily on your credit profile, but personal loan APRs typically range from roughly 7% for excellent credit to 30%+ for subprime borrowers. Comparing multiple pre-qualified offers is the most reliable way to know what you actually qualify for.",
        },
        {
          q: "Should I choose a longer or shorter term?",
          a: "A shorter term means a higher monthly payment but substantially less total interest paid. A longer term lowers your monthly payment but costs more overall. Use the calculator to compare a few term lengths against your monthly budget.",
        },
      ],
      sources: [
        {
          name: "Methodology note",
          text: "Default values shown are illustrative starting points, not live market rates. This tool does not currently pull personal loan rates from a live data feed.",
        },
      ],
    },
    cta: { offerSlug: "safe-bet-loans", label: "See Pre-Qualified Loan Offers →" },
  },

  "credit-card-payoff-calculator": {
    slug: "credit-card-payoff-calculator",
    navLabel: "Card Payoff",
    title: "Credit Card Payoff Calculator",
    metaTitle: "Credit Card Payoff Calculator — How Long to Pay Off Your Balance | GeniusMoneyDaily",
    metaDescription:
      "Find out how long it will take to pay off your credit card balance at your current APR and payment, and how much a consolidation loan could save you in interest.",
    dek: "See exactly how long your balance will take to clear — and what a lower rate could save you.",
    Component: CreditCardPayoffCalculator,
    paramKeys: ["balance", "apr", "payment"],
    content: {
      howItUse: [
        "Enter your current balance, your card's APR (found on your statement or cardholder agreement), and the fixed monthly payment you plan to make. The calculator shows how many months it will take to reach a zero balance and how much of that total is interest.",
        "It also runs a side-by-side comparison against a fixed-rate consolidation loan at a reference rate, so you can see roughly how much interest a lower, fixed rate could save versus continuing to pay down the card at its current APR.",
      ],
      inputsExplained: [
        { label: "Balance", text: "Your current outstanding balance on the card." },
        { label: "APR", text: "Your card's annual percentage rate on purchases or balances, found on your most recent statement." },
        { label: "Monthly Payment", text: "The fixed amount you plan to pay each month — must be more than the interest accruing that month, or the balance will never shrink." },
      ],
      assumptions: [
        "This calculator assumes you make no new purchases on the card and pay the exact same fixed amount every month until the balance reaches zero — real cards with variable minimum-payment formulas or added purchases will differ.",
        "The consolidation comparison assumes a fixed 12.99% loan at the same monthly payment over the same calculation method, purely to illustrate the effect of a lower, fixed rate. It is not a quoted or guaranteed rate, and actual consolidation loan APRs vary significantly by credit profile.",
        "If your payment doesn't exceed the interest accruing on your balance, the calculator will tell you directly rather than showing a misleading payoff date — this is a real mathematical limit, not a bug.",
      ],
      formula:
        "Months to payoff = −ln(1 − (r × B) ÷ M) ÷ ln(1 + r), where B is the balance, M is the fixed monthly payment, and r is the monthly rate (APR ÷ 12 ÷ 100). This is the standard formula for paying off a revolving balance with a fixed payment, solved for time rather than payment amount.",
      workedExample:
        "Take an $8,000 balance at 22.99% APR with a $250 fixed monthly payment. The monthly rate is about 1.916%. Solving the payoff formula gives roughly 43 months to a zero balance, with total interest of about $2,750. Run the same $8,000 balance and $250 payment through the consolidation comparison at a fixed 12.99% instead, and the payoff time drops to about 36 months with roughly $1,000 in interest — illustrating why a lower, fixed rate can meaningfully shorten both the timeline and the total cost even at the same monthly payment.",
      faqs: [
        {
          q: "Why does the calculator say my balance will never be paid off?",
          a: "If your monthly payment is less than or equal to the interest accruing that month, the balance mathematically cannot shrink — you'd be paying interest only, forever. Increase your monthly payment until the calculator shows a payoff time.",
        },
        {
          q: "Is the 12.99% consolidation rate a real offer?",
          a: "No — it's a fixed reference rate used only to illustrate how a lower, fixed-rate loan compares to continuing to pay down a card at a typical card APR. Actual consolidation loan rates depend on your credit profile and the lender.",
        },
        {
          q: "Does paying more than the minimum always save money?",
          a: "Yes. Any amount above your card issuer's minimum payment reduces the balance faster and reduces the total interest you'll pay, since interest is calculated on the remaining balance each month.",
        },
        {
          q: "What if I have multiple credit cards?",
          a: "Run each card through the calculator separately using its own balance, APR, and payment, or total them together as a rough estimate if you plan to pay them down in parallel at a combined fixed payment.",
        },
      ],
      sources: [
        {
          name: "Methodology note",
          text: "The 12.99% consolidation reference rate is illustrative and not pulled from a live data feed. Your card's own APR is the number that should come directly from your statement.",
        },
      ],
    },
    cta: { offerSlug: "safe-bet-loans", label: "Lower My Credit Card APR →" },
    secondaryCta: {
      offerSlug: "debthunch",
      label: "Explore Debt Relief Options →",
      condition: "balance >= 10000",
    },
  },

  "home-improvement-cost-calculator": {
    slug: "home-improvement-cost-calculator",
    navLabel: "Home Upgrades",
    title: "Home Improvement Cost & Savings Calculator",
    metaTitle: "Home Improvement Cost Calculator — Roofing, Windows & Solar | GeniusMoneyDaily",
    metaDescription:
      "Estimate roofing replacement cost and equity added, annual HVAC savings from new windows, and 20-year solar savings with the federal tax credit.",
    dek: "Roofing, window, and solar estimates in one place — cost, savings, and payback at a glance.",
    Component: HomeUpgradeCalculator,
    paramKeys: ["tab", "sqft", "roofAge", "windows", "bill"],
    content: {
      howItUse: [
        "This tool covers three common home improvement projects in one calculator — switch between the Roofing, Windows, and Solar tabs depending on what you're evaluating. Each tab has its own inputs and its own output metrics, since the economics of each project are different.",
        "Roofing estimates replacement cost against the home equity a new roof typically adds. Windows estimates annual HVAC energy savings from upgrading to energy-efficient units. Solar estimates 20-year electricity bill savings alongside the federal solar tax credit value.",
      ],
      inputsExplained: [
        { label: "Sq Footage (Roofing)", text: "The footprint of your roof in square feet — not your home's total living area." },
        { label: "Roof Age (Roofing)", text: "How old your current roof is, for context on replacement urgency; it does not change the cost estimate itself." },
        { label: "Window Count (Windows)", text: "The number of windows you're considering replacing with energy-efficient units." },
        { label: "Monthly Power Bill (Solar)", text: "Your typical monthly electricity bill, used to size a representative solar system and estimate offset savings." },
      ],
      assumptions: [
        "Roofing uses an estimated $8.50 per square foot (mid-range asphalt shingle, materials and labor combined) and assumes a replaced roof recoups roughly 60% of its cost as added home equity — both figures are national averages and vary significantly by region, roofing material, and local labor costs.",
        "Windows assumes roughly $40 per window in annual HVAC savings from upgrading older single-pane windows to modern energy-efficient units — actual savings depend on your climate, current windows, and home insulation.",
        "Solar assumes the system offsets about 90% of your electricity usage, estimates a representative system cost at roughly 5x your annual power bill, and applies the 30% federal residential solar tax credit to that estimated cost. It does not account for net metering policy, panel degradation, or state/utility incentives, which can meaningfully change your real payback period.",
        "All three estimates are for illustrative, planning purposes only — always get multiple local contractor quotes before committing to a project.",
      ],
      formula:
        "Roofing: Cost = Sq Footage × $8.50; Equity Added = Cost × 60%. Windows: Annual Savings = Window Count × $40. Solar: 20-Year Savings = Monthly Bill × 12 × 20 × 90%; System Cost Estimate = Monthly Bill × 12 × 5; Tax Credit Value = System Cost Estimate × 30%.",
      workedExample:
        "Roofing: a 2,000 sq ft roof at $8.50/sqft estimates to $17,000 in cost, with about $10,200 in added equity — a net investment of roughly $6,800. Windows: replacing 12 windows estimates to about $480/year in HVAC savings. Solar: a $180/month power bill estimates to roughly $38,880 in savings over 20 years, against an estimated system cost of $10,800 and a federal tax credit worth about $3,240.",
      faqs: [
        {
          q: "Are these real contractor quotes?",
          a: "No — these are rough, national-average estimates meant to help you plan and budget. Actual costs vary by region, materials, contractor, and the condition of your home. Always get multiple local quotes before committing.",
        },
        {
          q: "Does the roofing estimate account for roof pitch, layers to remove, or material type?",
          a: "No — it uses a single blended average cost per square foot across common asphalt-shingle jobs. Steep pitches, multiple tear-off layers, or premium materials (metal, tile, slate) will cost more than this baseline estimate.",
        },
        {
          q: "Is the federal solar tax credit guaranteed?",
          a: "The 30% federal residential solar tax credit has historically been subject to phase-downs and legislative changes, so confirm the current rate and eligibility rules before relying on this estimate for tax planning.",
        },
        {
          q: "Why does the window estimate use a flat dollar amount instead of a percentage?",
          a: "Window energy savings depend heavily on what you're replacing and your local climate, so a flat per-window average is a simpler, more conservative estimate than trying to model your specific HVAC system.",
        },
      ],
      sources: [
        {
          name: "Methodology note",
          text: "Cost-per-square-foot, equity-recoup, HVAC savings, and solar offset figures are blended national averages for illustrative estimates, not pulled from a live data feed.",
        },
      ],
    },
    cta: { offerSlug: "home-advisor", label: "Compare Local Contractor Rates & Incentives →" },
  },

  "auto-insurance-calculator": {
    slug: "auto-insurance-calculator",
    navLabel: "Auto Insurance",
    title: "Auto Insurance Savings Estimator",
    metaTitle: "Auto Insurance Calculator — Estimate Your Potential Savings | GeniusMoneyDaily",
    metaDescription:
      "Estimate how much you could save on car insurance by shopping your policy around, based on your vehicle's age and your driver profile.",
    dek: "See a quick estimate of your potential savings before you start comparing quotes.",
    Component: AutoInsuranceCalculator,
    paramKeys: ["year", "age", "premium"],
    content: {
      howItUse: [
        "Enter your vehicle's model year, your age, and your current annual premium. The calculator applies a blended savings-potential rate based on how those two factors typically affect competitiveness in the insurance market, and shows an estimated annual dollar savings if you were to shop your policy around.",
        "This is a directional estimate meant to help you decide whether it's worth the time to get comparison quotes — it is not a quote itself and doesn't use your driving record, location, coverage levels, or claims history, all of which materially affect real premiums.",
      ],
      inputsExplained: [
        { label: "Vehicle Year", text: "Your car's model year — newer vehicles with modern safety features are often more competitively rated across insurers." },
        { label: "Driver Age", text: "Your age — insurers price risk differently for younger and older drivers, independent of vehicle." },
        { label: "Current Premium", text: "What you currently pay annually for auto insurance on this vehicle." },
      ],
      assumptions: [
        "The baseline savings-potential rate is 15% of your current premium, reflecting the average opportunity from comparison-shopping across carriers.",
        "Vehicles 5 years old or newer get a +3 percentage point adjustment, reflecting typically more competitive rate-shopping outcomes for cars with modern safety equipment.",
        "Drivers under 25 or over 70 get a −3 percentage point adjustment, reflecting generally less competitive rate variance in those age brackets.",
        "The resulting rate is capped between 5% and 25% of your current premium. This does not account for your driving record, location, coverage limits, deductibles, or claims history — all of which affect your real premium more than this estimate can capture.",
      ],
      formula:
        "Estimated Annual Savings = Current Premium × Savings Rate, where Savings Rate = clamp(15% + Vehicle Age Adjustment + Driver Age Adjustment, 5%, 25%).",
      workedExample:
        "A 35-year-old driver with a 2020 vehicle (5 years old or newer) and a $1,400 annual premium gets the base 15% plus the +3% newer-vehicle adjustment, for an 18% savings rate — an estimated $252 in potential annual savings. The same premium on a 22-year-old vehicle with a 72-year-old driver would apply the −3% age adjustment instead, landing at a 12% rate and roughly $168 in estimated savings.",
      faqs: [
        {
          q: "Is this a real insurance quote?",
          a: "No. This is a directional estimate based only on vehicle age, driver age, and your stated current premium. A real quote also depends on your driving record, location, coverage levels, deductibles, and claims history.",
        },
        {
          q: "Why did my estimated savings go down when I entered an older car?",
          a: "Older vehicles (more than 5 years old) don't receive the newer-vehicle rate adjustment in this estimate, since insurers' comparison-shopping savings tend to be smaller for them in this model.",
        },
        {
          q: "How often should I shop my auto insurance policy?",
          a: "Many drivers benefit from comparing quotes annually, since premiums can drift upward at renewal even without a change in your risk profile.",
        },
        {
          q: "Does my driving record factor into this estimate?",
          a: "No — this estimator only uses vehicle year, driver age, and current premium. Your driving record, at-fault accidents, and violations have a significant effect on real quotes that this tool does not model.",
        },
      ],
      sources: [
        {
          name: "Methodology note",
          text: "Savings-rate adjustments are illustrative estimates based on general market patterns, not pulled from a live insurance-rate data feed.",
        },
      ],
    },
    cta: { offerSlug: "safe-bet-auto", label: "Compare Matched Auto Quotes →" },
  },

  "life-insurance-calculator": {
    slug: "life-insurance-calculator",
    navLabel: "Life Insurance",
    title: "Life Insurance Needs Calculator",
    metaTitle: "Life Insurance Calculator — How Much Coverage Do You Need? | GeniusMoneyDaily",
    metaDescription:
      "Estimate how much life insurance coverage to consider based on your income, debt, and number of dependents using a common rule-of-thumb formula.",
    dek: "A quick starting-point estimate for how much coverage your family may need.",
    Component: LifeInsuranceCalculator,
    paramKeys: ["income", "debt", "dependents"],
    content: {
      howItUse: [
        "Enter your annual income, your outstanding mortgage and other debt, and your number of dependents. The calculator applies a widely used rule-of-thumb formula to estimate a reasonable starting point for how much term life insurance coverage to consider.",
        "This is meant as a conversation-starter, not a final answer — a licensed insurance professional can account for factors this simple formula can't, like your spouse's income, existing coverage, final expenses, and education goals.",
      ],
      inputsExplained: [
        { label: "Annual Income", text: "Your gross annual income — the formula replaces this income for a period of years if you're no longer there to earn it." },
        { label: "Mortgage / Debt", text: "Your total outstanding debt, including your mortgage balance, so a payout could clear it entirely rather than burden your family." },
        { label: "Dependents", text: "The number of people who financially depend on you — each adds a buffer toward costs like childcare, education, or ongoing support." },
      ],
      assumptions: [
        "This uses a common \"10x income plus debt\" rule of thumb: 10 years of income replacement, your total debt paid off in full, and a flat $100,000 buffer per dependent for costs like education or childcare.",
        "It does not account for existing life insurance coverage, a spouse's or partner's income, final expenses, retirement savings goals, or your specific family's cost of living — all of which a licensed agent would typically factor in.",
        "This is a simplified rule of thumb, not personalized financial or insurance advice.",
      ],
      formula:
        "Recommended Coverage = (Annual Income × 10) + Total Debt + (Dependents × $100,000).",
      workedExample:
        "Someone earning $75,000 per year with $250,000 in combined mortgage and other debt and 2 dependents would calculate: ($75,000 × 10) + $250,000 + (2 × $100,000) = $750,000 + $250,000 + $200,000 = $1,200,000 in recommended coverage — a useful starting figure to bring into a conversation with an insurance professional, who can refine it based on your full financial picture.",
      faqs: [
        {
          q: "Is 10x my income the right amount for everyone?",
          a: "It's a common industry rule of thumb, not a universal answer. Your ideal coverage depends on your dependents' ages, a spouse's income, existing savings, and how long you want income replaced — a licensed agent can help tailor the number.",
        },
        {
          q: "Should I include my mortgage in the debt I enter?",
          a: "Yes — most people want a policy large enough to pay off the mortgage entirely, so their family isn't carrying that payment without their income.",
        },
        {
          q: "What's the difference between term and whole life insurance?",
          a: "Term life insurance covers you for a fixed period (e.g., 20 years) at a lower cost and is what most people mean by \"needs-based\" coverage like this calculator estimates. Whole life insurance lasts your entire life and includes a savings component, at a significantly higher cost.",
        },
        {
          q: "Do I need coverage if I don't have dependents?",
          a: "Possibly less — this calculator's dependent buffer won't apply, but you may still want coverage for debt (like a mortgage with a co-signer) or final expenses.",
        },
      ],
      sources: [
        {
          name: "Methodology note",
          text: "The 10x-income-plus-debt formula is a widely cited industry rule of thumb, not pulled from a live data feed or personalized underwriting.",
        },
      ],
    },
    cta: { offerSlug: "safe-bet-life", label: "Calculate Life Insurance Rates →" },
  },

  "mortgage-refinance-calculator": {
    slug: "mortgage-refinance-calculator",
    navLabel: "Mortgage & Refi",
    title: "Mortgage & Refinance Calculator",
    metaTitle: "Mortgage Refinance Calculator — Live 30-Year Rate | GeniusMoneyDaily",
    metaDescription:
      "Calculate your estimated monthly mortgage payment using today's live 30-year fixed rate from FRED, and see your potential lifetime refinance savings.",
    dek: "Uses today's live 30-year average rate to estimate your payment and refinance savings.",
    Component: MortgageCalculator,
    paramKeys: ["amount", "down", "rate", "term"],
    content: {
      howItUse: [
        "Enter your home price (or target purchase price), your planned down payment percentage, your current mortgage rate if you already have a loan, and your loan term. The calculator fetches today's live average 30-year fixed mortgage rate and compares your monthly payment at that rate against your current rate.",
        "If the live rate is lower than what you entered as your current rate, the calculator estimates your potential lifetime savings from refinancing. If it isn't, it tells you directly that your existing rate is already competitive rather than showing a misleading negative number.",
      ],
      inputsExplained: [
        { label: "Home Price", text: "The purchase price or current value of the home, before your down payment is subtracted." },
        { label: "Down Payment", text: "The percentage of the home price you're putting down — the rest is financed as your loan amount." },
        { label: "Your Current Rate", text: "The mortgage rate you currently have (or expect to be quoted), compared against today's live average rate." },
        { label: "Term", text: "Your loan's repayment period in years — 30 and 15 years are the most common." },
      ],
      assumptions: [
        "The live rate is the national average 30-year fixed mortgage rate reported by Freddie Mac's Primary Mortgage Market Survey, published via the Federal Reserve Economic Data (FRED) series MORTGAGE30US. Your actual quoted rate will vary based on your credit profile, loan size, property type, and lender.",
        "The refinance savings estimate compares your current rate's monthly payment against the live rate's monthly payment, multiplied across the full remaining term — it does not subtract closing costs, which typically range from 2–5% of the loan amount and should be weighed against any projected savings.",
        "This calculator assumes a standard fixed-rate, fully amortizing loan and does not account for property tax, homeowners insurance, or PMI, which are commonly bundled into a real mortgage payment.",
      ],
      formula:
        "Monthly payment = L × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1], where L is the loan amount (home price minus down payment), r is the monthly rate, and n is the number of monthly payments. Lifetime refi savings = (payment at current rate − payment at live rate) × total number of payments.",
      workedExample:
        "A $400,000 home with 20% down ($80,000) finances $320,000. At a current rate of 7.25% over 30 years, the monthly payment is about $2,183. If today's live 30-year average rate is 6.42%, the payment at that rate is about $2,008 — a monthly savings of roughly $175, or about $63,000 over the full 30-year term before accounting for closing costs. If your current rate is already at or below the live rate, the calculator will say so rather than showing a false savings figure.",
      faqs: [
        {
          q: "Where does the live rate come from, and how current is it?",
          a: "It's pulled directly from the Federal Reserve Economic Data (FRED) series MORTGAGE30US, which reports Freddie Mac's weekly Primary Mortgage Market Survey average. The page shows the live rate as fetched; see the Sources section below for the exact as-of date of the underlying data.",
        },
        {
          q: "Does this account for refinance closing costs?",
          a: "No — the savings estimate is based purely on the monthly payment difference across your full term. Refinance closing costs typically run 2–5% of the loan amount, so compare that cost against the projected savings and your break-even timeline before deciding.",
        },
        {
          q: "Why is the live rate different from what my lender quoted me?",
          a: "FRED's rate is a national weekly average. Individual lenders price based on your specific credit score, loan-to-value ratio, loan size, property type, and points paid, so your personal quote will differ from the national average in either direction.",
        },
        {
          q: "Does a lower rate always mean I should refinance?",
          a: "Not necessarily — you need to weigh the monthly and lifetime savings against closing costs and how long you plan to stay in the home. A mortgage professional can help calculate your specific break-even point.",
        },
      ],
      sources: [
        {
          name: "Federal Reserve Economic Data (FRED) — 30-Year Fixed Rate Mortgage Average (MORTGAGE30US)",
          url: "https://fred.stlouisfed.org/series/MORTGAGE30US",
          live: true,
        },
      ],
    },
    cta: { internal: true, href: "/signup", label: "Get Matched With a Refinance Lender →" },
  },

  "debt-consolidation-calculator": {
    slug: "debt-consolidation-calculator",
    navLabel: "Debt Consolidation",
    title: "Debt Consolidation Calculator",
    metaTitle: "Debt Consolidation Calculator — Compare Rates & Savings | GeniusMoneyDaily",
    metaDescription:
      "Compare the total interest cost of your credit card APR against a fixed consolidation loan APR over the same term, and see your estimated savings.",
    dek: "Compare what your debt costs at card rates versus a fixed consolidation loan, side by side.",
    Component: DebtCalculator,
    paramKeys: ["amount", "term", "cardApr", "loanApr"],
    content: {
      howItUse: [
        "Enter your total debt, the repayment term in months you want to compare, your average credit card APR, and the consolidation loan APR you're considering. The calculator computes the fixed monthly payment and total interest under each rate over the same term, side by side.",
        "Unlike the Credit Card Payoff Calculator (which solves for how long a fixed payment takes to clear a balance), this tool solves for the payment and total interest over a term you choose — useful when you're comparing a specific consolidation loan offer against continuing to carry the debt at card rates.",
      ],
      inputsExplained: [
        { label: "Total Debt", text: "The combined balance you're looking to consolidate, across one or more cards or accounts." },
        { label: "Term", text: "The repayment period, in months, you want to compare both scenarios over." },
        { label: "Credit Card APR", text: "Your current average APR across the debt you're comparing, found on your statements." },
        { label: "Consolidation Loan APR", text: "The fixed rate on a consolidation loan offer you're evaluating." },
      ],
      assumptions: [
        "Both scenarios are compared over the identical term you enter, using the standard fixed-rate amortization formula — this isolates the effect of the interest rate difference alone.",
        "It assumes no additional charges are added to the card balance during the comparison period, and that the consolidation loan has no origination fee factored into its APR unless you include that in the rate you enter.",
        "This tool shows the mathematical effect of rate alone; it never promises a specific savings outcome, since actual consolidation loan approval, rate, and terms depend on your credit profile and the lender.",
      ],
      formula:
        "Monthly payment at each APR = D × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1], where D is total debt, r is the monthly rate for that APR, and n is the term in months. Total interest = (monthly payment × n) − D for each scenario; savings is the difference between the two.",
      workedExample:
        "With $20,000 in total debt over a 48-month term, a 24.99% card APR produces a monthly payment of about $588 and roughly $8,224 in total interest. A 13.99% consolidation loan APR over the same 48 months produces a monthly payment of about $542 and roughly $6,016 in total interest — an estimated savings of about $2,208 over the term, driven entirely by the lower, fixed rate.",
      faqs: [
        {
          q: "How is this different from the Credit Card Payoff Calculator?",
          a: "The Payoff Calculator solves for how long a fixed monthly payment takes to clear your balance. This tool instead fixes the term and solves for the payment and total interest at two different APRs, which is more useful when you're comparing a specific consolidation loan offer against your current card rate.",
        },
        {
          q: "Will I definitely qualify for the consolidation APR I enter?",
          a: "No — enter the APR from an offer you've actually received, or a rate you want to compare hypothetically. Actual approval and rate depend on your credit profile and the lender's underwriting.",
        },
        {
          q: "Does consolidating always save money?",
          a: "Only if the new fixed rate is meaningfully lower than your blended card APR and you avoid accumulating new card debt afterward — consolidation doesn't help if the underlying balances come right back.",
        },
        {
          q: "Should I use the longest term available to lower my payment?",
          a: "A longer term lowers your monthly payment but increases total interest paid at any given rate. Use the calculator to compare a couple of term lengths against both your budget and the total cost.",
        },
      ],
      sources: [
        {
          name: "Methodology note",
          text: "This tool compares the APRs you enter directly — it does not pull live card or loan rates from a data feed. Use your own statement APR and any real loan offer's APR for the most accurate comparison.",
        },
      ],
    },
    cta: { offerSlug: "safe-bet-loans", label: "See Consolidation Loan Offers →" },
  },

  "budget-calculator": {
    slug: "budget-calculator",
    navLabel: "Budget",
    title: "Monthly Budget Calculator",
    metaTitle: "Budget Calculator — Plan Your Monthly Income & Expenses | GeniusMoneyDaily",
    metaDescription:
      "Build a monthly budget across 9 common categories and see exactly what's left over, with optional Holiday and Trip savings modes.",
    dek: "See exactly where your money goes each month — and what's left over.",
    Component: BudgetCalculator,
    paramKeys: [
      "income",
      "housing",
      "transportation",
      "food",
      "utilities",
      "insurance",
      "debt",
      "entertainment",
      "savings",
      "other",
      "mode",
      "goalAmount",
      "goalMonths",
    ],
    content: {
      howItUse: [
        "Enter your monthly take-home income and your typical spending across nine common categories: housing, transportation, food, utilities, insurance, debt payments, entertainment, savings, and other. The calculator totals your expenses and shows what's left over — or how far short you are, if your expenses exceed your income.",
        "Switch to Holiday Savings or Trip Savings mode to add a specific savings goal and a timeline on top of your regular budget. The calculator works out the flat monthly amount you'd need to set aside to hit that goal, and folds it into your total expenses so you can see whether your current budget actually supports it. If it doesn't, the tool shows two side-by-side ways to handle the gap — adjusting the plan, or covering it with a loan — rather than just flagging a shortfall and leaving you to figure out the rest.",
        "In Standard Budget mode, you can flag any category amount as an emergency or one-time cost for that month (a car repair, a medical bill, a needed replacement) using the checkbox under each category. A link to the Personal Loan Calculator only appears if you've flagged something — routine, recurring spending never triggers a loan suggestion.",
      ],
      inputsExplained: [
        { label: "Monthly Income", text: "Your take-home pay after taxes and payroll deductions — the number that actually lands in your account each month." },
        { label: "Category Amounts", text: "Your typical monthly spending in each of the nine categories. The Savings category is for routine saving you already do; it's counted as an expense here since it's money leaving your checking account on purpose." },
        { label: "Emergency / One-Time Checkbox (Standard mode)", text: "Flags a category's amount as an unplanned or one-time cost rather than routine spending. Only flagged amounts can trigger the optional personal loan suggestion at the bottom of the tool." },
        { label: "Budget Mode", text: "Standard Budget shows your regular monthly picture. Holiday Savings and Trip Savings each add a goal amount and a timeline, and compute the flat monthly savings required to reach it." },
        { label: "Goal Amount & Months Until", text: "Only shown in Holiday or Trip mode — the total dollar amount you want saved, and how many months you have to save it." },
      ],
      assumptions: [
        "This is a simple addition-and-subtraction budget, not a bank-linked tracker — it only reflects what you type in, and does not pull transactions from any account.",
        "Goal savings in Holiday or Trip mode are spread evenly across the number of months you enter (Goal Amount ÷ Months Until). It does not account for a goal you've already partially saved toward — subtract what you've already set aside from the goal amount first if that applies to you.",
        "Irregular income or expenses (bonuses, annual bills, seasonal work) will make any single month look better or worse than your true average — consider using a monthly average rather than your most recent paycheck or bill if your finances vary significantly month to month.",
        "When a Holiday or Trip plan doesn't fit, the loan path shown uses an illustrative 11.5% APR over 24 months — a planning estimate, not a quoted, live, or guaranteed rate. The optional tax-refund payoff estimate assumes the refund arrives exactly when and in the amount you enter; real refunds can be delayed or smaller than expected, so this is a best-case illustration, not something to rely on.",
      ],
      formula:
        "Total Monthly Expenses = sum of all nine category amounts, plus Monthly Goal Savings if Holiday or Trip mode is active. Monthly Goal Savings = Goal Amount ÷ Months Until Goal. Remaining = Monthly Income − Total Monthly Expenses. When Remaining is negative in Holiday/Trip mode, the suggested loan amount is |Remaining| × Months Until Goal — the cumulative gap the plan creates in your budget over that period.",
      workedExample:
        "Take a $5,500 monthly take-home income with $1,600 housing, $450 transportation, $600 food, $250 utilities, $300 insurance, $400 debt payments, $200 entertainment, $550 savings, and $200 other — $4,550 in total category expenses, leaving $950 remaining in Standard mode. Switch to Holiday Savings with a $1,200 goal over 4 months, and the calculator adds a $300 monthly goal-savings line, bringing total expenses to $4,850 and remaining down to $650 — still comfortably covered. Shrink the goal timeline to 1 month instead (a $1,200 monthly goal-savings line), and total expenses jump to $5,750 against $5,500 income — a $250 monthly shortfall. The tool then shows a $250 budget shortfall, a suggested $250 total loan amount to cover that single month's gap, and a lower-cost-alternatives panel alongside it.",
      faqs: [
        {
          q: "Does this calculator connect to my bank account?",
          a: "No. This is a plain math calculator that only uses the numbers you type in — it has no bank connection and doesn't store, transmit, or save your inputs anywhere.",
        },
        {
          q: "Why does Savings count as an expense?",
          a: "Because it's money you're intentionally moving out of your spendable checking balance each month. Counting it as a category keeps the \"Remaining\" figure honest — it's the money left over after everything you've planned for, including your own savings.",
        },
        {
          q: "What if my expenses are higher than my income?",
          a: "The calculator will show a \"Budget Shortfall\" instead of a remaining balance, in red, so it's clear at a glance that your current spending exceeds your income rather than showing a misleading negative number buried in a results tile.",
        },
        {
          q: "Why does a personal loan link only show up sometimes?",
          a: "In Standard mode, it only appears if you've checked the \"emergency / one-time\" box on a category — routine monthly spending shouldn't be nudged toward a loan. In Holiday or Trip mode, the loan path only appears once your plan actually creates a shortfall, alongside a non-loan option for closing the gap instead.",
        },
        {
          q: "Is repaying the loan with my tax refund a safe plan?",
          a: "Treat it as a best case, not a guarantee. Refunds can be delayed, reduced by offsets, or smaller than you estimated. If you're counting on an early payoff, look for a loan with no prepayment penalty so an early lump-sum payment doesn't cost you extra.",
        },
      ],
      sources: [
        {
          name: "Methodology note",
          text: "Default category amounts and the 11.5% illustrative loan APR are planning estimates only, not benchmarks or rates pulled from a live data feed. Replace them with your own numbers, and compare real loan offers before relying on this estimate.",
        },
      ],
    },
    cta: { internal: true, href: "/tools/personal-loan-calculator", label: "See how a personal loan could simplify your payments →" },
  },
};

export const TOOL_SLUGS = Object.keys(TOOLS_CONFIG);

export function getToolConfig(slug) {
  return TOOLS_CONFIG[slug] || null;
}
