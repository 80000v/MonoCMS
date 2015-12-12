/// <reference path="./../../../../../../typings/mithril/mithril.d.ts" />

import {UsersPageController} from '../../controllers/pages/UsersPageController';
import {User} from '../../../../../core/scripts/app/models/classes/UserModel';

export function UsersPageView(ctrl: UsersPageController): MithrilVirtualElement {
    'use strict';

    return m(
        'div.usersPageController',
        [
            m(
                'div.section.list',
                [
                    m(
                        'div.title',
                        'Users list:'
                    ),
                    m(
                        'table',
                        [
                            m(
                                'tr.header',
                                [
                                    m(
                                        'td.id',
                                        'ID:'
                                    ),
                                    m(
                                        'td.login',
                                        'Login:'
                                    ),
                                    m(
                                        'td.name',
                                        'Name:'
                                    ),
                                    m(
                                        'td.email',
                                        'EMail:'
                                    )
                                ]
                            )
                        ].concat(
                            ctrl.listOfUsers.map((user: User, index: number) => {
                                return m(
                                    'tr',
                                    {
                                        key: user.id,
                                        class: ctrl.selectedUser === user ? 'selected' : '',
                                        onclick: (): void => ctrl.selectUser(user)
                                    },
                                    [
                                        m(
                                            'td.id',
                                            user.id
                                        ),
                                        m(
                                            'td.login',
                                            user.login
                                        ),
                                        m(
                                            'td.name',
                                            user.nicename
                                        ),
                                        m(
                                            'td.email',
                                            user.email
                                        )
                                    ]
                                );
                            })
                        )
                    )
                ]
            ),
            m(
                'div.section.setting',
                [
                    m(
                        'div.title',
                        'User editing:'
                    ),
                    ctrl.selectedUser !== void 0 ? m(
                        'div.infoBlock',
                        [
                            m(
                                'div.header',
                                'Information:'
                            ),
                            m(
                                'div.element',
                                [
                                    m(
                                        'label',
                                        'Login:'
                                    ),
                                    m(
                                        'input',
                                        {
                                            value: ctrl.selectedUser.login
                                        }
                                    )
                                ]
                            ),
                            m(
                                'div.element',
                                [
                                    m(
                                        'label',
                                        'Nice name:'
                                    ),
                                    m(
                                        'input',
                                        {
                                            value: ctrl.selectedUser.nicename
                                        }
                                    )
                                ]
                            ),
                            m(
                                'div.element',
                                [
                                    m(
                                        'label',
                                        'View name:'
                                    ),
                                    m(
                                        'input',
                                        {
                                            value: ctrl.selectedUser.viewName
                                        }
                                    )
                                ]
                            )

                        ]
                    ) : null,
                    ctrl.selectedUser !== void 0 ? m(
                        'div.infoBlock',
                        [
                            m(
                                'div.header',
                                'Contacts:'
                            ),
                            m(
                                'div.element',
                                [
                                    m(
                                        'label',
                                        'Login:'
                                    ),
                                    m(
                                        'input',
                                        {
                                            value: ctrl.selectedUser.login
                                        }
                                    )
                                ]
                            ),
                            m(
                                'div.element',
                                [
                                    m(
                                        'label',
                                        'Nice name:'
                                    ),
                                    m(
                                        'input',
                                        {
                                            value: ctrl.selectedUser.nicename
                                        }
                                    )
                                ]
                            ),
                            m(
                                'div.element',
                                [
                                    m(
                                        'label',
                                        'View name:'
                                    ),
                                    m(
                                        'input',
                                        {
                                            value: ctrl.selectedUser.viewName
                                        }
                                    )
                                ]
                            )

                        ]
                    ) : null
                ]
            )
        ]
    );
}
