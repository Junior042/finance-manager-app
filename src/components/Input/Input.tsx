import React from "react";
import "../../index.css";

const Input = ({ register, placeHolder, typeInput, maxValues, errorMessage }: any) => {
    return (
        <div className="w-full flex flex-col items-start">
            <input
                type={typeInput}
                maxLength={maxValues}
                placeholder={placeHolder}
                {...register}
                className="w-full px-2 py-2 text-black rounded-md border-gray-400 border-2 bg-white placeholder:font-semibold placeholder:opacity-[.6]"
            />
            <span className="mt-1 ml-1 text-xs text-violet-400">{errorMessage}</span>
        </div>
    );
};

export default Input;
