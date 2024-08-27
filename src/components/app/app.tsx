import "./app.css"
import logoImg from './assets/header-logo.svg';
import {AgentTable} from '../agentTable/table';
import React, {useCallback} from "react";
import {Modal} from "../modal/modal";

export interface Agent {
    id: number,
    name: string,
    inn: string,
    address: string,
    kpp: string,
}

type AgentsStore = {
    agents: Map<number, Agent>,
    lastNumber: number
}

export const App: React.FC = () => {
    const emptyAgent = (): Agent => {
        return {id: null, name: "", inn: "", address: "", kpp: ""}
    };

    const [agentsStoreState, setAgentsStoreState] = React.useState<AgentsStore>({
        agents: new Map<number, Agent>(),
        lastNumber: 0
    });
    const [modalState, setModalState] = React.useState({
        isOpen: false,
        agentData: emptyAgent(),
        onClose:
            useCallback(() => {
                setModalState({...modalState, isOpen: false})
            }, []),
        onSave:
            useCallback((agent: Agent) => {
                setAgentsStoreState(prevState => {
                    if (agent.id === null) {
                        agent.id = prevState.lastNumber + 1;
                    }
                    const newAgents = new Map(prevState.agents);
                    newAgents.set(agent.id, agent);

                    return {agents: newAgents, lastNumber: agent.id};
                });
                setModalState({...modalState, isOpen: false})
            }, [])
    });

    const addAgentClick = () => {
        setModalState(prevState => {
            return {...prevState, agentData: emptyAgent(), isOpen: true}
        });
    }
    const onDeleteAgent = (id: number) => {
        setAgentsStoreState(prevState => {
            const newAgents = new Map(prevState.agents);
            newAgents.delete(id);
            return {...prevState, agents: newAgents};
        })
    }
    const onEditAgent = (id: number) => {
        const agent: Agent = agentsStoreState.agents.get(id);
        setModalState({...modalState, agentData: agent, isOpen: true});
    }

    return (
        <div className="app">
            <header className="page-section">
                <img src={logoImg} style={{height: 24, width: 156}} alt="Moysklad"/>
                <button type="button" id="add-button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={addAgentClick}>
                    Добавить
                </button>
            </header>
            <main className="page-section">
                <AgentTable agents={[...agentsStoreState.agents.values()]}
                            onDelete={onDeleteAgent}
                            onEdit={onEditAgent}
                />
            </main>
            <footer className="page-section">
                <span className="text-xs font-medium">
                    © 2007–2024 ООО «Логнекс»
                </span>
            </footer>
            {modalState.isOpen && <Modal agentData={modalState.agentData}
                                         onClose={modalState.onClose}
                                         onSave={modalState.onSave}/>
            }
        </div>
    )
}