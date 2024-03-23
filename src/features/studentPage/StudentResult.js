import useAuth from "../../hooks/useAuth";
import { useGetResultsQuery } from "../results/resultsApiSlice";
import useTitle from "../../hooks/useTitle";
import { PulseLoader } from "react-spinners";

const StudentResult = () => {
  useTitle("Al Amin: Results Page");

  const { usernum } = useAuth();

  const {
    data: results,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetResultsQuery();

  let content;
  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids, entities } = results;

    const filteredId = ids.filter((id) => entities[id].studentID === usernum);

    const resultData = entities[filteredId];

    content = (
      <>
        <p className="report-p">
          Student Report Sheet for{" "}
          <span className="report-name">{resultData.username}</span>
        </p>
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
            {resultData.subjects.map((subject) => (
              <tr key={subject._id}>
                <td className="table__cell">{subject.name}</td>
                <td className="table__cell">{subject.result}</td>
                <td className="table__cell">{subject.grade}</td>
                <td className={`table__cell ${subject.standing}`}>
                  {subject.standing}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  return content;
};
export default StudentResult;
