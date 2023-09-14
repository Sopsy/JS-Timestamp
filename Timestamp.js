export default class Timestamp
{
    #elements;

    constructor(elements, updateInterval = 60_000)
    {
        this.#elements = elements;
        document.addEventListener('click', e => {
            if (typeof e.target.dataset.timestamp === 'undefined') {
                return;
            }

            this.#toggle(e.target);
        });

        setInterval(() => this.#updateAll(), updateInterval);
    }

    #toggle(target)
    {
        if (target.textContent !== target.title.trim()) {
            target.dataset.origContent = target.textContent;
            target.textContent = target.title.trim();
            target.dataset.toggled = 'true';
        } else {
            target.textContent = target.dataset.origContent;
            delete target.dataset.toggled;
            delete target.dataset.origContent;
            this.#update(target);
        }
    }

    #updateAll()
    {
        for (const elm of this.#elements) {
            this.#update(elm);
        }
    }

    #update(elm)
    {
        if (elm.dataset.toggled === 'true') {
            return;
        }

        let differenceSeconds = Math.floor(Date.now() / 1000) - parseInt(elm.dataset.timestamp);

        if (differenceSeconds < 60) {
            elm.textContent = _('now');
        } else if (differenceSeconds < 3600) {
            elm.textContent = sprintf(_('%d min'), Math.floor(differenceSeconds / 60));
        } else if (differenceSeconds < 86400) {
            elm.textContent = sprintf(_('%d h'), Math.floor(differenceSeconds / 3600));
        }
    }
}

Object.freeze(Timestamp.prototype);