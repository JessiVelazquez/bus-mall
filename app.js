'use strict';

const imageNames = ['boots', 'dog-duck', 'tauntaun', 'breakfast', 'bathroom', 'bubblegum', 'chair', 'pet-sweep', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'shark', 'sweep', 'unicorn', 'usb']

// no repeat test:
// const imageNames = ['boots', 'dog-duck', 'tauntaun', 'breakfast', 'bathroom', 'bubblegum']

//set these at top for easy/safe use later in script
const imageAllTag = document.getElementById('three-images');
const imageOneTag = document.getElementById('image1');
const imageOneCaption = document.getElementById('image1-P');
const imageTwoTag = document.getElementById('image2');
const imageTwoCaption = document.getElementById('image2-P');
const imageThreeTag = document.getElementById('image3');
const imageThreeCaption = document.getElementById('image3-P');
const resultsButton = document.getElementById('button')

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

function createImages() {
    for (let i = 0; i < imageNames.length; i++) {
        const imageName = imageNames[i];
        new Picture(imageName, './img/' + imageName + '.jpg');
    }
}

createImages()

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
}

pickNewImages();
console.log(totalClicks);
console.log(maxClicks);


imageAllTag.addEventListener('click', pictureClickHandler);
resultsButton.addEventListener('click', resultsClickHandler);

// call when done
// renderChart
