import React from "react";
import "../../index.css";

const Input = ({ register, placeHolder, typeInput, maxValues, errorMessage }: any) => {
    return (
        <>
            <input
                type={typeInput}
                maxLength={maxValues}
                placeholder={placeHolder}
                {...register}
                className="px-2 py-2 text-black rounded-md border-gray-400 border-2 bg-white placeholder:font-semibold placeholder:opacity-[.6]"
            />
            <span>{errorMessage}</span>
        </>
    );
};

export default Input;
