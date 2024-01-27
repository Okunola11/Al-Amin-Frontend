import light from "../../img/book-light.jpeg";
import tree from "../../img/knowledge-tree.jpeg";
import IT from "../../img/ict-training.jpeg";
import lab from "../../img/science-lab.jpeg";
import clubs from "../../img/interpersonal.jpeg";
import islam from "../../img/islamic-knowledge.jpeg";

const PublicPrograms = () => {
  const content = (
    <section id="programs" className="public-about public-section">
      <div className="programs-container">
        <h2>Programs</h2>
        <p>Explore our diverse range of educational programs.</p>
        {/* Highlight different programs offered by the school */}
        <ul className="public-programs__ul">
          <li className="public-programs__li">
            <img src={light} width={225} height={225} alt="Bright Minds" />
            <h3 className="public-programs__h3">We nuture bright minds</h3>
          </li>
          <li className="public-programs__li">
            <img src={tree} width={225} height={225} alt="Curriculum" />
            <h3 className="public-programs__h3">Wide range of Curriculum</h3>
          </li>
          <li className="public-programs__li">
            <img src={IT} width={225} height={225} alt="ICT Training" />
            <h3 className="public-programs__h3">IT Training</h3>
          </li>
          <li className="public-programs__li">
            <img src={lab} width={225} height={225} alt="Laboratory" />
            <h3 className="public-programs__h3">Well Equipped Laboratory</h3>
          </li>
          <li className="public-programs__li">
            <img
              src={clubs}
              width={225}
              height={225}
              alt="Interpersonal Skills"
            />
            <h3 className="public-programs__h3">
              Interpersonal Skills Development
            </h3>
          </li>
          <li className="public-programs__li">
            <img src={islam} width={225} height={225} alt="Islamic Knowledge" />
            <h3 className="public-programs__h3">Islamic Knowledge</h3>
          </li>
        </ul>
      </div>
    </section>
  );

  return content;
};
export default PublicPrograms;
