/// <reference path="./../../../../../typings/mithril/mithril.d.ts" />

export class FrameworkService {

    public static isRunComputations: boolean = false;

    private static timer: number;

    public static redraw (): void {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(this.launchRedraw, 50);
    };

    public static startComputation (): void {
        if (!this.isRunComputations) {
            m.startComputation();
            this.isRunComputations = true;
        }
    };

    public static endComputation (): void {
        if (this.isRunComputations) {
            m.endComputation();
            this.isRunComputations = false;
        }
    };

    private static launchRedraw (): void {
        console.log('Redraw view.');
        m.redraw(true);
    };

}
