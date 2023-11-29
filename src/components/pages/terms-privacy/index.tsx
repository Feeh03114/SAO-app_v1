import { Input } from "@/components/elementTag/input";
import { TermPrivacy } from "@/pages/terms-privacy";
import { Controller, useForm } from "react-hook-form";

interface TermPrivacyFormProps {
    onSave: (data: any) => void;
    edit?: TermPrivacy
}

export default function TermsPrivacyForm({
    onSave,
    edit = {} as TermPrivacy
}:TermPrivacyFormProps) {
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    return (
        <form className="flex flex-col gap-4 px-8" id='formTermPrivacy' onSubmit={handleSubmit(onSave)}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-center">
                    <div className="basis-3/4">
                        <Input
                            label="Nome do termo"
                            type="text"
                            placeholder="Informe o nome do termo"
                            {...register("name", { required: true })}
                            error={errors.name}
                        />
                    </div>
                    <div className="basis-1/4">
                        <Input
                            label="Versão"
                            type="text"
                            className="basis-1/4"
                            placeholder="Informe a versão do termo"
                            {...register("version", { required: true })}
                            error={errors.version}
                        />
                    </div>
                    <Controller
                        name="status"
                        control={control}
                        defaultValue={edit.status || 'active'}
                        render={({ field }) => (
                            <div className="basis-1/4">
                                <br/>
                                <input
                                    type='checkbox'
                                    className="rounded disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                                    {...field}
                                />
                                <label className="ml-2 dark:text-gray-100">Padrão</label>
                            </div>
                        )}
                    />
                </div>
                
                <Input
                    label="Descrição"
                    type="text"
                    placeholder="Informe a descrição do termo"
                    className="h-20"
                    {...register("description", { required: true })}
                    error={errors.description}
                />

                <div className="flex flex-row gap-4 border border-solid border-gray-300">
                    <div className="h-full basis-4/6">
                       {/*  <Controller
                            name="term_html"
                            control={control}
                            defaultValue={edit?.term_html || ''}
                            render={({ field }) => (
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={field.value || ''}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        field.onChange(data);
                                    }}
                                />
                            )}
                        /> */}
                    </div>
                   <div className="flex flex-wrap">

                   </div>
                </div>
                
            </div>
        </form>
    )
}