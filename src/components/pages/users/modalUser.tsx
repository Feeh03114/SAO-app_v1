import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import Modal from "@/components/modal";
import { TypeUser } from "@/enum/typeUser.enum";
import api from "@/service/api";
import { reactSelectStyleDark, reactSelectStyleDisabledDark, reactSelectStyleDisabledLight, reactSelectStyleLight } from "@/styles/reactSelectStyle";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsFillPersonPlusFill } from "react-icons/bs";
import ReactSelect from "react-select";
import makeAnimated from 'react-select/animated';

interface ModalUserProps{
    isOpen: boolean;
    onClose: () => void;
}

export function ModalUser({ isOpen, onClose }: ModalUserProps) {
    const { control, watch, register, handleSubmit, formState: { errors }  } = useForm();
    const [profiles, setProfiles] = useState([]) as any[];
    const animatedComponents = makeAnimated();
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    const loadProfiles = async () => {
        try {
            const { data:RespAPI } = await api.get("api/profiles/options/select",
            {
                params: {
                    typeUser: watch('typeUser') === -1 ? undefined : watch('typeUser')
                }
            });
            setProfiles(RespAPI);
            console.log(RespAPI);
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        watch('typeUser') && loadProfiles();
    }, [watch('typeUser')]);

    return(
        <Modal.Root
            isOpen={isOpen}
            onClose={onClose}
            width="md:max-w-lg"
        >
            <Modal.Header title="Novo Usuário" icon={BsFillPersonPlusFill} />
            <Modal.Body>
                <div className="w-full">
                    <Select
                        className="w-full"
                        label="Tipo do usuário"
                        name="typeUser"
                        placeHolder={"Tipo do usuário"}
                        valueDefault={-1}
                        data={Object.keys(TypeUser)?.filter(x => +x).map((e) => {
                            return { id: e, name: TypeUser[+e] };
                        }) as any}
                        control={control as any} 
                    />
                </div>
              
                <div className="w-full">
                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Nome</label>
                    <Input 
                        id="name"
                        type="text"
                        className="w-full"
                        placeholder="Insira o nome"
                        {...register("name")}
                        error={errors.name}
                    />
                </div>
                <div className="w-full">
                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Registro Universitário</label>
                    <Input 
                        id="ru"
                        type="text"
                        className="w-full"
                        placeholder="Insira o RU"
                        {...register("ru")}
                        error={errors.ru}
                    />
                </div>
                <div className="w-full">
                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">E-mail</label>
                    <Input 
                        id="email"
                        type="text"
                        className="w-full"
                        placeholder="Insira o e-mail"
                        {...register("email")}
                        error={errors.email}
                    />
                </div>
                <div className="w-full">
                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">CRO</label>
                    <Input 
                        id="cro"
                        type="text"
                        className="w-full"
                        placeholder="Insira o CRO"
                        {...register("cro")}
                        error={errors.cro}
                    />
                </div>
                <div className="w-full">
                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Perfis</label>
                    <Controller
                        name="profiles"
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
                                styles={(watch('typeUser') === undefined && isDarkMode)
                                    ? reactSelectStyleDisabledDark 
                                    : (watch('typeUser') === undefined && !isDarkMode)
                                        ? reactSelectStyleDisabledLight
                                        : (watch('typeUser') != undefined && isDarkMode)
                                            ? reactSelectStyleDark
                                            : reactSelectStyleLight
                                }
                            />
                        )}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer
                onClose={onClose}
            />
        </Modal.Root>
    )
}