'use strict';

//set these at top for easy/safe use later in script
const imageOneTag = document.getElementById('image1')
const imageOneCaption = document.getElementById('image1-P')
const imageTwoTag = document.getElementById('image2')
const imageTwoCaption = document.getElementById('image2-P')
const imageThreeTag = document.getElementById('image3')
const imageThreeCaption = document.getElementById('image3-P')

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

// instantiate picture objects
new Picture('Bag', '.img/bag.jpg');
new Picture('Banana', '.img/banana.jpg');
new Picture('Bathroom', '.img/bathroom.jpg');
new Picture('Boots', '.img/boots.jpg');
new Picture('Breakfast', '.img/breakfast.jpg');
new Picture('Bubblegum', '.img/bubblegum.jpg');
new Picture('Chair', '.img/chair.jpg');
new Picture('Cthulhu', '.img/cthulhu.jpg');
new Picture('Dog-duck', '.img/dog-duck.jpg');
new Picture('Dragon', '.img/dragon.jpg');
new Picture('Pen', '.img/pen.jpg');
new Picture('Pet-sweep', '.img/pet-sweep.jpg');
new Picture('Scissors', '.img/scissors.jpg');
new Picture('Shark', '.img/shark.jpg');
new Picture('Sweep', '.img/sweep.jpg');
new Picture('Tauntaun', '.img/tauntaun.jpg');
new Picture('Unicorn', '.img/unicorn.jpg');
new Picture('Usb', '.img/usb.jpg');
new Picture('Water-can', '.img/water-can.jpg');
new Picture('Wine-glass', '.img/wine-glass.jpg');

//will be defined soon
let leftImageObject = null;
let centerImageObject = null;
let rightImageObject = null;


function pickNewGoats() {

    //shuffles the deck and takes the top two "cards"
    shuffle(Picture.all);

    leftImageObject = Picture.all[0];
    centerImageObject = Picture.all[1];
    rightImageObject = Picture.all[2];

    leftImageObject.displayctr += 1
    centerImageObject.displayctr += 1
    rightImageObject.displayctr += 1


    renderNewImages();
}

function renderNewImages() {
    imageOneTag.src = leftImageObject.url;
    imageOneTag.alt = leftImageObject.caption;
    imageOneCaption.textContent = leftImageObject.caption
}

function pictureClickHander(event) {
    
    //track what happened
    const clickedID = event.target.id;

    if(clickedID === 'image1') {
        leftImageObject.clickctr += 1
    } else if (clickedID == 'image2') {
        centerImageObject.clickctr += 1
    } else if (clickedID == 'image3') {
        rightImageObject.clickctr += 1
    }
}

image1.addEventListener('click', pictureClickHander);