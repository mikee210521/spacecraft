"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "components/styles/register.module.css";
import { FaUserCircle } from "react-icons/fa";

export default function Register() {
   const [form, setform] = useState({
       email:"",
       password:"",
   });

   const submitForm = async (e) => {
       e.preventDefault();
       const loading = toast.loading("Iniciando Sesión...");

       const res = await fetch("http://127.0.0.1:8000/api/login", {
           method: "POST",
           body: JSON.stringify(form),
           headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
           }
       });

       const data = await res.json();
       toast.dismiss(loading);

       if (!res.ok) {
           toast.error(data.message || "Credenciales incorrectas");
           return;
       }

       toast.success("Accesso Completo")
   };

   return (
     <form onSubmit={submitForm}>
         <div className={styles.container_info}>
             <div className={styles.container_border}>
                 <FaUserCircle className={styles.icon}/>
                 <h1> Inicio de Sesión </h1>
                 <input placeholder="Correo" onChange={(e) => setform({ ...form, email: e.target.value })} />
                 <input type={"password"} placeholder="Contraseña" onChange={(e) => setform({ ...form, password: e.target.value })} />
                 <button type="submit" className={styles.button_click}> Iniciar Sesión </button>
             </div>
         </div>
     </form>
   );
}
