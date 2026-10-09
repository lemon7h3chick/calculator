const input = document.querySelector('.input');
const result = document.querySelector('.result');

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    processEvent(event);
  });
});

function processEvent(event) {
  const target = event.target;

  if (target.className === 'number') {
    return inputNumber(target);
  }
}

function inputNumber(target) {
  if (!result.textContent || result.textContent === '0') {
    result.textContent = target.textContent;
  } else {
    result.textContent += target.textContent;
  }

  result.scrollLeft = result.scrollWidth;
}
