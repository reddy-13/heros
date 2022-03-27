import axios from "axios";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import Router from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";
const AddNewHero = () => {
  const [form, setForm] = useState({
    superHero: "",
    realName: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = axios("http://localhost:3000/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(form),
      });
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <main className="container">
        <h1 className="display-3">ADD NEW</h1>
        <form onSubmit={handleForm}>
          <MDBInput
            type="text"
            label="superHero"
            name="superHero"
            onChange={handleChange}
          />
          <MDBInput
            type="text"
            label="realName"
            name="realName"
            onChange={handleChange}
          />
          <MDBBtn type="submit">ADD NEW</MDBBtn>
        </form>
      </main>
    </div>
  );
};

export default AddNewHero;
