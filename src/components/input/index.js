import React from 'react'

import './styles.css'

export default ({ className, ...props}) => {
  return (
    <input className={"input " + className} {...props} />
  )
}
