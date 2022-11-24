import React from "react";
import "../../index.css";

const Input = ({ registerValue, objNameValueInput, placeHolder }: any) => {
    return (
        <>
            <input
                type="text"
                placeholder={placeHolder}
                {...registerValue(objNameValueInput)}
                className="px-2 py-2 text-black rounded-md border-gray-400 border-2 bg-white px-2 placeholder:font-semibold placeholder:opacity-[.6]"
            />
        </>
    );
};

export default Input;
