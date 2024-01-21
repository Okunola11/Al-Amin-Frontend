const PublicFooter = () => {
  const date = new Date();
  const today = date.getFullYear();

  const content = (
    <footer className="public__footer">
      <section className="public-footer__section">
        <address>
          Al Amin Schools
          <br />
          9A Adekunle Adebayo Close <br />
          Dalemo, Alakuko, LG 12345 <br />
          <a href="tel: +2345555555555">(234) 555-555-5555</a>
          <p>Mail: alaminschools@gmail.com</p>
        </address>
        <div className="public-footer__div">
          <p className="about-footer">
            Copyright &copy; {today} Al Amin School.
          </p>
          <p className="about-footer">All rights reserved.</p>
        </div>
      </section>
    </footer>
  );

  return content;
};
export default PublicFooter;
