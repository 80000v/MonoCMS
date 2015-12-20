/// <reference path="./../../../../../../typings/mithril/mithril.d.ts" />

import {UsersPageController} from '../../controllers/pages/UsersPageController';
import {User} from '../../../../../core/scripts/app/models/classes/UserModel';

const timestampISORegex: RegExp = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/g;

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
                        m(
                            'i.material-icons',
                            'contacts'
                        ),
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
                                m(
                                    'i.material-icons',
                                    'person_add'
                                ),
                                'Add User'
                            ),
                            m(
                                'div.button',
                                {
                                    onclick: (): void => ctrl.updateAllUsersList()
                                },
                                m(
                                    'i.material-icons',
                                    'sync'
                                ),
                                'Refresh'
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
                        m(
                            'i.material-icons',
                            'contact_mail'
                        ),
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
                                m(
                                    'i.material-icons',
                                    'save'
                                ),
                                ctrl.selectedUser.id !== -1 ? 'Save Changes' : 'Save New User'
                            ),
                            m(
                                'div.button',
                                {
                                    onclick: (): void => ctrl.cancelUserChanges()
                                },
                                m(
                                    'i.material-icons',
                                    'cancel'
                                ),
                                'Cancel Changes'
                            ),
                            m(
                                'div.button',
                                {
                                    onclick: (): void => ctrl.deleteUser(ctrl.selectedUser)
                                },
                                m(
                                    'i.material-icons',
                                    'delete'
                                ),
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
                                                if (this.value.match(timestampISORegex) !== null) {
                                                    ctrl.selectedUser.registered = this.value;
                                                }
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
                                                ctrl.selectedUser.status = Number(this.value);
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
                            )

                        ]
                    ) : null
                ]
            )
        ]
    );
}
