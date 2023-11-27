
showOffers();

// Show offers in current menu categoty
function showOffers(cat) {

  // const Categories = ['coffee', 'tea', 'dessert'];
  let selectedCat = cat;
  if (selectedCat === undefined){
    selectedCat = 'coffee';
  }

  // fetching data from json file
  const jsonFile = '/products.json';
  fetch(jsonFile)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Fetching data error from json: ${jsonFile}`);
        // throw new Error('Fetching error');
      }
    })
    .then(function(data) {
      // fetching ok
      // console.log(data);
      let item = '', img = '', pix = '', name = '', text = '', price = '';
      let count = 0;
      for (let [key, value] of Object.entries(data)) {
        //console.log(key, value);
        if (value.category === selectedCat){
          //console.log(value.name, value.description, value.price);
          //document.querySelector('.offers-container').textContent = `${value.name}, ${value.description}, ${value.price}`;
          item = document.querySelector('.offers-container').appendChild(document.createElement("div"));
          item.classList.add('offer-item');
          img = item.appendChild(document.createElement("img"));
          count += 1;
          pix = pix.concat('/images/', selectedCat, '-', count, '.jpg');
          img.setAttribute('src', pix);
          img.setAttribute('width', '680');
          img.setAttribute('height', '680');
          img.setAttribute('alt', `${value.name}`);
          pix = '';
          name = item.appendChild(document.createTextNode(`${value.name}`));
          text = item.appendChild(document.createTextNode(`${value.description}`));
          price = item.appendChild(document.createTextNode(`${value.price}`));
        }
      }
    })
    .catch(function(error) {
      // fetching error
      console.log(error);
  });
}