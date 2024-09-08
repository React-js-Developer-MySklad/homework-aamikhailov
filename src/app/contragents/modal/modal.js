import templateFile from "./modal.html";
import {Modal} from 'flowbite';

class ModalBox {
    #modal;
    #modalElement;
    #id;

    constructor() {
        const modalTemplate = document.createElement('template');
        modalTemplate.innerHTML = String(templateFile);
        this.#modalElement = modalTemplate.content.children[0];
        this.#modal = new Modal(this.#modalElement);
    }

    getNode() {
        return this.#modalElement;
    }

    open(data) {
        if (data !== undefined) {
            this.#id = data.id;
            this.#modalElement.querySelector("#name").value = data.name;
            this.#modalElement.querySelector("#inn").value = data.inn;
            this.#modalElement.querySelector("#address").value = data.address;
            this.#modalElement.querySelector("#kpp").value = data.kpp;
        } else {
            this.#id = null;
            this.#modalElement.querySelector("#name").value = null;
            this.#modalElement.querySelector("#inn").value = null;
            this.#modalElement.querySelector("#address").value = null;
            this.#modalElement.querySelector("#kpp").value = null;
        }
        this.#modal.show();
    }

    getData() {
        return {
            id: this.#id,
            name: this.#modalElement.querySelector("#name").value,
            inn: this.#modalElement.querySelector("#inn").value,
            address: this.#modalElement.querySelector("#address").value,
            kpp: this.#modalElement.querySelector("#kpp").value
        }
    }

    setSaveHandler = (f => {
        this.#modalElement.querySelector("#save-button").addEventListener('click', (e) => {
            e.preventDefault();
            f();
        });
    });
}

export default ModalBox;


