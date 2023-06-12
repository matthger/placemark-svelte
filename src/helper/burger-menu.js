import {browser} from "$app/environment";
export class burgermenuHelper {
    static init() {
        if (browser) {
            let burger = document.querySelector('.navbar-burger');
            if (burger) {
                burger.addEventListener('click', function() {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    burger.classList.toggle('is-active');
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    document.querySelector('.burger-menu').classList.toggle('is-active');
                });
            }
        }
    }
}