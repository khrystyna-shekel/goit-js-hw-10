const BASE_URL = "https://api.thecatapi.com/v1";
const END_POINT = "breeds";
const API_KEY = "api_key=live_EvJURxahQcKa5aHWYy0e1eXkAKV55bfLYQiNaJEHq8spUmPPKRzXYiKbqjbxgw4k";


export function fetchBreeds()  {
    return fetch(`${BASE_URL}/${END_POINT}?${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};

fetchBreeds()
    .then(response => (console.log(response)))
    .catch(err => console.log(err));


export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?${API_KEY}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}

fetchCatByBreed()
    .then(response => (console.log(response)))
    .catch(err => console.log(err));