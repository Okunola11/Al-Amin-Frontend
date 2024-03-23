import { useSelector } from "react-redux";
import { selectUsersById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const EditUser = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUsersById(state, id));

  const content = user ? (
    <EditUserForm user={user} />
  ) : (
    <PulseLoader color={"#FFF"} />
  );
  return content;
};
export default EditUser;
