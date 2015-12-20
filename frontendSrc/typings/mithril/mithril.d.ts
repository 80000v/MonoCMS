// Type definitions for Mithril
// Project: http://lhorie.github.io/mithril/
// Definitions by: Leo Horie <https://github.com/lhorie>, Chris Bowdon <https://github.com/cbowdon>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Mithril type definitions for Typescript

interface MithrilStatic {

    // div.class, {key: 1}, 'Hello, do you help me make typing? =)'
    (selector: string,
     attributes: Object,
     children?: MithrilVirtualElement | MithrilVirtualElement[] |
         MithrilComponent<MithrilController> | MithrilComponent<MithrilController>[] |
         string): MithrilVirtualElement;

    // div.class, {key: 1}, m('i.class'), 'Hello'
    (selector: string,
     attributes: Object,
     children1?: MithrilVirtualElement | MithrilVirtualElement[] |
         MithrilComponent<MithrilController> | MithrilComponent<MithrilController>[] |
         string,
     children2?: MithrilVirtualElement | MithrilVirtualElement[] |
         MithrilComponent<MithrilController> | MithrilComponent<MithrilController>[] |
         string): MithrilVirtualElement;

    // div.class, 'Hello'
    (selector: string,
     children?: MithrilVirtualElement | MithrilVirtualElement[] |
         MithrilComponent<MithrilController> | MithrilComponent<MithrilController>[] |
         string): MithrilVirtualElement;

    prop<T>(value?: T): (value?: T) => T;
    prop<T>(promise: MithrilPromise<T>): MithrilPromiseProperty<T>;
    withAttr(property: string, callback: (value: any) => void): (e: Event) => any;
    module(rootElement: Node, module: MithrilComponent<MithrilController>): void;

    mount(rootElement: Node, module: MithrilComponent<MithrilController>): void;
    component<T extends MithrilController>(component: MithrilComponent<T>,
                                           args?: MithrilComponentAttributes): MithrilComponent<T>;

    trust(html: string): String;
    render(rootElement: HTMLElement, children?: any): void;
    render(rootElement: HTMLDocument, children?: any): void;
    redraw: MithrilRedraw;
    route: MithrilRoute;
    request(options: MithrilXHROptions): MithrilPromise<any>;
    deferred<T>(): MithrilDeferred<T>;
    sync<T>(promises: MithrilPromise<T>[]): MithrilPromise<T>;
    startComputation(): void;
    endComputation(): void;
}

interface MithrilRoute {
    (rootElement: HTMLElement, defaultRoute: string, routes: { [key: string]: MithrilComponent<any> }): void;
    (rootElement: HTMLDocument, defaultRoute: string, routes: { [key: string]: MithrilComponent<any> }): void;
    (path: string, params?: any, shouldReplaceHistory?: boolean): void;
    (element: HTMLElement, isInitialized: boolean): void;
    (): string;
    mode: string;
    param: MithrilParam;
    buildQueryString(data: Object): string;
    parseQueryString(queryString: string): Object;
}

interface MithrilParam {
    (param: string): string;
}

interface MithrilRedraw {
    (force?: boolean): void;
    strategy: (value?: string) => string;
}

interface MithrilVirtualElement {
    tag: string;
    attrs: Object;
    children: any;
}

interface MithrilDeferred<T> {
    resolve(value?: T): void;
    reject(value?: any): void;
    promise: MithrilPromise<T>;
}

interface MithrilPromise<T> {
    (value?: T): T;
    then<R>(successCallback?: (value: T) => R, errorCallback?: (value: any) => any): MithrilPromise<R>;
    then<R>(successCallback?: (value: T) => MithrilPromise<R>, errorCallback?: (value: any) => any): MithrilPromise<R>;
}

interface MithrilPromiseProperty<T> extends MithrilPromise<T> {
    (): T;
    (value: T): T;
    toJSON(): T;
}

interface MithrilXHROptions {
    method: string;
    url: string;
    user?: string;
    password?: string;
    data?: any;
    background?: boolean;
    unwrapSuccess?(data: any): any;
    unwrapError?(data: any): any;
    serialize?(dataToSerialize: any): string;
    deserialize?(dataToDeserialize: string): any;
    extract?(xhr: XMLHttpRequest, options: MithrilXHROptions): string;
    type?(data: Object): void;
    config?(xhr: XMLHttpRequest, options: MithrilXHROptions): XMLHttpRequest;
}

interface MithrilEvent {
    /**
     * Prevent the default behavior of scrolling the page and updating the
     * URL on next route change.
     */
    preventDefault(): void;
}

interface MithrilController {
    onunload?(event: MithrilEvent): void;
}

interface MithrilComponentAttributes {
    [key: string]: any;
    key?: number|string;
}

interface MithrilComponent<TController extends MithrilController> {
    controller(args: MithrilComponentAttributes): TController;
    view(ctrl: TController, args: MithrilComponentAttributes): MithrilVirtualElement;
}

declare var Mithril: MithrilStatic;
declare var m: MithrilStatic;
