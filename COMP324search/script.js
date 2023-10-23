const algorithmDescriptions = {
  "sort": [
    {
      name: "Binary Search",
      description: "Binary search is a highly efficient divide-and-conquer algorithm...",
      pageUrl: "/search-algorithms/binary-search.html"
    },
    {
      name: "Quick Sort",
      description: "Quick sort is a renowned divide-and-conquer sorting algorithm...",
      pageUrl: "/sort-algorithms/quick-sort.html"
    },
    {
      name: "Merge Sort",
      description: "Merge sort is a divide-and-conquer sorting algorithm...",
      pageUrl: "merge-sort.html"
    }
    // Add descriptions and page URLs for other sorting algorithms
  ],
  "binary-search": {
    name: "Binary Search",
    description: "Binary search description...",
    pageUrl: "binary-search.html"
  },
  "quick-sort": {
    name: "Quick Sort",
    description: "Quick sort description...",
    pageUrl: "quick-sort.html"
  },
  // Add descriptions and page URLs for other sorting algorithms
};

const algorithmTypesSelect = document.getElementById('algorithm-types');
const algorithmDescription = document.getElementById('algorithm-description');

algorithmTypesSelect.addEventListener('change', function () {
  const selectedAlgorithm = algorithmTypesSelect.selectedOptions[0].value;

  if (selectedAlgorithm === "sort") {
    // Display clickable rectangles for all sorting algorithms
    let rectanglesHTML = "";
    algorithmDescriptions["sort"].forEach((algorithm) => {
      rectanglesHTML += `
        <div class="algorithm-rectangle" data-page-url="${algorithm.pageUrl}">
          <h2>${algorithm.name}</h2>
          <p>${algorithm.description}</p>
        </div>
      `;
    });
    algorithmDescription.innerHTML = rectanglesHTML;

    // Add click event listeners to the rectangles
    const algorithmRectangles = document.querySelectorAll('.algorithm-rectangle');
    algorithmRectangles.forEach((rectangle) => {
      rectangle.addEventListener('click', function () {
        const pageUrl = rectangle.getAttribute('data-page-url');
        window.location.href = pageUrl;
      });
    });
  } else {
    // Display the description of the selected algorithm
    const algorithm = algorithmDescriptions[selectedAlgorithm];
    if (algorithm) {
      algorithmDescription.innerHTML = `
        <h2>${algorithm.name}</h2>
        <p>${algorithm.description}</p>
      `;
    } else {
      algorithmDescription.innerHTML = "Select an algorithm to view its description.";
    }
  }
});
