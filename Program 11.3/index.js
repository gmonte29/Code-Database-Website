const programTypeFilter = document.getElementById("programTypeFilter");
const languageFilter = document.getElementById("languageFilter");
const programRows = document.querySelectorAll("table tbody tr");

programTypeFilter.addEventListener("change", filterPrograms);
languageFilter.addEventListener("change", filterPrograms);

function filterPrograms() {
    const selectedProgramType = programTypeFilter.value;
    const selectedLanguage = languageFilter.value;

    programRows.forEach(row => {
        const programType = row.querySelector("td:nth-child(3)").textContent;
        const language = row.querySelector("td:nth-child(2)").textContent;

        if (
            (selectedProgramType === "All" || programType === selectedProgramType) &&
            (selectedLanguage === "All" || language === selectedLanguage)
        ) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    });
}
// Function to add a new program row to the table
function addProgramRow(title, language, programType, programLink) {
    const table = document.getElementById("programTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    cell1.innerHTML = title;
    cell2.innerHTML = language;
    cell3.innerHTML = programType;
    cell4.innerHTML = `<a href="${programLink}">View Program</a>`;
}

// Handle the upload button click
document.getElementById("uploadButton").addEventListener("click", function() {
    const fileInput = document.getElementById("programFile");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const programData = JSON.parse(e.target.result);
            addProgramRow(programData.title, programData.language, programData.programType, programData.programLink);
        };
        reader.readAsText(file);
    }
});