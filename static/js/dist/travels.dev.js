"use strict";

var listTravels = document.getElementById('listTravels');
var inputShowTravel = document.getElementById('inputShowTravel');

function createCartTravel(travel) {
  var cartContainer = document.createElement('div');
  cartContainer.classList.add('col-md-6', 'col-lg-4', 'mb-3');
  var cart = document.createElement('div');
  cart.classList.add('card', 'h-100');
  var cartImage = document.createElement('img');
  cartImage.classList.add('card-img-top');
  cartImage.src = travel.image;
  cartImage.alt = "travel title";
  cart.appendChild(cartImage);
  var cartImageOverlay = document.createElement('div');
  cartImageOverlay.classList.add('card-img-overlay');
  var cartImageOverlayTitle = document.createElement('h5');
  cartImageOverlayTitle.classList.add('card-title');
  var cartImageOverlayTitleSpan = document.createElement('span');
  cartImageOverlayTitleSpan.classList.add('badge', 'bg-label-success');
  cartImageOverlayTitleSpan.style = "text-align: left; float: left;";
  cartImageOverlayTitleSpan.textContent = "".concat(travel.price, " \u062A\u0648\u0645\u0627\u0646");
  cartImageOverlayTitle.appendChild(cartImageOverlayTitleSpan);
  cartImageOverlay.appendChild(cartImageOverlayTitle);
  var cartBody = document.createElement('div');
  cartBody.classList.add('card-body');
  var cartBodyTitle = document.createElement('h5');
  cartBodyTitle.classList.add('card-title');
  cartBodyTitle.textContent = travel.title;
  cartBody.appendChild(cartBodyTitle);
  var cartBodyCaption = document.createElement('p');
  cartBodyCaption.classList.add('card-text');
  cartBodyCaption.textContent = travel.caption;
  cartBody.appendChild(cartBodyCaption);
  var cartBodyLocation = document.createElement('p');
  cartBodyLocation.classList.add('card-text');
  var cartBodyLocationSmall = document.createElement('small');
  cartBodyLocationSmall.classList.add('text-muted');
  var cartBodyLocationIcon = document.createElement('i');
  cartBodyLocationIcon.classList.add('fa-solid', 'fa-location-dot');
  cartBodyLocationSmall.appendChild(cartBodyLocationIcon);
  cartBodyLocationSmall.append(" ".concat(travel.location));
  cartBodyLocation.appendChild(cartBodyLocationSmall);
  cartBody.appendChild(cartBodyLocation);
  var cartBodyDetail = document.createElement('a');
  cartBodyDetail.classList.add('btn', 'btn-outline-primary');
  cartBodyDetail.href = "/travel/".concat(travel.id);
  cartBodyDetail.style = 'text-align: left; float: left;';
  cartBodyDetail.textContent = 'جزییات اردو';
  cartBody.appendChild(cartBodyDetail);
  cart.appendChild(cartImageOverlay);
  cart.appendChild(cartBody);
  cartContainer.appendChild(cart);
  return cartContainer;
}

function makeElementEmpty(e) {
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
}

function onChangeShow() {
  window.location = "/travel/?show=".concat(inputShowTravel.selectedOptions[0].value); // console.log(inputShowTravel.selectedOptions[0].value);
  // makeElementEmpty(listTravels);
}