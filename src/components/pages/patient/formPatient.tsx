import Card from "@/components/elementTag/cardText";
import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import { Ethnicity } from "@/enum/ethnicity.enum";
import { Gender } from "@/enum/gender.enum";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HiOutlineCheck } from "react-icons/hi";
import makeAnimated from 'react-select/animated';
import * as yup from 'yup';
import FormAddress from "./formAddress";
import FormEditAddress from "./formEditAddress";
import FormGuardian from "./formGuardian";

const validationDiscipline = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
});

export interface Patient {
    guardian: Guardian[];
    stats: string;
    people: People;
    educationLevel: string;
}

export interface Guardian {
    birthDate: string;
    name: string;
    lastName: string;
    cpf: string;
    rg: string;
    genre: string;
    ethnicity: string;
    email: string;
    phoneNumber: string;
    profession: string;
    nationality: string;
    naturalness: string;
    address: Address[];
}

export interface People {
    birthDate: string,
    name: string,
    lastName: string,
    cpf: string,
    rg: string,
    genre: string,
    ethnicity: string,
    email: string,
    phoneNumber: string,
    profession: string,
    nationality: string,
    naturalness: string,
    address: Address[],
    educationLevel: string,
}

export interface Address {
    id: string;
    name: string;
    cep: string;
    streetAddress: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
}

export interface Option {
    value: number;
    label: string;
}

interface FormPatientProps {
    edit?: Patient;
    isPermissionWrite?: boolean;
    onSave:(data:any)=>void;
}

export default function FormPatient({ isPermissionWrite=true, onSave }:FormPatientProps): JSX.Element {
    const { control: control1, register: register1, watch, handleSubmit: handleSubmit1, formState: { errors: errors1 } } = useForm({
        resolver: yupResolver(validationDiscipline)
    });
    const { fields, append, update, remove } = useFieldArray({
        control: control1, 
        name: "address",
    });
    const { fields: fieldsGuardian, append: appendGuardian, update: upadateGuardian, remove: removeGuardian } = useFieldArray({
        control: control1, 
        name: "guardian",
    });
    const watchAddress= watch('address')
    const watchGuardian= watch('guardian')
    const newGuardianDisposer = useDisclosure();
    const addressDisposer = useDisclosure();
    const editAddressDisposer = useDisclosure();
    const [selectedAddress, setSelectedAddress] = useState<Address>({} as Address);
    const [selectedGuardian, setSelectedGuardian] = useState<Guardian>({} as Guardian);
    const [indexSelectedAddress, setIndexSelectedAddress] = useState<number>(0);
    const [indexSelectedGuardian, setIndexSelecteGuardian] = useState<number>(0);
    const animatedComponents = makeAnimated();

    useEffect(() => {
    }, [fields]);

    function updateAddress(data: Address) {
        append(data);
    }

    function convertAddressToOptions() {
        const addressOptions: Option[] = [];

        fields.map((item, index) => {
            const addressOption = {
                value: addressOptions.length + 1,
                label: watchAddress[index].name
            };
            addressOptions.push(addressOption);
        });

        return addressOptions;
    }

    function updateEditAddress(data: Address) {
        console.log(indexSelectedAddress)
        update(indexSelectedAddress, data);
    }

    function deleteAddress() {
        remove(indexSelectedAddress);
    }

    function updateGuardian(data: Guardian) {
        appendGuardian(data);
    }

    function convertGuardianToOptions() {
        const guadianOptions: Option[] = [];

        fieldsGuardian.map((item, index) => {
            const guadianOption = {
                value: guadianOptions.length + 1,
                label: watchGuardian[index].name
            };
            guadianOptions.push(guadianOption);
        });

        return guadianOptions;
    }

    const onSavePatient = async (data:any) => {
       const patient = {
            guardian: fieldsGuardian,
            stats: "Ativo",
            people: data,
       }

        console.log(patient);
        onSave(patient);
    }
    
    return (
        <div className="gap-y-3 md:gap-y-6 md:mx-10 md:mb-10 px-3 md:pt-6 pb-6 flex items-center justify-centers flex-row flex-wrap md:border border-gray-200 dark:border-gray-500 shadow-sm rounded-lg">
            <FormAddress isOpen={addressDisposer.isOpen} onClose={addressDisposer.close} onSave={updateAddress}/>
            <FormEditAddress isOpen={editAddressDisposer.isOpen} onClose={editAddressDisposer.close} address={selectedAddress} onSave={updateEditAddress} onDelete={deleteAddress}/>
            <FormGuardian isOpen={newGuardianDisposer.isOpen} onClose={newGuardianDisposer.close} onSave={updateGuardian}/>
            {/* <FormEditGuardian isOpen={editAddressDisposer.isOpen} onClose={editAddressDisposer.close} address={selectedAddress} onSave={updateEditAddress} onDelete={deleteAddress}/> */}
            <form id='formPatient' onSubmit={handleSubmit1(onSavePatient)} className="gap-y-3 md:gap-y-6 flex items-center justify-centers flex-row flex-wrap">
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="name"
                        type="text"
                        label="Nome"
                        placeholder="Insira o nome"
                        className="read-only:bg-gray-200 read-only:cursor-default"
                        autoComplete="new-password"
                        {...register1("name")}
                        error={errors1.name}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="lastName"
                        type="text"
                        label="Sobrenome"
                        placeholder="Insira o sobrenome"
                        className="read-only:bg-gray-200 read-only:cursor-default"
                        autoComplete="new-password"
                        {...register1("lastName")}
                        error={errors1.lastName}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="cpf"
                        type="text"
                        label="CPF"
                        placeholder="Insira o CPF"
                        className="read-only:bg-gray-200 read-only:cursor-default"
                        {...register1("cpf")}
                        error={errors1.cpf}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="rg"
                        type="text"
                        label="RG"
                        placeholder="Insira o RG"
                        className="read-only:bg-gray-200 read-only:cursor-default"
                        {...register1("rg")}
                        error={errors1.rg}
                        readOnly={!isPermissionWrite}
                    />
                </div>

                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="birthDate"
                        type="date"
                        label="Data de nascimento"
                        placeholder="dd/mm/aaaa"
                        className="read-only:bg-gray-200 read-only:cursor-default"
                        {...register1("birthDate")}
                        error={errors1.birthDate}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Select
                        label="Gênero"
                        name="gender"
                        disabled={!isPermissionWrite}
                        placeHolder={"Selecione o gênero"}
                        valueDefault={-1}
                        data={
                            Object.keys(Gender).map((key) => ({
                                id: parseInt(key),
                                name: Gender[key as keyof typeof Gender],
                            }))
                        }
                        control={control1}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Select
                        label="Etnia"
                        name="ethnicity"
                        disabled={!isPermissionWrite}
                        placeHolder={"Selecione a etnia"}
                        valueDefault={-1}
                        data={
                            Object.keys(Ethnicity).map((key) => ({
                                id: parseInt(key),
                                name: Ethnicity[key as keyof typeof Ethnicity],
                            }))
                        }
                        control={control1}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="email"
                        type="text"
                        label="E-mail"
                        placeholder="Insira o e-mail"
                        className="read-only:bg-gray-200 read-only:cursor-default"
                        {...register1("email")}
                        error={errors1.email}
                        readOnly={!isPermissionWrite}
                    />
                </div>

                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="phoneNumber"
                        type="text"
                        label="Telefone"
                        placeholder="Insira o telefone"
                        className="read-only:bg-gray-200 read-only:cursor-default"
                        {...register1("phoneNumber")}
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
                        className="read-only:bg-gray-200 read-only:cursor-default"
                        {...register1("profession")}
                        error={errors1.profession}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <Input 
                        id="educationLevel"
                        type="text"
                        label="Escolaridade"
                        placeholder="Insira o nivel de escolaridade"
                        className="read-only:bg-gray-200 read-only:cursor-default"
                        {...register1("educationLevel")}
                        error={errors1.educationLevel}
                        readOnly={!isPermissionWrite}
                    />
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <Input 
                        id="nationality"
                        type="text"
                        label="Nacionalidade"
                        placeholder="Insira a nacionalidade"
                        className="read-only:bg-gray-200 read-only:cursor-default"
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
                        className="read-only:bg-gray-200 read-only:cursor-default"
                        {...register1("naturalness")}
                        error={errors1.naturalness}
                        readOnly={!isPermissionWrite}
                    />
                </div>
            
                
                <div className="w-full pt-6 px-2 border-t border-gray-300 dark:border-gray-500">
                    <div className="flex items-center justify-between">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Endereços</label>
                        <button className="h-10 mb-1 space-x-2 flex items-center justify-center px-3 bg-teal-500 border rounded-md border-teal-500 cursor-pointer"
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
                                text={watchAddress[index].name} 
                                onClick={() => {
                                    const selectedAddress = watchAddress[index] as Address;
                                    setIndexSelectedAddress(index);
                                    setSelectedAddress(selectedAddress);
                                    editAddressDisposer.open(); 
                                }}
                            />
                        ))}
                    </Card.CardSelected>
                </div>
            </form>
            <div className="w-full pt-6 px-2 border-t border-gray-300 dark:border-gray-500">
                <div className="flex items-center justify-between">
                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Guardiões</label>
                    <button className="h-10 mb-1 space-x-2 flex items-center justify-center px-3 bg-teal-500 border rounded-md border-teal-500 cursor-pointer"
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
                            text={watchGuardian[index].name} 
                            onClick={() => {
                                const selectedGuardian = watchGuardian[index] as Guardian;
                                setIndexSelecteGuardian(index);
                                setSelectedGuardian(selectedGuardian);
                                newGuardianDisposer.open(); 
                            }}
                        />
                    ))}
                </Card.CardSelected>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();