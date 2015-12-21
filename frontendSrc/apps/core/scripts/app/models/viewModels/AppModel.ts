/// <reference path="./../../../../../../typings/mithril/mithril.d.ts" />

export class Page {

    public static appSequence: number = 1;

    public controller: (args?: MithrilAttributes) => MithrilController;
    public view: (ctrl?: MithrilController) => MithrilVirtualElement;

    public id: number;

    public name: string = '';
    public title: string = '';

    constructor(controller: (args?: MithrilAttributes) => MithrilController,
                view: (ctrl?: MithrilController) => MithrilVirtualElement) {

        this.controller = controller;
        this.view = view;

        this.id = Page.appSequence++;
    }

}

export class PagesManager {

    public currentApp: Page;
    public listOfApps: Page[];

    constructor(currentApp: Page, listOfApps: Page[]) {
        this.currentApp = currentApp;
        this.listOfApps = listOfApps;
    }

}
