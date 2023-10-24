/* eslint-disable @typescript-eslint/no-empty-function */
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { ObjectSchema } from "yup";
import { Input } from "../elementTag/input";
import { Modal } from "../elementTag/modal";

export interface RegisterModelProps {
    nameForm: string;
    isOpen: boolean;
    onClose: () => void;
    fieldRegister: stepsProps[];
    yupValidation?: ObjectSchema<any>[];
    onChange?: (e: any) => void;
    edit?: any;
  
    api?: AxiosInstance;
    keyRegisterModel?: string;
}
  
interface stepsProps {
    title: string;
    description: string;
    fields: FieldRegisterProps[];
}
  
interface FieldRegisterProps {
    key: string;
    label: string;
    type: string;
    placeholder?: string;
    disabled?: boolean;
    mask?: string;
    chidren?: (e: any) => React.ReactNode;
    options?: OptionsProps[];
    endpoint?: string;
    respEndpoint?: string;
    formatChars?: any;
    regex?: string;
    tooltip?: string;
}
  
interface OptionsProps {
    value: string;
    label: string;
}

export default function ModalFormDynamic({
    nameForm = 'formRegister',
    isOpen,
    onClose,
    fieldRegister = [],
    yupValidation = [],
    onChange = undefined,
    edit = undefined,
    api = undefined,
    keyRegisterModel = 'RegisterModel',
}:RegisterModelProps): JSX.Element {
    const [step, setStep] = useState(1);
    const [validYup, setValidYup] = useState<ObjectSchema<any>>(yupValidation[0]);
    const {
        handleSubmit,
        register,
        trigger,
        control,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: validYup ? yupResolver(validYup):undefined });

    useEffect(() => {
        if(!isOpen) return;
        if(edit) reset(edit);
        else reset();
        setStep(1);
        setValidYup(yupValidation[0]);
    }, [isOpen]);

    async function handleStep() {
        if(fieldRegister.length === step){
            const form = document.getElementById(nameForm);
            if (form) {
            form.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            );
            }
            return;
        }
        const isValid = await trigger();
        if (isValid) setStep(step + 1);
    }
    

    return(
        <Modal
            isOpen={isOpen} 
            onClose={onClose}
        >
            <div className="inline-flex flex-col items-start justify-start bg-white shadow rounded-lg" style={{width: 512, height: 469,}}>
                <form 
                    className="inline-flex items-start justify-start px-6 pt-6 pb-4"
                    style={{width: 512, height: 407,}}
                    onSubmit={handleSubmit(onChange||((e)=>console.log(e)))}
                    id={nameForm}
                    key={keyRegisterModel}
                >
                    {
                        fieldRegister.map((step, index) => {
                            return(
                                <div key={step.fields+index.toString()} className="inline-flex flex-col space-y-6 items-start justify-start" style={{width: 464, height: 360,}}>
                                    <div className="inline-flex space-x-4 items-center justify-start" style={{width: 520, height: 40,}}>
                                        <div className="flex items-center justify-center w-10 h-full p-2 bg-teal-50 rounded-full">
                                            <BsFillPersonPlusFill className="flex-1 h-full text-teal-500"/>
                                        </div>
                                        <p className="text-lg font-medium leading-normal text-gray-900" style={{width: 464,}}>{step.title}</p>
                                    </div>
                                    <div className="flex flex-col space-y-4 items-start justify-start" style={{width: 464, height: 296,}}>
                                        {
                                            step?.fields?.map((field, index) => {
                                               return (<div key={field.key+index.toString()} className="flex flex-col space-y-1 items-start justify-start" style={{width: 464, height: 62,}}>
                                                    <div className="inline-flex items-center justify-start pl-4" style={{width: 464, height: 20,}}>
                                                        <p className="text-sm font-medium leading-tight text-gray-700">{field.label}</p>
                                                    </div>
                                                    <Input 
                                                        className="text-sm leading-tight text-gray-500 px-4 py-2 bg-white shadow border rounded-lg border-gray-300" 
                                                        style={{width: 464, height: 38,}} 
                                                        placeholder={field.placeholder}
                                                        disabled={field.disabled}
                                                        {...register(field.key)}
                                                        error={errors[field.key]}
                                                    />
                                                </div>)
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </form>
                <div className="inline-flex space-x-3 items-center justify-end px-6 py-3 bg-gray-50" style={{width: 512, height: 62,}}>
                    <button className="flex items-center justify-center px-4 py-2 bg-white shadow border rounded-md border-gray-300"
                        onClick={onClose}
                    >
                        <p className="text-sm font-medium leading-tight text-gray-700">Cancelar</p>
                    </button>
                    <button 
                        className="flex items-center justify-center px-4 py-2 bg-teal-500 shadow rounded-md"
                        disabled={isSubmitting}
                        onClick={handleStep}
                    >
                        <p className="text-sm font-medium leading-tight text-white">Cadastrar</p>
                    </button>
                </div>
            </div>
        </Modal>
    );
}