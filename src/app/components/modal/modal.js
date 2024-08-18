import templateFile from "./modal.html";
import {Modal} from 'flowbite';

class ModalBox {
    #modal;
    #modalElement;

    constructor() {
        const modalTemplate = document.createElement('template');
        modalTemplate.innerHTML = String(templateFile);
        this.#modalElement = modalTemplate.content.children[0];
        this.#modal = new Modal(this.#modalElement);
    }

    getNode() {
        return this.#modalElement;
    }

    open() {
        this.#modal.show();
    }

    getData() {
        return {
            name: this.#modalElement.querySelector("#name").value,
            inn: this.#modalElement.querySelector("#inn").value,
            address: this.#modalElement.querySelector("#address").value,
            kpp: this.#modalElement.querySelector("#kpp").value
        }
    }

    setAcceptHandler = (f => {
        this.#modalElement.querySelector("#accept-button").addEventListener('click', (e) => {
            e.preventDefault();
            f();
        });
    });
}

export default ModalBox;


