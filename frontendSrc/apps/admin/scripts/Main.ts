/**
 * Created by labut on 07.09.2015.
 */

/// <reference path="./../../../typings/mithril/mithril.d.ts" />

import {ShellController} from './app/controllers/ShellController';
import {ShellControllerView} from './app/Views/ShellControllerView';

import {AutoResizeFont} from './../../core/scripts/libs/frameworks/AutoResizeFonts';

declare function require(url: string): MithrilStatic;
const mithril: MithrilStatic = require('mithril');

AutoResizeFont.bind();

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

const shellModule: MithrilComponent<ShellController> = {
    controller: (): ShellController => new ShellController(),
    view: ShellControllerView
};

// setup routes to start w/ the `#` symbol
m.route.mode = 'hash';

// define a route
m.mount(document.body, shellModule);
