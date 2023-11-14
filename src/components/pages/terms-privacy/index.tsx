import { Input } from "@/components/elementTag/input";
import { TermPrivacy } from "@/pages/terms-privacy";
import { useForm } from "react-hook-form";

interface TermPrivacyFormProps {
    onSave: (data: any) => void;
    edit?: TermPrivacy
}

export default function TermsPrivacyForm({
    onSave,
    edit = {} as TermPrivacy
}:TermPrivacyFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <form className="flex flex-col gap-4 px-8" id='formTermPrivacy' onSubmit={handleSubmit(onSave)}>
            <div className="flex flex-col gap-4">
                <Input
                    label="Nome do termo"
                    type="text"
                    placeholder="Informe o nome do termo"
                    {...register("name", { required: true })}
                    error={errors.name}
                />
                <Input
                    label="Descrição"
                    type="text"
                    placeholder="Informe a descrição do termo"
                    className="h-20"
                    {...register("description", { required: true })}
                    error={errors.description}
                />
                <Input
                    label="Versão"
                    type="text"
                    placeholder="Informe a versão do termo"
                    {...register("version", { required: true })}
                    error={errors.version}
                />
            </div>
        </form>
    )
}