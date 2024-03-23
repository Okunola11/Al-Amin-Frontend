import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetStudentsQuery } from "../students/studentsApiSlice";
import useTitle from "../../hooks/useTitle";
import { PulseLoader } from "react-spinners";

const StudentWelcome = () => {
  useTitle("Al Amin: Student Portal");

  const { usernum, username } = useAuth();

  const {
    data: student,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetStudentsQuery();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  let content;
  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids, entities } = student;

    const filteredId = ids.filter((id) => entities[id].usernum === usernum);

    const studentData = entities[filteredId];
    console.log(studentData);

    content = (
      <main className="student__main">
        <section className="student__section1">
          <div className="nav-heading nav-data">
            <h3 className="nowrap nav--h3">Personal Menu</h3>
          </div>
          <div className="nav-data nav--h3">
            <h3 className="nowrap ">Personal Info</h3>
            <p className="nav-link">
              <Link to="/dash/student">Brief Biodata</Link>
            </p>
          </div>
          <div className="nav-data nav--h3">
            <h3>Result Module</h3>
            <p className="nav-link">
              <Link to="/dash/student/result">View Results</Link>
            </p>
          </div>
        </section>
        <section className="student__section2">
          <div className="student-container">
            <p>{today}</p>
            <h2>Welcome {username} !</h2>
            {studentData ? (
              <>
                <div className="student-info">
                  <p className="student-data__top">Brief Data</p>
                  <p className="student-data">ID: {usernum}</p>
                  <p className="student-data">Name: {username}</p>
                  <p className="student-data">Class: {studentData.classname}</p>
                  <p className="student-data">
                    Subjects: {studentData.subjects.join(", ")}
                  </p>
                  <p className="student-data">
                    Class Teacher: {studentData.teachername}
                  </p>
                </div>
                <p className="result-link">
                  <Link to="/dash/student/result">View Results</Link>
                </p>
              </>
            ) : (
              <PulseLoader color={"#FFF"} />
            )}
          </div>
        </section>
      </main>
    );
  }
  return content;
};
export default StudentWelcome;
