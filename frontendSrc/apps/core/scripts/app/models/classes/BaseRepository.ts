/// <reference path="../../../../../../typings/whatwg-fetch/whatwg-fetch.d.ts" />

'use strict';

export class BaseRepository {

    public static errorHandler (response: Response): Response {

        if (response.status >= 200 && response.status < 300) {
            return response;
        }

        throw new Error(response.status + '. ' + response.statusText);
    }

    public static getJSON (response: Response): Promise<Object> {
        return response.json();
    }

    public static getText (response: Response): Promise<string> {
        return response.text();
    }

}
