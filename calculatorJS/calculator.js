const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');



keys.addEventListener('click', e  => {
    if(e.target.matches('button')) {
        //do somehting
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
        
        if(!action){
            console.log('number key!');
            if(displayedNum === '0'){
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        } else if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide')
        {
            console.log('operator key!');
            key.classList.add('is-depressed');
            //add custom attribute for previous key press.
            calculator.dataset.previousKeyType = 'operator';
        } else if (action === 'decimal'){ 
            console.log('decimal key!');
            display.textContent = displayedNum + '.';
        } else if (action === 'clear'){
            console.log('clear key! display textContent is: ' + display.textContent);
            display.textContent = '';
        } else if (action === 'calculate') {
            console.log('equal key!');
        }
    };
});
