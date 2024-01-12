import { selectStudentsById } from "./studentsApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Student = ({ studentId }) => {
  const navigate = useNavigate();

  const student = useSelector((state) => selectStudentsById(state, studentId));
  if (student) {
    const subjects = student.subjects.toString().replaceAll(",", ", ");

    const handleEdit = () => navigate(`/dash/students/${studentId}`);

    return (
      <tr>
        <td className="table__cell student__name">{student.username}</td>
        <td className="table__cell student__id">{student.usernum}</td>
        <td className="table__cell student__class">{student.classname}</td>
        <td className="table__cell student__courses">{subjects}</td>
        <td className="table__cell student__teacher">{student.teachername}</td>
        <td className="table__cell student__edit">
          <button className="table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  }
};
export default Student;
