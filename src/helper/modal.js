import {browser} from "$app/environment";

export class modalHelper {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    static openModal(el) {
        el.classList.add('is-active');
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    static closeModal(el) {
        el.classList.remove('is-active');
    }

    static closeAllModals() {
        if(browser) {
            (document.querySelectorAll('.modal') || []).forEach((modal) => {
                this.closeModal(modal);
            });
        }
    }

    static init() {
        if(browser) {
            (document.querySelectorAll('.js-modal-trigger') || []).forEach((trigger) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const modal = trigger.dataset.target;
                const target = document.getElementById(modal);

                trigger.addEventListener('click', () => {
                    this.openModal(target);
                });
            });

            (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete') || []).forEach(($close) => {
                const target = $close.closest('.modal');

                $close.addEventListener('click', () => {
                    this.closeModal(target);
                });
            });

            document.addEventListener('keydown', (event) => {
                const e = event || window.event;

                if (e.keyCode === 27) {
                    this.closeAllModals();
                }
            });
        }
    }
}