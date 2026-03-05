import { dataGuideColumns } from "@/lib/constants";

export const UPLOAD_SESSION_KEY = "profitview_upload_session";

export interface UploadSession {
  fileName: string;
  detectedColumns: string[];
  mapping: Record<string, string>;
  uploadedAt: string;
  rowCount: number;
  notice?: string;
}

const fallbackUploadColumns = [
  "order_date",
  "sku",
  "item_name",
  "territory",
  "sell_price",
  "cost_per_unit",
  "units_sold",
];

const mappingHints: Record<string, string[]> = {
  date: ["date", "day", "orderdate", "transactiondate", "salesdate"],
  product_id: ["productid", "sku", "itemid", "id", "productcode"],
  product_name: ["productname", "itemname", "name", "item", "product"],
  region: ["region", "territory", "market", "area", "country"],
  unit_price: ["unitprice", "price", "sellprice", "salesprice", "revenueperunit"],
  unit_cost: ["unitcost", "cost", "costperunit", "basecost"],
  quantity: ["quantity", "qty", "units", "unitssold", "volume"],
};

function normalizeHeader(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function parseCsvHeaders(text: string) {
  const [headerLine] = text.split(/\r?\n/).filter(Boolean);
  if (!headerLine) return [];

  const delimiter = headerLine.includes(";") ? ";" : ",";

  return headerLine
    .split(delimiter)
    .map((header) => header.replace(/^"|"$/g, "").trim())
    .filter(Boolean);
}

function parseJsonHeaders(text: string) {
  const parsed = JSON.parse(text);

  if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "object" && parsed[0] !== null) {
    return Object.keys(parsed[0]);
  }

  if (typeof parsed === "object" && parsed !== null) {
    return Object.keys(parsed);
  }

  return [];
}

export async function detectUploadColumns(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "csv") {
    const text = await file.text();
    const columns = parseCsvHeaders(text);

    return {
      columns: columns.length > 0 ? columns : fallbackUploadColumns,
      notice: columns.length > 0 ? undefined : "We could not read the CSV headers, so mock columns are shown for mapping.",
    };
  }

  if (extension === "json") {
    try {
      const text = await file.text();
      const columns = parseJsonHeaders(text);

      return {
        columns: columns.length > 0 ? columns : fallbackUploadColumns,
        notice: columns.length > 0 ? undefined : "This JSON file had no object keys to map, so mock columns are shown.",
      };
    } catch {
      return {
        columns: fallbackUploadColumns,
        notice: "This JSON file could not be parsed, so mock columns are shown for mapping.",
      };
    }
  }

  return {
    columns: fallbackUploadColumns,
    notice: "Spreadsheet parsing is mocked for now, so example columns are shown for XLSX files.",
  };
}

export function suggestColumnMapping(columns: string[]) {
  const normalizedColumns = columns.map((column) => ({
    raw: column,
    normalized: normalizeHeader(column),
  }));

  return dataGuideColumns.reduce<Record<string, string>>((acc, column) => {
    const target = normalizeHeader(column.name);
    const directMatch = normalizedColumns.find((entry) => entry.normalized === target);

    if (directMatch) {
      acc[column.name] = directMatch.raw;
      return acc;
    }

    const hintMatch = normalizedColumns.find((entry) =>
      mappingHints[column.name]?.some((hint) => entry.normalized.includes(hint)),
    );

    acc[column.name] = hintMatch?.raw ?? "";
    return acc;
  }, {});
}

export function saveUploadSession(session: UploadSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UPLOAD_SESSION_KEY, JSON.stringify(session));
}

export function getUploadSession() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(UPLOAD_SESSION_KEY);
    return stored ? (JSON.parse(stored) as UploadSession) : null;
  } catch {
    return null;
  }
}
