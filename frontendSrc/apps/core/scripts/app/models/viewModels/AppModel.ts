/// <reference path="./../../../../../../typings/mithril/mithril.d.ts" />

export class App {

    public controller: (args?: MithrilComponentAttributes) => MithrilController;
    public view: (ctrl?: MithrilController) => MithrilVirtualElement;

    public key: string = '';
    public title: string = '';

    constructor(controller: (args?: MithrilComponentAttributes) => MithrilController,
                view: (ctrl?: MithrilController) => MithrilVirtualElement) {
        this.controller = controller;
        this.view = view;
    }

}

export class AppManager {

    public currentApp: App;
    public listOfApps: App[];

    constructor(currentApp: App, listOfApps: App[]) {
        this.currentApp = currentApp;
        this.listOfApps = listOfApps;
    }

}
