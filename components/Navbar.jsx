import Link from "next/link";
import { MDBBtn } from "mdb-react-ui-kit";

function Navbar() {
  return (
    <nav className="navbar container">
      <Link href="/">
        <a className="navbar-brand">Heros</a>
      </Link>
      <Link href="/add">
        <MDBBtn>New Identity</MDBBtn>
      </Link>
    </nav>
  );
}

export default Navbar;
