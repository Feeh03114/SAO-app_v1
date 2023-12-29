import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import Modal from "@/components/modal";
import { TypeUser } from "@/enum/typeUser.enum";
import api from "@/service/api";
import { reactSelectStyle } from "@/styles/reactSelectStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsFillPersonPlusFill } from "react-icons/bs";
import ReactSelect from "react-select";
import makeAnimated from 'react-select/animated';
import { toast } from "react-toastify";
import * as yup from 'yup';

interface ModalUserProps{
    isOpen: boolean;
    onClose: () => void;
    loadData: () => void;
}

interface Option {
    value: number;
    label: string;
}

export interface User {
    name: string;
    email: string;
    typeUser: number;
    ru: string;
    profilesIds: string[];
    cro: string;
    active: boolean;
}

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

const option = yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required(),
});

const validationFullModal = yup.object().shape({
    typeUser: yup.number().required('Campo obrigatório'),
    name: yup.string().required('Campo obrigatório'),
    ru: yup.string().required('Campo obrigatório'),
    email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
    cro: yup.string().optional(),
    profilesIds: yup.array().of(option).required('Campo obrigatório'),
});

export function ModalUser({ isOpen, onClose, loadData }: ModalUserProps) {
    const { control, watch, register, handleSubmit, clearErrors, formState: { errors }  } = useForm({
        resolver: yupResolver(validationFullModal)
    });
    const [profiles, setProfiles] = useState<Option[]>([] as Option[]);
    const animatedComponents = makeAnimated();
    
    const loadProfiles = async () => {
        try {
            const { data:RespAPI } = await api.get("api/profiles/options/select",
            {
                params: {
                    typeUser: watch('typeUser') === -1 ? undefined : watch('typeUser')
                }
            });
            setProfiles(RespAPI);
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        watch('typeUser') && loadProfiles();
    }, [watch('typeUser')]);

    const onSave = async (data: any) => {
        const userData = data as User;
        userData.typeUser = Number(userData.typeUser);
        userData.profilesIds = userData.profilesIds?.map((e: any) => e?.value);
        userData.active = true;
        try {
            const resp = await api.post(`/api/users`, userData);
            toast.success('Usuário criado com sucesso!');
            onClose();
            clearErrors();
            await loadData();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Modal.Root
            isOpen={isOpen}
            onClose={() => {
                onClose();
                clearErrors();
            }}
            width="md:max-w-lg"
        >
            <Modal.Header title="Novo Usuário" icon={BsFillPersonPlusFill} />
            <Modal.Body>
                <form id='formUser' className="w-full space-y-4 flex flex-wrap" onSubmit={handleSubmit(onSave)}>
                    <div className="w-full">
                        <Select
                            required
                            className="w-full"
                            label="Tipo do usuário"
                            name="typeUser"
                            placeHolder={"Tipo do usuário"}
                            valueDefault={-1}
                            error={errors.typeUser}
                            data={Object.keys(TypeUser)?.filter(x => +x).map((e) => {
                                return { id: e, name: TypeUser[+e] };
                            }) as any}
                            control={control as any} 
                        />
                    </div>
                
                    <div className="w-full">
                        <Input
                            required
                            id="name"
                            type="text"
                            label="Nome"
                            className="w-full"
                            placeholder="Insira o nome"
                            {...register("name")}
                            error={errors.name}
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            required
                            id="ru"
                            type="text"
                            label="Registro Universitário"
                            className="w-full"
                            placeholder="Insira o RU"
                            {...register("ru")}
                            error={errors.ru}
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            required
                            id="email"
                            type="text"
                            label="E-mail"
                            className="w-full"
                            placeholder="Insira o e-mail"
                            {...register("email")}
                            error={errors.email}
                        />
                    </div>
                    <div className="w-full">
                        <Input 
                            id="cro"
                            type="text"
                            label="CRO"
                            className="w-full"
                            placeholder="Insira o CRO"
                            {...register("cro")}
                            error={errors.cro}
                        />
                    </div>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-slate-700 dark:text-white">Perfis<span className="text-red-500">*</span></label>
                        <Controller
                            name="profilesIds"
                            control={control}
                            render={({field})=>(
                                <ReactSelect
                                    isMulti
                                    options={profiles}
                                    value={field.value}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    onChange={(e)=> field.onChange(e)}
                                    isDisabled={watch('typeUser') === undefined}
                                    placeholder={watch('typeUser') === undefined ? 'Primeiro selecione o tipo de usuário' : "Selecione os perfis"}
                                    styles={reactSelectStyle(watch('typeUser') === undefined)}
                                />
                            )}
                        />
                        {!!errors.profilesIds && (
                            <p className="text-red-500 text-sm">{errors.profilesIds.message?.toString()}</p>
                        )}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer
                onClose={() => {
                    onClose();
                    clearErrors();
                }}
                form="formUser"
            />
        </Modal.Root>
    )
}