import React, {PropsWithChildren, useEffect, useState} from "react";
import {httpRequest} from "../tools/http-request";
import {Agent} from "../components/app/app";
import {AgentsContext} from "./agents.context";
import {AgentsState} from "./agents.type";

let path = 'http://localhost:3000/agents';

export const AgentsProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [agents, setAgents] = useState<Agent[]>([])
    useEffect(() => {
        getAll()
    }, [])

    const getAll = () => {
        httpRequest<Agent[]>(path, {
            headers: {'Content-Type': 'application/json'},
            method: 'GET'
        }).then(result => setAgents(() => [...result])).catch(e => console.error("Error: " + e.message))

    }
    const context = {
        agents: agents,
        getAgentById: (id: string) => {
            return httpRequest<Agent>(path + "/" + id, {
                headers: {'Content-Type': 'application/json'},
                method: 'GET'
            })
        },
        saveAgent: (agent) => {
            if (agent.id === null) {
                const newAgent: Agent = {...agent, id: Math.round(Math.random() * 10000).toString()}
                httpRequest<Agent>(path, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify(newAgent)
                }).then(getAll).catch(e => console.log("Error: " + e.message))
            } else {
                httpRequest<Agent>(path + "/" + agent.id, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'PUT',
                    body: JSON.stringify(agent)
                }).then(getAll).catch(e => console.log("Error: " + e.message))
            }
        },
        deleteAgent: (id) => {
            httpRequest(path + '/' + id, {
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE'
            }).then(getAll).catch(e => console.log("Error: " + e.message))

        }
    } as AgentsState;


    return (
        <AgentsContext.Provider value={context}>
            {children}
        </AgentsContext.Provider>
    )


}
