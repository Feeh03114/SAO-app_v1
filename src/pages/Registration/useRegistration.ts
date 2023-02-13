import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export function useRegistration(){

    const [currentStep, setCurrentStep] = useState(1);
        const SchemaRegistrationPatient = yup.object({
        dateOfBirth: yup.date().required("Por favor, Informe sua data de nascimento"),
        firstname:yup.date().required("Por favor, Informe o seu primeiro nome"),
        secondName:yup.date().required("Por favor, Informe o seu sobrenome"),
        cpf:yup.date().required("Por favor, Informe o seu CPF"),
        gender:yup.string().required("Por favor, informe o seu genero").notOneOf(['null'],"Por favor, selecione uma opção"),
        ethnicity:yup.string().required("Por favor, informe a sua etinia").notOneOf(['null'],"Por favor, selecione uma opção"),
        email:yup.date().required("Por favor, Informe um e-mail valido"),
        phone:yup.date().required("Por favor, Informe o seu numero de telefone para contato"),
        occupation:yup.string().required("Por favor, informe a sua Profissão").notOneOf(['null'],"Por favor, selecione uma opção"),
        nationality:yup.string().required("Por favor, informe a sua nacionalidade").notOneOf(['null'],"Por favor, selecione uma opção"),
        naturalness:yup.string().required("Por favor, informe a sua naturalidade").notOneOf(['null'],"Por favor, selecione uma opção"),
        cep:yup.string().required("Por favor, informe o seu CEP de residencia").notOneOf(['null'],"Por favor, insira o seu CEP"),
        neighborhood:yup.string().required("Por favor, informe o seu bairro").notOneOf(['null'],"Por favor, insira o nome do seu bairro"),
        uf:yup.string().required("Por favor, informe o UF").notOneOf(['null'],"Por favor, selecione uma opção"),
        address:yup.string().required("Por favor, informe um endereço valido"),
        number:yup.string().required("Por favor, informe o numero de sua residencia"),
        complement:yup.string().required("Por favor, informe um complemento, caso necessario")
    });
        const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        } = useForm({
        resolver: yupResolver(SchemaRegistrationPatient),
    });

        function SendPacient(e:any){
        console.log('recebendo paciente', e);
    }

        const handleNextStep = async () => {
      //const valid = await SchemaRegistrationPatient.isValid();
        setCurrentStep(currentStep + 1);
    };

        const handleBckStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return{
        register,
        handleSubmit,
        errors,
        watch,
        SendPacient,
        handleNextStep,
        handleBckStep,
        currentStep
    }
}