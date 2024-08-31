import agentTableTemplate from "./agentTable.html"

class AgentTable {
    #rootSelector;
    #tableBody;
    #rowClickHandler;
    #removeHandler;

    constructor(rootSelector, rowClickHandler, removeHandler) {
        this.#rootSelector = rootSelector;
        this.#rowClickHandler = rowClickHandler;
        this.#removeHandler = removeHandler;
    }

    refresh(data) {
        const template = document.createElement('template');
        template.innerHTML = String(agentTableTemplate);
        const tableElement = template.content.children[0].cloneNode(true);
        this.#tableBody = tableElement.querySelector('tbody');
        const rowTemplate = template.content.querySelector('tbody tr');
        this.#tableBody.innerHTML = '';
        data.forEach(v => {
            const rowElement = rowTemplate.cloneNode(true);
            rowElement.children[0].innerText = v.name;
            rowElement.children[1].innerText = v.inn;
            rowElement.children[2].innerText = v.address;
            rowElement.children[3].innerText = v.kpp;
            const button = rowElement.children[5].querySelector("#delete-button");
            button.addEventListener("click", e => {
                this.#removeHandler(v.id)
            });
            rowElement.addEventListener("dblclick", e => {
                this.#rowClickHandler(v.id)
            });
            this.#tableBody.appendChild(rowElement);
        });

        document.querySelector(this.#rootSelector).innerHTML = '';
        document.querySelector(this.#rootSelector).append(tableElement);
    }
}

export default AgentTable;