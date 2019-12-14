import React, { useState } from 'react'
import css from '../../styles/TjmerSite/About.styl'
import cx from 'classnames'


export default function About() {
  // const [state, setState] = useState()
  return (
    <div>
      <div className={css.headerContainer}>
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
      </div>

      <section className={css.sectionOne}>
        <div className={css.container}>
          <h1>About us</h1>
          <p>
            As a beginner to any skill or hobby, getting started is often the most difficult part.
            TjMER is a tool that helps aspiring music producers establish a "flow": <span>learn, 
            do, practice, repeat.</span>
          </p>
          <p>
            Here at TjMER, we believe that practice and dedication are the most
            important building blocks to becoming the talented producer you want to be.
            By providing guidelines, recipes, and a helpful community of peers, we give you the tools
            necessary to pick up skills quickly and efficiently.
          </p>
        </div>
      </section>

      <section className={css.sectionTwo}>
        <div className={css.container}>
          <blockquote>
            <h3 className={css.quotation}>
              To become really good at anything, you have to practice and repeat, 
              practice and repeat, until the technique becomes intuitive.
            </h3>
            <p className={css.author}>- Paulo Coelho</p>
          </blockquote>
        </div>
      </section>

      <section className={css.sectionThree}>
        <div className={css.containerBio}>
          <h2>Meet our team</h2>
          <div className={css.ben}>
            <img
              src="https://lh3.googleusercontent.com/MU4AlMYNx6AS-n5ETTSqDzlqPe9dqtIZ44LjLh2OkgbdPVHEFa1U9U1OPwN8M0FYTudYSoStnq6iyqLDn1ICulxAByJG-aA_N4i0FcR-pl0PNIUzemWEhzXhApRs6xs9T-8wJXEiaQ=w2400"
              alt="profile picture"
              className={css.bioPic} />
            <div className={css.bioText}>
              <h3>Ben Wigley</h3>
              <h4>CEO and founder</h4>
              <p>
                Ben is a long-time New Zealand-based web developer who has worked with companies such as Condé Nast and Banqer.
                As a musician himself, he wanted to create a space for aspiring producers to share, learn, and grow.
                When he's not coding, Ben spends his time tending to his market garden and working on various side projects.
              </p>
            </div>
          </div>

          <div className={css.nicole}>
            <img
              src="https://lh3.googleusercontent.com/uGMlDydRkF5UJblFsFFfQgIBf-6FHwa2U8N9JeO21y5diYH24kcPm3NtqxdTTZjpdUUwE-psXhXwOgkxuBuBVipNZWo0c9T2NVRcplblcbeYnjRNBdKN_cG-Qn3qEfSECVJ_MXetEA=w2400"
              alt="profile picture"
              className={css.bioPic} />
            <div className={css.bioText}>
              <h3>Nicole Janowski</h3>
              <h4>Developer</h4>
              <p>
                Originally from Chicago, Nicole is a part-time coder, part-time flight attendant living in New Zealand.
                Her passions for travelling and web design have allowed her to embrace the digital nomad lifestyle.
                She can often be found basking in the sun or reading a good book.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className={css.sectionFour}>
        <div className={css.container}>
          <h2 className={css.h2Team}>Interested in joining our team?</h2>
          <p>
            Email <a href="mailto:careers@tjmer.com"><span>careers@tjmer.com</span></a>.
          </p>
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
