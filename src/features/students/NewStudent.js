import { selectAllUsers } from "../users/usersApiSlice";
import { useSelector } from "react-redux";
import NewStudentForm from "./NewStudentForm";

const NewStudent = () => {
  const teachers = useSelector(selectAllUsers);

  let content;
  if (teachers?.length) {
    content = <NewStudentForm teachers={teachers} />;
  } else {
    content = <p>Currently not available</p>;
  }
  return content;
};
export default NewStudent;
