import React, { useContext, useEffect, useState } from "react";
import ModalNewDeposit from "./ModalNewDeposit";
import ModalNewExpense from "./ModalNewExpense";
import ModalNewFontExpense from "./ModalNewFontExpense";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext"; 
import { getDataUser } from "../services/jwtFuncs";
import jwt from "jsonwebtoken";

interface IDataUser {
    balance: string;
    cpf: string;
    email: string;
    name: string;
    phone: string;
    totalDeposited: string;
    _id: string;
}

let dataExpenses: any = [];
let render = 0;

const Home = () => {
    const [statusModalNewDeposit, setModalNewDeposit] = useState(false);
    const [statusModalNewFontExpense, setModalNewFontExpense] = useState(false);
    const [statusModalNewExpense, setModalNewExpense] = useState(false);

    const [statusChanges, setStatusChanges] = useState(true);
    const [loading, setLoading] = useState(true);

    const [dataUser, setDataUser] = useState<IDataUser | null>(null);
    const [dataFontExpense, setDataFontExpense] = useState([]);
    const [fontExpenseSelected, setFontExpenseSelected] = useState<String | null>(null);

    const { singOut } = useContext(AuthContext);

    const handleReadExpenses = async (idFontExepense: String) => {
        setLoading(true);
        const allExpenses = await api.get(`/fontExpense/${idFontExepense}`);
        // console.log(allExpenses.data.data.expenses)
        setFontExpenseSelected(idFontExepense);
        dataExpenses = allExpenses.data.data.expenses;
        setLoading(false);
    };

    useEffect(() => {
        const tokenUserStorage: string | null = localStorage.getItem("@Auth:token");
        const findDataUser = async () => {
            setLoading(true);
            try {
                const dataUserApi = await api.get(`/profile`, {
                    headers: {
                        Authorization: tokenUserStorage,
                    },
                });
                setDataUser(dataUserApi.data.data);
                setLoading(false);
            } catch (e: any) {
                console.log(e.message);
                if (e.message === "Network Error") {
                    alert(
                        "Nossos serviços estão fora do ar... \nFavor volte mais tarde. \nNossa equipe agradeçe sua compreenção!"
                    );
                }
            }
        };

        const allFontExpenses = async () => {
            setLoading(true);
            try {
                const allFontExpenses = await api.get("/fontExpenseUser", {
                    headers: {
                        Authorization: tokenUserStorage,
                    },
                });

                setDataFontExpense(allFontExpenses.data.data);

                if (allFontExpenses) {
                    handleReadExpenses(
                        fontExpenseSelected
                            ? fontExpenseSelected
                            : allFontExpenses.data.data[0]._id
                    );
                }

                setLoading(false);
            } catch (e) {
                console.log("error => ", e);
            }
        };

        if (tokenUserStorage) findDataUser();
        allFontExpenses();
    }, [statusChanges]);

    const paymentExpense = async (idExpense: string)  => {
        setLoading(true);
        
        const tokenUserStorage: string | null = localStorage.getItem("@Auth:token");
        try{
            const payExpense = await api.get(`/expense/paid/${idExpense}`, {
                headers: {
                    Authorization: tokenUserStorage,
                },
            });
    
            if(payExpense.status == 200){
                setStatusChanges(!statusChanges);
            }

        }catch(e:any){
            if(e.response.status == 400){
                setStatusChanges(!statusChanges);
                alert('Balance lower than the expense price')
                setLoading(false);
                return;
            }
            
            alert('Desculpe. Não foi possivel executar esta ação. \nTente novamente mais tarde.');
        }

        setLoading(false);
    }

    const displayValue = (data: any) => {

        if (data.status === "Paid") {
            return (
                <p className="mr-1 text-xl font-semibold text-green-500">
                    {data.value}
                </p>
            );
        }
        return (
            <div className="flex items-center gap-2">
                <p className="mr-1 text-xl font-semibold text-red-500">
                    {data.value}
                </p>
                <button
                    className="btn"
                    onClick={() => paymentExpense(data._id)}
                >
                    Pay
                </button>
            </div>
        );
    };

    render += 1;

    return (
        <>
            {loading && <p>Loading...</p>}
            <p>Render {render}</p>
            <header className="flex justify-between items-center">
                <span className="flex  gap-3">
                    <h1 className="text-3xl font-bold">Despesas</h1>
                    <button
                        className="btn"
                        onClick={() => setModalNewExpense(true)}
                    >
                        + Add New
                    </button>
                    <button
                        className="btn"
                        onClick={() => setModalNewDeposit(true)}
                    >
                        New Deposit
                    </button>
                </span>
                <div className="flex gap-4 items-center">
                    <span>
                        <p className="font-bold">
                            Saldo:{" "}
                            <span className="text-green-400">
                                R$: {dataUser ? dataUser.balance : "00.00"}
                            </span>
                        </p>
                    </span>
                    <span>
                        <p className="font-semibold">
                            Total já depositado:{" "}
                            <span className="text-green-400">
                                R$:{" "}
                                {dataUser ? dataUser.totalDeposited : "00.00"}
                            </span>
                        </p>
                    </span>
                    <button className="btn-full" onClick={() => singOut()}>Log Out</button>
                </div>
            </header>
            <main className="grid justify-between grid-cols-[minmax(300px,_1fr)_1fr_1fr] mt-28">
                <aside className="bg-[#e3e8ed] max-w-xs min-h-[340px] text-start px-[30px] py-[8px] col-span-1">
                    <header className="text-xl font-bold text-black">
                        <p>Fonte das Despesas</p>
                    </header>
                    <ul>
                        {dataFontExpense &&
                            dataFontExpense.map((data: any, index) => {
                                if (data._id === fontExpenseSelected) {
                                    return (
                                        <li
                                            key={index}
                                            className="text-lg font-bold text-black cursor-pointer"
                                            onClick={() =>
                                                handleReadExpenses(data._id)
                                            }
                                        >
                                            {data.name}
                                        </li>
                                    );
                                }

                                return (
                                    <li
                                        key={index}
                                        className="text-lg text-black cursor-pointer"
                                        onClick={() =>
                                            handleReadExpenses(data._id)
                                        }
                                    >
                                        {data.name}
                                    </li>
                                );
                            })}
                    </ul>
                    <button
                        className="btn-no-border"
                        onClick={() => setModalNewFontExpense(true)}
                    >
                        + Add New
                    </button>
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
                        {dataExpenses.length > 0 ? (
                            dataExpenses.map((data: any, index: any) => {
                                return (
                                    <article
                                        key={index}
                                        className="bg-white flex justify-between items-center m-2 px-5"
                                    >
                                        <div className="text-left">
                                            <p className="text-lg">
                                                {data.name}
                                            </p>
                                            <p className="text-sm font-bold text-[#788896]">
                                                {data.createdAt}
                                            </p>
                                        </div>
                                        {displayValue(data)}
                                    </article>
                                );
                            })
                        ) : (
                            <>
                                <p>Sem despesas...</p>
                            </>
                        )}
                    </section>
                </section>
            </main>

            <ModalNewDeposit
                statusModal={statusModalNewDeposit}
                setStatusModal={setModalNewDeposit}
                setStatusChanges={setStatusChanges}
                statusChanges={statusChanges}
            />
            <ModalNewFontExpense
                statusModal={statusModalNewFontExpense}
                setStatusModal={setModalNewFontExpense}
                setStatusChanges={setStatusChanges}
                statusChanges={statusChanges}
                handleReadExpenses={handleReadExpenses}
            />
            <ModalNewExpense
                statusModal={statusModalNewExpense}
                setStatusModal={setModalNewExpense}
                setStatusChanges={setStatusChanges}
                statusChanges={statusChanges}
                fontExpense={fontExpenseSelected}
                handleReadExpenses={handleReadExpenses}
            />
        </>
    );
};

export default Home;