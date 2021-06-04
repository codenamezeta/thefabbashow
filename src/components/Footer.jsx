const Footer = () => {
  //const year = new Date.getFullYear()
  return (
    <footer>
      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="business" value="R96WVXL2HA5TG" />
        <input
          type="hidden"
          name="item_name"
          value="Thank you! We split our tips between all 6 fabulous musicians, Marie-Claire, Julianne, Andy, Robert, Michael and Gustavo."
        />
        <input type="hidden" name="currency_code" value="USD" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
      <p className="footer-text">
        Copyright &copy; {new Date().getFullYear()} The FABBA show.
      </p>
      <a
        href="http://a2zeta.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-text"
      >
        Design by a2zeta creative design.
      </a>
    </footer>
  )
}

export default Footer
