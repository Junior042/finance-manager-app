import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Input } from "../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../index.css";

type FormValuesLogin = {
    cpf: string;
    email: string;
    senha: string;
};

const schema = yup.object({
    cpf: yup
        .string()
        .min(11, "Informe um numero de cpf válido")
        .test("cpf", "CPF inválido", (value: any) => {
            if (value && value.length < 14) {
                return true;
            }
            console.log(cpfValidator.isValid(value));

            return cpfValidator.isValid(value);
        }),
    email: yup
        .string()
        .required("Email é um campo obrigatório.")
        .email("Este email não é valido!"),
    senha: yup.string().min(4, "Minimo de 4 caracters."),
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValuesLogin>({
        shouldUseNativeValidation: true,
        resolver: yupResolver(schema),
    });

    const { signIn, signed } = useContext(AuthContext);

    const onSubmit: SubmitHandler<FormValuesLogin> = async (data) => {
        const dataSignIn = {
            email: data.email,
            password: data.senha,
        };

        await signIn(dataSignIn);
    };

    if (!signed) {
        return (
            <>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-[340px] m-auto"
                >
                    <div className="flex flex-col gap-3">
                        <Input
                            register={{ ...register("cpf") }}
                            placeHolder={"cpf"}
                            typeInput={"text"}
                            maxValues={"11"}
                            errorMessage={errors.cpf?.message}
                        />

                        <Input
                            register={{ ...register("email") }}
                            placeHolder={"exemplo@gmail.com"}
                            typeInput={"email"}
                            maxValues={"100"}
                            errorMessage={errors.email?.message}
                        />

                        <Input
                            register={{ ...register("senha") }}
                            placeHolder={"Digite sua senha..."}
                            typeInput={"password"}
                            maxValues={"20"}
                            errorMessage={errors.senha?.message}
                        />
                    </div>

                    <button type="submit" className="btn my-4">
                        Enviar
                    </button>
                    <p className=" text-white">
                        Não tem uma conta?{" "}
                        <a href="/" className="text-violet-400">
                            Registre-se já!
                        </a>
                    </p>
                </form>
            </>
        );
    } else {
        return <Navigate to="/home" />;
    }
};

export default Login;
