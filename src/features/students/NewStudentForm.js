import { useState, useEffect, useRef } from "react";
import { CLASS } from "../../config/class";
import { SUBJECTS } from "../../config/subjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useCreateNewStudentMutation } from "./studentsApiSlice";
import { useNavigate } from "react-router-dom";

const username_REGEX = /^(?=(?:\S*\s?\S*){2,3}$)[a-zA-Z\s]{10,25}$/;
const userId_REGEX = /^[a-zA-Z0-9]{4}[/][a-zA-Z0-9-_]{3,7}$/;
const password_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,23}$/;

const NewStudentForm = ({ teachers }) => {
  const [createNewStudent, { isLoading, isSuccess, isError, error }] =
    useCreateNewStudentMutation();

  const navigate = useNavigate();

  const usernameRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [userId, setUserId] = useState("");
  const [validUserId, setValidUserId] = useState(false);
  const [userIdFocus, setUserIdFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [classname, setClassname] = useState("");

  const [subjects, setSubjects] = useState([
    "English Language",
    "Mathematics",
    "Civics",
  ]);

  const [teacherId, setTeacherId] = useState(teachers[0].id);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    const validUser = username_REGEX.test(username);
    setValidUsername(validUser);
  }, [username]);

  useEffect(() => {
    setValidUserId(userId_REGEX.test(userId));
  }, [userId]);

  useEffect(() => {
    const ValidPwd = password_REGEX.test(password);
    setValidPassword(ValidPwd);
    const matchPwd = password === matchPassword;
    setValidMatchPassword(matchPwd);
  }, [password, matchPassword]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setUserId("");
      setPassword("");
      setMatchPassword("");
      setSubjects([]);
      setClassname("");
      setTeacherId("");
      navigate("/dash/students");
    }
  }, [isSuccess, navigate]);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onMatchChange = (e) => setMatchPassword(e.target.value);
  const onUserIdChange = (e) => setUserId(e.target.value);
  const onClassnameChange = (e) => setClassname(e.target.value);
  const onTeacherIdChange = (e) => setTeacherId(e.target.value);

  const subjectsOption = SUBJECTS.map((subject) => (
    <option key={subject} value={subject}>
      {subject}
    </option>
  ));

  const onSubjectsChange = (e) => {
    const options = [...e.target.selectedOptions];
    const value = options.map((option) => option.value);
    setSubjects(value);
  };

  const classnameOptions = CLASS.map((classname) => (
    <option key={classname} value={classname}>
      {classname}
    </option>
  ));

  const teacherOptions = teachers.map((teacher) => (
    <option key={teacher.id} value={teacher.id}>
      {teacher.username}
    </option>
  ));

  const canSave =
    [
      validUsername,
      validUserId,
      password,
      matchPassword,
      subjects.length,
      classname,
      teacherId,
    ].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewStudent({
      username,
      usernum: userId,
      password,
      subjects,
      classname,
      teacher: teacherId,
    });
  };

  const content = (
    <section className="newUser">
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data.message}</p>

      <form className="form" onSubmit={handleSubmit}>
        <h2>Add New Employee</h2>

        <label className="form__label" htmlFor="username" aria-live="assertive">
          Employee Name
          <span className={validUsername ? "valid" : "hide"}>
            {<FontAwesomeIcon icon={faCheck} />}
          </span>
          <span className={!validUsername && username ? "invalid" : "hide"}>
            {<FontAwesomeIcon icon={faTimes} />}
          </span>
        </label>
        <input
          className="form__input"
          type="text"
          id="username"
          ref={usernameRef}
          value={username}
          onChange={onUsernameChange}
          required
          autoComplete="off"
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />
        <p
          className={
            usernameFocus && username && !validUsername
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          10 to 25 characters.
          <br />
          Two or three words
          <br />
          Letters only. A space allowed between
          <br />
        </p>

        <label className="form__label" htmlFor="userId" aria-live="assertive">
          Employee ID
          <span className={validUserId ? "valid" : "hide"}>
            {<FontAwesomeIcon icon={faCheck} />}
          </span>
          <span className={!validUserId && userId ? "invalid" : "hide"}>
            {<FontAwesomeIcon icon={faTimes} />}
          </span>
        </label>
        <input
          className="form__input"
          type="text"
          id="userId"
          value={userId}
          onChange={onUserIdChange}
          required
          autoComplete="off"
          onFocus={() => setUserIdFocus(true)}
          onBlur={() => setUserIdFocus(false)}
        />
        <p
          className={
            userIdFocus && userId && !validUserId ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          8 to 12 characters.
          <br />
          Must be in line with the organization standards
          <br />
          starts with a 4 digit or letter a / and other digit or letter
          <br />
        </p>

        <label className="form__label" htmlFor="password" aria-live="assertive">
          Password
          <span className={validPassword ? "valid" : "hide"}>
            {<FontAwesomeIcon icon={faCheck} />}
          </span>
          <span className={!validPassword && password ? "invalid" : "hide"}>
            {<FontAwesomeIcon icon={faTimes} />}
          </span>
        </label>
        <input
          className="form__input"
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          required
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p
          className={
            passwordFocus && !validPassword ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          8 to 23 characters <br />
          Must include a uppercase, lowercase letters, a number and special
          characters <br />
          Allowed special characters: ! @ # $ %
        </p>

        <label
          className="form__label"
          htmlFor="matchPassword"
          aria-live="assertive"
        >
          Confirm Password
          <span
            className={validMatchPassword && validPassword ? "valid" : "hide"}
          >
            {<FontAwesomeIcon icon={faCheck} />}
          </span>
          <span
            className={!validMatchPassword && password ? "invalid" : "hide"}
          >
            {<FontAwesomeIcon icon={faTimes} />}
          </span>
        </label>
        <input
          className="form__input"
          type="password"
          id="matchPassword"
          value={matchPassword}
          onChange={onMatchChange}
          required
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          className={
            validPassword && matchFocus && !validMatchPassword
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          Must be the same as Password
        </p>

        <label
          className="form__roles form__label"
          htmlFor="classname"
          aria-live="assertive"
        >
          Class
        </label>
        <select
          className="form__input--roles"
          name="classname"
          id="classname"
          value={classname}
          onChange={onClassnameChange}
          required
        >
          <option>{""}</option>
          {classnameOptions}
        </select>

        <label
          className="form__roles form__label"
          htmlFor="subjects"
          aria-live="assertive"
        >
          Subjects
        </label>
        <select
          className="form__input--roles"
          name="subjects"
          id="subjects"
          multiple={true}
          value={subjects}
          onChange={onSubjectsChange}
          required
        >
          {subjectsOption}
        </select>

        <label
          className="form__roles form__label"
          htmlFor="teacherId"
          aria-live="assertive"
        >
          Class Teacher
        </label>
        <select
          className="form__input--roles"
          name="teacherId"
          id="teacherId"
          value={teacherId}
          onChange={onTeacherIdChange}
          required
        >
          {teacherOptions}
        </select>

        <div className="button__container">
          <div className="form__button">
            <button disabled={!canSave}>Add User</button>
          </div>
        </div>
      </form>
    </section>
  );

  return content;
};
export default NewStudentForm;
