import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import { Installment } from "@/enum/installment.enum";
import { PaymentMethod } from "@/enum/paymentMethod.enum";
import { Patient } from "@/pages/patients";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';

const mock = [
    { id: 1, name: 'Exemplo 1' },
    { id: 2, name: 'Exemplo 2' },
    { id: 3, name: 'Exemplo 3' },
    { id: 4, name: 'Exemplo 4' },
    { id: 5, name: 'Exemplo 5' },
    { id: 6, name: 'Exemplo 6' },
    { id: 7, name: 'Exemplo 7' },
]

interface PaymentData {
    patientType: string;
    guardianName: string;
    name: string;
    cpf: string;
    rg: string;
    birthDate: string;
    phoneNumber: string;
    cellphone: string;
    email: string;
    cep: string;
    street: string;
    number: string;
    uf: string;
    district: string;
    complement: string;
    paymentMethod: string;
    installment: string;
    cardBrand: string;
    value: string;
    observation: string;
}

const validationPaymentData = yup.object().shape({
    patientType: yup.string().required('Campo obrigatório'),
    guardianName: yup.string().required('Campo obrigatório'),
    name: yup.string().required('Campo obrigatório'),
    cpf:yup.string().required('Campo obrigatório'),
    rg: yup.string().required('Campo obrigatório'),
    birthDate: yup.string().required('Campo obrigatório'),
    phoneNumber: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório'),
    cep: yup.string().required('Campo obrigatório'),
    street: yup.string().required('Campo obrigatório'),
    number: yup.string().required('Campo obrigatório'),
    uf: yup.string().required('Campo obrigatório'),
    district: yup.string().required('Campo obrigatório'),
    complement: yup.string().required('Campo obrigatório'),
    paymentMethod: yup.string().required('Campo obrigatório'),
    installment: yup.string().required('Campo obrigatório'),
    cardBrand: yup.string().required('Campo obrigatório'),
    value: yup.string().required('Campo obrigatório'),
    observation: yup.string().required('Campo obrigatório'),
});

export interface Option {
    value: number;
    label: string;
}

interface FormPatientProps {
    edit?: Patient;
    isPermissionWrite?: boolean;
    onSave:(data:any)=>void;
}

export default function FormPaymentData({ onSave }:FormPatientProps): JSX.Element {
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(validationPaymentData)
    });
    const paymentMethod = Object.values(PaymentMethod);
    const installment = Object.values(Installment);

    const onSaveFinance = async (data:any) => {
        console.log(data);
    }
    
    return (
        <form id="formFinance" onSubmit={handleSubmit(onSaveFinance)} className="w-full space-y-4 flex flex-wrap">
            <div className="w-full md:w-1/2 mt-4">
                <label className="pl-4 text-sm font-medium leading-tight text-slate-700 dark:text-white">Quem é o pagante</label>
                <div id="pagante" className="mt-2 col-span-2">
                    <Controller
                        name='patientType'
                        control={control}
                        defaultValue={'paciente'}
                        render={({ field }) => (
                            <div className="flex flex-row">
                                <label className="ml-4 truncate flex flex-row">
                                    <input 
                                        id="paciente"
                                        type="radio" 
                                        name="type"
                                        className="text-teal-400 mr-2"
                                        checked={field.value === 'paciente'}
                                        onChange={(e) => field.onChange(e.target.checked && 'paciente')}
                                    />
                                    <p className="text-white">O paciente</p>
                                </label>
                                <label className="ml-4 truncate flex flex-row">
                                    <input 
                                        id="guardiao"
                                        type="radio" 
                                        value="guardiao"
                                        name="type"
                                        className="text-teal-400 mr-2"
                                        checked={field.value === 'guardiao'}
                                        onChange={(e) => field.onChange(e.target.checked && 'guardiao')}
                                    />
                                <p className="text-white">O guardião</p>
                                </label>
                                <label className="ml-4 truncate flex flex-row">
                                    <input 
                                        id="outro"
                                        type="radio" 
                                        value="outro"
                                        name="type"
                                        className="text-teal-400 mr-2"
                                        checked={field.value === 'outro'}
                                        onChange={(e) => field.onChange(e.target.checked && 'outro')}
                                    />
                                <p className="text-white">Outro</p>
                                </label>
                            </div>
                        )}
                    />
                </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
                <Select 
                    label="Nome do guardião"
                    placeHolder="Selecione um guardião"
                    data={mock}
                    control={control} 
                    name="guardianName"
                    valueDefault={-1}
                    error={errors?.guardianName}
                />
            </div>

            <div className="w-full md:w-2/4 px-2">
                <Input 
                    id="name"
                    type="text"
                    label="Nome completo do pagante"
                    placeholder="Insira o nome completo"
                    {...register("name")}
                    error={errors.name}
                />
            </div>
            <div className="w-1/2 md:w-1/4 px-2">
                <Input 
                    id="cpf"
                    type="text"
                    label="CPF"
                    placeholder="Insira o CPF"
                    {...register("cpf")}
                    error={errors.cpf}
                />
            </div>
            <div className="w-1/2 md:w-1/4 px-2">
                <Input 
                    id="rg"
                    type="text"
                    label="RG"
                    placeholder="Insira o RG"
                    {...register("rg")}
                    error={errors.rg}
                />
            </div>

            <div className="w-full md:w-1/4 px-2">
                <Input 
                    id="birthDate"
                    type="date"
                    label="Data de nascimento"
                    placeholder="dd/mm/aaaa"
                    {...register("birthDate")}
                    error={errors.birthDate}
                />
            </div>
            <div className="w-1/2 md:w-1/4 px-2">
                <Input 
                    id="phoneNumber"
                    type="text"
                    label="Celular"
                    placeholder="Insira o celular"
                    {...register("phoneNumber")}
                    error={errors.phoneNumber}
                />
            </div>
            <div className="w-1/2 md:w-1/4 px-2">
                <Input 
                    id="cellphone"
                    type="text"
                    label="Telefone"
                    placeholder="Insira o telefone"
                    {...register("cellphone")}
                    error={errors.cellphone}
                />
            </div>
            <div className="w-1/2 md:w-1/4 px-2">
                <Input 
                    id="email"
                    type="text"
                    label="E-mail"
                    placeholder="Insira o e-mail"
                    {...register("email")}
                    error={errors.email}
                />
            </div>

            <div className="w-1/2 md:w-1/4 px-2">
                <Input 
                    id="cep"
                    type="text"
                    label="CEP"
                    placeholder="Insira o CEP"
                    {...register("cep")}
                    error={errors.cep}
                />
            </div>
            <div className="w-full md:w-2/4 px-2">
                <Input 
                    id="street"
                    type="text"
                    label="Rua"
                    placeholder="Insira a rua"
                    {...register("street")}
                    error={errors.street}
                />
            </div>
            <div className="w-1/2 md:w-1/4 px-2">
                <Input 
                    id="number"
                    type="text"
                    label="Número"
                    placeholder="Insira o número"
                    {...register("number")}
                    error={errors.number}
                />
            </div>
            <div className="w-1/2 md:w-1/4 px-2">
                <Input 
                    id="uf"
                    type="text"
                    label="UF"
                    placeholder="Insira o uf"
                    {...register("uf")}
                    error={errors.uf}
                />
            </div>

            <div className="w-full md:w-1/4 px-2">
                <Input 
                    id="district"
                    type="text"
                    label="Bairro"
                    placeholder="Insira o bairro"
                    {...register("district")}
                    error={errors.district}
                />
            </div>
            <div className="w-full md:w-2/4 px-2">
                <Input 
                    id="complement"
                    type="text"
                    label="Complemento"
                    placeholder="Insira o complemento"
                    {...register("complement")}
                    error={errors.complement}
                />
            </div>

            <div className="w-full border-t border-slate-300 dark:border-slate-500"></div>

            <div className="w-full md:w-2/6 px-2">
                <Select
                    label="Forma de pagamento"
                    name="paymentMethod"
                    placeHolder={"Selecione um forma de pagamento"}
                    valueDefault={-1}
                    valueTypeName={true}
                    data={
                        paymentMethod.map((item, index) => ({
                            id: index,
                            name: item,
                        }))
                    }
                    control={control}
                    error={errors.paymentMethod}
                />
            </div>
            <div className="w-1/2 md:w-1/6 px-2">
                <Select
                    label="Parcelas"
                    name="installment"
                    placeHolder={"Selecione as parcelas"}
                    valueDefault={-1}
                    valueTypeName={true}
                    data={
                        installment.map((item, index) => ({
                            id: index,
                            name: item,
                        }))
                    }
                    control={control}
                    error={errors.installment}
                />
            </div>
            <div className="w-1/2 md:w-1/4 px-2">
                <Input 
                    id="cardBrand"
                    type="text"
                    label="Bandeira do cartão"
                    placeholder="Insira a bandeira do cartão"
                    {...register("cardBrand")}
                    error={errors.cardBrand}
                />
            </div>
            <div className="w-full md:w-1/4 px-2">
                <Input 
                    id="value"
                    type="text"
                    label="Valor"
                    placeholder="R$ 0,00"
                    {...register("value")}
                    error={errors.value}
                />
            </div>
            <div className="w-full md:w-1/4 px-2">
                <div className="w-full h-48 px-4 py-2 flex items-center justify-center text-sm shadow-sm border rounded-lg border-slate-300 dark:border-slate-500">
                    <svg className="w-24 h-24 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="100" height="101" viewBox="0 0 100 101" fill="none">
                        <path d="M33.3334 17.1667H25.0001C20.3977 17.1667 16.6667 20.8976 16.6667 25.5V75.5C16.6667 80.1024 20.3977 83.8333 25.0001 83.8333H75.0001C79.6025 83.8333 83.3334 80.1024 83.3334 75.5V25.5C83.3334 20.8976 79.6025 17.1667 75.0001 17.1667H66.6668M50.0001 13V46.3333M50.0001 46.3333L62.5001 33.8333M50.0001 46.3333L37.5001 33.8333M16.6667 54.6667H27.4409C28.5459 54.6667 29.6057 55.1057 30.3871 55.8871L40.4464 65.9463C41.2278 66.7277 42.2876 67.1667 43.3926 67.1667H56.6075C57.7126 67.1667 58.7724 66.7277 59.5538 65.9463L69.613 55.8871C70.3944 55.1057 71.4542 54.6667 72.5593 54.6667H83.3334" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="w-full md:w-3/4 px-2 flex items-center">
                <div className="w-full">
                    <label className="pl-4 text-sm font-medium leading-tight text-slate-700 dark:text-white">Observação</label>
                    <textarea 
                        id="observation"
                        className="w-full h-40 text-sm rounded-lg px-4 py-2 dark:bg-slate-700 dark:text-white shadow border border-slate-300 text-slate-900 placeholder-slate-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 resize-none"
                        placeholder="Descrever o que aconteceu com o paciente"
                        {...register("observation")}
                    />
                    {!!errors.observation && (
                        <p className="text-red-500 text-sm">{errors.observation.message?.toString()}</p>
                    )}
                </div>
            </div>
        </form>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();