import React, { useContext } from "react";
import "./RegisterStyle.css";
import { Input } from "../../components";
import { SubmitHandler, useForm } from "react-hook-form";
import "../../index.css";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValuesRegister = {
    nomeUsuario: string;
    cpf: string;
    telefone: string;
    email: string;
    senha: string;
};

const schema = yup.object({
    nomeUsuario: yup.string().required("Nome de usuário é um campo obrigatório!"),
    cpf: yup
      .string()
      .min(11, 'Informe um numero de cpf válido')
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
    telefone: yup.string().min(8, 'Minimo 8 números').required('Telefone é um campo obrigatório.'),
    senha: yup.string().min(6, "Minimo de 6 caracters. Recomendamos minimo 8."),
});

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValuesRegister>({
        // shouldUseNativeValidation: true,
        resolver: yupResolver(schema),
    });

    const { signed } = useContext(AuthContext);

    const onSubmit: SubmitHandler<FormValuesRegister> = (data) => {
        console.log(data);
        console.log("Embreve será adcionada a logica de registrar-se");
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
                            register={{ ...register("nomeUsuario") }}
                            placeHolder={"Nome Usuário"}
                            typeInput={"text"}
                            maxValues={"100"}
                            errorMessage={errors.nomeUsuario?.message}
                        />

                        <Input
                            register={{ ...register("cpf") }}
                            placeHolder={"cpf"}
                            typeInput={"text"}
                            maxValues={"11"}
                            errorMessage={errors.cpf?.message}
                        />

                        <Input
                            register={{ ...register("telefone") }}
                            placeHolder={"14999999999"}
                            typeInput={"phone"}
                            maxValues={"14"}
                            errorMessage={errors.telefone?.message}
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
                        Já tem uma conta?{" "}
                        <a href="/login" className="text-violet-400">
                            Faça login!
                        </a>
                    </p>
                </form>
            </>
        );
    } else {
        return <Navigate to="/home" />;
    }
};

export default Register;
