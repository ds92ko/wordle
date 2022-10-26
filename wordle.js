const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd7c2374985msh8732cc555ee10c5p1c2cd4jsna71d99b0af38',
		'X-RapidAPI-Host': 'wordle-answers-solutions.p.rapidapi.com'
	}
};

fetch('https://wordle-answers-solutions.p.rapidapi.com/today', options)
	.then(response => response.json())
	.then(response => initWordle(response.today))
	.catch(err => console.error(err));

function initWordle(answer) {
  const inputRow = document.querySelectorAll('.inputs .row');
  const keys = document.querySelectorAll('.key:not(.ctrl)');
  const enter = document.querySelector('.ctrl[data-key="enter"]');
  const backspace = document.querySelector('.ctrl[data-key="backspace"]');

  const isFull = () => [...getCurrentInputs()].every(input => input.innerText);
  const getCurrentInputs = () => document.querySelector('.current').querySelectorAll('.input');
  const changeCurrentRow = () => {
    [...inputRow].forEach(row => {
      if (row.innerText) {
        row.classList.remove('current');
        row.nextElementSibling.classList.add('current');
      }
    })
  }
  
  function addLetter() {
    const key = this.dataset.key;
    const inputs = getCurrentInputs();
  
    if (isFull()) return;
    
    let i = 0;
    while(i < inputs.length) {
      if (!inputs[i].innerText) {
        inputs[i].innerText = key;
        break;
      }
      i++;
    }
  }

  function removeLetter() {
    const inputs = [...getCurrentInputs()].reverse();

    let i = 0;
    while(i < inputs.length) {
      if (inputs[i].innerText) {
        inputs[i].innerText = null;
        break;
      }
      i++;
    }
  }
  
  function submitAnswer() {
    const inputs = getCurrentInputs();

    if (!isFull()) {
      alert('Not enough letters!');
      return;
    }
    else {
      inputs.forEach((input, i) => {
        const v = input.innerText;
        if (v === answer[i]) {
          input.style.background = 'green';
        } else if (answer.includes(v)) {
          input.style.background = 'yellow';
        } else {
          input.style.background = 'lightgray';
        }
      });

      changeCurrentRow();
    }
  }
  
  keys.forEach(key => key.addEventListener('click', addLetter));
  enter.addEventListener('click', submitAnswer);
  backspace.addEventListener('click', removeLetter);
}