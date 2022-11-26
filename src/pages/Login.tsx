import React from "react";
import { Input } from '../components';
import { SubmitHandler, useForm } from 'react-hook-form';
import '../index.css';

type FormValuesLogin = {
    cpf: string;
    email: string;
    senha: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormValuesLogin>({ shouldUseNativeValidation: true });

    const onSubmit:SubmitHandler<FormValuesLogin> = (data) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[340px] m-auto">
                <div className="flex flex-col gap-3">
                    <Input registerValue={register} objNameValueInput={'cpf'} placeHolder={"cpf"} typeInput={'text'} maxValues={'11'}/>
                    
                    <Input registerValue={register} objNameValueInput={'email'} placeHolder={"exemplo@gmail.com"} typeInput={'email'} maxValues={'100'}/>
                    
                    <Input registerValue={register} objNameValueInput={'senha'} placeHolder={"Digite sua senha..."} typeInput={'password'} maxValues={'20'}/>
                </div>
                
                <button type="submit" className="btn my-4">Enviar</button>
                <p className=" text-white">Não tem uma conta? <a href="/" className="text-violet-400">Registre-se já!</a></p>
            </form>
        </>
    );
}

export default Login;