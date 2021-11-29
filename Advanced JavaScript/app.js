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