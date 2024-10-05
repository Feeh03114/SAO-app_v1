import Table from "@/components/Table";
import Card from "@/components/elementTag/cardText";
import { Input } from "@/components/elementTag/input";
import { TypeUser } from "@/enum/typeUser.enum";
import { User } from "@/pages/users/edit/[id]";
import api from "@/service/api";
import { reactSelectStyle } from "@/styles/reactSelectStyle";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import makeAnimated from 'react-select/animated';
import { toast } from "react-toastify";
import * as yup from 'yup';

const schemaPermission = yup.object().shape({
    isRead: yup.boolean().optional(),
    isCreate: yup.boolean().optional(),
    isEdit: yup.boolean().optional(),
    isDelete: yup.boolean().optional(),
    filter: yup.boolean().optional(),
    page: yup.object().shape({
        id: yup.string().optional(),
        namePage: yup.string().optional(),
        url: yup.string().optional(),
        icon: yup.string().optional(),
        ordem: yup.number().optional(),
    }),
});

interface FormUserProps {
    edit?: User;
    isPermissionWrite?: boolean;
    onSave:(data:any)=>void;
}

interface options {
    label: string;
    value: string;
}

export default function FormUser({edit, isPermissionWrite=true, onSave}:FormUserProps): JSX.Element {
    const [optionsProfiles, setOptionsProfiles] = useState<options[]>([] as options[]);
    const [optionsDisciplines, setOptionsDisciplines] = useState<options[]>([] as options[]);
    const { reset, control, watch, register, setValue, handleSubmit, formState: { errors } } = useForm();
    const animatedComponents = makeAnimated();
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const loadOptionsProfiles = async () => {
        try {
            const resp = await api.get('api/profiles/options/select',{
                params: {
                    typeUser: edit?.typeUser
                }
            });
            setOptionsProfiles(resp.data);
            if(edit?.profilesIds) setValue('profiles', resp.data.filter((item:options) => watch('profilesIds')?.includes(item.value))||[]);
            
        } catch (error:any) {
            if(error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);
        }
    }

    const loadOptionsDisciplines = async () => {
        try {
            const resp = await api.get('api/disciplines/options/select');
            setOptionsDisciplines(resp.data);
        } catch (error:any) {
            if(error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);
        }
    }

    useEffect(() => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches)
            setIsDarkMode(true);
        else
            setIsDarkMode(false);
    }, []);

    useEffect(() => {
        loadOptionsProfiles();
        loadOptionsDisciplines();
        reset(edit);
    }, [edit]);
    
    return (
        <form id='formUser' onSubmit={handleSubmit(onSave)}>
            <div className="w-screen">
                <Card.Root styles="gap-y-6">
                    <div className="w-full md:w-1/4 px-2 aria-selected:md:w-1/4"
                        aria-selected={watch('typeUser') === TypeUser.Aluno}
                    >
                        <Input 
                            id="ru"
                            type="text"
                            label="Registro Universitário"
                            placeholder="Insira o RU"
                            className="read-only:bg-slate-200 read-only:cursor-default"
                            {...register("ru")}
                            error={errors.ru}
                            readOnly={!isPermissionWrite}
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-2 aria-selected:md:w-1/2"
                        aria-selected={watch('typeUser') === TypeUser.Aluno}
                    >
                        <Input 
                            id="name"
                            type="text"
                            label="Nome"
                            placeholder="Insira o nome"
                            className="read-only:bg-slate-200 read-only:cursor-default"
                            {...register("name")}
                            error={errors.name}
                            readOnly={!isPermissionWrite}
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-2 aria-selected:md:w-1/4"
                     aria-selected={watch('typeUser') === TypeUser.Aluno}
                    >
                        <Input 
                            id="email"
                            type="text"
                            label="E-mail"
                            placeholder="Insira o email"
                            className="read-only:bg-slate-200 read-only:cursor-default"
                            {...register("email")}
                            error={errors.email}
                            readOnly={!isPermissionWrite}
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-2 aria-hidden:hidden"
                        aria-hidden={watch('typeUser') === TypeUser.Aluno}
                    >
                        <Input 
                            id="cro"
                            type="text"
                            label="CRO"
                            placeholder="Insira o CRO"
                            className="read-only:bg-slate-200 read-only:cursor-default"
                            {...register("cro")}
                            error={errors.cro}
                            readOnly={!isPermissionWrite}
                        />
                    </div>

                    <div className="w-1/2 px-2">
                        {/* <label className="pl-4 text-sm font-medium leading-tight text-slate-700 dark:text-white">Perfis</label> */}
                        <label className={`pl-4 text-sm font-medium leading-tight text-slate-700 dark:text-white`}>{isDarkMode ? "true" : "false"}</label>
                        <Controller
                            name="profiles"
                            control={control}
                            render={({field})=>(
                                <ReactSelect
                                    isMulti
                                    options={optionsProfiles}
                                    value={field.value}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    onChange={(e)=> field.onChange(e)}
                                    isDisabled={!isPermissionWrite}
                                    placeholder={watch('typeUser') === undefined && "Selecione os perfis"}
                                    styles={reactSelectStyle(watch('typeUser') === undefined, isDarkMode)}
                                />
                            )}
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        <label className="pl-4 text-sm font-medium leading-tight text-slate-700 dark:text-white">Disciplinas</label>
                        <Controller
                            name="disciplines"
                            control={control}
                            render={({field})=>(
                                <ReactSelect
                                    isMulti
                                    options={optionsDisciplines}
                                    value={field.value}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    onChange={(e)=> field.onChange(e)}
                                    isDisabled={!isPermissionWrite}
                                    placeholder={watch('typeUser') === undefined && "Selecione as disciplinas"}
                                    styles={reactSelectStyle(watch('typeUser') === undefined, isDarkMode)}
                                />
                            )}
                        />
                    </div>
                    
                    <Table.Root style="mx-2" label="Pacientes">
                        <Table.Header>
                            <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                            <Table.CellHeader hiddenInMobile={true}>E-MAIL</Table.CellHeader>
                            <Table.CellHeader hiddenInMobile={true}>REGISTRO UNIVERSITÁRIO</Table.CellHeader>
                        </Table.Header>

                        <Table.Body tableHeight={String(6)} rowNumber={0}>
                        </Table.Body>
                    </Table.Root> 
                </Card.Root>
            </div> 
        </form>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();