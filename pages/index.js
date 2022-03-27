import Image from "next/image";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Link from "next/link";
const index = ({ heros, colleges }) => {
  return (
    <div className={`container`}>
      <main className="container">
        <h1>Hero World {heros.lenght}</h1>
        <p>Add your hero name</p>
        {/* {colleges.map((col, i) => {
          return (
            <div key={i}>
              <p>{col.name}</p>
            </div>
          );
        })} */}
        <div></div>
        {heros.map((hero) => {
          return (
            <MDBCard
              className="my-2"
              style={{ maxWidth: "22rem" }}
              key={hero._id}
            >
              <MDBCardBody>
                <MDBCardTitle>{hero.superHero}</MDBCardTitle>
                <MDBCardText>Reveal Identity</MDBCardText>
                <div className="justify-content-around">
                  <Link href={`/${hero._id}`}>
                    <MDBBtn>View Hero</MDBBtn>
                  </Link>
                  <Link href={`/${hero._id}/edit`}>
                    <MDBBtn>Edit Hero</MDBBtn>
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          );
        })}
      </main>
    </div>
  );
};
export async function getServerSideProps(context) {
  function objectLength(obj) {
    var result = 0;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // or Object.prototype.hasOwnProperty.call(obj, prop)
        result++;
      }
    }
    return result;
  }
  let res = await axios("http://localhost:3000/api/hero");
  let site_url =
    "http://universities.hipolabs.com/search?country=United%20States";
  let colleges = await axios(site_url); //test strapi

  console.log("colleges", Object.keys(colleges.data).length); //for testing stapi

  const { hero } = res.data;
  // console.log("reee", hero);
  return {
    props: { heros: hero, colleges: colleges.data },
  };
}
export default index;
