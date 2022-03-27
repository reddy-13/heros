import axios from "axios";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Home.module.css";

const EditHero = ({ heros }) => {
  const router = useRouter();
  const heroId = router.query.id;
  const [form, setForm] = useState({
    superHero: heros.superHero,
    realName: heros.realName,
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
      const res = axios(`http://localhost:3000/api/hero/${heroId}`, {
        method: "PUT",
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
        <h3 className="display-3">Add your hero</h3>
        <form onSubmit={handleForm}>
          <MDBInput
            className="p2 mb-2"
            type="text"
            label="superHero"
            name="superHero"
            value={form.superHero}
            onChange={handleChange}
          />
          <MDBInput
            className="p2 mb-2"
            type="text"
            label="realName"
            name="realName"
            value={form.realName}
            onChange={handleChange}
          />
          <div className="d-flex justify-content-between">
            <MDBBtn type="submit">EDIT HERO</MDBBtn>
            <Link href={"/"} passHref>
              <MDBBtn className="btn btn-secondary">Back</MDBBtn>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const id = params.id;
  let res = await axios(`http://localhost:3000/api/hero/${id}`);

  const { hero } = res.data;

  return {
    props: { heros: hero },
  };
}

export default EditHero;
