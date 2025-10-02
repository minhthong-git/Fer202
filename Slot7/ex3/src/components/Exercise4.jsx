export default function Exercise4() {
  return (
    <section className="my-5">
      
      <header className="text-center bg-warning py-3">
        
        <img
          src="/images/fpt-logo.svg"
          alt="FPT University Logo"
          style={{ maxWidth: "300px" }}
        />
        <nav className="mt-2">
          <a href="#home" className="mx-2 text-dark text-decoration-none">Home</a>
          <a href="#about" className="mx-2 text-dark text-decoration-none">About</a>
          <a href="#contact" className="mx-2 text-dark text-decoration-none">Contact</a>
        </nav>
      </header>

      
      <main className="container my-5 text-center">
        <section id="about" className="mb-4">
          <h3>About</h3>
          <p>This is the about section of the website.</p>
        </section>

        <section id="contact">
          <h3>Contact</h3>
          <p>
            For any inquiries, please contact us at{" "}
            <a href="mailto:example@example.com">example@example.com</a>.
          </p>
        </section>
      </main>

      
      <footer className="bg-warning text-center py-3">
        <small>© 2023 Website. All rights reserved.</small>
      </footer>
    </section>
  );
}
