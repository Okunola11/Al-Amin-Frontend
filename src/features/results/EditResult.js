import { useSelector } from "react-redux";
import { selectResultsById } from "./resultsApiSlice";
import { useParams } from "react-router-dom";
import EditResultForm from "./EditResultForm";
import { PulseLoader } from "react-spinners";

const EditResult = () => {
  const { id } = useParams();
  const result = useSelector((state) => selectResultsById(state, id));
  const studentResult = { ...result };

  const content = result ? (
    <EditResultForm result={studentResult} />
  ) : (
    <PulseLoader color={"#FFF"} />
  );
  return content;
};
export default EditResult;
