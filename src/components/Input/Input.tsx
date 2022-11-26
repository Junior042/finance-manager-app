import React from "react";
import "../../index.css";

const Input = ({ registerValue, objNameValueInput, placeHolder, typeInput, maxValues }: any) => {
    return (
        <>
            <input
                type={typeInput}
                maxLength={maxValues}
                placeholder={placeHolder}
                {...registerValue(objNameValueInput, {maxLength: maxValues })}
                className="px-2 py-2 text-black rounded-md border-gray-400 border-2 bg-white placeholder:font-semibold placeholder:opacity-[.6]"
            />
        </>
    );
};

export default Input;
