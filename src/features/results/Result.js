import { selectResultsById } from "./resultsApiSlice";
import { useSelector } from "react-redux";

const Result = ({ resultId }) => {
  const result = useSelector((state) => selectResultsById(state, resultId));

  if (result) {
    const subjects = result.subjects;

    return (
      <section className="result--section">
        <div className="table--result-p">
          <p>Student ID: {result.studentID}</p>
          <p>Class: {result.classname}</p>
        </div>
        <table className="table table--result">
          <thead className="table__thead">
            <tr>
              <th className="table__th">Subject</th>
              <th className="table__th">Score</th>
              <th className="table__th">Grade</th>
              <th className="table__th">Standing</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id}>
                <td className="table__cell">{subject.name}</td>
                <td className="table__cell">{subject.result}</td>
                <td className="table__cell">{subject.grade}</td>
                <td className="table__cell">{subject.standing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
};
export default Result;
