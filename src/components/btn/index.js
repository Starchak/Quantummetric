import React from 'react'

import './styles.css'

export default ({ className, text, ...props}) => {
  return (
    <div className={"btn " + className} {...props}>{text}</div>
  )
}
