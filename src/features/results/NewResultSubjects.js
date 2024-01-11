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
  console.log(studentsByClass);

  const studentsOptions = studentsByClass.map((student) => (
    <option key={student.id} value={student.id}>
      {student.username}
    </option>
  ));

  console.log(studentsOptions);

  const studentData = useSelector((state) =>
    selectStudentsById(state, studentId)
  );
  console.log(studentData);

  let predefinedSubjects;
  if (studentData) {
    predefinedSubjects = studentData.subjects;
  } else predefinedSubjects = [];

  console.log(predefinedSubjects);

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

  /* const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [subjectResults, setSubjectResults] = useState({});

  const subjects = ["Math", "English", "Science"]; // Replace with your predefined array of subjects

  const handleInputChange = (subject, result) => {
    setSubjectResults((prevResults) => ({
      ...prevResults,
      [subject]: result,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          studentID,
          subjectResults,
        }),
      });

      if (response.ok) {
        console.log("Student results submitted successfully!");
        // You can reset the form or perform any other actions after successful submission
      } else {
        console.error("Failed to submit student results.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Student Results Form</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="studentName">Student Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="studentID">Student ID:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="studentID"
                  name="studentID"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Subject Results:</h3>
        <table>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject}>
                <td>
                  <label htmlFor={subject}>{`${subject} Result:`}</label>
                </td>
                <td>
                  <input
                    type="text"
                    id={subject}
                    name={subject}
                    value={subjectResults[subject] || ""}
                    onChange={(e) => handleInputChange(subject, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit">Submit Results</button>
      </form>
    </div>
  ); */
};

export default NewResultSubjects;
