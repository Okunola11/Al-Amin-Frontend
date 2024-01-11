import { selectAllStudents } from "../students/studentsApiSlice";
import { useSelector } from "react-redux";
import NewResultSubjects from "./NewResultSubjects";

const NewResult = () => {
  const students = useSelector(selectAllStudents);

  let content;
  if (students?.length) {
    content = <NewResultSubjects students={students} />;
  } else {
    content = <p>Currently not available</p>;
  }
  return content;
};
export default NewResult;
