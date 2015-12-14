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
                        'div.controls',
                        [
                            m(
                                'div.button',
                                {
                                    onclick: (): void => ctrl.createNewUser()
                                },
                                'Add User'
                            )
                        ]
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
                        'div.controls',
                        [
                            m(
                                'div.button',
                                {
                                    onclick: (): void => ctrl.saveUser(ctrl.selectedUser)
                                },
                                ctrl.selectedUser.id !== -1 ? 'Save Changes' : 'Save New User'
                            ),
                            m(
                                'div.button',
                                {
                                    onclick: (): void => ctrl.cancelUserChanges()
                                },
                                'Cancel Changes'
                            ),
                            m(
                                'div.button',
                                {
                                    onclick: (): void => ctrl.deleteUser(ctrl.selectedUser)
                                },
                                'Delete User'
                            )
                        ]
                    ) : null,
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
                                            value: ctrl.selectedUser.login,
                                            onkeyup: function (): void {
                                                ctrl.selectedUser.login = this.value;
                                            }
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
                                            value: ctrl.selectedUser.nicename,
                                            onkeyup: function (): void {
                                                ctrl.selectedUser.nicename = this.value;
                                            }
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
                                            value: ctrl.selectedUser.viewName,
                                            onkeyup: function (): void {
                                                ctrl.selectedUser.viewName = this.value;
                                            }
                                        }
                                    )
                                ]
                            ),
                            m(
                                'div.element',
                                [
                                    m(
                                        'label',
                                        'Registered:'
                                    ),
                                    m(
                                        'input',
                                        {
                                            value: ctrl.selectedUser.registered,
                                            onkeyup: function (): void {
                                                ctrl.selectedUser.registered = this.value;
                                            }
                                        }
                                    )
                                ]
                            ),
                            m(
                                'div.element',
                                [
                                    m(
                                        'label',
                                        'Status:'
                                    ),
                                    m(
                                        'input',
                                        {
                                            value: ctrl.selectedUser.status,
                                            onkeyup: function (): void {
                                                ctrl.selectedUser.status = this.value;
                                            }
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
                                        'EMail:'
                                    ),
                                    m(
                                        'input',
                                        {
                                            value: ctrl.selectedUser.email,
                                            onkeyup: function (): void {
                                                ctrl.selectedUser.email = this.value;
                                            }
                                        }
                                    )
                                ]
                            ),
                            m(
                                'div.element',
                                [
                                    m(
                                        'label',
                                        'URL:'
                                    ),
                                    m(
                                        'input',
                                        {
                                            value: ctrl.selectedUser.url,
                                            onkeyup: function (): void {
                                                ctrl.selectedUser.url = this.value;
                                            }
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
                                            value: ctrl.selectedUser.viewName,
                                            onkeyup: function (): void {
                                                ctrl.selectedUser.viewName = this.value;
                                            }
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
