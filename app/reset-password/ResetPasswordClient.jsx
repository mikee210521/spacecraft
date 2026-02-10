"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import styles from "components/styles/register.module.css";

export default function ResetPasswordClient() {
    const params = useSearchParams();
    const token = params.get("token");
    const email = params.get("email");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const submitform = async (e) => {
        e.preventDefault();

        const loading = toast.loading("Actualizando Contraseña...");

        const res = await fetch("http://127.0.0.1:8000/api/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                token,
                email,
                password,
                password_confirmation: confirm,
            }),
        });

        toast.dismiss(loading);

        if (!res.ok) {
            toast.error("Error al cambiar la contraseña");
            return;
        }

        toast.success("Contraseña Actualizada");
    };

    return (
        <form onSubmit={submitform} className={styles.container_info_register}>
            <div className={styles.container_border_register}>
                <h1>Nueva Contraseña</h1>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmar"
                    onChange={(e) => setConfirm(e.target.value)}
                />
                <button className={styles.button_click}>Actualizar</button>
            </div>
        </form>
    );
}
