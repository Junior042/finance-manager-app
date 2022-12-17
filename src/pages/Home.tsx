import React, { useState } from "react";
import ModalNewDeposit from './ModalNewDeposit';
import ModalNewExpense from "./ModalNewExpense";
import ModalNewFontExpense from './ModalNewFontExpense';
const data = [
    {
        name: "Energia",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "deposito",
    },
    {
        name: "Energia 2",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "retirado",
    },
    {
        name: "Energia 3",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "retirado",
    },
    {
        name: "Energia",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "deposito",
    },
    {
        name: "Energia 2",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "retirado",
    },
    {
        name: "Energia 3",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "retirado",
    },
    {
        name: "Energia",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "deposito",
    },
    {
        name: "Energia 2",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "retirado",
    },
    {
        name: "Energia 3",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "retirado",
    },
    {
        name: "Energia",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "deposito",
    },
    {
        name: "Energia 2",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "retirado",
    },
    {
        name: "Energia 3",
        createdAt: "Jan 30, 2022",
        value: "160.00",
        typePayment: "retirado",
    },
];

const Home = () => {
    const [ statusModal, setModal ] = useState(false);
    const [ statusModalNewFontExpense, setModalNewFontExpense ] = useState(false);
    const [ statusModalNewExpense, setModalNewExpense ] = useState(false);

    const displayValue = (data:any) => {
        if(data.typePayment === "deposito"){
            return (
                <p className="mr-1 text-xl font-semibold text-green-500">
                    + {data.value}
                </p>
            )
        }
        return (
            <p className="mr-1 text-xl font-semibold text-red-500">
                - {data.value}
            </p>
        )
    }

    return (
        <>
            <header className="flex justify-between items-center">
                <span className="flex  gap-3">
                    <h1 className="text-3xl font-bold">Despesas</h1>
                    <button className="btn" onClick={() => setModalNewExpense(true)}>+ Add New</button>
                    <button className="btn" onClick={() => setModal(true)}>New Deposit</button>
                </span>
                <div className="flex gap-4">
                    <span>
                        <p className="font-bold">
                            Saldo:{" "}
                            <span className="text-green-400">R$: 3.900,90</span>
                        </p>
                    </span>
                    <span>
                        <p className="font-semibold">
                            Total já depositado:{" "}
                            <span className="text-green-400">
                                R$: 10.949,00
                            </span>
                        </p>
                    </span>
                </div>
            </header>
            <main className="grid justify-between grid-cols-[minmax(300px,_1fr)_1fr_1fr] mt-28">
                <aside className="bg-[#e3e8ed] max-w-xs min-h-[340px] text-start px-[30px] py-[8px] col-span-1">
                    <header className="text-xl font-bold text-black">
                        <p>Fonte das Despesas</p>
                    </header>
                    <ul>
                        <li className="text-lg font-bold text-black">Casa</li>
                        <li className="text-lg text-black">Entreterimento</li>
                    </ul>
                    <button className="btn-no-border" onClick={() => setModalNewFontExpense(true)}>+ Add New</button>
                </aside>
                <section className="bg-[#e3e8ed] col-start-2 col-end-4 text-black">
                    <header className="bg-[#ced8e0] flex justify-between px-7 py-1">
                        <div>
                            <input
                                type="text"
                                placeholder="Pesquisar Despesa..."
                                className="h-full rounded-md border-gray-400 border-2 bg-white px-2 placeholder:font-semibold placeholder:opacity-[.6]"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button className="btn-full">Tudo</button>
                            <button className="btn-full" disabled={true}>
                                Pendente
                            </button>
                        </div>
                    </header>
                    <section className="max-h-80 overflow-y-scroll">
                    {data.map((data, index) => {
                        return (
                            <article key={index} className="bg-white flex justify-between items-center m-2 px-5">
                                <div className="text-left">
                                    <p className="text-lg">{data.name}</p>
                                    <p className="text-sm font-bold text-[#788896]">
                                        {data.createdAt}
                                    </p>
                                </div>
                                {displayValue(data)}
                            </article>
                        );
                    })}
                    </section>
                </section>
            </main>
            
            <ModalNewDeposit statusModal={statusModal} setStatusModal={setModal}/>
            <ModalNewFontExpense statusModal={statusModalNewFontExpense} setStatusModal={setModalNewFontExpense}/>
            <ModalNewExpense statusModal={statusModalNewExpense} setStatusModal={setModalNewExpense}/>
        </>
    );
};

export default Home;
