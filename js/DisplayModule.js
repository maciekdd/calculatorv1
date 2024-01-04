class DisplayModule {
    constructor(calculator) {
        this.calculator = calculator;
        this.resetDisplay = false;
        this.operationDisplay = null;
        this.resultDisplay = null;
    }

    initializeDisplay() {
        this.operationDisplay = document.querySelector(".operation");
        this.resultDisplay = document.querySelector(".result");
    }

    updateOperationDisplay(value) {
        this.operationDisplay.innerText = value;
    }

    updateResultDisplay(result) {
        this.resultDisplay.innerText = result === undefined ? "" : result;
    }

    resetCalculatorDisplay() {
        this.operationDisplay.innerText = "";
        this.resultDisplay.innerText = "";
        this.resetDisplay = false;
    }

    clearResultDisplay() {
        this.resultDisplay.innerText = "";
    }
}
