import { Input } from "@/components/elementTag/input";
import Modal from "@/components/modal";
import { Address } from "@/pages/patients";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePencilAlt } from "react-icons/hi";

interface ModalAddressProps{
    isOpen: boolean;
    onClose: () => void;
    address: Address;
    onSave:(data:any)=>void;
    onDelete:() => void;
}

export default function FormEditAddress({isOpen, onClose, address, onSave, onDelete} : ModalAddressProps): JSX.Element {
    const { control, register, reset, setValue, setFocus, handleSubmit, formState: { errors }  } = useForm({
        // resolver: yupResolver(validationAddress)
    });
    
    useEffect(() => {
        reset({
            name: address.name,
            cep: address.cep,
            streetAddress: address.streetAddress,
            number: address.number,
            complement: address.complement,
            district: address.district,
            city: address.city,
            state: address.state,
        });
    }, [isOpen]);

    const updateHandleSubmit = async (data: any) => {
        onClose();
        onSave(data);
    };

    const checkCEP  = (e: { target: { value: string; }; }) => {
        if (!e.target.value) return; 
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json()).then(data => {
            setValue('streetAddress', data.logradouro);
            setValue('district', data.bairro);
            setValue('city', data.localidade);
            setValue('state', data.uf);
            setFocus('number');
        })
        .catch((err) => console.log(err));;
    }

    return (
        <Modal.Root
            isOpen={isOpen}
            onClose={onClose}
            width="md:max-w-lg"
        >
            <Modal.Header title={"Editar Endereço"} icon={HiOutlinePencilAlt}/>
            <Modal.Body>
                <form id='formEditAddress' className="w-full space-y-4 flex flex-wrap" onSubmit={handleSubmit(updateHandleSubmit)}>
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
                            onBlur={checkCEP}
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
                onDelete={onDelete}
                form="formEditAddress"
                text="Atualizar"
            />
        </Modal.Root>
    )     
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();