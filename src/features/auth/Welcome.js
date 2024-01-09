import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  return (
    <section>
      <p>{today}</p>
      <h2>Welcome!</h2>
      <p>
        <Link to="/dash/students">View students</Link>
      </p>
      <p>
        <Link to="/dash/students/new">Add a new Student</Link>
      </p>
      <p>
        <Link to="/dash/results">View Results</Link>
      </p>
      <p>
        <Link to="/dash/results/new">Add results</Link>
      </p>
      <p>
        <Link to="/dash/users">View Employees</Link>
      </p>
      <p>
        <Link to="/dash/users/new">Add a new Employee</Link>
      </p>
    </section>
  );
};
export default Welcome;
