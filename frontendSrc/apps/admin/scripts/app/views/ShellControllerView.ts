/// <reference path="./../../../../../typings/mithril/mithril.d.ts" />

import {ShellController} from '../controllers/ShellController';
import {App, AppManager} from '../../../../core/scripts/app/models/viewModels/AppModel';

// components
import {HeaderComponentController} from '../controllers/components/HeaderComponentController';
import {HeaderComponentView} from './components/HeaderComponentView';

let headerComponent: MithrilComponent<HeaderComponentController> = {
    controller: (): HeaderComponentController => new HeaderComponentController(),
    view: HeaderComponentView,
    key: 'headerComponent'
};

import {SidebarComponentController} from '../controllers/components/SidebarComponentController';
import {SidebarComponentView} from './components/SidebarComponentView';

let sidebarComponent: MithrilComponent<SidebarComponentController> = {
    controller: (args: {appManager: AppManager}): SidebarComponentController => new SidebarComponentController(args),
    view: SidebarComponentView,
    key: 'sidebarComponent'
};

// pages
import {HomePageController} from '../controllers/pages/HomePageController';
import {HomePageView} from './pages/HomePageView';

let homePage: App = new App(() => new HomePageController(), HomePageView);
homePage.key = '00-Home';
homePage.title = 'Домашняя';

import {UsersPageController} from '../controllers/pages/UsersPageController';
import {UsersPageView} from './pages/UsersPageView';

let usersPage: App = new App(() => new UsersPageController(), UsersPageView);
usersPage.key = '01-Users';
usersPage.title = 'Пользователи';

let appManager: AppManager = new AppManager(homePage, [homePage, usersPage]);

export function ShellControllerView(ctrl: ShellController): MithrilVirtualElement {
    'use strict';

    return m(
        'div.app',
        [
            m.component(
                sidebarComponent,
                {
                    appManager: appManager
                }
            ),
            m.component(
                headerComponent
            ),
            m(
                'div.page',
                {
                    key: 2
                },
                m.component(appManager.currentApp)
            )
        ]
    );

}
