import React from 'react'
import { Helmet } from 'react-helmet'

const NotFound = () => {

  return <>
  <Helmet>
<title>NotFound Page</title>
</Helmet>
  <div className="page-error">
  <p>This page is not found</p></div>
    </>
}

export default NotFound