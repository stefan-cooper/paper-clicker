import React from 'react'

export const Button = ({text = '', disabled = false, onClick = () => {}}) => {
  return (
    <div className={disabled ? 'disabled clicker' : 'clicker'} onClick={!disabled && onClick}>
      {text}
    </div>
  )
}
