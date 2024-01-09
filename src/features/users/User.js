import { selectUsersById } from "./usersApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const User = ({ userId }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => selectUsersById(state, userId));

  if (user) {
    const cellStatus = user.active ? "" : "table__cell--inactive";

    const userRoles = user.roles.toString().replace(",", ", ");

    const handleEdit = () => navigate(`/dash/users/${userId}`);
    return (
      <tr>
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{user.usernum}</td>
        <td className={`table__cell ${cellStatus}`}>{userRoles}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button
            className="table__button"
            onClick={handleEdit}
            title="Edit Employee"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  }
};
export default User;
