showOffers('coffee');

// Refresh offers in current menu categoty
function refreshOffers() {

  // show all offer-items
  const items = document.getElementsByClassName('offer-item');
  /*
  for (var i = 0; i < items.length; i++) {
    console.log(items[i].id);
    items[i].classList.remove('block-hide');
  }
  */
  for (let item of items) {
    // console.log(item.id);
    item.classList.remove('block-hide');
  }

  // hide refresh button
  const refreshContainer = document.querySelector('.refresh-container');
  refreshContainer.classList.add('block-hide');
}

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
  const jsonFile = './products.json';
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
      let item = '', itemId = '', imgBlock = '', img = '', imgSrc = '', nameBlock = '', textBlock = '', priceBlock = '';
      let count = 0;
      let totalCount = 0;
      let ContainerId = '';
      const offerContainer = document.querySelector('.offers-container');
      const refreshContainer = document.querySelector('.refresh-container');

      for (let [key, value] of Object.entries(data)) {

        // current tab
        if (value.category === selectedTab) {

          // hide refresh button
          refreshContainer.classList.add('block-hide');

          // offer
          item = offerContainer.appendChild(document.createElement("div"));
          item.classList.add('offer-item');
          item.setAttribute('id', `offerId_${totalCount}`);
          // item.setAttribute('onclick', `alert(\'offerId_${totalCount}\')`);

          // offer image
          imgBlock = item.appendChild(document.createElement("div"));
          imgBlock.classList.add('offer-img');
          img = imgBlock.appendChild(document.createElement("img"));
          count += 1;
          imgSrc = imgSrc.concat('./images/', selectedTab, '-', count, '.jpg');
          img.setAttribute('src', imgSrc);
          img.setAttribute('width', '680');
          img.setAttribute('height', '680');
          img.setAttribute('alt', `${value.name}`);
          img.classList.add('offer-img');
          imgSrc = '';

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

          // show refresh button
          if (count > 4) {
            refreshContainer.classList.remove('block-hide');
            item.classList.add('block-hide');
          }

        } else {

          // delete outdated offers
          if (offerContainer.hasChildNodes()) {
            ContainerId = document.getElementById(`offerId_${totalCount}`);
            // if offers exist
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