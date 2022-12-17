import React, { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { api } from "../services/api";

export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const loadingStorageData = () => {
            const storageToken = localStorage.getItem("@Auth:token");

            if (storageToken && storageToken) {
                setUser(storageToken);
            }
        };
        loadingStorageData();
    }, []);

    const signIn = async ({ email, password }:any) => {
        try {
            const response = await api.post("/login", { email, password });
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setUser(response.data.token);
                
                api.defaults.headers.Authotization = response.data.token; // coloca com header authorization padrão o token do usuário

                localStorage.setItem('@Auth:token', response.data.token);
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    const singOut = () => {
        localStorage.clear();
        setUser(null);
        return <Navigate to="/" />;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                singOut,
                signed: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
