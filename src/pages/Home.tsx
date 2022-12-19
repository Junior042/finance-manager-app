import React, { useEffect, useState } from "react";
import ModalNewDeposit from './ModalNewDeposit';
import ModalNewExpense from "./ModalNewExpense";
import ModalNewFontExpense from './ModalNewFontExpense';
import { api }  from '../services/api';
import { getDataUser } from '../services/jwtFuncs';
import jwt from 'jsonwebtoken';



interface IDataUser {
    balance: string;
    cpf: string;
    email: string;
    name: string;
    phone: string;
    totalDeposited: string;
    _id: string;
};

/*
    "_id": "639ce51bee36e3d77fa10c3e",
    "status": "Pending",
    "value": "200.00",
    "name": "Pagar Mentoria O Poder Da Internet",
    "createdAt": "2022-12-16T21:37:31.512Z",
    "description": "Conhecimento",
    "user": "638b8f1d85e1d1be091eccfa",
    "fontExpense": "6397a4718f4535b3468101fb"
*/

const Home = () => {
    const [ statusModal, setModal ] = useState(false);
    const [ statusModalNewFontExpense, setModalNewFontExpense ] = useState(false);
    const [ statusModalNewExpense, setModalNewExpense ] = useState(false);

    const [ statusChanges, setStatusChanges ] = useState(true);
    const [ loading, setLoading ] = useState(true);

    const [ dataUser, setDataUser ] = useState<IDataUser | null>(null);
    const [ dataFontExpense, setDataFontExpense ] = useState([]);
    const [ dataExpense, setDataExpense ] = useState<Array<Object> | null>(null);

    useEffect(() => {
        // const tokenUserStorage: string | null = localStorage.getItem('@Auth:token');
        const findDataUser = async () => {
            setLoading(true);
            // const sla = getDataUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGI4ZjFkODVlMWQxYmUwOTFlY2NmYSIsIm5hbWUiOiJFZHVhcmRvIEp1bmlvciIsImlhdCI6MTY3MTI5ODg5NywiZXhwIjoxNjcxMzg1Mjk3fQ.X4DE5nPpaY0BjHHMms1KriPitxq8FJAa7MctVqnbzW4')
            try{
                const dataUserApi = await api.get('/user/638b8f1d85e1d1be091eccfa');
                setDataUser(dataUserApi.data.data);
                setLoading(false);
            }catch(e:any){
                console.log(e.message);
                if(e.message === "Network Error"){
                    alert('Nossos serviços estão fora do ar... \nFavor volte mais tarde. \nNossa equipe agradeçe sua compreenção!');
                }
            }
        }

        const allFontExpenses = async () => { 
            setLoading(true);
            try{
                const allFontExpenses = await api.get('/fontExpense/All?user=false&expenses=true');
                setDataFontExpense(allFontExpenses.data.data);
                setLoading(false);
            }catch(e){
                console.log('error => ', e);
            }
        }

        // if(tokenUserStorage) findDataUser();
        findDataUser();
        allFontExpenses();
    }, [statusChanges]);
    
    // dataUser && console.log(dataUser);

    const displayValue = (data:any) => {
        if(data.status === "Paid"){
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

    const readExpenses = async (id:string) => {
        console.log(id);
        setLoading(true);

        try{
            const allFontExpenses = await api.get(`/fontExpense/${id}`);
            setDataExpense(allFontExpenses.data.data.expenses);
            setLoading(false);
            // console.log(allFontExpenses.data.data.expenses);
            
        }catch(e){
            console.log('error => ', e);
            alert('Error! \n Atualize a pagina, caso persiste contate o suporte.')
        }
    }

    return (
        <>
            {
                loading && (<p>Loading...</p>)
            }
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
                            <span className="text-green-400">R$: {dataUser? dataUser.balance: "00.00"}</span>
                        </p>
                    </span>
                    <span>
                        <p className="font-semibold">
                            Total já depositado:{" "}
                            <span className="text-green-400">
                                R$: {dataUser? dataUser.totalDeposited: "00.00"}
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
                        {
                            dataFontExpense && dataFontExpense.map((data: any, index) => {
                                return <li key={index} className="text-lg text-black cursor-pointer" onClick={() => readExpenses(data._id)}>{data.name}</li>
                            })
                        }
                        {/* <li className="text-lg font-bold text-black">Casa</li>
                        <li className="text-lg text-black">Entreterimento</li> */}
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
                    {dataExpense ? dataExpense.map((data:any, index) => {
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
                    }) : (
                        <><p>Sem despesas...</p></>
                    )}
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
