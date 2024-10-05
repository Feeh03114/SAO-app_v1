import Card from "@/components/elementTag/cardText";
import { Input } from "@/components/elementTag/input";
import MaskedInput from "@/components/elementTag/maskedInput";
import Select from "@/components/elementTag/select";
import { EduacationLevel } from "@/enum/educationLevel.enum";
import { Ethnicity } from "@/enum/ethnicity.enum";
import { Gender } from "@/enum/gender.enum";
import { useDisclosure } from "@/hook/useDisclosure";
import { Address, Guardian, Patient } from "@/pages/patients";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HiOutlineCheck } from "react-icons/hi";
import { toast } from "react-toastify";
import * as yup from 'yup';
import FormAddress, { validationAddress } from "./formAddress";
import FormEditAddress from "./formEditAddress";
import FormEditGuardian from "./formEditGuardian";
import FormGuardian, { validationGuardian } from "./formGuardian";

const validationPatient = yup.object().shape({
    medicalRecord: yup.string().optional(),
    name: yup.string().required('Campo obrigatório'),
    lastName: yup.string().required('Campo obrigatório'),
    cpf: yup.string().required('Campo obrigatório').min(11, 'CPF inválido'),
    rg: yup.string().required('Campo obrigatório'),
    birthDate: yup.string().required('Campo obrigatório'),
    gender: yup.string().required('Campo obrigatório'),
    ethnicity: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório'),
    profession: yup.string().optional(),
    phoneNumber: yup.string().required('Campo obrigatório'),
    nationality: yup.string().optional(),
    naturalness: yup.string().optional(),
    address: yup.array().of(validationAddress).min(1, 'Precisa ter pelo menos um endereço'),
    guardian: yup.array().of(validationGuardian),
});

export interface Option {
    value: number;
    label: string;
}

interface FormPatientProps {
    edit?: any;
    isPermissionWrite?: boolean;
    onSave:(data:any)=>void;
}

export default function FormPatient({ isPermissionWrite=true, onSave, edit={} }:FormPatientProps): JSX.Element {
    const { reset:reset1, control: control1, register: register1, watch, handleSubmit: handleSubmit1, formState: { errors: errors1 } } = useForm({
        resolver: yupResolver(validationPatient),
        defaultValues: edit,
    });
    const { fields, append, update, remove } = useFieldArray({
        control: control1, 
        name: "address",
    });
    const { fields: fieldsGuardian, append: appendGuardian, update: updateGuardian, remove: removeGuardian } = useFieldArray({
        control: control1, 
        name: "guardian",
    });
    const watchAddress= watch('address')
    const watchGuardian= watch('guardian')
    const newGuardianDisposer = useDisclosure();
    const addressDisposer = useDisclosure();
    const editAddressDisposer = useDisclosure();
    const editGuardianDisposer = useDisclosure();
    const [selectedAddress, setSelectedAddress] = useState<Address>({} as Address);
    const [selectedGuardian, setSelectedGuardian] = useState<Guardian>({} as Guardian);
    const [indexSelectedAddress, setIndexSelectedAddress] = useState<number>(0);
    const [indexSelectedGuardian, setIndexSelecteGuardian] = useState<number>(0);
    const gender = Object.values(Gender);
    const ethnicity = Object.values(Ethnicity);
    const eduacationLevel = Object.values(EduacationLevel);
    
    const updateAddress=(data: Address) => append(data);

    function convertAddressToOptions() {
        const addressOptions: Option[] = [];

        if (watchAddress === undefined) return addressOptions;
        fields?.map((item, index) => {
            const addressOption = {
                value: addressOptions.length + 1,
                label: watchAddress[index].name
            };
            addressOptions.push(addressOption);
        });

        return addressOptions;
    }

    const updateEditAddress =(data: Address) => update(indexSelectedAddress, data);

    const deleteAddress = () => remove(indexSelectedAddress);
    
    const updateGuardianForm = (data: Guardian) => appendGuardian(data);
    
    function convertGuardianToOptions() {
        const guadianOptions: Option[] = [];

        if (watchGuardian === undefined) return guadianOptions;
        fieldsGuardian?.map((item, index) => {
            const guadianOption = {
                value: guadianOptions.length + 1,
                label: watchGuardian[index].name
            };
            guadianOptions.push(guadianOption);
        });

        return guadianOptions;
    }

    const updateEditGuardian = (data: Guardian) => updateGuardian(indexSelectedGuardian, data);
    
    const deleteGuardian = () => remove(indexSelectedGuardian);
    
    const onSavePatient = async (data:any) => {
        const guardian = data.guardian;
        delete data.guardian;
        const medicalRecord = data.medicalRecord;
        delete data.medicalRecord;
        const patient = {
            people: data,
            guardian,
            medicalRecord,
        } as Patient;

        onSave(patient);
    }

    useEffect(() => {
        if(Object.keys(edit).length > 0) reset1(edit)
    }, [edit]);

    useEffect(() => {
        if(errors1.address)
        {
            if(errors1.address?.message) toast.error(errors1.address.message.toString());
            else if (Array.isArray(errors1.address)) 
                for (const item of errors1.address) {
                    for (const key in Object.keys(item)) {
                        toast.error(item[key].message);
                    }
                }
        }
    }, [errors1]);
    
    return (
        <div className="gap-y-3 md:gap-y-6 md:mx-8 md:mb-10 px-3 md:pt-6 pb-6 flex items-center justify-centers flex-row flex-wrap md:border border-slate-200 dark:border-slate-500 dark:bg-slate-800 shadow-sm rounded-lg">
            <FormAddress isOpen={addressDisposer.isOpen} onClose={addressDisposer.close} onSave={updateAddress}/>
            <FormEditAddress isOpen={editAddressDisposer.isOpen} onClose={editAddressDisposer.close} address={selectedAddress} onSave={updateEditAddress} onDelete={deleteAddress}/>
            <FormGuardian isOpen={newGuardianDisposer.isOpen} onClose={newGuardianDisposer.close} onSave={updateGuardianForm}/>
            <FormEditGuardian isOpen={editGuardianDisposer.isOpen} onClose={editGuardianDisposer.close} guardian={selectedGuardian} onSave={updateEditGuardian} onDelete={deleteGuardian}/>
            <form id='formPatient' onSubmit={handleSubmit1(onSavePatient)} className="gap-y-3 md:gap-y-6 flex items-center justify-centers flex-row flex-wrap">
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="medicalRecord"
                        type="text"
                        label="Prontuário"
                        placeholder="Insira o prontuário"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        autoComplete="new-password"
                        {...register1("medicalRecord")}
                        error={errors1.medicalRecord}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        required
                        id="name"
                        type="text"
                        label="Nome"
                        placeholder="Insira o nome"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        autoComplete="new-password"
                        {...register1("name")}
                        error={errors1.name}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        required
                        id="lastName"
                        type="text"
                        label="Sobrenome"
                        placeholder="Insira o sobrenome"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        autoComplete="new-password"
                        {...register1("lastName")}
                        error={errors1.lastName}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <MaskedInput 
                        required
                        name="cpf"
                        label="CPF"
                        mask="999.999.999-99"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        control={control1}
                        error={errors1.cpf}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <MaskedInput 
                        required
                        name="rg"
                        label="RG"
                        typeInput="rg"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        control={control1}
                        error={errors1.rg}
                        readOnly={!isPermissionWrite}
                    />
                </div>

                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        required
                        id="birthDate"
                        type="date"
                        label="Data de nascimento"
                        placeholder="dd/mm/aaaa"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        {...register1("birthDate")}
                        error={errors1.birthDate}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Select
                        required
                        label="Gênero"
                        name="gender"
                        error={errors1.gender}
                        disabled={!isPermissionWrite}
                        placeHolder={"Selecione o gênero"}
                        valueDefault={-1}
                        valueTypeName={true}
                        data={
                            gender.map((item, index) => ({
                                id: index,
                                name: item,
                            }))
                        }
                        control={control1 as any}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Select
                        required
                        label="Etnia"
                        name="ethnicity"
                        error={errors1.ethnicity}
                        disabled={!isPermissionWrite}
                        placeHolder={"Selecione a etnia"}
                        valueDefault={-1}
                        valueTypeName={true}
                        data={
                            ethnicity.map((item, index) => ({
                                id: index,
                                name: item,
                            }))
                        }
                        control={control1 as any}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        required
                        id="email"
                        type="text"
                        label="E-mail"
                        placeholder="Insira o e-mail"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        {...register1("email")}
                        error={errors1.email}
                        readOnly={!isPermissionWrite}
                    />
                </div>

                <div className="w-full md:w-1/4 px-2">
                    <MaskedInput 
                        required
                        name="phoneNumber"
                        label="Telefone"
                        typeInput="phoneNumber"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        control={control1}
                        error={errors1.phoneNumber}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="profession"
                        type="text"
                        label="Profissão"
                        placeholder="Insira a profissão"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        {...register1("profession")}
                        error={errors1.profession}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <Select
                        label="Escolaridade"
                        name="educationLevel"
                        disabled={!isPermissionWrite}
                        placeHolder={"Selecione o nivel de escolaridade"}
                        valueDefault={-1}
                        valueTypeName={true}
                        data={
                            eduacationLevel.map((item, index) => ({
                                id: index,
                                name: item,
                            }))
                        }
                        control={control1 as any}
                    />
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <Input 
                        id="nationality"
                        type="text"
                        label="Nacionalidade"
                        placeholder="Insira a nacionalidade"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        {...register1("nationality")}
                        error={errors1.nationality}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <Input 
                        id="naturalness"
                        type="text"
                        label="Naturalidade"
                        placeholder="Insira a naturalidade"
                        className="read-only:bg-slate-200 read-only:cursor-default"
                        {...register1("naturalness")}
                        error={errors1.naturalness}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                
                <div className="w-full pt-6 border-t border-slate-300 dark:border-slate-500">
                    <div className="flex items-center justify-between">
                        <label className="pl-4 text-sm font-medium leading-tight text-slate-700 dark:text-white">Endereços<span className="text-red-500">*</span></label>
                        <button className="h-10 mr-2 mb-1 space-x-2 flex items-center justify-center px-3 bg-teal-400 border rounded-md border-teal-500 cursor-pointer"
                            type="button"
                            onClick={() => {addressDisposer.open()}}
                        >
                            <HiOutlineCheck className="w-5 h-full rounded-lg text-white"/>
                            <p className="md:block text-sm font-medium leading-tight text-white">Adicionar</p>
                        </button>
                    </div>
                    <Card.CardSelected>
                        {convertAddressToOptions().map((item, index) => (
                            <Card.TextSelected 
                                key={index} 
                                text={watchAddress === undefined ? "" : watchAddress[index].name} 
                                onClick={() => {
                                    if (watchAddress != undefined) {
                                        const selectedAddress = watchAddress[index] as Address;
                                        setIndexSelectedAddress(index);
                                        setSelectedAddress(selectedAddress);
                                    }
                                    editAddressDisposer.open(); 
                                }}
                            />
                        ))}
                    </Card.CardSelected>
                </div>
            </form>
            <div className="w-full pt-6 border-t border-slate-300 dark:border-slate-500">
                <div className="flex items-center justify-between">
                    <label className="pl-4 text-sm font-medium leading-tight text-slate-700 dark:text-white">Guardiões  (Responsáveis)</label>
                    <button className="h-10 mr-2 mb-1 space-x-2 flex items-center justify-center px-3 bg-teal-400 border rounded-md border-teal-500 cursor-pointer"
                        type="button"
                        onClick={() => newGuardianDisposer.open()}
                    >
                        <HiOutlineCheck className="w-5 h-full rounded-lg text-white"/>
                        <p className="md:block text-sm font-medium leading-tight text-white">Adicionar</p>
                    </button>
                </div>
                <Card.CardSelected>
                    {convertGuardianToOptions().map((item, index) => (
                        <Card.TextSelected 
                            key={index} 
                            text={watchGuardian === undefined ? "" : watchGuardian[index].name} 
                            onClick={() => {
                                if (watchGuardian != undefined){
                                    const selectedGuardian = watchGuardian[index] as Guardian;
                                    setIndexSelecteGuardian(index);
                                    setSelectedGuardian(selectedGuardian);
                                }
                                editGuardianDisposer.open(); 
                            }}
                        />
                    ))}
                </Card.CardSelected>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();