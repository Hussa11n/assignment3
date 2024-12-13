// Function to fetch and display data in the table
async function fetchData() {
  // API URL to fetch the student data
  const url =
    "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

  try {
    // Fetching the data from the API
    const response = await fetch(url);

    // Check if the API call was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Convert the response to JSON format
    const data = await response.json();

    // The 'results' field has the actual data
    const records = data.results;

    // Sorting logic for the data
    const semesterOrder = {
      "First Semester": 1,
      "Second Semester": 2,
      "Summer Semester": 3,
    };

    const nationalityOrder = {
      Bahraini: 1,
      "GCC National": 2,
      Other: 3,
    };

    // Sort data by year, semester, and nationality
    records.sort((a, b) => {
      // Sort by year first
      const yearA = parseInt(a.year.split("-")[0]);
      const yearB = parseInt(b.year.split("-")[0]);
      if (yearA !== yearB) return yearA - yearB;

      // If years are the same, sort by semester
      const semesterA = semesterOrder[a.semester] || 99;
      const semesterB = semesterOrder[b.semester] || 99;
      if (semesterA !== semesterB) return semesterA - semesterB;

      // If both are the same, sort by nationality
      const nationalityA = nationalityOrder[a.nationality] || 99;
      const nationalityB = nationalityOrder[b.nationality] || 99;
      return nationalityA - nationalityB;
    });

    // Find the table body to add rows
    const tableBody = document.getElementById("data-table");

    // Add each record as a new row in the table
    records.forEach((record) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${record.year || "N/A"}</td>
                <td>${record.semester || "N/A"}</td>
                <td>${record.the_programs || "N/A"}</td>
                <td>${record.nationality || "N/A"}</td>
                <td>${record.colleges || "N/A"}</td>
                <td>${record.number_of_students || "N/A"}</td>
            `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    // If something goes wrong, log the error
    console.error("Error fetching data:", error);
    alert("There was a problem fetching the data. Please try again later.");
  }
}

// Call the function to fetch and display data
fetchData();
