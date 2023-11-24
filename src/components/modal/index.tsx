/* eslint-disable @typescript-eslint/no-empty-function */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { IconType } from "react-icons";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export interface RegisterModelProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    width?: string;
}

function ModalRoot({ isOpen, onClose, children, width }:RegisterModelProps): JSX.Element {
    return(
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
            </Transition.Child>
    
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 md:items-center md:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    enterTo="opacity-100 translate-y-0 md:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 md:scale-100"
                    leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                    <Dialog.Panel className={`p-6 mx-4 mt-4 relative transform rounded-lg bg-white dark:bg-gray-800 text-left shadow transition-all w-full ${width} h-full`}>
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition.Root>
    );
}

interface HeaderProps {
    icon: IconType;
    title: string;
    styleContainer?: string;
    styleBgIcon?: string;
    styleIcon?: string;
}

const headerModal= ({title, icon:Icon=BsFillPersonPlusFill, styleContainer, styleBgIcon, styleIcon}:HeaderProps)=>{
    return(
        <div className={twMerge("w-full inline-flex space-x-4 items-center justify-start mb-6", styleContainer)}>
            <div className={twMerge("flex items-center justify-center w-10 h-full p-2 bg-teal-50 dark:bg-teal-400 rounded-full", styleBgIcon)}>
                <Icon className={twMerge("flex-1 h-full text-teal-500 dark:text-teal-700", styleIcon)}/>
            </div>
            <p className="text-base font-semibold leading-6 text-gray-900 dark:text-white">{title}</p>
        </div>
    )
}

interface ModalBodyProps {
    children: ReactNode;
    style?: string;
}

const ModalBody = ({children, style} : ModalBodyProps) => {
    return(
        <div className={twMerge("w-full space-y-4 flex flex-wrap", style)}>
            {children}
        </div>
    )
}

export interface FooterProps {
    onClose?: () => void;
    text?: string;
    style?: string;
    onClick?: () => void;
    form?: string;
    onDelete?: () => void;
}

const ModalFooter = ({ onClose, text, style, onClick, form, onDelete } : FooterProps) => {
    return(
        <div className="w-full inline-flex space-x-3 mt-4 items-center justify-end px-6 py-3 bg-white dark:bg-gray-800 rounded-b-lg" >
            <button className="flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-600 shadow border rounded-md border-gray-300 dark:border-gray-700"
                onClick={onClose}
                type="button"
            >
                <p className="text-sm font-medium leading-tight text-gray-700 dark:text-white">Cancelar</p>
            </button>
            <button className="aria-hidden:hidden flex items-center justify-center px-4 py-2 bg-red-500 shadow border rounded-md border-gray-300 dark:border-gray-700"
                aria-hidden={onDelete === undefined}
                onClick={() => {
                    onClose?.();
                    onDelete?.();
                }}
                type="button"
            >
                <p className="text-sm font-medium leading-tight text-gray-700 dark:text-white">Deletar</p>
            </button>
            <button className={twMerge("flex items-center justify-center px-4 py-2 bg-teal-500 shadow rounded-md", style)}
                onClick={onClick}
                form={form}
                type="submit"
            >
                <p className="text-sm font-medium leading-tight text-white">{text === undefined ? "Cadastrar" : text}</p>
            </button>
        </div> 
    )
}

const Modal = {
    Root: ModalRoot,
    Header: headerModal,
    Body: ModalBody,
    Footer: ModalFooter
}

export default Modal;