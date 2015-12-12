/// <reference path="./../../../../../typings/mithril/mithril.d.ts" />

import {ShellController} from '../controllers/ShellController';
import {App, AppManager} from '../../../../core/scripts/app/models/viewModels/AppModel';
import {UrlParam} from './../../../../core/scripts/libs/frameworks/UrlParams';
import {URLService} from '../../../../core/scripts/app/services/URLService';

// components
import {HeaderComponentController} from '../controllers/components/HeaderComponentController';
import {HeaderComponentView} from './components/HeaderComponentView';

const headerComponent: MithrilComponent<HeaderComponentController> = {
    controller: (): HeaderComponentController => new HeaderComponentController(),
    view: HeaderComponentView,
    key: 'headerComponent'
};

import {SidebarComponentController} from '../controllers/components/SidebarComponentController';
import {SidebarComponentView} from './components/SidebarComponentView';

const sidebarComponent: MithrilComponent<SidebarComponentController> = {
    controller: (args: {appManager: AppManager}): SidebarComponentController => new SidebarComponentController(args),
    view: SidebarComponentView,
    key: 'sidebarComponent'
};

// pages
import {HomePageController} from '../controllers/pages/HomePageController';
import {HomePageView} from './pages/HomePageView';

const homePage: App = new App(() => new HomePageController(), HomePageView);
homePage.key = 'home'; // for mithril differ
homePage.title = 'Home';

import {UsersPageController} from '../controllers/pages/UsersPageController';
import {UsersPageView} from './pages/UsersPageView';

const usersPage: App = new App(() => new UsersPageController(), UsersPageView);
usersPage.key = 'users'; // for mithril differ
usersPage.title = 'Users';

const currentAppKey: string = UrlParam.getUrlParams().get('app');
const appManager: AppManager = new AppManager(homePage, [homePage, usersPage]);
for (let i: number = 0; i < appManager.listOfApps.length; i += 1) {
    if (appManager.listOfApps[i].key === currentAppKey) {
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
