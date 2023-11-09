const listTravels = document.getElementById('listTravels');
const inputShowTravel = document.getElementById('inputShowTravel');

function createCartTravel(travel) {
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('col-md-6', 'col-lg-4', 'mb-3');

    const cart = document.createElement('div');
    cart.classList.add('card', 'h-100');

    const cartImage = document.createElement('img');
    cartImage.classList.add('card-img-top');
    cartImage.src = travel.image;
    cartImage.alt = "travel title";

    cart.appendChild(cartImage);

    const cartImageOverlay = document.createElement('div');
    cartImageOverlay.classList.add('card-img-overlay');
    
    const cartImageOverlayTitle = document.createElement('h5');
    cartImageOverlayTitle.classList.add('card-title');

    const cartImageOverlayTitleSpan = document.createElement('span');
    cartImageOverlayTitleSpan.classList.add('badge', 'bg-label-success');
    cartImageOverlayTitleSpan.style = "text-align: left; float: left;";
    cartImageOverlayTitleSpan.textContent = `${travel.price} تومان`;

    cartImageOverlayTitle.appendChild(cartImageOverlayTitleSpan);

    cartImageOverlay.appendChild(cartImageOverlayTitle);

    const cartBody = document.createElement('div');
    cartBody.classList.add('card-body');

    const cartBodyTitle = document.createElement('h5');
    cartBodyTitle.classList.add('card-title');
    cartBodyTitle.textContent = travel.title;
    cartBody.appendChild(cartBodyTitle);

    const cartBodyCaption = document.createElement('p');
    cartBodyCaption.classList.add('card-text');
    cartBodyCaption.textContent = travel.caption;
    cartBody.appendChild(cartBodyCaption);

    const cartBodyLocation = document.createElement('p');
    cartBodyLocation.classList.add('card-text');

    const cartBodyLocationSmall = document.createElement('small');
    cartBodyLocationSmall.classList.add('text-muted');

    const cartBodyLocationIcon = document.createElement('i');
    cartBodyLocationIcon.classList.add('fa-solid', 'fa-location-dot');
    cartBodyLocationSmall.appendChild(cartBodyLocationIcon);
    
    cartBodyLocationSmall.append(` ${travel.location}`);

    cartBodyLocation.appendChild(cartBodyLocationSmall);
    cartBody.appendChild(cartBodyLocation);

    const cartBodyDetail = document.createElement('a');
    cartBodyDetail.classList.add('btn', 'btn-outline-primary');
    cartBodyDetail.href = `/travel/${travel.id}`;
    cartBodyDetail.style = 'text-align: left; float: left;';
    cartBodyDetail.textContent = 'جزییات اردو';

    cartBody.appendChild(cartBodyDetail);
    

    cart.appendChild(cartImageOverlay);
    cart.appendChild(cartBody);

    cartContainer.appendChild(cart);

    return cartContainer;
}

function makeElementEmpty(e) {
    while (e.firstChild) e.removeChild(e.firstChild);
}



function onChangeShow() {
    window.location = `/travel/?show=${inputShowTravel.selectedOptions[0].value}`;
    // console.log(inputShowTravel.selectedOptions[0].value);
    // makeElementEmpty(listTravels);
}