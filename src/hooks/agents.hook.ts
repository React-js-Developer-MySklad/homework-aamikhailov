import {useContext} from "react";
import {AgentsContext} from "./agents.context";

export const useAgents = () => {
    const context = useContext(AgentsContext);
    if (context === null) {
        throw Error('useAgents hook outside AgentsProvider');
    }
    return context;
}