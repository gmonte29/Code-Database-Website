// JavaScript code for filtering and modal
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

function addProgramRow(title, language, programType, _programLink) {
    const table = document.getElementById("programTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    cell1.innerHTML = title;
    cell2.innerHTML = language;
    cell3.innerHTML = programType;
    
    // Create a link to the common program page with the program title as a query parameter
    cell4.innerHTML = `<a href="program.html?title=${encodeURIComponent(title)}" target="_blank">View Program</a>`;
}

document.getElementById('openUploadModal').addEventListener('click', function() {
    document.getElementById('uploadModal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('uploadModal').style.display = 'none';
});

document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    uploadFile();
    document.getElementById('uploadModal').style.display = 'none';
});

function uploadFile() {
    const fileInput = document.getElementById('programFile');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('programTitle', document.getElementById('programTitle').value);
    formData.append('programLanguage', document.getElementById('programLanguage').value);
    formData.append('programFile', file);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Upload successful. Server response:', data);
        addProgramRow(data.title, data.language, data.programType, data.programLink);
    })
    .catch(error => console.error('Error:', error));
}