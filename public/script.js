// JavaScript code for filtering and modal
const programTypeFilter = document.getElementById("programTypeFilter");
const languageFilter = document.getElementById("languageFilter");
const programRows = document.querySelectorAll("table tbody tr");

programTypeFilter.addEventListener("change", filterPrograms);
languageFilter.addEventListener("change", filterPrograms);

// Program Filtering
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

// Search-Bar Function
function searchPrograms() {
    var input, filter, table, tbody, tr, td, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("programTable");
    tbody = table.getElementsByTagName("tbody")[0];
    tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]; // Assuming the program name is in the first column
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Add Row to Table
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

    // Update filter options and trigger filter
    updateFilterOptions();
    filterPrograms();
}

// Function to update filter options
function updateFilterOptions() {
    const programTypes = new Set();
    const languages = new Set();

    programRows.forEach(row => {
        programTypes.add(row.querySelector("td:nth-child(3)").textContent);
        languages.add(row.querySelector("td:nth-child(2)").textContent);
    });

    console.log("Program Types:", programTypes);
    console.log("Languages:", languages);

    updateFilterDropdown(programTypeFilter, programTypes);
    updateFilterDropdown(languageFilter, languages);
}

// Function to update filter dropdown options
function updateFilterDropdown(filterElement, optionsSet) {
    // Clear existing options
    filterElement.innerHTML = '';

    // Add 'All' option
    const allOption = document.createElement('option');
    allOption.value = 'All';
    allOption.text = 'All';
    filterElement.appendChild(allOption);

    // Add unique options
    optionsSet.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.text = optionValue;
        filterElement.appendChild(option);
    });
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

// Upload File
function uploadFile() {
    const fileInput = document.getElementById('programFile');
    const file = fileInput.files[0];

    if (!file) {
        console.error('No file selected for upload');
        return;
    }

    // Extract file extension
    const fileExtension = file.name.split('.').pop().toLowerCase();

    const formData = new FormData();
    formData.append('programTitle', document.getElementById('programTitle').value);
    formData.append('programType', document.getElementById('programType').value); // New line
    formData.append('programLanguage', detectLanguage(fileExtension));
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

// Function to detect language based on file extension
function detectLanguage(extension) {
    switch (extension) {
        case 'js':
            return 'JavaScript';
        case 'py':
            return 'Python';
        case 'java':
            return 'Java';
        case 'c':
            return 'C';
        case 'cpp':
            return 'C++';
        case 'kt':
            return 'Kotlin';
        case 'swift':
            return 'Swift';
        // Add more cases for other file types as needed
        default:
            return 'Unknown';
    }
}

// Fetch and display the program data when the page loads
window.addEventListener('load', () => {
    fetchPrograms();
});

function fetchPrograms() {
    fetch('http://localhost:3000/programs')
        .then(response => response.json())
        .then(programs => {
            // Clear existing rows in the table
            const table = document.getElementById("programTable").getElementsByTagName('tbody')[0];
            table.innerHTML = '';

            // Add rows for each program in the fetched data
            programs.forEach(program => {
                addProgramRow(program.title, program.language, program.programType, program.programLink);
            });
        })
        .catch(error => console.error('Error fetching programs:', error));
}