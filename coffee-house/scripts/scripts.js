showOffers('coffee');

// Modalal hide
function modalHide() {
	document.querySelector('.modal-wrapper').style.display = 'none';
	document.querySelector('.modal-window').style.display = 'none';
  const modalContainer = document.querySelector('.modal-window');
  let itemId = '';

  // delete outdated modals
  if (modalContainer.hasChildNodes()) {
    let ContainerId = document.getElementById('modalWindow');
    // if modal exist
    if (document.body.contains(ContainerId)) {
      itemId = modalContainer.removeChild(ContainerId);
    }
  }
}

// Modal show
function modalShow(id, imgId){
  // console.log(id, imgId);
	const modalWrapper = document.querySelector('.modal-wrapper');
	const modalContainer = document.querySelector('.modal-window');
  modalWrapper.style.display = 'block';
  modalContainer.style.display = 'block';

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
      let item = '', img = '', imgBlock = '', imgSrc = '', itemBlock = '', itemName = '', itemDescription = '', itemSize = '', itemAdittives = '', itemTotal = '', totalSumm = 0, itemInfo = '', itemClose = '';
      const infoText = 'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.';
      let totalCount = 0;

      for (let [key, value] of Object.entries(data)) {

        // found necessery id
        if (totalCount === Number(id)) {

          // item
          item = modalContainer.appendChild(document.createElement("div"));
          // item.setAttribute('id', `modalId_${id}`);
          item.setAttribute('id', 'modalWindow');

          // item image
          imgBlock = item.appendChild(document.createElement("div"));
          imgBlock.classList.add('modal-img-box');
          img = imgBlock.appendChild(document.createElement("img"));
          imgSrc = imgSrc.concat('./images/', `${value.category}`, '-', imgId, '.jpg');
          img.setAttribute('src', imgSrc);
          img.setAttribute('width', '340');
          img.setAttribute('height', '340');
          img.setAttribute('alt', `${value.name}`);
          img.classList.add('modal-img');
          imgSrc = '';

          // item block
          itemBlock = item.appendChild(document.createElement("div"));
          itemBlock.classList.add('modal-block');

          // item name
          itemName = itemBlock.appendChild(document.createElement("div"));
          itemName.classList.add('modal-name');
          itemName = itemName.appendChild(document.createTextNode(`${value.name}`));

          // item description
          itemDescription = itemBlock.appendChild(document.createElement("div"));
          itemDescription.classList.add('modal-description');
          itemDescription = itemDescription.appendChild(document.createTextNode(`${value.description}`));

          // item sizes block
          itemSize = itemBlock.appendChild(document.createElement("div"));
          itemSize.classList.add('modal-size-block');
          itemSize = itemSize.appendChild(document.createTextNode(`${value.sizes}`));

          // item additives block
          itemAdittives = itemBlock.appendChild(document.createElement("div"));
          itemAdittives.classList.add('modal-additives-block');
          itemAdittives = itemAdittives.appendChild(document.createTextNode(`${value.additives}`));

          // item total
          itemTotal = itemBlock.appendChild(document.createElement("div"));
          itemTotal.classList.add('modal-total');
          itemTotal = itemTotal.appendChild(document.createTextNode(`${totalSumm}`));

          // item info
          itemInfo = itemBlock.appendChild(document.createElement("div"));
          itemInfo.classList.add('modal-info-block');
          itemInfo = itemInfo.appendChild(document.createTextNode(`${infoText}`));

          // item close button
          itemClose = itemBlock.appendChild(document.createElement("div"));
          itemClose.classList.add('modal-close');
          itemClose.setAttribute('onClick', 'modalHide()');
          //itemClose.setAttribute('onClick', `modalHide(\'${id}\')`);
          itemClose = itemClose.appendChild(document.createTextNode('Close'));

        }

        totalCount += 1;

      }
    })
  .catch(function(error) {
    // fetching error
    console.log(error);
});


}

// Refresh offers in current menu categoty
function refreshOffers() {

  // show all offer-items
  const items = document.getElementsByClassName('offer-item');
  /*
  for (let i = 0; i < items.length; i++) {
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
          count += 1;
          item = offerContainer.appendChild(document.createElement("div"));
          item.classList.add('offer-item');
          item.setAttribute('id', `offerId_${totalCount}`);
          //item.setAttribute('onclick', `alert(\'offerId_${totalCount}\')`);
          item.setAttribute('onClick', `modalShow(\'${totalCount}\', \'${count}\')`);

          // offer image
          imgBlock = item.appendChild(document.createElement("div"));
          imgBlock.classList.add('offer-img');
          img = imgBlock.appendChild(document.createElement("img"));
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