import React, { useEffect, useState } from 'react'
import styles from './categoryTable.module.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import useTypeStore from '../../../../store/typeStore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteModal from '../../DeleteModal'
import { Pagination, Stack } from '@mui/material'
// import { montserrat, roboto, mukta } from '../../../../helper/font'
import { StyledTableCell, StyledTableRow } from '../../StyledTable'

const CategoryTable = () => {
  const [activateModal, setActivateModal] = useState(false)
  const { getCategoryState, states } = useTypeStore(state => {
    return state
  })

  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const subset = states.slice(startIndex, endIndex)
  useEffect(() => {
    setTotalPages(Math.ceil(states.length / itemsPerPage))
  })

  const paginated = (event, value) => {
    setCurrentPage(value - 1)
  }

  const main = {
    '& .MuiPaginationItem-root': {
      color: '#fff'
    }
  }

  useEffect(() => {
    getCategoryState()
  }, [])
  console.log(states)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align='right'>Image</StyledTableCell>
              <StyledTableCell align='right'>Name</StyledTableCell>
              <StyledTableCell align='right'>Slug</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subset.map(row => (
              <StyledTableRow key={row.id} hover='true'>
                <StyledTableCell component='th' scope='row'>
                  <span className={styles.id}>{row.id}</span>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <img src={row.img_url} className={styles.image} />
                </StyledTableCell>
                <StyledTableCell align='right'>{row.name}</StyledTableCell>
                <StyledTableCell align='right'>{row.slug}</StyledTableCell>
                <StyledTableCell align='right'>
                  <div className='flex flex-row justify-end  my-3 me-[5px]'>
                    <div className={styles.edit}>
                      <BorderColorIcon style={{ color: '#00B2A9' }} />
                    </div>
                    <div className={styles.delete}>
                      <DeleteForeverIcon
                        style={{ color: '#EB5757' }}
                        onClick={() => {
                          setActivateModal(true)
                          // setRestaurantId(restaurant.id)
                        }}
                      />
                    </div>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='flex flex-col items-center '>
        {totalPages > 1 && (
          <Stack spacing={2} sx={{ marginTop: '70px' }}>
            <Pagination
              count={totalPages}
              color='secondary'
              sx={main}
              size='large'
              style={{ color: 'white' }}
              onChange={paginated}
            />
          </Stack>
        )}
      </div>
      {/* {activateModal && <DeleteModal id={restaurantId} />} */}
    </div>
  )
}

export default CategoryTable
