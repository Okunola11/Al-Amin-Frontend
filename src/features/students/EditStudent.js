import { useSelector } from "react-redux";
import { selectStudentsById } from "./studentsApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditStudentForm from "./EditStudentForm";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const EditStudent = () => {
  const { id } = useParams();

  const student = useSelector((state) => selectStudentsById(state, id));
  const teachers = useSelector(selectAllUsers);

  const content =
    student && teachers ? (
      <EditStudentForm student={student} teachers={teachers} />
    ) : (
      <PulseLoader color={"#FFF"} />
    );
  return content;
};
export default EditStudent;
