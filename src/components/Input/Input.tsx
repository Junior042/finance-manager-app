import React from "react";

const Input = ({
    registerValue,
    objNameValueInput,
    placeHolder
}: any) => {
    return (
        <>
            <input type="text" placeholder={placeHolder} {...registerValue(objNameValueInput)}/>
        </>
    );
}

export default Input;