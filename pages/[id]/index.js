import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import Link from "next/link";
function EachHero({ heros }) {
  const router = useRouter();
  const heroId = router.query.id;

  const deleteHero = async () => {
    try {
      const deleteHero = await axios(
        `http://localhost:3000/api/hero/${heroId}`,
        {
          method: "DELETE",
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1 className="display-3">Identity of hero</h1>
      <MDBCard className="my-2" style={{ maxWidth: "22rem" }}>
        <MDBCardBody>
          <MDBCardTitle>{heros.superHero}</MDBCardTitle>
          <MDBCardText>{heros.realName}</MDBCardText>
          <div className="d-flex justify-content-between">
            <MDBBtn className="btn btn-danger" onClick={deleteHero}>
              Delete Hero
            </MDBBtn>
            <Link href={"/"} passHref>
              <MDBBtn className="btn btn-secondary">Back</MDBBtn>
            </Link>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  let res = await axios(`http://localhost:3000/api/hero/${id}`);

  const { hero } = res.data;

  return {
    props: { heros: hero },
  };
}

export default EachHero;
