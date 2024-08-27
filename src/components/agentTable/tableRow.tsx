import React from "react";
import {Agent} from "../app/app";

type Props = {
    agent: Agent;
    onRowClick: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TableRow: React.FC<Props> = (props) => {
    return (
        <tr className="bg-white text-sm border-b" onDoubleClick={() => props.onRowClick(props.agent.id)}>
            <th scope="row" className="font-normal whitespace-nowrap text-black">
                {props.agent.name}
            </th>
            <td className="px-6 py-3">
                {props.agent.inn}
            </td>
            <td className="px-6 py-3">
                {props.agent.address}
            </td>
            <td className="px-6 py-3">
                {props.agent.kpp}
            </td>
            <td className="px-6 py-3 delete-column">
                <button type="button" id="delete-button"
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-700 font-normal rounded-lg text-xs px-3 py-0.5 text-center"
                        onClick={() => props.onDelete(props.agent.id)}>
                    Удалить
                </button>
            </td>
        </tr>
    )
}