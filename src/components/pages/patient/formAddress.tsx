import { Input } from "@/components/elementTag/input";
import Modal from "@/components/modal";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi";
import * as yup from 'yup';

export const validationAddress = yup.object().shape({
    id: yup.string().optional(),
    name: yup.string().required('Campo obrigatório'),
    cep: yup.string().required('Campo obrigatório'),
    streetAddress: yup.string().required('Campo obrigatório'),
    number: yup.string().required('Campo obrigatório'),
    complement: yup.string().optional(),
    district: yup.string().required('Campo obrigatório'),
    city: yup.string().required('Campo obrigatório'),
    state: yup.string().required('Campo obrigatório'),
});

interface ModalAddressProps{
    isOpen: boolean;
    onClose: () => void;
    onSave:(data:any)=>void;
}

export default function FormAddress({isOpen, onClose, onSave} : ModalAddressProps): JSX.Element {
    const { control, register, reset, watch, handleSubmit, formState: { errors }  } = useForm({
        resolver: yupResolver(validationAddress)
    });
    
    useEffect(() => {
        reset({
            name: '',
            cep: '',
            streetAddress: '',
            number: '',
            complement: '',
            district: '',
            city: '',
            state: '',
        });
    }, [isOpen]);

    const updateHandleSubmit = async (data: any) => {
        onClose();
        onSave(data);
    };

    return (
        <Modal.Root
            isOpen={isOpen}
            onClose={onClose}
            width="md:max-w-lg"
        >
            <Modal.Header title={"Cadastrar Endereço"} icon={HiOutlinePlus}/>
            <Modal.Body>
                <form id='formAddress' className="w-full space-y-4 flex flex-wrap" onSubmit={handleSubmit(updateHandleSubmit)}>
                    <div className="w-full px-2">
                        <Input 
                            required
                            id="name"
                            type="text"
                            label="Nome do endereço"
                            placeholder="Insira um nome para o endereço"
                            className="read-only:bg-slate-200 read-only:cursor-default"
                            autoComplete="new-password"
                            {...register("name")}
                            error={errors.name}
                        />
                    </div>
                    <div className="w-full px-2">
                        <Input 
                            required
                            id="streetAddress"
                            type="text"
                            label="Rua"
                            className="w-full"
                            placeholder="Insira a rua"
                            {...register("streetAddress")}
                            error={errors.streetAddress}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <Input 
                            required
                            id="number"
                            type="text"
                            label="Número"
                            className="w-full"
                            placeholder="Insira o número"
                            {...register("number")}
                            error={errors.number}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <Input 
                            required
                            id="cep"
                            type="text"
                            label="CEP"
                            className="w-full"
                            placeholder="Insira o CEP"
                            {...register("cep")}
                            error={errors.cep}
                        />
                    </div>
                    <div className="w-full px-2">
                        <Input 
                            id="complement"
                            type="text"
                            label="Complemento"
                            className="w-full"
                            placeholder="Insira o complemento"
                            {...register("complement")}
                            error={errors.complement}
                        />
                    </div>
                    <div className="w-full px-2">
                        <Input 
                            required
                            id="district"
                            type="text"
                            label="Bairro"
                            className="w-full"
                            placeholder="Insira o bairro"
                            {...register("district")}
                            error={errors.district}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <Input 
                            required
                            id="city"
                            type="text"
                            label="Cidade"
                            className="w-full"
                            placeholder="Insira a cidade"
                            {...register("city")}
                            error={errors.city}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <Input 
                            required
                            id="state"
                            type="text"
                            label="Estado"
                            className="w-full"
                            placeholder="Insira a cidade"
                            {...register("state")}
                            error={errors.state}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer
                onClose={onClose}
                form="formAddress"
            />
        </Modal.Root>
    )     
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();