/// <reference path="./../../../../../../typings/mithril/mithril.d.ts" />

import {SidebarComponentController} from '../../controllers/components/SidebarComponentController';
import {App} from '../../../../../core/scripts/app/models/AppModel';

export function SidebarComponentView(ctrl: SidebarComponentController): MithrilVirtualElement {
    'use strict';

    return m(
        'div.sidebarComponent',
        ctrl.appManage.listOfApps.map((app: App, index: number) => {
            return m(
                'div.element',
                {
                    key: index,
                    class: ctrl.appManage.currentApp === app ? 'active' : null,
                    onclick: (): void => ctrl.onSelectAppClick(index)
                },
                app.title
            );
        })
    );
}
