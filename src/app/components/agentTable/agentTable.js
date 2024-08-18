import agentTableTemplate from "./agentTable.html"

class AgentTable {
    #agentMap = new Map();
    #agentCount = 0;
    #rootSelector;
    #tableBody;
    #rowClickHandler;

    constructor(rootSelector, rowClickHandler) {
        this.#rootSelector = rootSelector;
        this.#rowClickHandler = rowClickHandler;
    }

    getAgentById(id) {
        return this.#agentMap.get(id);
    }

    saveAgent(agent) {
        if (agent.id != null) {
            this.#agentMap.set(agent.id, agent);
        } else {
            this.#agentCount++;
            this.#agentMap.set(this.#agentCount, {
                id: this.#agentCount,
                name: agent.name,
                inn: agent.inn,
                address: agent.address,
                kpp: agent.kpp
            });
        }
        this.refreshAgentTable();
    }

    refreshAgentTable() {
        const template = document.createElement('template');
        template.innerHTML = String(agentTableTemplate);
        const tableElement = template.content.children[0].cloneNode(true);
        this.#tableBody = tableElement.querySelector('tbody');
        const rowTemplate = template.content.querySelector('tbody tr');
        this.#tableBody.innerHTML = '';
        this.#agentMap.forEach(v => {
            const rowElement = rowTemplate.cloneNode(true);
            rowElement.children[0].innerText = v.name;
            rowElement.children[1].innerText = v.inn;
            rowElement.children[2].innerText = v.address;
            rowElement.children[3].innerText = v.kpp;
            const button = rowElement.children[5].querySelector("#delete-button");
            button.addEventListener("click", e => {
                this.#removeAgent(v.id)
            });
            rowElement.addEventListener("dblclick", e => {
                this.#rowClickHandler(v.id)
            });
            this.#tableBody.appendChild(rowElement);
        });

        document.querySelector(this.#rootSelector).innerHTML = '';
        document.querySelector(this.#rootSelector).append(tableElement);
    }

    #removeAgent(id) {
        this.#agentMap.delete(id);
        this.refreshAgentTable();
    };
}

export default AgentTable;