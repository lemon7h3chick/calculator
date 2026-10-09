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
      calculate();
      break;
  }
}

function inputNumber(target) {
  if (!result.textContent || result.textContent === '0') {
    result.textContent = target.textContent;
  } else {
    result.textContent += target.textContent;
  }

  if (state.type.at(-1) === 'equal') {
    input.textContent = '';
  }

  result.scrollLeft = result.scrollWidth;
}

function addNumber() {
  state.value.push(result.textContent);
  state.type.push('number');
}

function inputOperator(target) {
  if (!input.textContent && !result.textContent) {
    return;
  }

  if (state.type.at(-1) === 'equal') {
    input.textContent = `${result.textContent} ${target.textContent}`;
    result.textContent = '';

    state.value.push(target.textContent);
    state.type.push('operator');
    return;
  }

  if (result.textContent) {
    if (!input.textContent) {
      input.textContent = result.textContent;
    } else {
      input.textContent += ` ${result.textContent}`;
    }

    addNumber();
    result.textContent = '';
  }

  if (state.type.at(-1) === 'operator') {
    input.textContent = input.textContent.slice(0, -1) + target.textContent;
    removeValueType();
  } else {
    input.textContent += ` ${target.textContent}`;
  }

  state.value.push(target.textContent);
  state.type.push('operator');
}
function removeValueType() {
  state.value.pop();
  state.type.pop();
}

function calculate() {
  if (!input.textContent) {
    return;
  }

  if (state.type.at(-1) === 'equal') {
    input.textContent = result.textContent;
    return;
  }

  if (result.textContent) {
    addNumber();
    input.textContent = `${input.textContent} ${result.textContent}`;
  }

  if (state.type.at(-1) === 'operator') {
    input.textContent = input.textContent.slice(0, -2);
    removeValueType();
  }

  result.textContent = eval(
    input.textContent.replaceAll('×', '*').replaceAll('÷', '/'),
  );

  state.value.length = 0;
  state.type.length = 0;
  state.value.push(result.textContent);
  state.type.push('equal');
}
