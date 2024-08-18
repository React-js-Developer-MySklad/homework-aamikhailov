import html from "./app.html";
import './app.css'
import AgentTable from "./contragents/table/agentTable";
import ModalBox from "./contragents/modal/modal";

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

const agentMap = new Map();
let agentCount = 0;

const modal = new ModalBox();
modal.setSaveHandler(() => {
    const agent = modal.getData();
    if (agent.id != null) {
        agentMap.set(agent.id, agent);
    } else {
        agentCount++;
        agentMap.set(agentCount, {
            id: agentCount,
            name: agent.name,
            inn: agent.inn,
            address: agent.address,
            kpp: agent.kpp
        });
    }
    agentTable.refresh(agentMap);
});

rootElement.appendChild(modal.getNode());

const rowClickHandler = id => {
    modal.open(agentMap.get(id))
};
const deleteClickHandler = id => {
    agentMap.delete(id);
    agentTable.refresh(agentMap);
};
const agentTable = new AgentTable("main", rowClickHandler, deleteClickHandler);


document.getElementById("add-button").addEventListener("click", e => {
        e.preventDefault();
        modal.open();
    }
);

agentTable.refresh(agentMap);