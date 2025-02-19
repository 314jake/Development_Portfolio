let imgId = 1;

function nextImage() {
    if (imgId === 4) {
        imgId = 1;
    } else {
        imgId++;
    }

    document.querySelector("#portrait").src = `./resources/images/me${imgId}.webp`
    
}

document.querySelector('#right-arrow').addEventListener('click', nextImage);

function prevImage() {
    if (imgId === 1) {
        imgId = 4;
    } else {
        imgId--;
    }
    
    document.querySelector("#portrait").src = `./resources/images/me${imgId}.webp`

}

document.querySelector('#left-arrow').addEventListener('click', prevImage);