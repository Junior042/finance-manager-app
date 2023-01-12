import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components";
import { api } from "../services/api";

type FormValue = {
    nameNewExpense: string;
    totalPayable: string;
    decription: string;
};

const ModalNewExpense = ({
    statusModal,
    setStatusModal,
    setStatusChanges,
    statusChanges,
    fontExpense,
    handleReadExpenses,
}: any) => {
    const { register, handleSubmit, formState: {errors} } = useForm<FormValue>({
        shouldUseNativeValidation: true,
    });

    const onSubmit: SubmitHandler<FormValue> = async (data: FormValue) => {
        const totalPayable = data.totalPayable.replace(",", ".");

        const newExpense = await api.post(
            "/expense/create",
            {
                name: data.nameNewExpense,
                value: totalPayable,
                description: data.decription,
                fontExpenseId: fontExpense,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("@Auth:token"),
                },
            }
        );

        if (newExpense.status == 200) {
            handleReadExpenses(fontExpense);
            setStatusModal(false);
            setStatusChanges(!statusChanges);
        } else {
            alert(
                "Erro! Infelismente esse serviço não pode ser acessado no momento. \nTente mais tarde!"
            );
            setStatusModal(false);
            setStatusChanges(!statusChanges);
        }
    };

    if (!statusModal) return null;
    else {
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
                        className="flex flex-col w-full gap-3"
                    >
                        <Input
                            register={{ ...register("nameNewExpense") }}
                            placeHolder={"Nome da despesa"}
                            typeInput={"text"}
                            maxValues={"100"}
                        />
                        
                        <Input
                            register={{ ...register("totalPayable") }}
                            placeHolder={"Total a pagar"}
                            typeInput={"text"}
                            maxValues={"10"}
                        />
                        <Input
                            register={{ ...register("decription") }}
                            placeHolder={"Descrição"}
                            typeInput={"text"}
                            maxValues={"60"}
                        />
                        <button type="submit" className="btn my-4 mx-auto">
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        );
    }
};

export default ModalNewExpense;
