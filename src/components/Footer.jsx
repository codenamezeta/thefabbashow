const Footer = () => {
  //const year = new Date.getFullYear()
  return (
    <footer>
      <p className='footer-text'>
        Copyright &copy; {(new Date().getFullYear())} The FABBA show.
      </p>
      <a href="http://a2zeta.com/" className='footer-text'>Design by a2zeta creative design.</a>
    </footer>
  )
}

export default Footer
