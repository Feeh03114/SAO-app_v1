import Table from "@/components/Table";
import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import { TypeUser } from "@/enum/typeUser.enum";
import { Profile } from "@/pages/profiles/edit/[id]";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import { PiListChecksFill } from "react-icons/pi";
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

const validationFullModal = yup.object().shape({
    id: yup.string().optional(),
    name: yup.string().required('Campo obrigatório'),
    typeUser: yup.number().required('Campo obrigatório'),
    default: yup.boolean().optional(),
    permissions: yup.array().of(schemaPermission).required('Campo obrigatório'),
});

interface FormProfileProps {
    edit?: Profile;
    isPermissionWrite?: boolean;
    onSave:(data:any)=>void;
}

export default function FormProfile({edit, isPermissionWrite=true, onSave}:FormProfileProps): JSX.Element {
    const { reset, control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationFullModal)
    });
    const {fields, update} = useFieldArray({ control, name: 'permissions', keyName: 'permissions.page.id' });

    const loadingPages = async () =>{
        try {
            const resp = await api.get('api/pages');
            if(edit){
                const permissions = [];
                for (const page of resp.data) {
                    const permission = edit.permissions.find((p:any)=>p.page.id === page.id);
                    if(!permission) continue;
                    permissions.push({
                        page: page, 
                        isRead: permission?.isRead || false, 
                        isCreate: permission?.isCreate || false,
                        isEdit: permission?.isEdit || false,
                        isDelete: permission?.isDelete || false,
                        filter: permission?.filter || false
                    });
                }

                reset({
                    ...edit,
                    permissions,
                })
            }
            else
                reset({
                    name: '',
                    typeUser: -1,
                    default: false,
                    permissions: resp.data.map((e:any)=>{
                        return {
                            page: e, 
                            isRead: false, 
                            isCreate: false, 
                            isEdit: false, 
                            isDelete: false, 
                            filter: false
                        }
                    }),
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadingPages();
    }, [edit]);

    return (
        <form id='formProfile' onSubmit={handleSubmit(onSave)}>
            <div className="w-full px-8">
                <div className="w-full p-6 flex flex-row flex-wrap shadow-sm border rounded-lg border-slate-300 dark:border-slate-500 dark:bg-slate-800">
                    <div className="w-full md:w-1/2 px-2">
                        <Input
                            required
                            id="nomePerfil"
                            type="text"
                            label="Nome do Perfil"
                            placeholder="Insira o perfil"
                            className="read-only:bg-slate-200 read-only:cursor-default"
                            {...register("name")}
                            error={errors.name}
                            readOnly={!isPermissionWrite}
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-2">
                        <Select
                            required
                            label="Tipo do usuário"
                            name="typeUser"
                            disabled={!isPermissionWrite}
                            placeHolder={"Tipo do usuário"}
                            valueDefault={-1}
                            data={
                                Object.keys(TypeUser)?.filter(x=>+x).map((e)=>{
                                    return {id: e, name: TypeUser[+e]}
                                }) as any
                            }
                            control={control as any}
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-2 mt-4 md:mt-0">
                        <label className="pl-4 text-sm font-medium leading-tight truncate text-slate-700 dark:text-white">Padrão para um novo usuário?</label>
                        <div id="pagante" className="mt-2 col-span-2">
                            <Controller
                                name='default'
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <label className="ml-4 truncate">
                                        <input
                                            disabled={!isPermissionWrite}
                                            id="defaultProfile"
                                            type="radio" 
                                            name="type"
                                            className="text-teal-400 mr-2 cursor-pointer disabled:cursor-default"
                                            checked={field.value}
                                            onChange={(e)=>field.onChange(e.target.checked)}
                                        />
                                        <span className="dark:text-white">Padrão</span>
                                    </label>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mt-8 px-8">
                <div className="w-full py-6 flex flex-row flex-wrap shadow-sm border-t border-slate-300 dark:border-slate-500">
                    <div className='text-start'>
                        <p className="text-sm md:text-2xl font-bold leading-loose text-slate-900 dark:text-white">Página do Perfil</p>
                        <p className="text-xs leading-none text-slate-400">Confira as páginas do perfil</p>
                    </div>
                    <Table.Root tableHeight={String(fields.length)} style="mt-8">
                        <Table.Header style="hidden">
                            <Table.CellHeader style="text-center">PÁGINA</Table.CellHeader>
                            <Table.CellHeader style="text-center">VIZUALIZAÇÃO</Table.CellHeader>
                            <Table.CellHeader style="text-center">CRIAÇÃO</Table.CellHeader>
                            <Table.CellHeader style="text-center">EDIÇÃO</Table.CellHeader>
                            <Table.CellHeader style="text-center">DELETAR</Table.CellHeader>
                            <Table.CellHeader style="text-center">TODOS</Table.CellHeader>
                            {/* <Table.CellHeader>PERSONALIZAVEIS</Table.CellHeader> */}
                        </Table.Header>

                        <Table.Body tableHeight={String(fields.length)} rowNumber={fields.length}>
                            {fields.map((item: any, index) => (
                                <Table.Row key={index} style="flex">
                                    <Table.CellBody>{item.page.namePage}</Table.CellBody>
                                    <Table.CellBody style="w-full h-full md:pl-0">
                                        <div className="flex justify-center items-center">
                                            <button
                                                type="button" 
                                                className="w-9 h-9 border dark:border-slate-500 rounded-md cursor-pointer flex justify-center items-center"
                                                onClick={()=>update(index, 
                                                    { 
                                                        ...item,
                                                        isRead: !item.isRead,
                                                        isCreate: !item.isRead === false ? false : item.isCreate,
                                                        isEdit: !item.isRead === false ? false : item.isEdit,
                                                        isDelete: !item.isRead === false ? false : item.isDelete,
                                                    })
                                                }
                                            >
                                                <HiOutlineCheckCircle  
                                                    className="w-5 h-5 text-teal-500 aria-hidden:hidden"
                                                    aria-hidden={!item.isRead}
                                                />
                                                <HiOutlineXCircle  
                                                    className="w-5 h-5 text-red-500 aria-hidden:hidden"
                                                    aria-hidden={item.isRead}
                                                />
                                            </button>
                                        </div>
                                        
                                    </Table.CellBody>
                                    <Table.CellBody style="w-full h-full md:pl-0">
                                        <div className="flex justify-center items-center">
                                            <button
                                                type="button"
                                                className="w-9 h-9 border dark:border-slate-500 rounded-md cursor-pointer flex justify-center items-center"
                                                onClick={()=>update(index, 
                                                    { 
                                                        ...item, 
                                                        isRead: !item.isCreate? true : item.isRead,
                                                        isCreate: !item.isCreate 
                                                    })
                                                }
                                            >
                                                <HiOutlineCheckCircle  
                                                    className="w-5 h-5 text-teal-500 aria-hidden:hidden"
                                                    aria-hidden={!item.isCreate}
                                                />
                                                <HiOutlineXCircle  
                                                    className="w-5 h-5 text-red-500 aria-hidden:hidden"
                                                    aria-hidden={item.isCreate}
                                                />
                                            </button>
                                        </div>
                                    </Table.CellBody>
                                    <Table.CellBody style="w-full h-full md:pl-0">
                                        <div className="flex justify-center items-center">
                                            <button
                                                type="button"
                                                className="w-9 h-9 border dark:border-slate-500 rounded-md cursor-pointer flex justify-center items-center"
                                                onClick={()=>update(index, 
                                                    { 
                                                        ...item, 
                                                        isRead: !item.isEdit? true : item.isRead,
                                                        isEdit: !item.isEdit
                                                    })
                                                }
                                            >
                                                <HiOutlineCheckCircle  
                                                    className="w-5 h-5 text-teal-500 aria-hidden:hidden"
                                                    aria-hidden={!item.isEdit}
                                                />
                                                <HiOutlineXCircle  
                                                    className="w-5 h-5 text-red-500 aria-hidden:hidden"
                                                    aria-hidden={item.isEdit}
                                                />
                                            </button>
                                        </div>
                                    </Table.CellBody>
                                    <Table.CellBody style="w-full h-12 md:pl-0">
                                        <div className="flex justify-center items-center">
                                            <button
                                                type="button"
                                                className="w-9 h-9 border dark:border-slate-500 rounded-md cursor-pointer flex justify-center items-center"
                                                onClick={()=>update(index, 
                                                    { 
                                                        ...item, 
                                                        isRead: !item.isDelete? true: item.isRead,
                                                        isDelete: !item.isDelete
                                                    })
                                                }
                                            >
                                                <HiOutlineCheckCircle  
                                                    className="w-5 h-5 text-teal-500 aria-hidden:hidden"
                                                    aria-hidden={!item.isDelete}
                                                />
                                                <HiOutlineXCircle  
                                                    className="w-5 h-5 text-red-500 aria-hidden:hidden"
                                                    aria-hidden={item.isDelete}
                                                />
                                            </button>
                                        </div>
                                    </Table.CellBody>
                                    <Table.CellBody style="w-full h-12 md:pl-0 border-s-2">
                                        <div className="flex justify-center items-center">
                                            <button
                                                type="button"
                                                className="w-9 h-9 border dark:border-slate-500 rounded-md cursor-pointer flex justify-center items-center active:bg-teal-500"
                                                onClick={()=>update(index, 
                                                    { 
                                                        ...item,
                                                        isRead: item.isRead === true && item.isCreate === true && item.isEdit === true && item.isDelete === true ? false : true,
                                                        isCreate: item.isRead === true && item.isCreate === true && item.isEdit === true && item.isDelete === true ? false : true,
                                                        isEdit: item.isRead === true && item.isCreate === true && item.isEdit === true && item.isDelete === true ? false : true,
                                                        isDelete: item.isRead === true && item.isCreate === true && item.isEdit === true && item.isDelete === true ? false : true,
                                                    })
                                                }
                                            >
                                                <PiListChecksFill    
                                                    className="w-5 h-5 dark:text-slate-400 active:text-white"
                                                />
                                            </button>
                                        </div>
                                    </Table.CellBody>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root> 
                </div>
            </div>
        </form>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();