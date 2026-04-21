function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .openById("1LSyDRJxrW-kdzkuHHur0d90swQJbSYzNx3EJY5l0WXE")
      .getActiveSheet();

    const data = JSON.parse(e.postData.contents);
    const toCsv = (value) => {
      if (Array.isArray(value)) return value.join(", ");
      if (value === null || value === undefined) return "";
      return String(value);
    };

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.department || "",
      data.year || "",
      data.role || "",
      data.useBus || "",
      data.frequency || "",
      data.route || "",
      toCsv(data.problems),
      data.satisfaction || "",
      data.wantApp || "",
      toCsv(data.features),
      data.dtmsHelp || "",
      data.suggestions || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error: " + error);
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
