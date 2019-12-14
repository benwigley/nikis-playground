import React, { useState } from 'react'
import css from '../../styles/TjmerSite/Homepage.styl'
import cx from 'classnames'


export default function Homepage() {
  // const [state, setState] = useState()
  return (
    <div>
      <header>
        <div className={css.headerContainer}>
          <div className={css.heroImage}>

            <div className={css.logo}>
              <a 
                href="homepage.html" 
                className={css.btnLogo}>
                  TjMER
              </a>
            </div>

            <nav className={cx(css.nav, css.headerNav)}>
              <ul>
                <li><a href="#" className={css.currentPage}>Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="#">Log in</a></li>
                <li><a href="#">Register</a></li>
              </ul>
            </nav>

            <div className={cx(css.headerText, css.body)}>
              <h1>Electronic Music Production</h1>
              <p className={css.headerP}>Tools to hack the learning process</p>
            </div>
          </div>
        </div>
      </header>

      <section className={css.sectionOne}>
        <div className={css.columns}>

          <div className={css.explanation}>
            <img
              src="https://lh3.googleusercontent.com/t9tu3O8GHtcOglMBFRlskAikA4uwxBeF0GUQT9pVjtwQzuPnnRWx8C_qOv_j_J_D1ThjlN7ifmfpHQ93htLFM5VusjC1KeOj2mgMxEThTPxfvLzUST8JRGSGgYMT6dyVABfBD2OYFw=s50-p-k"
              alt="Outline of alternating wavelengths" />
            <h3>Workflow structure</h3>
            <p>
              TjMER recipes guide you through the learning process without the destructive side effect of having to be
              perfect.
            </p>
          </div>

          <div className={css.mathSymbol}>
            +
          </div>

          <div className={css.explanation}>
            <img
              src="https://lh3.googleusercontent.com/ijowQQILlGNyRuTgOIC0ca7nClc4RQKR2JPydUE8utvU7DGmgLJN4ZDImFzvkzy0u51LpQcfTOuWKfzUidWqGEsker9Fz2_JBuXc6XFr6Lk_nj_Pim-8L4mW6s8MAW3H13ZtXRS0TQ=s50-p-k"
              alt="Outline of a stack of files with a music note inside" />
            <h3>Goal setting</h3>
            <p>TjMER allows you to track your practice and writing sessions, giving you a kick in the ass when you need it
            most.</p>
          </div>

          <div className={css.mathSymbol}>
            +
          </div>

          <div className={css.explanation}>
            <img
              src="https://lh3.googleusercontent.com/RAEcLZOQq5rNT41llZrx9sXv-SEPjIWvjhyUjkS3QEoK4fhoKRIYqcH3w9YgZ9ZvAfeJwOSsFXcZXlfTUDTL70CQ51QdwgcDrVjPHx4k7Q8jy1xLb7mkUcUeuch8SNhjrBwnwY91VA=s50-p-k"
              alt="Outline of a DJ keyboard" />
            <h3>The Help Hub</h3>
            <p>Stand on the shoulders of your peers and learn the lessons they learned the hard way. You'll find all kinds
            of tips and tricks here.</p>
          </div>

          <div className={css.mathSymbol}>
            =
          </div>

          <div className={css.explanation}>
            <img
              src="https://lh3.googleusercontent.com/r_xK_syUlxSj1ZYkEsx9-uVMCysLAGvksL0IZcdvHu3GZzM9HuJ4eKc5PPbnRTBmXvU4RG1eEtf7tel_x4YsOgdCNQ6FdOGd0E5Lde1KpnPRqj5NdMKefxECdbxRnwKOzbWJ_QxpGA=s50-p-k"
              alt="Outline of a heart with a music note inside" />
            <h3>Music & results</h3>
            <p>
              With these powers combined, you're on the fast track to getting to where you want to be (while enjoying the
              process).
            </p>
          </div>

        </div>
      </section>

      <section className={css.sectionTwo}>
        <div className={css.container}>
          <h2>Um, great... so how does it actually work?</h2>
          <p>As you can see from above, there are a few moving parts to the app.</p>
          <p>
            TjMER Recipes are a set of steps that get you from a blank DAW to a finished track as fast as producerly
            possible.
            They allow you to practice important techniques like <span>arrangement</span> and <span>finishing</span> that 
            you don't get from watching Youtube vidoes all day.
          </p>
          <p>Think of <span>Recipes</span> like going to the gym for your music production skills.</p>
        </div>
      </section>

      <section className={css.sectionThree}>
        <div className={cx(css.container, css.containerBefore, css.containerAfter)}>

          <h2>Unfortunately, we're not open for business just yet.</h2>
          <p>But we can put you on the waiting list!</p>

          <div className={css.formRow}>
            <form className={cx(css.formNames, css.fn)}>
              <label htmlFor="first-name">First name</label>
              <input 
                id={css.firstName} 
                type="text" 
                required />
            </form>

            <form className={cx(css.formNames, css.ln)}>
              <label htmlFor="last-name">Last name</label>
              <input 
                id={css.lastName} 
                type="text" 
                required />
            </form>
          </div>

            <form className={css.formRow}>
            <label htmlFor="email">Email</label>
              <input 
                id={css.email} 
                type="email" 
                required />
            </form>

          <div className={css.btnDiv}>
            <a href="#" className={css.btn}>Let me know</a>
          </div>

        </div>
      </section>

      <footer>
        <div className={css.footerTop}>
          
          <section className={css.leftFooter}>
            <div className={css.links}>
              <p className={css.footerP}><span>Links</span></p>
              <ul>
                <li><a href="homepage.html">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Log in</a></li>
                <li><a href="#">Register</a></li>
              </ul>
            </div>

            <div className={css.helpHub}>
              <p className={css.footerP}><span>The Help Hub</span></p>
              <ul>
                <li><a href="#">Browse recipes</a></li>
                <li><a href="#">Browse articles</a></li>
                <li><a href="#">Top downloads</a></li>
                <li><a href="#">Creating your first article</a></li>
              </ul>
            </div>
          </section>

          <section className={css.rightFooter}>
            <div className={css.support}>
              <p className={css.footerP}><span>Support</span></p>
              <ul>
                <li><a href="#">Tell us about an issue</a></li>
                <li><a href="#">Get in contact for another reason</a></li>
              </ul>
            </div>

            <div className={cx(css.socialIcons, css.smIcon)}>
              <a href="#">
                <img
                  src="https://lh3.googleusercontent.com/CNM2y3IfKS82acR2S9WehN9W2HlCjcbyMr4gVHhgIS4gx2qTrmPgXVcPnT9aek1hmF8_fPLyIeEIM8meZtxXTm1a6eVaTibycqm9lyflOy3djrBv5WvFN-d2FxZ-57WGPXHKVPYVBQ=s128-p-k"
                  alt="Facebook icon"
                  id={css.smIcon} />
              </a>
              <a href="#">
                <img
                  src="https://lh3.googleusercontent.com/nHNlqbTFbRD_G1OQPlzvyd2WjohjUfo-rRAbBMgy5mzWoTPcHAoArzgjR4hwRLi_HsIEavUEd2K0cbIW_lxHZGzrNCMb_piahQO9BlyrrOWjYHWa9LrGrkzcLpT95065T7m1LWh7og=s128-p-k"
                  alt="Instagram icon"
                  id={css.smIcon} />
              </a>
              <a href="#">
                <img
                  src="https://lh3.googleusercontent.com/sL3dpZV5I5jsOKDoJotmrf2ImgO2xKYf_xSLptUdMQhcyKn4Yp_E54S0gzh6ld-nHtYnQFZt8Tm6dkWEeUafH8wOs57nzS188gooHSz9FyQ5ZmWzD0kGChlMqQWUPiGZdnx-xtIw_A=s128-p-k"
                  alt="Youtube icon"
                  id={css.smIcon} />
              </a>
              <a href="#">
                  <img
                  src="https://lh3.googleusercontent.com/HfDXqE3J1nt4xi28NGZrvBre0Q_0niRjqDKiRbq7rsbGh96u5O5hbE3jkszrhsjr5BNZetS1CfOwsVzZt-xttvhWMxTAgUKWQWWYy9SYLr6J0Er6gUAn0T0xxpPxbUc9Awv-dEDbcA=s128-p-k"
                  alt="Twitter icon"
                  id={css.smIcon} />
              </a>
              <a href="#">
                <img
                  src="https://lh3.googleusercontent.com/4YrEu-1c3TbktPgtOWUMygkWkvQIIWYsvC-WlCHg8FWicsIVZyk-EBe7tkyGukkKqdDuRa4lsqYa0c4ZWfrgl1MLbgQjIxSa9p8n-rHIaUvZ0RrLCY691ScX_PCkeSjIh34XWZFHxg=s128-p-k"
                  alt="Linkedin icon"
                  id={css.smIcon} />
              </a>
            </div>
          </section>
        </div>

      <hr />

        <div className={css.footerBottom}>

          <div className={css.copyright}>
            © 2019 Wigley Bros Ltd.
          </div>

          <nav className={cx(css.legalPriv, css.nav)}>
            <ul>
              <li><a href="#">Legal Stuff</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </nav>

        </div>
      </footer>
    </div>
  )
}
