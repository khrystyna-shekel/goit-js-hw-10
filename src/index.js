import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
    selector: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
};

const { selector, loader, error, catInfo } = ref;

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let arrBreedsId = [];
fetchBreeds()
    .then(data => {
        data.forEach(el => {
            arrBreedsId.push({ text: el.name, value: el.id });
        });

         new SlimSelect({
        select: selector,
        data: arrBreedsId
         });
        
    }).catch(onFetchError);


selector.addEventListener('change', onSelectorClick);

function onSelectorClick(e) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');

    const breedId = e.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            loader.classList.replace('loader', 'is-hidden');
            selector.classList.remove('is-hidden');
            const { url, breeds } = data[0];

            catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt=${breeds[0].name} width="400"/></div>
                <div class="box"><h1>${breeds[0].name}</h1><p></p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
            catInfo.classList.remove('is-hidden');
        }).catch (onFetchError)
};

function onFetchError() {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });

}
