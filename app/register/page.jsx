"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "components/styles/register.module.css";

export default function Register() {
   const [form, setform] = useState({
       name:"",
       email:"",
       password:"",
       password_confirmation:""
   });

    const [loading, setLoading] = useState(false);

   const submitForm = async (e) => {
       e.preventDefault();
       setLoading(true);

       try {
           const res = await fetch("http://127.0.0.1:8000/api/register", {
               method: "POST",
               body: JSON.stringify(form),
               headers: {
                   "Content-Type": "application/json",
                   "Accept": "application/json",
               },
           });

           const data = await res.json();

           if (!res.ok) {
               if (data.errors) {
                   Object.values(data.errors).forEach(err => toast.error(err[0]));
               } else {
                   toast.error(data.message || "Error");
               }
           } else {
               toast.success("Registro exitoso, revisa tu correo");
               setform({ name: "", email: "", password: "", password_confirmation: "" });
           }
       } catch (err) {
           console.error(err);
           toast.error("Error del servidor");
       } finally {
           setLoading(false);
       }
   };

    return (
        <div className={styles.container_info_register}>
            {loading && (
                <div className={styles.container_spinner}>
                    <div className={styles.spinner}></div>
                </div>
            )}

            <form onSubmit={submitForm} style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? "none" : "auto" }} className={styles.container_border_register}>
                <h1>Registro</h1>
                <input placeholder="Nombre Completo" value={form.name} onChange={(e) => setform({ ...form, name: e.target.value })}/>
                <input placeholder="Correo" value={form.email} onChange={(e) => setform({ ...form, email: e.target.value })}/>
                <input type="password" placeholder="Contraseña" value={form.password} onChange={(e) => setform({ ...form, password: e.target.value })}/>
                <input type="password" placeholder="Confirmar" value={form.password_confirmation} onChange={(e) => setform({ ...form, password_confirmation: e.target.value })}/>
                <button type="submit" disabled={loading} className={styles.button_click}>Registrar</button>
            </form>
        </div>
    );
}