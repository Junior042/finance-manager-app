import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../components';
import { api } from '../../services/api';

type FormValue = {
    nameNewFontExpense: string;
};

export const useModalNewFontExpense = () => {
    const [statusModal, setStatusModal] = useState(false);

    const { register, handleSubmit } = useForm<FormValue>({
        shouldUseNativeValidation: true,
    });
    
    
    const Modal = ({ setStatusChanges, statusChanges }:any) => {

        const onSubmit: SubmitHandler<FormValue> = async (data: FormValue) => {
            if (!data.nameNewFontExpense) {
                alert("Preencha o campo corretamente!");
            }
            if (data.nameNewFontExpense.length > 1) {
                const newFontExpense = await api.post(
                    "/fontExpense/create",
                    {
                        name: data.nameNewFontExpense,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("@Auth:token"),
                        },
                    }
                );
    
                if (newFontExpense.status == 200) {
                    setStatusModal(false);
                    setStatusChanges(!statusChanges);
                } else {
                    alert(
                        "Erro! Infelismente esse serviço não pode ser acessado no momento. \nTente mais tarde!"
                    );
                    setStatusModal(false);
                    setStatusChanges(!statusChanges);
                }
            }
        };
    

        return (
            <div className="z-50 bg-glass absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                <div className="flex flex-col items-end bg-gray-200 w-[374px] p-2">
                    <p
                        className="text-black block mb-4 cursor-pointer"
                        onClick={() => setStatusModal(false)}
                    >
                        X
                    </p>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col w-full"
                    >
                        <Input
                            register={{ ...register("nameNewFontExpense") }}
                            placeHolder={"Fonte da despesa"}
                            typeInput={"text"}
                            maxValues={"100"}
                            errorMessage={null}
                        />
                        <button type="submit" className="btn my-4 mx-auto">
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return {
        ModalNewFontExpense: statusModal ? Modal : null,
        showModalNewFontExpense: () => setStatusModal(true)
    }
}