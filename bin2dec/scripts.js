const binary_input = globalThis.document.getElementById('binary-input');
const convert_button = globalThis.document.getElementById('convert-button');
const span_result = globalThis.document.getElementById('span-result');
const notification = globalThis.document.getElementById('notification');

binary_input.addEventListener('input', validateEntry);

binary_input.addEventListener('input', event => {
  span_result.style.opacity = 0;
});

convert_button.addEventListener('click', (event => {
  event.preventDefault();
  
  const { value } = binary_input;
  
  if (value.trim() === '') return;
  
  if (isNaN(value)) {
    span_result.innerHTML = ';)';
    return alert('You are very funny, but without tricks here, ok?');
  }
  
  span_result.innerHTML = `${bin2Dec(value)}`;
  span_result.style.opacity = 1;
}));

function bin2Dec(binary) {
  const elements = binary
    .split('')
    .reverse()
    .map(item => Number(item));

  for (let i = 0; i < elements.length; i++) {
    if (elements[i] === 1) {
      elements[i] = Math.pow(2, i);
    }
  }

  return elements.reduce((accumulator, next) => accumulator + next);
}

function validateEntry(event) {
  const { value } = binary_input;

  const inserted_value = value.substr(value.length - 1, 1);

  if (inserted_value !== '0' && inserted_value !== '1') {
    binary_input.value = value.substring(0, value.length - 1);

    notification.style.opacity = 1;

    setTimeout(() => {
      notification.style.opacity = 0;
    }, 500);
  }
}

binary_input.focus();