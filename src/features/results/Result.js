import { selectResultsById } from "./resultsApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Result = ({ resultId }) => {
  const result = useSelector((state) => selectResultsById(state, resultId));

  const navigate = useNavigate();

  const handleEdit = () => navigate(`/dash/results/${resultId}`);

  if (result) {
    const subjects = result.subjects;

    return (
      <section className="result--section">
        <div className="table--result-p">
          <p>Student ID: {result.studentID}</p>
          <p>Class: {result.classname}</p>
          <button className="table--result-button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
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
  } else return null;
};
export default Result;
