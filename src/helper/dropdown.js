import {browser} from "$app/environment";
export class dropdownHelper {
    static init() {
        if (browser) {
            var dropdown = document.querySelector('.dropdown');
            if (dropdown) {
                dropdown.addEventListener('click', function(event) {
                    event.stopPropagation();
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    dropdown.classList.toggle('is-active');
                });
            }
        }
    }
}