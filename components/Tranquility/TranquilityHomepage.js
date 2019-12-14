import React, { useState } from 'react'
import css from './TranquilityHomepage.styl'
import cx from 'classnames'
import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "https://tranquilitymarketgarden.us4.list-manage.com/subscribe/post?u=a8917195c401b746be7f5974a&amp;id=c64fe4e335"


export default function TranquilityHomepage() {
  // const [state, setState] = useState()
  return (
    <div className={css.tranquility}>
      
      <MailchimpSubscribe url={url} />

    </div>
  )
}
