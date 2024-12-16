// Update the "Run Simulation" button click handler
document.getElementById('run-simulation').addEventListener('click', async () => {
    // Fetch input values
    const country1 = document.getElementById('country1').value;
    const country2 = document.getElementById('country2').value;
    const tariff = document.getElementById('tariff').value || 0;
    const gdpChange = document.getElementById('gdpChange').value || 0;
    const inflation = document.getElementById('inflation').value || 0;
  
    // Validate input (basic validation for now)
    if (!country1 || !country2 || country1 === country2) {
      alert('Please select two different countries.');
      return;
    }
  
    // Prepare data for API
    const simulationData = {
      country1,
      country2,
      tariff: parseFloat(tariff),
      gdpChange: parseFloat(gdpChange),
      inflation: parseFloat(inflation),
    };
  
    try {
      // Send POST request to the backend
      const response = await fetch('http://127.0.0.1:5000/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulationData),
      });
  
      const results = await response.json();
  
      if (response.ok) {
        // Display results
        displayResults(results);
      } else {
        alert('Error: ' + results.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while running the simulation.');
    }
  });
  
  // Display results in the results container
  function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = `
      <p><strong>Country 1:</strong> ${results.country1}</p>
      <p><strong>Country 2:</strong> ${results.country2}</p>
      <p><strong>Tariff:</strong> ${results.tariff}%</p>
      <p><strong>GDP Change:</strong> ${results.gdpChange}%</p>
      <p><strong>Inflation:</strong> ${results.inflation}%</p>
      <p><strong>Trade Impact:</strong> ${results.tradeImpact}%</p>
      <p><strong>Message:</strong> ${results.message}</p>
    `;
  }
  