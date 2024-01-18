const PublicFooter = () => {
  const content = (
    <footer className="public__footer">
      <p className="about-footer">
        &copy; {new Date().getFullYear()} Al Amin School. All rights reserved.
      </p>
    </footer>
  );

  return content;
};
export default PublicFooter;
