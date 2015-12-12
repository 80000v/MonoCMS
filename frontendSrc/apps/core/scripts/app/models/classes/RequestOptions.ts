
/// <reference path="../../../../../../typings/whatwg-fetch/whatwg-fetch.d.ts" />

'use strict';

export class RequestOptions implements RequestInit {
    public method: string;
    public headers: HeaderInit|{ [index: string]: string };
    public body: BodyInit;
    public mode: RequestMode;
    public credentials: string;
    public cache: RequestCache;

    constructor(method?: string,
                headers?: HeaderInit|{ [index: string]: string },
                body?: BodyInit,
                mode?: RequestMode,
                credentials?: string,
                cache?: RequestCache) {

        this.method = method || 'GET';
        this.headers = headers || null;
        this.body = body || null;
        this.mode = mode || null;
        this.credentials = credentials || 'include';
        this.cache = cache || null;
    }

}
