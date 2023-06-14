import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export function useRegistration(){
    const [currentStep, setCurrentStep] = useState(1);
    const [isStepValid, setIsStepValid] = useState(false);
    const progress = [1, 2, 3, 4];

    function ValidCPF(value:string): boolean{
        let sum = 0;
        let rest;
        let i;
        if (value === '00000000000') {
            return false;
        }
        for (i = 1; i <= 9; i++) {
          sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
        }
        rest = (sum * 10) % 11;
        if ((rest === 10) || (rest === 11)) {
            rest = 0;
        }
        if (rest !== parseInt(value.substring(9, 10))) {
            return false;
        }
        sum = 0;
        for (i = 1; i <= 10; i++) {
          sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
        }
        rest = (sum * 10) % 11;
        if ((rest === 10) || (rest === 11)) {
            rest = 0;
        }
        if (rest !== parseInt(value.substring(10, 11))) {
            return false;
        }
        return true;
    }


    const SchemaRegistrationPatient1 = yup.object({
        dateOfBirth: yup.date().required("Por favor, Informe sua data de nascimento"),
    })

    const SchemaRegistrationPatient2 = yup.object({
        firstname:yup.string().required("Por favor, Informe o seu primeiro nome"),
        secondName:yup.string().required("Por favor, Informe o seu sobrenome"),
        cpf:yup.string().required("Por favor, Informe o seu CPF").test('cpf', 'CPF inválido', ValidCPF),
        gender:yup.string().required("Por favor, informe o seu genero").notOneOf(['null'],"Por favor, selecione uma opção"),
        ethnicity:yup.string().required("Por favor, informe a sua etinia").notOneOf(['null'],"Por favor, selecione uma opção"),
        email:yup.string().email('Endereço de e-mail inválido').required("Por favor, Informe um e-mail valido"),
    });

    //informacoes do responsavel
    const SchemaRegistrationResponsel = yup.object({
        firstnameResponsavel:yup.date().required("Por favor, Informe o seu primeiro nome"),
        secondNamResponsavel:yup.date().required("Por favor, Informe o seu sobrenome"),
        cpfResponsavel:yup.string().required("Por favor, Informe o seu CPF").test('cpf', 'CPF inválido', ValidCPF),
        genderResponsavel:yup.string().required("Por favor, informe o seu genero").notOneOf(['null'],"Por favor, selecione uma opção"),
        ethnicityResponsavel:yup.string().required("Por favor, informe a sua etinia").notOneOf(['null'],"Por favor, selecione uma opção"),
        emailResponsavel:yup.string().email('Endereço de e-mail inválido').required("Por favor, Informe um e-mail valido"),
    });

    const SchemaRegistrationPatient3 = yup.object({
        phone:yup.date().required("Por favor, Informe o seu numero de telefone para contato"),
        occupation:yup.string().required("Por favor, informe a sua Profissão").notOneOf(['null'],"Por favor, selecione uma opção"),
        nationality:yup.string().required("Por favor, informe a sua nacionalidade").notOneOf(['null'],"Por favor, selecione uma opção"),
        naturalness:yup.string().required("Por favor, informe a sua naturalidade").notOneOf(['null'],"Por favor, selecione uma opção"),
    });
    const SchemaRegistrationPatient4 = yup.object({
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
        resolver: yupResolver(currentStep === 1? SchemaRegistrationPatient1: currentStep === 2? SchemaRegistrationPatient2: currentStep === 3 ? SchemaRegistrationPatient3: SchemaRegistrationPatient4),
    });

    function SendPacient(e:any){
        console.log('recebendo paciente', e);
    }

    const handleNextStep = async () => {
        if (isStepValid) {
            setCurrentStep(currentStep + 1);
            setIsStepValid(false);
        }
    };

    const handleBckStep = () => {
        setCurrentStep(currentStep - 1);
        setIsStepValid(false);
    };

    useEffect(() => {
        let isCurrentStepValid = false;
        switch(currentStep){
            case 1:
                isCurrentStepValid = !errors.dateOfBirth;
                break;
            case 2:
                isCurrentStepValid = !errors.firstname &&
                !errors.secondName && !errors.cpf &&
                !errors.gender && !errors.ethnicity &&
                !errors.email;
                break;
            case 3:
                isCurrentStepValid = !errors.phone &&
                !errors.occupation && !errors.nationality &&
                !errors.naturalness;
                break;
            case 4:
                isCurrentStepValid = !errors.cep &&
                !errors.neighborhood && !errors.uf &&
                !errors.address && !errors.number &&
                !errors.complement;
                break;
    }
        setIsStepValid(isCurrentStepValid);
      }, [errors, currentStep]);

    return{
        register,
        handleSubmit,
        errors,
        watch,
        SendPacient,
        handleNextStep,
        handleBckStep,
        currentStep,
        progress
    }
}