export class AutoResizeFont {

    public static bind(): void {

        function resize(): void {
            document.body.style.fontSize = String(window.innerHeight / 1020) + 'em';
        }

        if (document && document.body) {
            resize();
        }

        if (document.readyState === 'complete') {
            resize();
        } else {
            window.addEventListener('load', resize);
        }

        window.addEventListener('resize', resize);

    }

}
