// Calculator class to handle all calculator operations
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    this.currentOperand = 'Error';
                    this.operation = undefined;
                    this.previousOperand = '';
                    this.shouldResetScreen = true;
                    return;
                }
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = this.roundResult(computation);
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    calculateFunction(func) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;

        let result;
        switch (func) {
            // Basic Trigonometry Functions
            case 'sin':
                result = Math.sin(this.toRadians(current));
                break;
            case 'cos':
                result = Math.cos(this.toRadians(current));
                break;
            case 'tan':
                result = Math.tan(this.toRadians(current));
                break;
            case 'asin':
                if (current < -1 || current > 1) {
                    this.currentOperand = 'Error';
                    this.shouldResetScreen = true;
                    return;
                }
                result = this.toDegrees(Math.asin(current));
                break;
            case 'acos':
                if (current < -1 || current > 1) {
                    this.currentOperand = 'Error';
                    this.shouldResetScreen = true;
                    return;
                }
                result = this.toDegrees(Math.acos(current));
                break;
            case 'atan':
                result = this.toDegrees(Math.atan(current));
                break;
            
            // Hyperbolic Functions
            case 'sinh':
                result = Math.sinh(current);
                break;
            case 'cosh':
                result = Math.cosh(current);
                break;
            case 'tanh':
                result = Math.tanh(current);
                break;
            
            // Logarithmic Functions
            case 'log':
                if (current <= 0) {
                    this.currentOperand = 'Error';
                    this.shouldResetScreen = true;
                    return;
                }
                result = Math.log10(current);
                break;
            case 'ln':
                if (current <= 0) {
                    this.currentOperand = 'Error';
                    this.shouldResetScreen = true;
                    return;
                }
                result = Math.log(current);
                break;
            case 'log2':
                if (current <= 0) {
                    this.currentOperand = 'Error';
                    this.shouldResetScreen = true;
                    return;
                }
                result = Math.log2(current);
                break;
            
            // Algebraic Functions
            case 'sqrt':
                if (current < 0) {
                    this.currentOperand = 'Error';
                    this.shouldResetScreen = true;
                    return;
                }
                result = Math.sqrt(current);
                break;
            case 'cbrt':
                result = Math.cbrt(current);
                break;
            case 'power':
                this.chooseOperation('^');
                return;
            case 'square':
                result = current * current;
                break;
            case 'cube':
                result = current * current * current;
                break;
            case 'factorial':
                if (current < 0 || !Number.isInteger(current)) {
                    this.currentOperand = 'Error';
                    this.shouldResetScreen = true;
                    return;
                }
                result = this.factorial(current);
                break;
            case 'abs':
                result = Math.abs(current);
                break;
            case 'sign':
                result = Math.sign(current);
                break;
            
            // Calculus Functions
            case 'exp':
                result = Math.exp(current);
                break;
            case 'floor':
                result = Math.floor(current);
                break;
            case 'ceil':
                result = Math.ceil(current);
                break;
            case 'round':
                result = Math.round(current);
                break;
            case 'trunc':
                result = Math.trunc(current);
                break;
            
            // Constants
            case 'pi':
                result = Math.PI;
                break;
            case 'e':
                result = Math.E;
                break;
            case 'phi':
                result = (1 + Math.sqrt(5)) / 2; // Golden ratio
                break;
            
            // Modular Arithmetic
            case 'mod':
                this.chooseOperation('%');
                return;
            
            default:
                return;
        }

        this.currentOperand = this.roundResult(result);
        this.shouldResetScreen = true;
    }

    calculatePercent() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = this.roundResult(current / 100);
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    roundResult(number) {
        // Handle potential floating point issues
        return Math.round(number * 1000000) / 1000000 + '';
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = this.previousOperand;
        }
    }
}

// DOM Elements
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const functionButtons = document.querySelectorAll('[data-function]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const percentButton = document.querySelector('[data-percent]');
const decimalButton = document.querySelector('[data-decimal]');
const allButtons = document.querySelectorAll('button');

// Animation function for button press
function animateButtonPress(button) {
    button.classList.add('button-active');
    setTimeout(() => {
        button.classList.remove('button-active');
    }, 300);
}

// Animation function for calculation result
function animateResult() {
    currentOperandElement.classList.add('result-animation');
    setTimeout(() => {
        currentOperandElement.classList.remove('result-animation');
    }, 500);
}

// Initialize calculator
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Event Listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        animateButtonPress(button);
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        animateButtonPress(button);
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

functionButtons.forEach(button => {
    button.addEventListener('click', () => {
        animateButtonPress(button);
        calculator.calculateFunction(button.dataset.function);
        calculator.updateDisplay();
        animateResult();
    });
});

equalsButton.addEventListener('click', () => {
    animateButtonPress(equalsButton);
    calculator.compute();
    calculator.updateDisplay();
    animateResult();
});

allClearButton.addEventListener('click', () => {
    animateButtonPress(allClearButton);
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    animateButtonPress(deleteButton);
    calculator.delete();
    calculator.updateDisplay();
});

percentButton.addEventListener('click', () => {
    animateButtonPress(percentButton);
    calculator.calculatePercent();
    calculator.updateDisplay();
    animateResult();
});

decimalButton.addEventListener('click', () => {
    animateButtonPress(decimalButton);
    calculator.appendNumber('.');
    calculator.updateDisplay();
});

// Add hover sound effect (subtle feedback)
allButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transition = 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Keyboard support
document.addEventListener('keydown', event => {
    // Find the corresponding button for animation
    let buttonToAnimate = null;
    
    if (/[0-9]/.test(event.key)) {
        calculator.appendNumber(event.key);
        buttonToAnimate = Array.from(numberButtons).find(btn => btn.textContent === event.key);
    } else if (event.key === '.') {
        calculator.appendNumber('.');
        buttonToAnimate = decimalButton;
    } else if (event.key === '+' || event.key === '-') {
        calculator.chooseOperation(event.key);
        buttonToAnimate = Array.from(operationButtons).find(btn => btn.textContent === event.key);
    } else if (event.key === '*') {
        calculator.chooseOperation('×');
        buttonToAnimate = Array.from(operationButtons).find(btn => btn.textContent === '×');
    } else if (event.key === '/') {
        calculator.chooseOperation('÷');
        buttonToAnimate = Array.from(operationButtons).find(btn => btn.textContent === '÷');
    } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute();
        buttonToAnimate = equalsButton;
        animateResult();
    } else if (event.key === 'Escape') {
        calculator.clear();
        buttonToAnimate = allClearButton;
    } else if (event.key === 'Backspace') {
        calculator.delete();
        buttonToAnimate = deleteButton;
    } else if (event.key === '%') {
        calculator.calculatePercent();
        buttonToAnimate = percentButton;
        animateResult();
    }
    
    // Animate the corresponding button if found
    if (buttonToAnimate) {
        animateButtonPress(buttonToAnimate);
    }
    
    calculator.updateDisplay();
});

// Theme toggle functionality
const themeSwitch = document.getElementById('theme-switch');

// Check for saved theme preference or use device preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeSwitch.checked = true;
} else if (savedTheme === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.body.classList.add('light-theme');
    themeSwitch.checked = true;
}

// Theme switch event listener
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    }
});

// Initialize display
calculator.updateDisplay();