console.log(window);
console.log(document);
console.dir(document);

// document.body.children[1].children[0].href = 'https://www.google.com';

let anchorElement = document.getElementById('external-link');
anchorElement.href = 'https://www.google.com';

anchorElement = document.querySelector('p a');
anchorElement.href = 'http://www.google.ch';

// ADD AN ELEMENT
// 1. Create the new element

let newAnchorElement = document.createElement('a');
newAnchorElement.href = 'https://www.google.ch';
newAnchorElement.textContent = 'This leads to Google!';

// 2. Get access to the parent element that should hold the new element

let firstParagraph = document.querySelector('p');

// 3. Insert the new element into the parent element content

firstParagraph.append(newAnchorElement);

// REMOVE ELEMENTS
// 1. Select the element that should removed

let firstH1Element = document.querySelector('h1');

// 2. Remove it!

firstH1Element.remove();
// firstH1Element.parentElement.removeChild(firstH1Element); // for older browsers

// MOVE ELEMENTS

firstParagraph.parentElement.append(firstParagraph);

// innerHTML

console.log(firstParagraph.textContent);
console.log(firstParagraph.innerHTML);

firstParagraph.innerHTML = 'Hi! This is <strong>important!</strong>';

// EVENT - LISTENER

let paragraphElement = document.body.querySelector('p');
paragraphElement.textContent = 'Click me!';

function changeParagraphText(event) {
    paragraphElement.textContent = 'Clicked!';
    console.log(event);
    console.log('Paragraph clicked!');
}

paragraphElement.addEventListener('click', changeParagraphText);

let inputElement = document.querySelector('input');

function retrieveUserInput(event) {
    // let entredText = inputElement.value;
    let entredText = event.target.value; 
    let entredData = event.data; // => This is different!
    console.log(entredText);
    console.log(entredData);
    console.log(event);
}

inputElement.addEventListener('input', retrieveUserInput);