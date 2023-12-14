showOffers('coffee');

// Modal hide
function modalHide() {
	document.querySelector('.modal-wrapper').style.display = 'none';
	document.querySelector('.modal-window').style.display = 'none';
  const modalContainer = document.querySelector('.modal-window');
  let itemId = '';

  // enable scroll
  const body = document.getElementsByTagName('body');
  body[0].classList.remove('no-scroll');

  // clear modal window
  if (modalContainer.hasChildNodes()) {
    let ContainerId = document.getElementById('modalWindow');
    // if modal content exist
    if (document.body.contains(ContainerId)) {
      itemId = modalContainer.removeChild(ContainerId);
    }
  }
}

// Modal show
function modalShow(id, imgId, size, additive){
  const modalWrapper = document.querySelector('.modal-wrapper');
	const modalContainer = document.querySelector('.modal-window');
  modalWrapper.style.display = 'block';
  modalContainer.style.display = 'block';
  let itemId = '';
  let selectedSize = size;
  if (selectedSize === undefined){selectedSize = 's'};
  let selectedAdditive = additive;
  if (selectedAdditive === undefined){selectedAdditive = ''};
  // multiple additives
  let selectedAdditives = {};
  if (selectedAdditive){
    selectedAdditives = selectedAdditive.split(',');
  }

  // disable scroll
  const body = document.getElementsByTagName('body');
  body[0].classList.add('no-scroll');

  // clear modal window
  if (modalContainer.hasChildNodes()) {
    let ContainerId = document.getElementById('modalWindow');
    // if modal content exist
    if (document.body.contains(ContainerId)) {
      itemId = modalContainer.removeChild(ContainerId);
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
      let item = '', img = '', imgBlock = '', imgSrc = '', itemBlock = '', itemNameBlock = '', itemName = '', itemDescription = '', itemSizeBlock = '', itemSizeButton = '', itemSizeContent = '', itemSize = '', itemAdittiveBlock = '', itemAdittiveButton = '', itemAdittiveContent = '', itemAdittive = '', itemTotal = '',  itemTotalBlock = '', itemInfo = '', itemInfoBlock = '', itemClose = '';
      const infoText = 'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.';
      let totalCount = 0;
      let sizes = {};
      let additives = {};
      let additivesCount = 0;
      let totalSumm = 0;

      for (let [key, value] of Object.entries(data)) {

        // found necessery id
        if (totalCount === Number(id)) {

          // total summ
          totalSumm = Number(value.price);

          // modal
          item = modalContainer.appendChild(document.createElement("div"));
          item.classList.add('modal-container');
          // item.setAttribute('id', `modalId_${id}`);
          item.setAttribute('id', 'modalWindow');

          // item image
          imgBlock = item.appendChild(document.createElement("div"));
          imgBlock.classList.add('modal-img-block');
          imgBlock.classList.add('modal-img');
          imgBlock.classList.add('img-hide');
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

          // item name block
          itemNameBlock = itemBlock.appendChild(document.createElement("div"));
          itemNameBlock.classList.add('modal-name-block');
          // name
          itemName = itemNameBlock.appendChild(document.createElement("div"));
          itemName.classList.add('modal-name');
          itemName = itemName.appendChild(document.createTextNode(value.name));
          // description
          itemDescription = itemNameBlock.appendChild(document.createElement("div"));
          itemDescription.classList.add('modal-description');
          itemDescription = itemDescription.appendChild(document.createTextNode(value.description));

          // item sizes block
          itemSizeBlock = itemBlock.appendChild(document.createElement("div"));
          itemSizeBlock.classList.add('modal-size-block');
          // size
          itemSize = itemSizeBlock.appendChild(document.createElement("div"));
          itemSize.classList.add('modal-size');
          itemSize = itemSize.appendChild(document.createTextNode('Size'));
          // size items
          sizes = value.sizes;
          itemSize = itemSizeBlock.appendChild(document.createElement("div"));
          itemSize.classList.add('modal-block-wrapper');
          for (let [sizeKey, sizeValue] of Object.entries(sizes)) {
            itemSizeButton = itemSize.appendChild(document.createElement("div"));
            itemSizeButton.classList.add('modal-block-item');
            itemSizeButton.setAttribute('onClick', `modalShow(\'${id}\', \'${imgId}\', \'${sizeKey}\', \'${selectedAdditive}\')`);
            // selected size
            if (selectedSize === sizeKey){
              itemSizeButton.removeAttribute('onClick');
              itemSizeButton.classList.add('modal-block-item-selected');
              // total summ plus size
              totalSumm = totalSumm + Number(sizeValue['add-price']);
            }
            // size name
            itemSizeContent = itemSizeButton.appendChild(document.createElement("div"));
            itemSizeContent.classList.add('block-item-name');
            // selected size name
            if (selectedSize === sizeKey){
              itemSizeContent.classList.add('block-item-name-selected');
            }
            itemSizeContent = itemSizeContent.appendChild(document.createTextNode(sizeKey.toUpperCase()));
            // size value
            itemSizeContent = itemSizeButton.appendChild(document.createElement("div"));
            itemSizeContent.classList.add('block-item-value');
            // selected size value
            if (selectedSize === sizeKey){
              itemSizeContent.classList.add('block-item-value-selected');
            }
            itemSizeContent = itemSizeContent.appendChild(document.createTextNode(sizeValue.size));
          }

          // item additives block
          itemAdittiveBlock = itemBlock.appendChild(document.createElement("div"));
          itemAdittiveBlock.classList.add('modal-additives-block');
          // additives
          itemAdittive = itemAdittiveBlock.appendChild(document.createElement("div"));
          itemAdittive.classList.add('modal-additives');
          itemAdittive = itemAdittive.appendChild(document.createTextNode('Additives'));
          // additive items
          additives = value.additives;
          itemAdittive = itemAdittiveBlock.appendChild(document.createElement("div"));
          itemAdittive.classList.add('modal-block-wrapper');
          for (let [additiveKey, additiveValue] of Object.entries(additives)) {
            additivesCount += 1;
            itemAdittiveButton = itemAdittive.appendChild(document.createElement("div"));
            itemAdittiveButton.classList.add('modal-block-item');
            if (selectedAdditive){
              itemAdittiveButton.setAttribute('onClick', `modalShow(\'${id}\', \'${imgId}\', \'${selectedSize}\', \'${selectedAdditive}, ${additiveKey}\')`);
            } else {
              itemAdittiveButton.setAttribute('onClick', `modalShow(\'${id}\', \'${imgId}\', \'${selectedSize}\', \'${additiveKey}\')`);
            }
            // selected multiple additives
            if (selectedAdditive.length > 1){
              for (let i = 0; i < selectedAdditive.length; i++) {
                if (selectedAdditive[i] === additiveKey){
                  itemAdittiveButton.removeAttribute('onClick');
                  itemAdittiveButton.classList.add('modal-block-item-selected');
                  // total summ plus additives
                  totalSumm = totalSumm + Number(additiveValue['add-price']);
                }
              }
            } else {
              // selected single additive
              if (selectedAdditive === additiveKey){
                itemAdittiveButton.removeAttribute('onClick');
                itemAdittiveButton.classList.add('modal-block-item-selected');
                // total summ plus additive
                totalSumm = totalSumm + Number(additiveValue['add-price']);
              }
            }
            // additive name
            itemAdittiveContent = itemAdittiveButton.appendChild(document.createElement("div"));
            itemAdittiveContent.classList.add('block-item-name');
            // selected multiple additives
            if (selectedAdditive.length > 1){
              for (let i = 0; i < selectedAdditive.length; i++) {
                if (selectedAdditive[i] === additiveKey){
                  itemAdittiveContent.classList.add('block-item-name-selected');
                }
              }
            } else {
              // selected single additive
              if (selectedAdditive === additiveKey){
                itemAdittiveContent.classList.add('block-item-name-selected');
              }
            }
            itemAdittiveContent = itemAdittiveContent.appendChild(document.createTextNode(additivesCount));
            // additive value
            itemAdittiveContent = itemAdittiveButton.appendChild(document.createElement("div"));
            itemAdittiveContent.classList.add('block-item-value');
            // selected multiple additives
            if (selectedAdditive.length > 1){
              for (let i = 0; i < selectedAdditive.length; i++) {
                if (selectedAdditive[i] === additiveKey){
                  itemAdittiveContent.classList.add('block-item-value-selected');
                }
              }
            } else {
              // selected additive value
              if (selectedAdditive === additiveKey){
                itemAdittiveContent.classList.add('block-item-value-selected');
              }
            }
            itemAdittiveContent = itemAdittiveContent.appendChild(document.createTextNode(additiveValue.name));
          }

          // item total block
          itemTotal = itemBlock.appendChild(document.createElement("div"));
          itemTotal.classList.add('modal-total-block');
          // total
          itemTotalBlock = itemTotal.appendChild(document.createElement("div"));
          itemTotalBlock.classList.add('total-block-text');
          itemTotalBlock = itemTotalBlock.appendChild(document.createTextNode('Total:'));
          // total summ
          totalSumm = totalSumm.toFixed(2);
          itemTotalBlock = itemTotal.appendChild(document.createElement("div"));
          itemTotalBlock.classList.add('total-block-summ');
          itemTotalBlock = itemTotalBlock.appendChild(document.createTextNode(`\$${totalSumm}`));

          // item info block
          itemInfo = itemBlock.appendChild(document.createElement("div"));
          itemInfo.classList.add('modal-info-block');
          // info icon
          itemInfoBlock = itemInfo.appendChild(document.createElement("div"));
          itemInfoBlock.classList.add('info-block-icon');
          // info text
          itemInfoBlock = itemInfo.appendChild(document.createElement("div"));
          itemInfoBlock.classList.add('info-block-text');
          itemInfoBlock = itemInfoBlock.appendChild(document.createTextNode(`${infoText}`));

          // item close button
          itemClose = itemBlock.appendChild(document.createElement("div"));
          itemClose.classList.add('modal-close');
          itemClose.setAttribute('onClick', 'modalHide()');
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