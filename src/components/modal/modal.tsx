import "./modal.css"
import React, {useEffect} from "react";
import {Agent} from "../app/app";
import {useAgents} from "../../hooks/agents.hook";
import {Form, Field} from 'react-final-form'
import {ValidationErrors} from "final-form";

type ModalProps = {
    agentId: string,
    onClose: () => void;
}

let emptyAgent: Agent = {id: null, name: "", inn: "", kpp: "", address: ""}

export const Modal: React.FC<ModalProps> = (modalProps) => {
    const {getAgentById} = useAgents();
    const [state, setState] = React.useState<Agent>(emptyAgent);
    const {saveAgent} = useAgents()
    const onSubmit = (values: Agent) => {
        saveAgent({...values, id: modalProps.agentId});
        modalProps.onClose();
    }
    useEffect(() => {
        if (modalProps.agentId !== null) {
            getAgentById(modalProps.agentId).then(agent => setState(agent));
        }
    }, [])

    const validate = (agent: Agent): ValidationErrors => {
        let errors = {};
        if (agent.name === '') {
            errors = {...errors, name: "Поле не может быть пустым"}
        }
        if (agent.address === '') {
            errors = {...errors, address: "Поле не может быть пустым"}
        }
        if (agent.kpp === '') {
            errors = {...errors, kpp: "Поле не может быть пустым"}
        } else {
            errors = {...errors, kpp: /[^0-9]/.test(agent.kpp) ? 'Поле должно содержать только цифры': undefined}
        }
        if (agent.inn === '') {
            errors = {...errors, inn: "Поле не может быть пустым"}
        }
        return errors
    }

    return (
        <div>
            <div id="agent-modal" tabIndex={-1}
                 className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
                 aria-modal="true" role="dialog">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div
                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Контрагент
                            </h3>
                            <button type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="agent-modal"
                                    onClick={() => modalProps.onClose()}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <Form onSubmit={onSubmit} validate={validate}>
                            {(formProps) => (
                                <form className="p-4 md:p-5" onSubmit={formProps.handleSubmit}>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <Field name="name" initialValue={state.name}>
                                            {({input, meta}) => (
                                                <div className="col-span-2">
                                                    <label htmlFor="name"
                                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Наименование</label>
                                                    <input type="text" name="name" id="name"
                                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                           placeholder="Наименование"
                                                           {...input}
                                                    />
                                                    {meta.error && meta.touched &&
                                                        <span className="error">{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="inn" initialValue={state.inn}>
                                            {({input, meta}) => (
                                                <div className="col-span-2">
                                                    <label htmlFor="inn"
                                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ИНН</label>
                                                    <input type="text" name="inn" id="inn"
                                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                           placeholder="ИНН"
                                                           {...input}
                                                    />
                                                    {meta.error && meta.touched &&
                                                        <span className="error">{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="address" initialValue={state.address}>
                                            {({input, meta}) => (
                                                <div className="col-span-2">
                                                    <label htmlFor="address"
                                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Адрес</label>
                                                    <input type="text" name="address" id="address"
                                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                           placeholder="Адрес"
                                                           {...input}
                                                    />
                                                    {meta.error && meta.touched &&
                                                        <span className="error">{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="kpp" initialValue={state.kpp}>
                                            {({input, meta}) => (
                                                <div className="col-span-2">
                                                    <label htmlFor="kpp"
                                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">КПП</label>
                                                    <input type="text" name="kpp" id="kpp"
                                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                           placeholder="КПП"
                                                           {...input}
                                                    />
                                                    {meta.error && meta.touched &&
                                                        <span className="error">{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>
                                        <button type="submit" id="save-button" data-modal-hide="agent-modal"
                                                className="text-white flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Сохранить
                                        </button>
                                        <button type="button" data-modal-hide="agent-modal"
                                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                                                onClick={modalProps.onClose}>
                                            Отменить
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
            <div modal-backdrop="" className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
        </div>
    );
}