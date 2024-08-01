import React, { useEffect, useState } from 'react'
import styles from './ordersTable.module.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteModal from '../../DeleteModal'
import { Pagination, Stack } from '@mui/material'
import { getOrders } from '../../../../services/axios'
// import { montserrat, roboto, mukta } from '../../../../helper/font'
import { StyledTableCell, StyledTableRow } from '../../StyledTable'

const OrdersTable = () => {
  const [activateModal, setActivateModal] = useState(false)
  const [orders, setOrders] = useState([])
  const getAllOrders = async () => {
    const response = await getOrders()
    const orders = response.data.result.data
    setOrders(orders)
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const subset = orders.slice(startIndex, endIndex)
  useEffect(() => {
    setTotalPages(Math.ceil(orders.length / itemsPerPage))
  })

  const paginated = (event, value) => {
    setCurrentPage(value - 1)
  }

  const main = {
    '& .MuiPaginationItem-root': {
      color: '#fff'
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Customer ID</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Delivery Address</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Payment Method</StyledTableCell>
              <StyledTableCell>Contact</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subset.map(row => (
              <StyledTableRow key={row.id} hover='true'>
                <StyledTableCell component='th' scope='row'>
                  <span className={styles.id}>{row.id}</span>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {row.customer_id}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.created}</StyledTableCell>
                <StyledTableCell align='right'>
                  {row.delivery_address}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.amount}</StyledTableCell>
                <StyledTableCell align='right'>
                  {row.payment_method}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.contact}</StyledTableCell>
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

export default OrdersTable
