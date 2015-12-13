/// <reference path="./../../../../../typings/mithril/mithril.d.ts" />

import {ShellController} from '../controllers/ShellController';
import {Page, PagesManager} from '../../../../core/scripts/app/models/viewModels/AppModel';
import {UrlParam} from './../../../../core/scripts/libs/frameworks/UrlParams';
import {URLService} from '../../../../core/scripts/app/services/URLService';

// components
import {HeaderComponentController} from '../controllers/components/HeaderComponentController';
import {HeaderComponentView} from './components/HeaderComponentView';

const headerComponent: MithrilComponent<HeaderComponentController> = {
    controller: (): HeaderComponentController => new HeaderComponentController(),
    view: HeaderComponentView
};

import {SidebarComponentController} from '../controllers/components/SidebarComponentController';
import {SidebarComponentView} from './components/SidebarComponentView';

const sidebarComponent: MithrilComponent<SidebarComponentController> = {
    controller: (args: {appManager: PagesManager}): SidebarComponentController => new SidebarComponentController(args),
    view: SidebarComponentView
};

// pages
import {HomePageController} from '../controllers/pages/HomePageController';
import {HomePageView} from './pages/HomePageView';

const homePage: Page = new Page(() => new HomePageController(), HomePageView);
homePage.name = 'home';
homePage.title = 'Home';

import {UsersPageController} from '../controllers/pages/UsersPageController';
import {UsersPageView} from './pages/UsersPageView';

const usersPage: Page = new Page(() => new UsersPageController(), UsersPageView);
usersPage.name = 'users';
usersPage.title = 'Users';

const currentAppKey: string = UrlParam.getUrlParams().get('app');
const appManager: PagesManager = new PagesManager(homePage, [homePage, usersPage]);
for (let i: number = 0; i < appManager.listOfApps.length; i += 1) {
    if (appManager.listOfApps[i].name === currentAppKey) {
        appManager.currentApp = appManager.listOfApps[i];
    }
}

export function ShellControllerView(ctrl: ShellController): MithrilVirtualElement {
    'use strict';

    return m(
        'div.app',
        [
            m.component(
                sidebarComponent,
                {
                    key: -1,
                    appManager: appManager
                }
            ),
            m.component(
                headerComponent,
                {
                    key: -2
                }
            ),
            m(
                'div.page',
                {
                    key: appManager.currentApp.id
                },
                m.component(appManager.currentApp)
            )
        ]
    );

}
