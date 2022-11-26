import React from "react";
import './RegisterStyle.css';
import { Input } from '../../components';
import { SubmitHandler, useForm } from 'react-hook-form';
import '../../index.css';

type FormValuesRegister = {
    nomeUsuario:  string;
    cpf: string;
    telefone: string;
    email: string;
    senha: string;
}

const Register = () => {
    const { register, handleSubmit } = useForm<FormValuesRegister>({ shouldUseNativeValidation: true });

    const onSubmit: SubmitHandler<FormValuesRegister> = (data) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[340px] m-auto">
                <div className="flex flex-col gap-3">
                    <Input registerValue={register} objNameValueInput={'nomeUsuario'} placeHolder={"Nome Usuário"} typeInput={'text'} maxValues={'100'}/>
                    
                    <Input registerValue={register} objNameValueInput={'cpf'} placeHolder={"cpf"} typeInput={'text'} maxValues={'11'}/>

                    <Input registerValue={register} objNameValueInput={'telefone'} placeHolder={"14999999999"} typeInput={'phone'} maxValues={'14'}/>
                    
                    <Input registerValue={register} objNameValueInput={'email'} placeHolder={"exemplo@gmail.com"} typeInput={'email'} maxValues={'100'}/>
                    
                    <Input registerValue={register} objNameValueInput={'senha'} placeHolder={"Digite sua senha..."} typeInput={'password'} maxValues={'20'}/>
                </div>
                
                <button type="submit" className="btn my-4">Enviar</button>
                <p className=" text-white">Já tem uma conta? <a href="/login" className="text-violet-400">Faça login!</a></p>
            </form>
        </>
    );
}

export default Register;