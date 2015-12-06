/// <reference path="./../../../../../../typings/mithril/mithril.d.ts" />

import {SidebarComponentController} from '../../controllers/components/SidebarComponentController';

export function SidebarComponentView(ctrl: SidebarComponentController): MithrilVirtualElement {
    'use strict';

    return m(
        'div.sidebarComponent',
        [
            m(
                'div.element',
                {
                    key: 0
                },
                'Пользователи'
            )
        ]
    );

}
