import React from "react";
import './RegisterStyle.css';
import { Input } from '../../components';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });

    const onSubmit = (data:any) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input registerValue={register} objNameValueInput={'nomeUsuario'} placeHolder={"Nome Usuário"}/>
                <Input registerValue={register} objNameValueInput={'cpf'} placeHolder={"cpf"}/>
                <Input registerValue={register} objNameValueInput={'telefone'} placeHolder={"14999999999"}/>
                <Input registerValue={register} objNameValueInput={'email'} placeHolder={"exemplo@gmail.com"}/>
                <Input registerValue={register} objNameValueInput={'senha'} placeHolder={"Digite sua senha..."}/>
                
                <button type="submit">Enviar</button>
            </form>
        </>
    );
}

export default Register;