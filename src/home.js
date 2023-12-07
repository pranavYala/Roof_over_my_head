function search() {
    let searchInputVal = document.getElementById('searchInput').value;
    console.log('Search' + searchInputVal);
}

function applyFilters() {
    let bedroomsValue = document.getElementById('bedrooms').value;
    let bathroomsValue = document.getElementById('bathrooms').value;
    let rentMinValue = document.getElementById('rent-min').value;
    let rentMaxValue = document.getElementById('rent-max').value;

    // Implement filter application functionality using the filter values
    console.log('Bedrooms: ' + bedroomsValue);
    console.log('Bathrooms: ' + bathroomsValue);
    console.log('Min Rent: ' + rentMinValue);
    console.log('Max Rent: ' + rentMaxValue);
}

function clearFilters() {
    // Implement clear filters functionality
    document.getElementById('bedrooms').value = 'Select';
    document.getElementById('bathrooms').value = 'Select';
    document.getElementById('rent-min').value = '600';
    document.getElementById('rent-max').value = '3000';
}