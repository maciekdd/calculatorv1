class Calculator {
    constructor() {
        this.operationModule = new OperationModule(this);
        this.inputModule = new InputModule(this);
        this.displayModule = new DisplayModule(this);
        this.storageModule = new StorageModule(this);

        this.displayModule.initializeDisplay();
        this.inputModule.setupEventListeners();
    }
}
