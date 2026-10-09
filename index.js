const input = document.querySelector('.input');
const result = document.querySelector('.result');

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    processEvent(event);
  });
});

const state = {
  value: [],
  type: [],
};

function processEvent(event) {
  const target = event.target;

  if (target.className === 'number') {
    return inputNumber(target);
  }

  if (target.className === 'operator') {
    return inputOperator(target);
  }

  switch (target.id) {
    case 'equal':
      break;
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

function addNumber() {
  if (!!result.textContent) {
    state.value.push(result.textContent);
    state.type.push('number');
  }
}

function inputOperator(target) {
  if (!input.textContent && !result.textContent) {
    return;
  }

  addNumber();

  if (!input.textContent) {
    input.textContent = `${result.textContent} ${target.textContent}`;
  } else if (state.type.at(-1) === 'operator') {
    input.textContent = input.textContent.slice(0, -1) + target.textContent;
    removeValueType();
  } else {
    input.textContent += ` ${result.textContent} ${target.textContent}`;
  }

  result.textContent = '';
  state.value.push(target.textContent);
  state.type.push('operator');
}

function removeValueType() {
  state.value.pop();
  state.type.pop();
}
