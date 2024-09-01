import "./app.css"
import logoImg from './assets/header-logo.svg';
import {AgentTable} from '../agentTable/table';
import React from "react";
import {Modal} from "../modal/modal";
import {AgentsProvider} from "../../hooks/agents.provider";

export interface Agent {
    id: string,
    name: string,
    inn: string,
    address: string,
    kpp: string,
}

type ModalState = {
    isOpen: boolean,
    agentId: string
}
let emptyAgent: Agent = {id: null, name: "", inn: "", kpp: "", address: ""}

export const App: React.FC = () => {


    const [modalState, setModalState] = React.useState<ModalState>({isOpen: false, agentId: null});

    const closeModal = () => {
        setModalState({isOpen: false, agentId: null});
    }

    const editAgent = (agentId: string) => {
        setModalState({isOpen: true, agentId: agentId});
    }

    return (
        <AgentsProvider>
            <div className="app">
                <header className="page-section">
                    <img src={logoImg} style={{height: 24, width: 156}} alt="Moysklad"/>
                    <button type="button" id="add-button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => {
                                setModalState({isOpen: true, agentId: null})
                            }}>
                        Добавить
                    </button>
                </header>
                <main className="page-section">
                    <AgentTable onEdit={editAgent}/>
                </main>
                <footer className="page-section">
                <span className="text-xs font-medium">
                    © 2007–2024 ООО «Логнекс»
                </span>
                </footer>
                {modalState.isOpen && <Modal onClose={closeModal}
                                             agentId={modalState.agentId}
                />
                }
            </div>
        </AgentsProvider>
    )
}