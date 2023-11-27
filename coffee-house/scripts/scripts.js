
showOffers('coffee');

// Show offers in current menu categoty
function showOffers(tab) {

  let selectedTab = tab;
  if (selectedTab === undefined) {
    selectedTab = 'coffee';
  }

  // disable active tab
  let tabId = '', tabClass = '', tabClick = '', onClick = 'showOffers';
  const Tabs = ['coffee', 'tea', 'dessert'];
  const Classes = ['tab-item', 'tab-item-emoji', 'tab-item-name'];
  for (let i = 0; i < Tabs.length; i += 1) {
    for (let j = 0; j < Classes.length; j += 1) {
      tabId = Classes[j].concat('-', Tabs[i]);
      tabClass = Classes[j].concat('-selected');
      tabClick = onClick.concat('(\'', Tabs[i], '\')');
      // console.log(i, j, selectedTab, tabId, tabClass, tabClick);
      if (Tabs[i] === selectedTab) {
        tabClass = document.getElementById(tabId).classList.add(tabClass);
        tabClick = document.getElementById(tabId).removeAttribute('onclick');
      } else {
        tabClass = document.getElementById(tabId).classList.remove(tabClass);
        tabClick = document.getElementById(tabId).setAttribute('onclick', tabClick);
      }
    }
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
      let item = '', itemId = '', imgBlock = '', img = '', pix = '', nameBlock = '', textBlock = '', priceBlock = '';
      let count = 0;
      let totalCount = 0;
      let ContainerId = '';
      const offerContainer = document.querySelector('.offers-container');

      for (let [key, value] of Object.entries(data)) {

        //console.log(key, value);
        if (value.category === selectedTab) {
          // offer
          item = offerContainer.appendChild(document.createElement("div"));
          //item = document.querySelector('.offers-container').appendChild(document.createElement("div"));
          item.classList.add('offer-item');
          item.setAttribute('id', `offerId_${totalCount}`);

          // offer image
          imgBlock = item.appendChild(document.createElement("div"));
          imgBlock.classList.add('offer-img');
          img = imgBlock.appendChild(document.createElement("img"));
          count += 1;
          pix = pix.concat('/images/', selectedTab, '-', count, '.jpg');
          img.setAttribute('src', pix);
          img.setAttribute('width', '680');
          img.setAttribute('height', '680');
          img.setAttribute('alt', `${value.name}`);
          img.classList.add('offer-img');
          pix = '';

          // offer name
          nameBlock = item.appendChild(document.createElement("div"));
          nameBlock.classList.add('offer-name');
          nameBlock = nameBlock.appendChild(document.createTextNode(`${value.name}`));

          // offer text
          textBlock = item.appendChild(document.createElement("div"));
          textBlock.classList.add('offer-text');
          textBlock = textBlock.appendChild(document.createTextNode(`${value.description}`));

          // offer price
          priceBlock = item.appendChild(document.createElement("div"));
          priceBlock.classList.add('offer-price');
          priceBlock = priceBlock.appendChild(document.createTextNode(`\$${value.price}`));

        } else {

          // delete outdated offers
          /*
          const element = document.getElementById(offerContainer);
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
          */
          if (offerContainer.hasChildNodes()) {
            ContainerId = document.getElementById(`offerId_${totalCount}`);
            // if offer exist
            if (document.body.contains(ContainerId)) {
              itemId = offerContainer.removeChild(ContainerId);
            }
          }
        }

        totalCount += 1;

      }
    })
    .catch(function(error) {
      // fetching error
      console.log(error);
  });
}