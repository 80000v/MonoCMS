/**
 * Created by labut on 07.09.2015.
 */

/// <reference path="./../../../typings/mithril/mithril.d.ts" />

import {ShellController} from './app/controllers/ShellController';
import {ShellControllerView} from './app/Views/ShellControllerView';

declare function require(url: string): MithrilStatic;
let mithril: MithrilStatic = require('mithril');

// frameworks
Object.defineProperty(
    window,
    'm',
    {
        value: mithril,
        writable: true,
        enumerable: true,
        configurable: true
    });

let shellModule: MithrilComponent<ShellController> = {
    controller: (): ShellController => new ShellController(),
    view: ShellControllerView,
    key: 'shellModule'
};

// setup routes to start w/ the `#` symbol
m.route.mode = 'hash';

// define a route
m.mount(document.body, shellModule);
