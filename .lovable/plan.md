

# ProfitView — BI Frontend

## Overview
A clean, modular Business Intelligence dashboard with three main sections: Dashboard, Data Upload Wizard, and Executive Reports, all navigated via a collapsible sidebar.

---

## 1. Global Layout & Sidebar
- Collapsible sidebar using the Shadcn Sidebar component with Lucide icons
- Navigation items: **Dashboard**, **Data Wizard**, **Executive Reports**
- User Profile section at the bottom (avatar, name, role)
- Active route highlighting
- Main content area fills remaining space

## 2. Dashboard Page
- **Top Row — 4 Metric Cards**: Revenue, Profit, Margin %, and Anomalies. Each card contains a small sparkline chart (Recharts) showing a mini trend line
- **Middle — Monthly Profit Trends**: A large, polished Area Chart (Recharts) with gradient fill, showing 12 months of mock profit data
- **Bottom — Recent Insights**: A list of the 3 most recent anomaly alerts with icons, timestamps, and short descriptions

## 3. Data Wizard (Upload Page)
- **Drag-and-Drop Upload Zone**: Dashed border area with an upload icon, supporting click-to-browse as well
- **Security Policy Box**: Yellow-accented warning card with alert icon, displaying the "3 Strikes Policy" message
- **3-Step Progress Bar**: Visual stepper showing Upload → Map Columns → Confirm, with the current step highlighted. Each step has a simple mock UI (file selection, column mapping preview, confirmation summary)

## 4. Executive Reports Page
- **Report Cards Grid**: Responsive grid of cards, each showing a placeholder thumbnail, report title, date, and a "Download PDF" button
- **Edit Mode Toggle**: A button to enter edit mode. In edit mode, the Executive Summary text on each card becomes an editable textarea. A "Save" button confirms changes (stored in local state)

## 5. Data & State
- All data is mock/hardcoded using local `useState`
- Navigation handled via React Router
- No backend integration — purely frontend

## 6. Design & Code Quality
- Clean, modern aesthetic using Tailwind CSS with the existing design system
- Lucide-React icons throughout
- Components kept modular and under ~100 lines each
- Descriptive variable naming conventions

