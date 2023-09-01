/**
 * Class for filter article in AJAX
 * 
 * @property {HTMLElement} pagination - Element html with pagination nav
 * @property {HTMLElement} content - Element html with the list of article
 * @property {HTMLElement} sortable - Element html with the sortable btn
 * @property {HTMLFormElement} form - Element html with the form filter
 * @property {HTMLElement} count - Element html with the total item
 */
export class Filter {
    constructor(element) {
        if (element == null) {
            return;
        }

        this.pagination = element.querySelector('.js-filter-pagination');
        this.content = element.querySelector('.js-filter-content');
        this.sortable = element.querySelector('.js-filter-sortable');
        this.form = element.querySelector('.js-filter-form');
        this.count = element.querySelector('.js-filter-count');
        this.bindEvents();
    }

    /**
     * Function for add all events listener on the page
     */
    bindEvents() {
        const clickEventListener = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'I' || e.target.tagName === 'SPAN') {
                e.preventDefault();
                let url;

                if (e.target.tagName === 'I' || e.target.tagName === 'SPAN') {
                    url = e.target.closest('a').href;
                } else {
                    url = e.target.href;
                }

                this.loadUrl(url);
            }
        }

        this.sortable.addEventListener('click', clickEventListener);
        this.pagination.addEventListener('click', clickEventListener);

        this.form.querySelectorAll('input[type="text"]').forEach(input => {
            input.addEventListener('keyup', this.loadForm.bind(this));
        });
    }

    /**
     * Function for load ajax request and modify the content on the page
     * 
     * @param {string} url - url for the AJAX request
     */
    async loadUrl(url) {
        const params = new URLSearchParams(url.split('?')[1] || '');
        params.set('ajax', true);

        const response = await fetch(url.split('?')[0] + '?' + params.toString());

        if (response.status >= 200 && response.status < 300) {
            const data = await response.json();

            this.content.innerHTML = data.content;
            this.sortable.innerHTML = data.sortable;
            this.count.innerHTML = data.count;
            this.pagination.innerHTML = data.pagination;

            params.delete('ajax');
            history.replaceState({}, "", url.split('?')[0] + '?' + params.toString());
        } else {
            console.error(await response.json());
        }
    }

    /**
     * Function for load all information on the form and send ajax request
     */
    async loadForm() {
        const data = new FormData(this.form);
        const url = new URL(this.form.getAttribute('action') || window.location.href);
        const params = new URLSearchParams();

        data.forEach((value, key) => {
            params.append(key, value);
        });

        return this.loadUrl(url.pathname + '?' + params.toString());
        //return this.loadUrl(`${url.pathname}?${params.toString()}`);
    }
}