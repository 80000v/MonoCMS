/// <reference path="./../../../../../typings/mithril/mithril.d.ts" />

import {ShellController} from '../controllers/ShellController';

import {HeaderComponentController} from '../controllers/components/HeaderComponentController';
import {HeaderComponentView} from './components/HeaderComponentView';

let headerComponent: MithrilComponent<HeaderComponentController> = {
    controller: (): HeaderComponentController => new HeaderComponentController(),
    view: HeaderComponentView
};

import {SidebarComponentController} from '../controllers/components/SidebarComponentController';
import {SidebarComponentView} from './components/SidebarComponentView';

let sidebarComponent: MithrilComponent<SidebarComponentController> = {
    controller: (): SidebarComponentController => new SidebarComponentController(),
    view: SidebarComponentView
};

export function ShellControllerView(ctrl: ShellController): MithrilVirtualElement {
    'use strict';

    return m(
        'div.app',
        [
            m.component(sidebarComponent, {key: 0}),
            m.component(headerComponent, {key: 1}),
            m(
                'div.page',
                {
                    key: 2
                },
                'Страница'
            )
        ]
    );

}
