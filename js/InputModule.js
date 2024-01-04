class InputModule {
    constructor(calculator) {
        this.calculator = calculator;
    }

    setupEventListeners() {
        document.querySelectorAll(".button").forEach(button => {
            if (button.innerText !== "") {
                button.addEventListener("click", () => this.handleInput(button.innerText));
            }
        });

        const equalsButton = document.querySelector(".equals");
        equalsButton?.addEventListener("click", () => this.handleInput("="));

        document.addEventListener('keydown', (event) => this.handleKeyboardInput(event));
    }

    handleKeyboardInput(event) {
        const keyMap = {
            'Delete': 'C', 'Backspace': 'C', 'c': 'C', 'Enter': '=', '÷': '÷', '/': '÷',
            'x': '×', '*': '×', '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
            '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', "+": "+", "-": "-"
        };
        const key = event.key;
        if (keyMap[key]) {
            this.handleInput(keyMap[key]);
        }
    }

    handleInput(input) {
        switch (input) {
            case "C":
                this.calculator.operationModule.clearCalculator();
                break;
            case "=":
                this.calculator.operationModule.calculateResult();
                break;
            case "SAVE":
                this.calculator.storageModule.saveCalculation();
                break;
            default:
                this.calculator.operationModule.addToOperation(input);
                break;
        }
    }
}
