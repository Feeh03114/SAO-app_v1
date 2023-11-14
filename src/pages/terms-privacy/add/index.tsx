import Header from "@/components/Header";
import TermsPrivacyForm from "@/components/pages/terms-privacy";
import api from "@/service/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { TermPrivacy } from "..";

export default function TermsPrivacyAdd() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit() {
        const form = document.getElementById('formTermPrivacy');
        form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }

    const onSave = async (data:TermPrivacy) => {
        setIsLoading(true);
        try {
            const resp = await api.post(`/api/profiles`, data);
            console.log(resp.data);
            toast.success('Termo cadastrado com sucesso!');
            router.back();
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }
    return(
        <>
            <Header 
                title="Criar termo de confiabilidade"
                subtitle="Consulte o termoo de confiabilidade cadastrado na plataforma"
                textLeft="Voltar"
                textRight="Salvar informações"
                onClickLeft={()=> router.back()}
                onClickRight={handleSubmit}
                typeButtonRight="confirm"
                disabledLeft={isLoading}
                disabledRight={isLoading}
            />
            <TermsPrivacyForm onSave={onSave}/>
        </>
    )
}