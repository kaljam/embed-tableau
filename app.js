console.log("Hello");
let viz;

// Create variable for the url
const url =
  "https://public.tableau.com/views/StockPrices2019_2ParameterActions/StockDashboard?:language=en-GB&:display_count=y&:origin=viz_share_link";

// Create variable for the vizContainer
const vizContainer = document.getElementById("vizContainer");

// Create a variable for the viz options
const options = {
  device: "desktop",
  hideTabs: true,
};

//  Create a variable for hideButton
const hideButton = document.getElementById("hideButton");

//  Hide viz on button click
hideButton.addEventListener("click", function () {
  console.log("Hello from the hide button");
  viz.hide();
  showButton.style.display = "inline";
  hideButton.style.display = "none";
});

//  Show viz on button click
showButton.addEventListener("click", function () {
  console.log("Hello from the show button");
  viz.show();
  hideButton.style.display = "inline";
  showButton.style.display = "none";
});

// Create pdf button
const pdfButton = document.getElementById("pdfButton");
pdfButton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

// Create ppt button
const pptButton = document.getElementById("pptButton");
pptButton.addEventListener("click", function () {
  viz.showExportPowerPointDialog();
});

// Create data button
const dataButton = document.getElementById("dataButton");
dataButton.addEventListener("click", function () {
  viz.showExportCrossTabDialog();
});

// Date filter
function getRangeValues() {
  // Get values from input
  const minDate = document.getElementById("minDate").value;
  const maxDate = document.getElementById("maxDate").value;
  console.log(minDate);
  console.log(maxDate);
  // Get the workbook
  const workbook = viz.getWorkbook();
  console.log(workbook);
  // Get the active sheet (dashboard)
  const activeSheet = workbook.getActiveSheet();
  console.log(activeSheet);
  // Get all the sheets in the dashboard
  const sheets = activeSheet.getWorksheets();
  console.log(sheets);
  // Apply filter to correct sheet with date measure
  const sheetToFilter = sheets[0];
  sheetToFilter.applyRangeFilterAsync("Date", {
    min: minDate,
    max: maxDate,
  });
}

document.getElementById("filterButton").addEventListener("click", function () {
  getRangeValues();
});

// Create initViz function
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
  showButton.style.display = "none";
}

// Load Viz after page load
document.addEventListener("DOMContentLoaded", initViz);
