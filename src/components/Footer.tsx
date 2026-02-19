function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="social-links">
          <a href="https://github.com/vernonht" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/chu-jian-hao-b39062122/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="mailto:vernonht@gmail.com" aria-label="Email">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
        <p>&copy; {currentYear} Chu Jian Hao. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
