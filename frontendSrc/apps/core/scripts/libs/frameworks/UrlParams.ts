/// <reference path="./../../../../../typings/es6-collections/es6-collections.d.ts" />

export class UrlParam {

    public static getUrlParams(url?: string): Map<string, string> {

        url = url || location.href;

        const params: Map<string, string> = new Map<string, string>();

        (url + '?').split('?')[1].split('&').forEach(function (pairs: string): void {

            const pair: string[] = (pairs + '=').split('=').map(decodeURIComponent);

            if (pair[0].length) {
                params.set(pair[0], pair[1]);
            }

        });

        return params;

    };

}
