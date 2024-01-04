class StorageModule {
    constructor(calculator) {
        this.calculator = calculator;
    }

    saveCalculation() {
        const calculation = this.calculator.displayModule.operationDisplay.textContent;
        const result = this.calculator.displayModule.resultDisplay.textContent;

        if (calculation) {
            const data = new FormData();
            data.append("calculation", calculation);
            data.append("result", result);

            fetch("CalculationSaver.php", {
                method: "POST",
                body: data,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "success") {
                        alert("Zapisano pomyślnie!");
                        this.calculator.operationModule.clearCalculator();
                    } else {
                        console.error("Błąd podczas zapisywania obliczeń");
                    }
                })
                .catch(error => {
                    console.error("Błąd:", error);
                });
        }
    }
}
