'use strict';

const imageNames = ['boots', 'dog-duck', 'tauntaun', 'breakfast', 'bathroom', 'bubblegum', 'chair', 'pet-sweep', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'shark', 'sweep', 'unicorn', 'usb']

// no repeat test:
// const imageNames = ['boots', 'dog-duck', 'tauntaun', 'breakfast', 'bathroom', 'bubblegum']

//Globals
const imageAllTag = document.getElementById('three-images');
const imageOneTag = document.getElementById('image1');
const imageOneCaption = document.getElementById('image1-P');
const imageTwoTag = document.getElementById('image2');
const imageTwoCaption = document.getElementById('image2-P');
const imageThreeTag = document.getElementById('image3');
const imageThreeCaption = document.getElementById('image3-P');
const resultsSection = document.getElementById('Results');
const resultsButton = document.getElementById('button');
const chartsSection = document.getElementById('dataCharts');

const maxClicks = 26;
let totalClicks = 0;

//image/caption constructor function
function Picture(caption, url) {
    this.caption = caption;
    this.url = url;
    this.clickctr = 0;
    this.displayctr = 0;

    Picture.all.push(this);
};

//declares empty array to be pushed to later
Picture.all = [];

function createImagesFromScratch() {
    for (let i = 0; i < imageNames.length; i++) {
        const imageName = imageNames[i];
        new Picture(imageName, './img/' + imageName + '.jpg');
    }
}

function createImagesFromStorage(storageGet) {
    const javaScriptImages = JSON.parse(storageGet);
    for (let i = 0; i < javaScriptImages.length; i++) {
        const rawData = javaScriptImages[i];
        const newPictureInst = new Picture(rawData.caption, rawData.url);
        newPictureInst.clickctr = rawData.clickctr;
        newPictureInst.displayctr = rawData.displayctr;
    }
}

function createPictureInstances() {
    const storageGet = localStorage.getItem('images');
    if (storageGet === null) {
        createImagesFromScratch();
    } else {
        createImagesFromStorage(storageGet);
    }
}

//will be defined soon
let leftImageObject = null;
let centerImageObject = null;
let rightImageObject = null;

function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function pickNewImages() {

    shuffle(Picture.all);

    const safeImages = [];

    for (let i = 0; i <Picture.all.length; i++) {
        const image = Picture.all[i];
        if (image !== leftImageObject && image !== centerImageObject && image !== rightImageObject) {
            safeImages.push(image);
            if (safeImages.length === 3) {
                break;
            }
        }
    }

    leftImageObject = safeImages[0];
    centerImageObject = safeImages[1];
    rightImageObject = safeImages[2];

    leftImageObject.displayctr += 1;
    centerImageObject.displayctr += 1;
    rightImageObject.displayctr += 1;

    renderNewImages();
    totalClicks += 1;
}


function renderNewImages() {
    imageOneTag.src = leftImageObject.url;
    imageOneTag.alt = leftImageObject.caption;
    imageOneCaption.textContent = leftImageObject.caption;

    imageTwoTag.src = centerImageObject.url;
    imageTwoTag.alt = centerImageObject.caption;
    imageTwoCaption.textContent = centerImageObject.caption;

    imageThreeTag.src = rightImageObject.url;
    imageThreeTag.alt = rightImageObject.caption;
    imageThreeCaption.textContent = rightImageObject.caption;
}

function pictureClickHandler(event) {

    if (totalClicks <= maxClicks) {
        const clickedID = event.target.id;
        if(clickedID === 'image1') {
            leftImageObject.clickctr += 1;
        } else if (clickedID === 'image2') {
            centerImageObject.clickctr += 1;
        } else if (clickedID === 'image3') {
            rightImageObject.clickctr += 1;
        }
    }

    pickNewImages();
    if (totalClicks >= maxClicks) {
        imageAllTag.removeEventListener('click', pictureClickHandler);
        alert('You are out of clicks.');
        resultsButton.style.display = 'block';
        resultsSection.style.display = 'block';
        chartsSection.style.display = 'block';

        const JSONImages = JSON.stringify(Picture.all)
        localStorage.setItem('images', JSONImages);
    }
}

function renderLikes() {
    const likesListELem = document.getElementById('Results');
    likesListELem.innerHTML = '';
    for (let i = 0; i < Picture.all.length; i++) {
        const itemPicture = Picture.all[i];
        const itemPictureElem = document.createElement('li');
        likesListELem.appendChild(itemPictureElem);
        itemPictureElem.textContent = itemPicture.caption + ': ' +
        itemPicture.clickctr + '/' + itemPicture.displayctr;
    }
}

function resultsClickHandler(event) {
    renderLikes();
    renderChart();
}




imageAllTag.addEventListener('click', pictureClickHandler);
resultsButton.addEventListener('click', resultsClickHandler);

function renderChart() {

    const clicks = []
    const displays = []
    for (let i = 0; i < Picture.all.length; i++) {
        const clickCount = Picture.all[i].clickctr;
        const displayCount = Picture.all[i].displayctr;
        clicks.push(clickCount);
        displays.push(displayCount);
    }

    const ctx = document.getElementById('canvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: imageNames,
            datasets: [{
                label: 'Times User Clicked Image',
                backgroundColor: 'rgb(255, 105, 180)',
                borderColor: 'rgb(255, 105, 180)',
                data: clicks,
            },
            {
                label: 'Times Shown to User',
                backgroundColor: 'rgb(98, 209, 243)',
                borderColor: 'rgb(255, 105, 180)',
                data: displays,
        }]
        },
        options: {}
    });
}

resultsButton.style.display = 'none';
resultsSection.style.display = 'none';
chartsSection.style.display = 'none';

createPictureInstances();
pickNewImages();


