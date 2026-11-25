const gooEbeningImages = [
    // create a folder, name it images, and put your images there

    // here, write your images' names as below
    // "images/1.png",
    // "images/2.png",
].map(p => chrome.runtime.getURL(p));

const SELECTOR = "ytd-thumbnail img, yt-thumbnail-view-model img";

function replaceImages() {
    const imgs = document.querySelectorAll(SELECTOR);

    for (const image of imgs) {
        if (!image.dataset.goo) {
            const index = Math.floor(Math.random() * gooEbeningImages.length);
            image.dataset.goo = gooEbeningImages[index];
        }
   
        if (image.src !== image.dataset.goo) {
            image.src = image.dataset.goo;
            image.srcset = "";
            image.style.objectFit = "cover";
        }
    }
}

replaceImages();
new MutationObserver(replaceImages).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src"]
});