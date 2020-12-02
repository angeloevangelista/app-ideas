const box = globalThis.document.getElementById('box');
const css_output = globalThis.document.getElementById('css-output');
const advice = globalThis.document.getElementById('advice');

const [
  input_top_left,
  input_top_right,
  input_bottom_right,
  input_bottom_left
] = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left']
  .map(id => globalThis.document.getElementById(id))
  .map(input => {
    input.max = 300;
    input.addEventListener('input', changeRadius);
    input.addEventListener('blur', event => {
      ToClipboard(changeRadius(event));
      if (event.target.value > 300) {
        input.value = 300;
      }
    });
  });

css_output.style.resize = 'none';

function changeRadius(event) {
  let { name: changed_corner, value } = event.target;

  value = value === '' ? 0 : value;

  let {
    borderTopLeftRadius: tlr,
    borderTopRightRadius: trr,
    borderBottomRightRadius: brr,
    borderBottomLeftRadius: blr
  } = box.style;

  tlr = tlr.trim() === '' ? '0px' : tlr;
  trr = trr.trim() === '' ? '0px' : trr;
  brr = brr.trim() === '' ? '0px' : brr;
  blr = blr.trim() === '' ? '0px' : blr;

  switch (changed_corner) {
    case 'tl':
      tlr = `${value}px`;
      break;

    case 'tr':
      trr = `${value}px`;
      break;

    case 'br':
      brr = `${value}px`;
      break;

    case 'bl':
      blr = `${value}px`;
      break;
  }

  const large_radius = Number(value) > 300;
  
  let borderStructure;

  if (large_radius) {
    const radius = [tlr, trr, brr, blr].map(radius => {
      if (Number(radius.substring(0, radius.length - 2)) > 300) {
        return '300px';
      }

      return radius;
    });

    borderStructure = `${radius[0]} ${radius[1]} ${radius[2]} ${radius[3]}`;

    advice.style.opacity = 1;
  } else {
    advice.style.opacity = 0;

    borderStructure = `${tlr} ${trr} ${brr} ${blr}`;
  }

  box.style.borderRadius = borderStructure;

  css_output.innerHTML = `border-radius: ${borderStructure}`;

  return `border-radius: ${borderStructure}`;
}

function ToClipboard (sentence) {
  const temp_textarea = document.createElement('textarea');

  temp_textarea.value = sentence;

  temp_textarea.setAttribute('readonly', '');

  document.body.appendChild(temp_textarea);
  
  temp_textarea.select();
  
  document.execCommand('copy');
  
  document.body.removeChild(temp_textarea);
}
