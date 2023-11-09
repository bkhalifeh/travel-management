const travelServices = document.querySelector('#travelServices');
const tagifyService = new Tagify(travelServices);

const travelItemsNeeded = document.querySelector('#travelItemsNeeded');
const tagifyItemsNeeded = new Tagify(travelItemsNeeded);

const buttonCreateTravel = document.getElementById('buttonCreateTravel');

const travelTitle = document.getElementById('travelTitle');
const travelImage = document.getElementById('travelImage');
const travelCaption = document.getElementById('travelCaption');
const travelLocation = document.getElementById('travelLocation');
const travelPrice = document.getElementById('travelPrice');
const travelCapacity = document.getElementById('travelCapacity');
const travelInsurance = document.getElementById('travelInsurance');
const travelDuration = document.getElementById('travelDuration');
const travelResidence = document.getElementById('travelResidence');
const travelTransportation = document.getElementById('travelTransportation');
const travelMeals = document.getElementById('travelMeals');

function handleClickCreateTravel(e) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            window.location = `/travel/${xhr.responseText}`;
        }
    };
    xhr.open('POST', '/travel/create', true);
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');

    const formData = new FormData();
    formData.append('title', travelTitle.value);
    formData.append('image', travelImage.files[0]);
    formData.append('caption', travelCaption.value);
    formData.append('location', travelLocation.value);
    formData.append('price', parseInt(travelPrice.value));
    formData.append('capacity', parseInt(travelCapacity.value));
    formData.append('insurance', travelInsurance.value);
    formData.append('duration', travelDuration.value);
    formData.append('residence', travelResidence.value);
    formData.append('transportation', travelTransportation.value);
    formData.append('meals', travelMeals.value);
    formData.append('services', tagifyService.value.map(v => v.value));
    formData.append('itemsNeeded', tagifyItemsNeeded.value.map(v => v.value));
    xhr.send(formData);
}


buttonCreateTravel.addEventListener('click', handleClickCreateTravel);