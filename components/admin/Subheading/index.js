import React from 'react'
import styles from './subheading.module.css'
import Type from './Type'
import Add from './Add'
import { montserrat, roboto, mukta } from '../../../helper/font'

const Subheading = ({ text, type, add, handleClick, handleSearchByType }) => {
  return (
    <div
      className={`${styles.subheading} flex flex-1 items-center ps-[40px] pe-[20px] justify-between mb-12`}
    >
      <div className={`${styles.text} ${roboto.className}`}>{text}</div>
      <div className='flex gap-5'>
        {type && (
          <Type
            type={type}
            handleClick={handleClick}
            handleSearchByType={handleSearchByType}
          />
        )}
        {add && <Add add={add} />}
      </div>
    </div>
  )
}

export default Subheading
