import html from "./app.html";
import './app.css'
import AgentTable from "./components/agentTable/agentTable";
import ModalBox from "./components/modal/modal";

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;
const modal = new ModalBox();
const agentTable = new AgentTable("main", (id) => {
    modal.open(agentTable.getAgentById(id))
});
rootElement.appendChild(modal.getNode());

document.getElementById("add-button").addEventListener("click", (e) => {
        e.preventDefault();
        modal.open();
    }
);
modal.setSaveHandler(() => agentTable.saveAgent(modal.getData()));
agentTable.refreshAgentTable();