import React from "react";
import './RegisterStyle.css';
import { Input } from '../../components';
import { useForm } from 'react-hook-form';
import '../../index.css';

const Register = () => {
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });

    const onSubmit = (data:any) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[340px] m-auto">
                <div className="flex flex-col gap-3">
                    <Input registerValue={register} objNameValueInput={'nomeUsuario'} placeHolder={"Nome Usuário"}/>
                    <Input registerValue={register} objNameValueInput={'cpf'} placeHolder={"cpf"}/>
                    <Input registerValue={register} objNameValueInput={'telefone'} placeHolder={"14999999999"}/>
                    <Input registerValue={register} objNameValueInput={'email'} placeHolder={"exemplo@gmail.com"}/>
                    <Input registerValue={register} objNameValueInput={'senha'} placeHolder={"Digite sua senha..."}/>
                </div>
                
                <button type="submit" className="btn my-4">Enviar</button>
                <p className=" text-white">Já tem uma conta? <a href="#" className="text-violet-400">Faça login!</a></p>
            </form>
        </>
    );
}

export default Register;