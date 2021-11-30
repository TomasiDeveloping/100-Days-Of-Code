const productNameInputElement = document.getElementById('product-name');
const remainingCharsElement = document.getElementById('remaining-chars');

const maxAllowedChars = productNameInputElement.maxLength;

function updateRemainingCharacters(event) {
    const entredText = event.target.value;
    const entredTextLength = entredText.length;

    const remainingCharacters = maxAllowedChars - entredTextLength;

    remainingCharsElement.textContent = remainingCharacters;
}

productNameInputElement.addEventListener('input', updateRemainingCharacters);