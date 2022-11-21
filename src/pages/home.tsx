import React from "react";

const Home =  () => {
    return (
        <>
            <header className="flex justify-between items-center">
                <span className="flex  gap-3">
                    <h1 className="text-3xl font-bold">Despesas</h1>
                    <button className="btn">+ Add New</button>
                </span>
                <div className="flex gap-4">
                    <span>
                        <p className="font-bold">Saldo: <span className="text-green-400">R$: 3.900,90</span></p>
                    </span>
                    <span>
                        <p className="font-semibold">Total já depositado: <span className="text-green-400">R$: 10.949,00</span></p>
                    </span>
                </div>
            </header>
            <main>
                <aside>
                    <header>
                        <p>Fonte das Despesas</p>
                    </header>
                    <ul>
                        <li>Casa</li>
                        <li>Entreterimento</li>
                    </ul>
                    <button>+ Add New</button>
                </aside>
                <section>
                    <header>
                        <div>
                            <input type="text" />
                        </div>
                        <div>
                            <button className="btn">Tudo</button>
                            <button className="btn" disabled={true} >Pendente</button>
                        </div>
                    </header>
                    <article>
                        <div>
                            <p>Energia</p>
                            <p>Jan 30, 2022</p>
                        </div>
                        <p>- R$ 160,00</p>
                    </article>
                </section>
            </main>
        </>
    );
}

export default Home;