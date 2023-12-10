let currentIdx = 0;

async function getObj() {
  try {
      const currentUrl = window.location.href;
      const urlParts = currentUrl.split('=');
      const itemId = urlParts[1];
    
      console.log('Item ID:', itemId);
      const response = await fetch(`https://final-409-api-8d436d40ed6c.herokuapp.com/api/apartments/${itemId}`);
      const obj = await response.json();
      renderResults(obj.data);
    } catch (error) {
      console.log(error);
    }
}

function changeImage(idxOffset, obj, imgElement) {
  currentIdx += idxOffset;

  if (currentIdx < 0) {
    currentIdx = obj.buildingImages.length - 1;
  } else if (currentIdx >= obj.buildingImages.length) {
    currentIdx = 0;
  }

  imgElement.src = obj.buildingImages[currentIdx];
}

function changeImage2(idxOffset, obj, imgElement2) {
  currentIdx += idxOffset;

  if (currentIdx < 0) {
    currentIdx = obj.apartmentImages.length - 1;
  } else if (currentIdx >= obj.apartmentImages.length) {
    currentIdx = 0;
  }

  imgElement2.src = obj.apartmentImages[currentIdx];
}

function getDirections(obj) {
  const address = obj.address;
  
  const mapsUrl = `https://www.google.com/maps?q=${address}`;

  window.open(mapsUrl, '_blank');
}

async function renderResults(obj) {
    const container = document.getElementById('building-info');

    container.innerHTML = '';

    const headingContainer = document.createElement('div');
    headingContainer.className = 'heading';

    const h2Element = document.createElement('h2');
    h2Element.textContent = obj.name;
    headingContainer.appendChild(h2Element);

    const h3Element = document.createElement('h3');
    const emElement = document.createElement('em');
    emElement.textContent = 'Floorplan: ' + obj.bed + " bed & " + obj.bath + " bath";
    h3Element.appendChild(emElement);
    headingContainer.appendChild(h3Element);

    container.appendChild(headingContainer);

    const buildingContainer = document.createElement('div');
    buildingContainer.className = 'building-container';

    const lArrowContainer = document.createElement('div');
    lArrowContainer.className = 'l-arrow';

    const lArrowPElement = document.createElement('p');
    lArrowPElement.textContent = '\u003C';
    lArrowPElement.addEventListener('click', () => changeImage(-1, obj, imgElement));
    lArrowContainer.appendChild(lArrowPElement);

    buildingContainer.appendChild(lArrowContainer);

    const buildingImgContainer = document.createElement('div');
    buildingImgContainer.className = 'building-img';

    const imgElement = document.createElement('img');
    imgElement.src = obj.buildingImages[0];
    imgElement.alt = 'Building Image';
    buildingImgContainer.appendChild(imgElement);

    buildingContainer.appendChild(buildingImgContainer);

    const rArrowContainer = document.createElement('div');
    rArrowContainer.className = 'r-arrow';

    const rArrowPElement = document.createElement('p');
    rArrowPElement.textContent = '\u003E'; 
    rArrowPElement.addEventListener('click', () => changeImage(1, obj, imgElement));
    rArrowContainer.appendChild(rArrowPElement);

    buildingContainer.appendChild(rArrowContainer);

    const descButtonsContainer = document.createElement('div');
    descButtonsContainer.className = 'desc&buttons';

    const buildingDescContainer = document.createElement('div');
    buildingDescContainer.className = 'building-desc';

    const pElement = document.createElement('p');
    pElement.textContent = obj.description;
    buildingDescContainer.appendChild(pElement);

    descButtonsContainer.appendChild(buildingDescContainer);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const button1 = document.createElement('button');
    button1.textContent = 'GET DIRECTIONS';
    button1.addEventListener('click', () => getDirections(obj));
    buttonContainer.appendChild(button1);

    descButtonsContainer.appendChild(buttonContainer);

    buildingContainer.appendChild(descButtonsContainer);

    container.appendChild(buildingContainer);

    //////////////////////////////////////////////////////////////////////

    const aptContainer = document.getElementById('apt-container');

    aptContainer.innerHTML = '';

    const lArrowContainer2 = document.createElement('div');
    lArrowContainer2.className = 'l-arrow';
    
    const lArrowPElement2 = document.createElement('p');
    lArrowPElement2.textContent = '\u003C'; 
    lArrowPElement2.addEventListener('click', () => changeImage2(-1, obj, imgElement2));
    lArrowContainer2.appendChild(lArrowPElement2);
    
    const aptImgContainer = document.createElement('div');
    aptImgContainer.className = 'apt-img';
    
    const imgElement2 = document.createElement('img');
    imgElement2.src = obj.apartmentImages[0];
    imgElement2.alt = 'Apt Image';
    aptImgContainer.appendChild(imgElement2);
    
    const rArrowContainer2 = document.createElement('div');
    rArrowContainer2.className = 'r-arrow';
    
    const rArrowPElement2 = document.createElement('p');
    rArrowPElement2.textContent = '\u003E'; 
    rArrowPElement2.addEventListener('click', () => changeImage2(1, obj, imgElement2));
    rArrowContainer2.appendChild(rArrowPElement2);

    const aptDescContainer = document.createElement('div');
    aptDescContainer.className = 'apt-desc';

    const h4Available = document.createElement('h4');
    h4Available.textContent = 'AVAILABLE: ' + obj.available;
    aptDescContainer.appendChild(h4Available);

    const h4Rent = document.createElement('h4');
    h4Rent.textContent = 'RENT: $' + obj.rent;
    aptDescContainer.appendChild(h4Rent);

    const h4UtilityFee = document.createElement('h4');
    h4UtilityFee.textContent = 'UTILITY FEE: $' + obj.utilityFee;
    aptDescContainer.appendChild(h4UtilityFee);

    const utilitiesP = document.createElement('p');
    utilitiesP.textContent = 'Utilities included: ';
    aptDescContainer.appendChild(utilitiesP);

    const utilitiesList = document.createElement('ul');
    utilitiesList.className = 'utilities';

    for (let i = 0; i < obj.utilities.length; i++) {
      const li = document.createElement('li');
      li.textContent = obj.utilities[i];
      utilitiesList.appendChild(li);
    }

    aptDescContainer.appendChild(utilitiesList);

    const amenitiesP = document.createElement('p');
    amenitiesP.textContent = 'Amenities included: ';
    aptDescContainer.appendChild(amenitiesP);

    const amenitiesList = document.createElement('ul');
    amenitiesList.className = 'amenities';

    for (let i = 0; i < obj.amenities.length; i++) {
      const li = document.createElement('li');
      li.textContent = obj.amenities[i];
      amenitiesList.appendChild(li);
    }

    aptDescContainer.appendChild(amenitiesList);

    aptContainer.appendChild(lArrowContainer2);
    aptContainer.appendChild(aptImgContainer);
    aptContainer.appendChild(rArrowContainer2);
    aptContainer.appendChild(aptDescContainer);
}

document.addEventListener('DOMContentLoaded', function () {
  getObj();
});