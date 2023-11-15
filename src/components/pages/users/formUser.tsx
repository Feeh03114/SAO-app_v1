import Table from "@/components/Table";
import Card from "@/components/elementTag/cardText";
import { Input } from "@/components/elementTag/input";
import { User } from "@/pages/users/edit/[id]";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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

interface FormUserProps {
    edit?: User;
    isPermissionWrite?: boolean;
    onSave:(data:any)=>void;
    profiles: string[];
}

export default function FormUser({edit, isPermissionWrite=true, onSave, profiles}:FormUserProps): JSX.Element {
    const { reset, control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationFullModal)
    });
    const {fields, update} = useFieldArray({ control, name: 'permissions', keyName: 'permissions.page.id' });
    console.log(edit);

    const loadingPages = async () =>{
        try {
            console.log("Aqui 0");
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
                console.log("Aqui 1");
                reset({
                    ...edit,
                    name: "teste",
                    permissions,
                })
            }
            else
                console.log("Aqui 2");
                reset({
                    name: '',
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
        <form id='formUser' onSubmit={handleSubmit(onSave)}>
            <div className="w-screen">
                <Card.Root>
                    {/* <Card.Text label="Registro Universitário" text={user.ru} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="Nome" text={user.name} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="E-mail" text={user.email} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="CRO" text={user.cro} width="w-full md:w-1/4"></Card.Text> */}
                    <div className="w-full md:w-1/2 px-2">
                        <Input 
                            id="nomePerfil"
                            type="text"
                            label="Nome do Perfil"
                            placeholder="Insira o perfil"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            {...register("name")}
                            error={errors.name}
                            readOnly={!isPermissionWrite}
                        />
                    </div>

                    <Card.CardSelected label="Perfis" width="w-full md:w-1/2">
                        {profiles.map((profile, index) => (
                            <Card.TextSelected key={index} text={String(profile)}></Card.TextSelected>
                        ))}
                    </Card.CardSelected>

                    <Card.CardSelected label="Disciplinas" width="w-full md:w-1/2">
                    </Card.CardSelected>
                    
                    <Table.Root tableHeight={String(6)} style="mx-3" label="Pacientes">
                        <Table.Header>
                            <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                            <Table.CellHeader hiddenInMobile={true}>E-MAIL</Table.CellHeader>
                            <Table.CellHeader hiddenInMobile={true}>REGISTRO UNIVERSITÁRIO</Table.CellHeader>
                        </Table.Header>
                    </Table.Root> 
                </Card.Root>
            </div> 
        </form>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();