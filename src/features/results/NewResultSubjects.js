import { useState } from "react";
import { selectStudentsById } from "../students/studentsApiSlice";
import { useSelector } from "react-redux";
import NewResultForm from "./NewResultForm";

const NewResultSubjects = ({ students }) => {
  const [classname, setClassname] = useState("");
  const [studentId, setStudentId] = useState("");

  const classnameOptions = students.map((student) => (
    <option value={student.classname} key={student.id}>
      {student.classname}
    </option>
  ));

  const studentsByClass = students.filter(
    (student) => student.classname === classname
  );

  const studentsOptions = studentsByClass.map((student) => (
    <option key={student.id} value={student.id}>
      {student.username}
    </option>
  ));

  const studentData = useSelector((state) =>
    selectStudentsById(state, studentId)
  );

  let predefinedSubjects;
  if (studentData) {
    predefinedSubjects = studentData.subjects;
  } else predefinedSubjects = [];

  const subjectsWithResult = predefinedSubjects?.length
    ? predefinedSubjects.map((subject) => ({
        name: subject,
        result: "",
      }))
    : [];

  const content = (
    <section className="newResult">
      <form className="newResult__form">
        <h2>Student Results Form</h2>
        <div className="newResult__div1">
          <div className="newResult__div2">
            <div className="newResult__label">
              <label htmlFor="classname">Class</label>
            </div>
            <select
              className="newResult__select"
              name="classname"
              id="classname"
              value={classname}
              onChange={(e) => setClassname(e.target.value)}
            >
              <option>{""}</option>
              {classnameOptions}
            </select>
          </div>

          <div className="newResult__div2">
            <div className="newResult__label">
              <label className="nowrap" htmlFor="studentname">
                Student Name
              </label>
            </div>
            <select
              className="newResult__select"
              name="studentname"
              id="studentname"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              <option>{""}</option>
              {studentsOptions}
            </select>
          </div>
        </div>
      </form>
      <NewResultForm
        subjectsWithResult={subjectsWithResult}
        studentId={studentId}
      />
    </section>
  );

  return content;
};

export default NewResultSubjects;
