class OperationModule {
    constructor(calculator) {
        this.calculator = calculator;
        this.currentOperation = "";
    }

    addToOperation(value) {
        if (this.calculator.displayModule.resetDisplay) {
            this.currentOperation = "";
            this.calculator.displayModule.resetDisplay = false;
            this.calculator.displayModule.clearResultDisplay();
        }
        this.currentOperation += value;
        this.calculator.displayModule.updateOperationDisplay(this.currentOperation);
    }

    calculateResult() {
        try {
            let modifiedOperation = this.currentOperation.replace(/×/g, "*").replace(/÷/g, "/");
            let result = eval(modifiedOperation);
            this.calculator.displayModule.updateResultDisplay(result);
            this.calculator.displayModule.resetDisplay = true;
        } catch (error) {
            alert("Error");
            this.clearCalculator();
        }
    }

    clearCalculator() {
        this.currentOperation = "";
        this.calculator.displayModule.resetCalculatorDisplay();
    }
}
