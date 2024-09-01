import {Agent} from "../components/app/app";

export type AgentsState = {
    agents: Agent[];
    getAgentById: (id: string) => Promise<Agent>;
    saveAgent: (agent: Agent) => void;
    deleteAgent: (id: string) => void;
}