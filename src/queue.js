async function addQueue() {
    try {
        let searchInputVal = document.getElementById('searchInput').value;
        const searchValCleaned = searchInputVal.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
        console.log(searchValCleaned);
        //change this variable to use cleaned
        const response = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/apartments/?where={"name": "${searchInputVal}"}`);
        const obj = await response.json();
        renderResults(obj);
      } catch (error) {
        console.log(error);
      }
}