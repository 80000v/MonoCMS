export class URLService {

    private static timer: number;
    private static params: string[];

    public static updateUrl(params: string[]): void {
        this.params = params;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.setURL(), 100);
    };

    private static setURL(): void {
        window.history.pushState( // history api is heavy operation, so use Timer
            '',
            '',
            [
                window.location.pathname, '#/?',
                this.params.join('&')
            ].join('')
        );
    }

}
