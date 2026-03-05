// All mock data for ProfitView BI — single source of truth

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

export const sparklines = {
  revenue: [{ value: 85 }, { value: 79 }, { value: 102 }, { value: 95 }, { value: 110 }, { value: 118 }, { value: 115 }, { value: 125 }],
  profit: [{ value: 42 }, { value: 38 }, { value: 51 }, { value: 47 }, { value: 53 }, { value: 59 }, { value: 56 }, { value: 62 }],
  margin: [{ value: 49 }, { value: 48 }, { value: 50 }, { value: 49 }, { value: 48 }, { value: 50 }, { value: 49 }, { value: 50 }],
  anomalies: [{ value: 2 }, { value: 1 }, { value: 3 }, { value: 0 }, { value: 2 }, { value: 1 }, { value: 4 }, { value: 2 }],
};

export const recentInsights = [
  {
    id: 1,
    title: "Revenue spike detected in Northeast region",
    description: "Revenue increased 23% compared to the previous week.",
    timestamp: "2026-02-19T09:15:00Z",
    severity: "info" as const,
  },
  {
    id: 2,
    title: "Profit margin drop in Product Line B",
    description: "Margin fell below 35% threshold due to increased costs.",
    timestamp: "2026-02-18T14:30:00Z",
    severity: "warning" as const,
  },
  {
    id: 3,
    title: "Anomalous return rate in Q4 batch",
    description: "Return rate hit 8.2%, above the 3% baseline.",
    timestamp: "2026-02-17T11:00:00Z",
    severity: "error" as const,
  },
];

export const executiveReports = [
  { id: 1, title: "Q4 2025 Financial Summary", date: "2026-01-15", summary: "Q4 showed a 12% revenue increase YoY with strong digital channel performance." },
  { id: 2, title: "Annual Performance Review 2025", date: "2026-01-28", summary: "Full-year revenue reached $1.8B, exceeding targets by 7%." },
  { id: 3, title: "Market Analysis — Feb 2026", date: "2026-02-05", summary: "Market share grew to 18.4% with strong brand sentiment scores." },
  { id: 4, title: "Cost Optimization Report", date: "2026-02-10", summary: "Identified $4.2M in potential savings across supply chain and operations." },
  { id: 5, title: "Customer Retention Analysis", date: "2026-02-14", summary: "Net retention rate stands at 108%. Churn reduced by 1.5%." },
  { id: 6, title: "Regional Expansion Feasibility", date: "2026-02-18", summary: "Analysis supports entry into Latin American markets with projected 22% ROI." },
];

export const dataGuideColumns = [
  { name: "date", type: "Date", example: "2024-01-15" },
  { name: "product_id", type: "String", example: "PROD-042" },
  { name: "product_name", type: "String", example: "Widget Pro" },
  { name: "region", type: "String", example: "North America" },
  { name: "unit_price", type: "Number", example: "149.99" },
  { name: "unit_cost", type: "Number", example: "87.50" },
  { name: "quantity", type: "Integer", example: "250" },
];

export const dataGuideDos = [
  "Use YYYY-MM-DD format for all dates",
  "Include headers in the first row",
  "Use UTF-8 encoding",
  "Use decimal points for numbers",
  "Keep product IDs consistent",
  "Map close header names during upload if your file uses different labels",
];

export const dataGuideDonts = [
  "Leave empty rows or columns",
  "Use special characters in headers",
  "Mix date formats in one file",
  "Include currency symbols in numbers",
  "Exceed 50 MB per upload",
];

export const mockAdminUsers = [
  {
    id: "usr_01HQ2P8J93A6",
    name: "Lina Alvarez",
    email: "lina@profitview.io",
    role: "admin" as const,
    strikes: 0,
    lastWarning: "No warnings sent",
    status: "clear" as const,
  },
  {
    id: "usr_01HQ2RC5VX1M",
    name: "Mark Benson",
    email: "mark@profitview.io",
    role: "user" as const,
    strikes: 1,
    lastWarning: "Late-night duplicate upload warning",
    status: "watch" as const,
  },
  {
    id: "usr_01HQ2SBRN77Q",
    name: "Nora Patel",
    email: "nora@profitview.io",
    role: "user" as const,
    strikes: 2,
    lastWarning: "Invalid quantity column detected",
    status: "warned" as const,
  },
  {
    id: "usr_01HQ2T1PXK4D",
    name: "Ethan Cole",
    email: "ethan@profitview.io",
    role: "user" as const,
    strikes: 3,
    lastWarning: "Third strike: harmful content flag",
    status: "critical" as const,
  },
];

export const mockStrikeNotifications = [
  {
    id: 1,
    audience: "admin",
    title: "Admin alert",
    message: "User usr_01HQ2SBRN77Q reached 2 strikes and needs review.",
    timestamp: "5 min ago",
  },
  {
    id: 2,
    audience: "user",
    title: "User warning",
    message: "A warning was issued because the quantity column was missing during upload.",
    timestamp: "5 min ago",
  },
  {
    id: 3,
    audience: "admin",
    title: "Admin alert",
    message: "User usr_01HQ2T1PXK4D hit the 3-strike threshold.",
    timestamp: "1 min ago",
  },
];

export const uploadedAnalysisRows = [
  { date: "2026-01-04", product_id: "PROD-101", product_name: "Atlas Desk", region: "EMEA", unit_price: 320, unit_cost: 210, quantity: 14 },
  { date: "2026-01-11", product_id: "PROD-118", product_name: "Nova Lamp", region: "North America", unit_price: 180, unit_cost: 95, quantity: 28 },
  { date: "2026-01-18", product_id: "PROD-121", product_name: "Flux Chair", region: "LATAM", unit_price: 260, unit_cost: 160, quantity: 19 },
  { date: "2026-02-02", product_id: "PROD-105", product_name: "Atlas Desk", region: "EMEA", unit_price: 320, unit_cost: 210, quantity: 22 },
  { date: "2026-02-10", product_id: "PROD-132", product_name: "Halo Shelf", region: "APAC", unit_price: 210, unit_cost: 120, quantity: 31 },
  { date: "2026-02-17", product_id: "PROD-118", product_name: "Nova Lamp", region: "North America", unit_price: 180, unit_cost: 95, quantity: 26 },
];

export const uploadedMonthlyPerformance = [
  { month: "Jan", revenue: 14940, profit: 7850 },
  { month: "Feb", revenue: 19470, profit: 10675 },
  { month: "Mar", revenue: 22100, profit: 12440 },
  { month: "Apr", revenue: 24820, profit: 13990 },
];

export const uploadedRegionPerformance = [
  { region: "EMEA", revenue: 11520, profit: 5940 },
  { region: "North America", revenue: 9720, profit: 4590 },
  { region: "LATAM", revenue: 4940, profit: 1900 },
  { region: "APAC", revenue: 6510, profit: 2790 },
];
