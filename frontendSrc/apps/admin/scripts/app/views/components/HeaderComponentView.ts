/// <reference path="./../../../../../../typings/mithril/mithril.d.ts" />

import {HeaderComponentController} from '../../controllers/components/HeaderComponentController';

export function HeaderComponentView(ctrl: HeaderComponentController): MithrilVirtualElement {
    'use strict';

    return m(
        'div.headerComponent',
        [
            m(
                'div.logo',
                {
                    onclick: (): void => location.reload()
                },
                'MonoCMS'
            ),
            m(
                'div.user',
                [
                    m(
                        'div.avatar',
                        {
                            key: 0,
                            style: {
                                backgroundImage: 'url("./content/images/null_avatar.png")'
                            }
                        }
                    ),
                    m(
                        'div.name',
                        {
                            key: 0
                        },
                        'Иванов Иван'
                    ),
                    m(
                        'div.role',
                        {
                            key: 0
                        },
                        'Бог'
                    )
                ]
            )
        ]
    );

}
