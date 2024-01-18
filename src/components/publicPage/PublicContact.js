const PublicContact = () => {
  const content = (
    <section id="contact" className="public-contact">
      <div className="about-container">
        <h2>Contact Us</h2>
        <p>Get in touch with us for any inquiries or assistance.</p>
      </div>
      <address className="public__addr">
        Al Amin Schools
        <br />
        9A Adekunle Adebayo Close <br />
        Dalemo, Alakuko, LG 12345 <br />
        <a href="tel: +2345555555555">(234) 555-555-5555</a>
        <p>Mail: alaminschools@gmail.com</p>
      </address>
    </section>
  );

  return content;
};
export default PublicContact;
