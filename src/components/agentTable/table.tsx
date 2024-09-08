import React from "react";
import {TableRow} from "./tableRow";
import {useAgents} from "../../hooks/agents.hook";

type AgentTableProps = {
    onEdit: (id: String) => void;
}

export const AgentTable: React.FC<AgentTableProps> = (props) => {
    const {agents, deleteAgent} = useAgents();

    return (<div className="relative overflow-x-auto">
            <table className="main-table w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase border-b bg-gray-50 font-semibold">
                <tr>
                    <th scope="col">
                        Наименование
                    </th>
                    <th scope="col">
                        ИНН
                    </th>
                    <th scope="col">
                        Адрес
                    </th>
                    <th scope="col">
                        КПП
                    </th>
                    <th scope="col" className="delete-column">
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    agents.map(agent =>
                        <TableRow
                            key={agent.id}
                            agent={agent}
                            onRowClick={props.onEdit}
                            onDelete={deleteAgent}
                        />
                    )
                }
                </tbody>
            </table>
        </div>
    )

}



