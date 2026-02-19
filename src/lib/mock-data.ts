// Mock data for ProfitView BI dashboard

export const monthlyProfitData = [
  { month: "Jan", profit: 42000, revenue: 85000 },
  { month: "Feb", profit: 38000, revenue: 79000 },
  { month: "Mar", profit: 51000, revenue: 102000 },
  { month: "Apr", profit: 47000, revenue: 95000 },
  { month: "May", profit: 53000, revenue: 110000 },
  { month: "Jun", profit: 59000, revenue: 118000 },
  { month: "Jul", profit: 56000, revenue: 115000 },
  { month: "Aug", profit: 62000, revenue: 125000 },
  { month: "Sep", profit: 58000, revenue: 120000 },
  { month: "Oct", profit: 67000, revenue: 135000 },
  { month: "Nov", profit: 71000, revenue: 142000 },
  { month: "Dec", profit: 75000, revenue: 150000 },
];

export const revenueSparkline = [
  { value: 85 }, { value: 79 }, { value: 102 }, { value: 95 },
  { value: 110 }, { value: 118 }, { value: 115 }, { value: 125 },
];

export const profitSparkline = [
  { value: 42 }, { value: 38 }, { value: 51 }, { value: 47 },
  { value: 53 }, { value: 59 }, { value: 56 }, { value: 62 },
];

export const marginSparkline = [
  { value: 49 }, { value: 48 }, { value: 50 }, { value: 49 },
  { value: 48 }, { value: 50 }, { value: 49 }, { value: 50 },
];

export const anomalySparkline = [
  { value: 2 }, { value: 1 }, { value: 3 }, { value: 0 },
  { value: 2 }, { value: 1 }, { value: 4 }, { value: 2 },
];

export const recentInsights = [
  {
    id: 1,
    title: "Revenue spike detected in Northeast region",
    description: "Revenue increased 23% compared to the previous week, driven by a seasonal campaign.",
    timestamp: "2026-02-19T09:15:00Z",
    severity: "info" as const,
  },
  {
    id: 2,
    title: "Profit margin drop in Product Line B",
    description: "Margin fell below 35% threshold due to increased raw material costs.",
    timestamp: "2026-02-18T14:30:00Z",
    severity: "warning" as const,
  },
  {
    id: 3,
    title: "Anomalous return rate in Q4 batch",
    description: "Return rate hit 8.2%, significantly above the 3% baseline for this category.",
    timestamp: "2026-02-17T11:00:00Z",
    severity: "error" as const,
  },
];

export const executiveReports = [
  {
    id: 1,
    title: "Q4 2025 Financial Summary",
    date: "2026-01-15",
    summary: "Q4 showed a 12% revenue increase YoY, with strong performance in digital channels. Operating margins improved by 2.1 percentage points.",
  },
  {
    id: 2,
    title: "Annual Performance Review 2025",
    date: "2026-01-28",
    summary: "Full-year revenue reached $1.8B, exceeding targets by 7%. Key growth drivers include expansion into APAC markets and new product launches.",
  },
  {
    id: 3,
    title: "Market Analysis — Feb 2026",
    date: "2026-02-05",
    summary: "Competitive landscape remains favorable. Market share grew to 18.4% with strong brand sentiment scores across all segments.",
  },
  {
    id: 4,
    title: "Cost Optimization Report",
    date: "2026-02-10",
    summary: "Identified $4.2M in potential savings across supply chain and operations. Recommendations include vendor consolidation and automation initiatives.",
  },
  {
    id: 5,
    title: "Customer Retention Analysis",
    date: "2026-02-14",
    summary: "Net retention rate stands at 108%. Churn reduced by 1.5% following implementation of proactive engagement programs.",
  },
  {
    id: 6,
    title: "Regional Expansion Feasibility",
    date: "2026-02-18",
    summary: "Analysis supports entry into Latin American markets with projected ROI of 22% within 18 months. Brazil and Mexico identified as priority markets.",
  },
];
