/// <reference path="./../../../../../../typings/mithril/mithril.d.ts" />

import {PostsPageController} from '../../controllers/pages/PostsPageController';

export function PostsPageView(ctrl: PostsPageController): MithrilVirtualElement {
    'use strict';

    return m(
        'div.postsPageController',
        [
            m(
                'div.section.list',
                [m(
                    'div.title',
                    m(
                        'i.material-icons',
                        'folder'
                    ),
                    'Rubrics:'
                )]
            ),
            m(
                'div.section.editing',
                [
                    m(
                        'div.title',
                        m(
                            'i.material-icons',
                            'edit'
                        ),
                        'Post editing:'
                    )
                ]
            )
        ]
    );
}
