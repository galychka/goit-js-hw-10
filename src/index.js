import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api'
import getRefs from "./get-refs";

const refs = getRefs();
refs.select.addEventListener("change", setOutput);

fetchBreeds().then(renderCatsBreeds).catch(error => {
    console.log(error);
    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        timeout: 100000000000000,
    },);
    refs.loader.classList.toggle('loader');
});

function renderCatsBreeds(cats) {
    const markupSelect = createMarkupViewCat(cats.data);
    selectIsActive(markupSelect)
    new SlimSelect({
        select: '#single'
    })
};

function selectIsActive(markupSelect) {
    if (markupSelect) {
        refs.select.insertAdjacentHTML('beforeend', markupSelect);
        refs.select.classList.replace('breed-select-hiden','breed-select-activ');
        refs.loader.classList.toggle('loader');
        addElementHint()
    };
};

function createMarkupViewCat(cats) {
    return cats.map(({ id, name }) => {
        return `<option  class="item-brend" value="${id}">${name}</option>`
    }).join('');
};

function addElementHint() {
    refs.select.after(refs.choiceBreed);
    refs.choiceBreed.classList.add("select-cat");
    refs.choiceBreed.textContent = "Please, select a cat brend";
};

function setOutput(e) {
    louderCatCardIsActive()
    fetchCatByBreed(e.target.value).then(renderCatCard).catch(error => {
        console.log(error);
        Notify.failure('Oops! Something went wrong! Try reloading the page!', {
            timeout: 100000000000000,
        },);
        refs.loader.classList.toggle('loader');
    });
};

function renderCatCard(res) {
    const markupCat = createMarkupDescriptionCat(res.data[0])
    refs.catInfo.innerHTML = markupCat;
    louderCatCardNotActive(markupCat)
};

function louderCatCardIsActive() {
    refs.catInfo.classList.toggle('cat-card-js');
    refs.loader.classList.toggle('loader');
    refs.choiceBreed.remove()
};

function louderCatCardNotActive(markupCat) {
    if (markupCat) {
        refs.catInfo.classList.toggle('cat-card-js');
        refs.loader.classList.toggle('loader');
    }
};

function createMarkupDescriptionCat(cat) {
    const { url, breeds } = cat;
    return `  <img class="cat-img" src="${url}" alt="" width="350" height="350">
    <div class="cat-cards">      <h2 class=" cat-mame-title">
    ${breeds[0].name}
  </h2>
  <p class="description-cat">${breeds[0].description
        }</p><div class="cat-temper">
<h3 class="cat-temper-title">
Temperament:
</h3>
<p class="description-temper">${breeds[0].temperament}</p></div></div>`
};







