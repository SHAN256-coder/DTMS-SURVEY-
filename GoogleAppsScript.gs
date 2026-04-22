const SPREADSHEET_ID = "1LSyDRJxrW-kdzkuHHur0d90swQJbSYzNx3EJY5l0WXE";
const TARGET_SHEET_GID = 0;

const COLUMN_DEFS = [
  { key: "timestamp", header: "Timestamp", aliases: ["Date", "Submitted At"] },
  { key: "name", header: "Name", aliases: ["Full Name"] },
  { key: "department", header: "Department" },
  { key: "section", header: "Section" },
  { key: "year", header: "Year", aliases: ["Year of Study"] },
  { key: "role", header: "Role" },
  { key: "useBus", header: "Use Bus", aliases: ["Bus User", "Do you use the college bus?"] },
  { key: "frequency", header: "Frequency" },
  { key: "busNumber", header: "Bus Number", aliases: ["Bus Route Number", "Route Number"] },
  { key: "route", header: "Route", aliases: ["Bus Route / Area", "Area"] },
  { key: "problems", header: "Problems", aliases: ["Issues"] },
  { key: "satisfaction", header: "Satisfaction" },
  { key: "wantApp", header: "Want App", aliases: ["Would you like a mobile app for bus tracking?"] },
  { key: "features", header: "Features", aliases: ["Preferred Features"] },
  { key: "dtmsHelp", header: "DTMS Help", aliases: ["DTMS Improves Efficiency"] },
  { key: "suggestions", header: "Suggestions" },
];

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const sheet = getTargetSheet_();
    const headers = ensureHeaders_(sheet);

    sheet.appendRow(buildRow_(headers, payload));

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error: " + error);
    Logger.log(error && error.stack ? error.stack : "No stack trace available");

    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getTargetSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const targetSheet = spreadsheet
    .getSheets()
    .find((sheet) => sheet.getSheetId() === TARGET_SHEET_GID);

  return targetSheet || spreadsheet.getSheets()[0];
}

function ensureHeaders_(sheet) {
  const existingWidth = Math.max(sheet.getLastColumn(), 1);
  let headers = sheet.getRange(1, 1, 1, existingWidth).getValues()[0];
  const hasHeaders = headers.some((value) => String(value || "").trim() !== "");

  if (!hasHeaders) {
    headers = COLUMN_DEFS.map((column) => column.header);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return headers;
  }

  const nextHeaders = [...headers];

  COLUMN_DEFS.forEach((column) => {
    if (findHeaderIndex_(nextHeaders, column) === -1) {
      nextHeaders.push(column.header);
    }
  });

  if (nextHeaders.length !== headers.length) {
    sheet.getRange(1, 1, 1, nextHeaders.length).setValues([nextHeaders]);
  }

  return nextHeaders;
}

function buildRow_(headers, payload) {
  return headers.map((header) => {
    const column = findColumnByHeader_(header);

    if (!column) {
      return "";
    }

    if (column.key === "timestamp") {
      return payload.timestamp ? new Date(payload.timestamp) : new Date();
    }

    return toCellValue_(payload[column.key]);
  });
}

function findHeaderIndex_(headers, column) {
  return headers.findIndex((header) => isMatchingHeader_(header, column));
}

function findColumnByHeader_(header) {
  return COLUMN_DEFS.find((column) => isMatchingHeader_(header, column));
}

function isMatchingHeader_(header, column) {
  const normalizedHeader = normalizeHeader_(header);
  const supportedHeaders = [column.header].concat(column.aliases || []);

  return supportedHeaders.some((candidate) => normalizeHeader_(candidate) === normalizedHeader);
}

function normalizeHeader_(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function toCellValue_(value) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}
