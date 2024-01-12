import { useGetStudentsQuery } from "./studentsApiSlice";
import Student from "./Student";

const StudentsList = () => {
  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery();

  let content;
  if (isLoading) content = <p>Loading</p>;

  if (isError) {
    content = <p className="errmsg">{error}</p>;
  }

  if (isSuccess) {
    const { ids } = students;

    const tableData = ids?.length
      ? ids.map((studentId) => (
          <Student key={studentId} studentId={studentId} />
        ))
      : null;

    content = (
      <table className="table table--students">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th student__name">
              Name
            </th>
            <th scope="col" className="table__th student__id">
              Student ID
            </th>
            <th scope="col" className="table__th student__class">
              Class
            </th>
            <th scope="col" className="table__th student__courses">
              Courses
            </th>
            <th scope="col" className="table__th student__teacher">
              Class Teacher
            </th>
            <th scope="col" className="table__th student__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );
  }
  return content;
};
export default StudentsList;
