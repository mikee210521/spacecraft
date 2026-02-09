"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "components/styles/register.module.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const submitform = async (e) => {
        e.preventDefault();
        const loading = toast.loading("Enviando Correo...");

        const res = await fetch("http://127.0.0.1:8000/api/forgot-password", {
            method: "POST",
            body: JSON.stringify({email}),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });

        toast.dismiss(loading);

        if (!res.ok) {
            toast.error("Error al enviar el correo");
            return;
        }

        toast.success("Revisa tu correo");
    };
    return (
      <form onSubmit={submitform} className={styles.container_info_register}>
          <div className={styles.container_border_register}>
              <h1> Recuperar Contraseña </h1>
              <input placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
              <button className={styles.button_click}>Enviar</button>
          </div>
      </form>
    );
}