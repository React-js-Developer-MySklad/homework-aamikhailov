import {createContext} from "react";
import {AgentsState} from "./agents.type";

export const AgentsContext = createContext<AgentsState>(null)