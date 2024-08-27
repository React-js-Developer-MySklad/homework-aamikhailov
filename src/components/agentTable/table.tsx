import React from "react";
import {TableRow} from "./tableRow";
import {Agent} from "../app/app";

type AgentTableProps = {
    agents: Agent[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

export const AgentTable: React.FC<AgentTableProps> = (agentsTableProps) => {

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
                    agentsTableProps.agents.map(agent =>
                        <TableRow
                            key={agent.id}
                            onRowClick={agentsTableProps.onEdit}
                            onDelete={agentsTableProps.onDelete}
                            agent={agent}
                        />)
                }
                </tbody>
            </table>
        </div>
    )

}



