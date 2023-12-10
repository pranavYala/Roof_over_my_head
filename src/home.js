
async function search() {
    try {
        let searchInputVal = document.getElementById('searchInput').value;
        const response = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/apartments/?where={"lowerCaseName": "${searchInputVal.toLowerCase()}"}`);
        const obj = await response.json();
        renderResults(obj);
      } catch (error) {
        console.log(error);
      }
}

async function renderResults(obj) {
    const container = document.getElementById('apt-container');

    // Clear previous content
    container.innerHTML = '';

    const resultHtml = document.createElement('ul');
    resultHtml.className = 'apt-list';

    obj.data.forEach(item => {

        const listItem = document.createElement('li');
        listItem.className = 'apt';

        const link = document.createElement('a');
        link.href = `/detail-view.html?_id=` + item._id;
        link.appendChild(document.createElement('img')).src = item.buildingImages[0];
        link.appendChild(document.createElement('h3')).textContent = item.name;


        listItem.appendChild(link);
        listItem.appendChild(document.createElement('h4')).textContent = "Rent: $" + item.rent;
        listItem.appendChild(document.createElement('h4')).textContent = item.bed + " Beds & " + item.bath + " Baths";
        resultHtml.appendChild(listItem);
    })

    // Append the generated HTML to the container
    container.appendChild(resultHtml);
}

async function applyFilters() {
  try {
      let bedroomsValue = document.getElementById('bedrooms').value;
      let bathroomsValue = document.getElementById('bathrooms').value;
      let rentMinValue = document.getElementById('rent-min').value;
      let rentMaxValue = document.getElementById('rent-max').value;

      let filterCriteria = {};

      if (bedroomsValue !== "Select") {
          filterCriteria.bed = bedroomsValue;
      }

      if (bathroomsValue !== "Select") {
          filterCriteria.bath = bathroomsValue;
      }

      filterCriteria.rent = { "$gte": rentMinValue, "$lte": rentMaxValue };

      const queryString = `https://final-409-api-8d436d40ed6c.herokuapp.com/api/apartments/?where=${JSON.stringify(filterCriteria)}`;
      const response = await fetch(queryString);

      const obj = await response.json();
      renderResults(obj);
  } catch (error) {
      console.log(error);
  }
}


function clearFilters() {
    // Implement clear filters functionality
    document.getElementById('bedrooms').value = 'Select';
    document.getElementById('bathrooms').value = 'Select';
    document.getElementById('rent-min').value = '600';
    document.getElementById('rent-max').value = '3000';
    document.getElementById('apt-container').innerHTML = '';
}