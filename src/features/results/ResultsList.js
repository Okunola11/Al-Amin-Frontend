import { useGetResultsQuery } from "./resultsApiSlice";
import Result from "./Result";
import useAuth from "../../hooks/useAuth";

const ResultsList = () => {
  const { usernum, isAdmin, isExecutive } = useAuth();

  const {
    data: results,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetResultsQuery();

  let content;
  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = results;

    let filteredIds;
    if (isAdmin || isExecutive) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter((id) => entities[id].teachernum === usernum);
    }

    const tableData = filteredIds?.length
      ? filteredIds.map((resultId) => (
          <Result key={resultId} resultId={resultId} />
        ))
      : null;

    content = <main>{tableData}</main>;
  }
  return content;
};
export default ResultsList;
