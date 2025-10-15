// This function runs automatically when the HTML page is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchSportsData();
});

// This is the main function to get data from our backend API
async function fetchSportsData() {
    // This is the list element from our index.html
    const sportsList = document.getElementById('sports-list');
    
    // The URL of the API we built in main.js
    const apiUrl = 'http://localhost:3000/sports';

    try {
        // Use the modern 'fetch' to make a request to our server
        const response = await fetch(apiUrl);

        // If the server responds with an error, throw an exception
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get the JSON data from the response
        const data = await response.json();
        
        // Clear the "Loading..." message
        sportsList.innerHTML = '';

        // Loop through each sport in the data and create a list item
        data.sports.forEach(sport => {
            const listItem = document.createElement('li');
            listItem.textContent = `${sport.name} (ID: ${sport.id})`;
            sportsList.appendChild(listItem);
        });

    } catch (error) {
        // If anything goes wrong, display an error message
        console.error('Failed to fetch sports data:', error);
        sportsList.innerHTML = '<li>Failed to load data. Is the backend server running?</li>';
    }
}