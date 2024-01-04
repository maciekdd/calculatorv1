class Calculator {
    #currentOperation = "";
    #resetDisplay = false;
    #displayOperation;
    #displayResult;

    constructor() {
        this.#initializeDisplay();
        this.#setupEventListeners();
    }

    #initializeDisplay() {
        this.#displayOperation = document.querySelector(".operation");
        this.#displayResult = document.querySelector(".result");
    }

    #setupEventListeners() {
        document.addEventListener("DOMContentLoaded", () => {
            const buttons = document.querySelectorAll(".button");
            buttons.forEach(button => {
                if (button.innerText !== "") {
                    button.addEventListener("click", () => this.#handleInput(button.innerText));
                }
            });

            const equalsButton = document.querySelector(".equals");
            equalsButton?.addEventListener("click", () => this.#handleInput("="));

            document.addEventListener('keydown', (event) => this.#handleKeyboardInput(event));
        });
    }

    #handleKeyboardInput(event) {
        const keyMap = {
            'Delete': 'C', 'Backspace': 'C', 'c': 'C', 'Enter': '=', '÷': '÷', '/': '÷',
            'x': '×', '*': '×', '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
            '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', "+": "+", "-": "-"
        };
        const key = event.key;
        if (keyMap[key]) {
            this.#handleInput(keyMap[key]);
        }
    }

    #handleInput(input) {
        switch (input) {
            case "C":
                this.#clearCalculator();
                break;
            case "=":
                this.#calculateResult();
                break;
            case "SAVE":
                this.#saveCalculation();
                break;
            default:
                this.#addToOperation(input);
                break;
        }
        this.#updateDisplay();
    }

    #clearCalculator() {
        this.#currentOperation = "";
        this.#resetDisplay = false;
        this.#displayOperation.innerText = "";
        this.#displayResult.innerText = "";
    }

    #calculateResult() {
        try {
            let modifiedOperation = this.#currentOperation.replace(/×/g, "*").replace(/÷/g, "/");
            let result = eval(modifiedOperation);

            if (result === undefined) {
                this.#displayResult.innerText = "";
            } else {
                this.#displayResult.innerText = result;
            }

            this.#resetDisplay = true;
        } catch (error) {
            alert("Error");
            this.#clearCalculator();
            this.#displayResult.innerText = "";
        }
    }



    #addToOperation(value) {
        if (this.#resetDisplay) {
            this.#currentOperation = "";
            this.#resetDisplay = false;
            this.#displayResult.innerText = "";
        }
        this.#currentOperation += value;
    }

    #updateDisplay() {
        this.#displayOperation.innerText = this.#currentOperation;
    }

    #saveCalculation() {
        const calculation = this.#displayOperation.textContent;
        const result = this.#displayResult.textContent;

        if (calculation) {
            const data = new FormData();
            data.append("calculation", calculation);
            data.append("result", result);

            fetch("save_calculation.php", {
                method: "POST",
                body: data,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === "success") {
                        alert("Zapisano pomyślnie!");
                        this.#clearCalculator();
                    } else {
                        console.error("Błąd podczas zapisywania obliczeń");
                    }
                })
                .catch((error) => {
                    console.error("Błąd:", error);
                });
        }
    }
}

new Calculator();
