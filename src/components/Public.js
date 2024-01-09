import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Al Amin Schools</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in the serene Coker Estate, Ado-Odo Ota, Ogun State. Al Amin
          schools provides quality education with its well equiped amenities,
          well seasoned and quality teachers and instructors.
        </p>
        <address className="public__addr">
          Al Amin Schools
          <br />
          9A Adekunle Adebayo Close <br />
          Dalemo, Alakuko, LG 12345 <br />
          <a href="tel: +2345555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Chun Lee</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
        <Link>Student login</Link>
      </footer>
    </section>
  );

  return content;
};
export default Public;
