'use client'

import React, { useState } from 'react'
import styles from './type.module.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useTypeStore from '../../../../store/typeStore'

const Type = ({ type, handleClick, handleSearchByType }) => {
  const [searchText, setSearchText] = useState('')
  const [popUp, setPopUp] = useState(false)

  const { states, setStateName } = useTypeStore(state => {
    return state
  })

  return (
    <div style={{ position: 'relative' }}>
      <button
        className={styles.typeButton}
        onClick={() => {
          handleClick()
          setPopUp(!popUp)
        }}
      >
        {searchText.length === 0 ? (
          <div className={styles.text}>{type} type</div>
        ) : (
          <div className={styles.text}>{searchText}</div>
        )}
        <div>
          <ExpandMoreIcon style={{ width: '27px', height: '28px' }} />
        </div>
      </button>
      <div
        style={{ position: 'absolute', zIndex: '10' }}
        className='flex flex-col rounded-[14px] bg-white mt-1 pt-1 overflow-x-hidden overflow-y-auto h-[300px]'
      >
        {popUp &&
          states?.map((state, index) => (
            <button
              key={index}
              className='bg-white rounded-[14px] w-[180px] p-2 hover:bg-grayText'
              onClick={() => {
                handleSearchByType(state.id)
                setSearchText(state.name)
                setPopUp(false)
                setStateName(state.name)
              }}
            >
              {state.name}
            </button>
          ))}
      </div>
    </div>
  )
}

export default Type
