"use client"

import React, { useEffect, useState } from 'react'
import styles from './adminTable.module.css'
import useDeleteModalStore from '../../../store/deleteModalStore/deleteModalStore'
import { Pagination, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { StyledTableCell, StyledTableRow } from '../StyledTable'
import DeleteModal from '../DeleteModal'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CategoryPopup from '../CategoryItem/CategoryPopup'
import showCategoryPopupStore from '../../../store/showCategoryPopupStore'
import OffersPopup from '../OffersItem/OffersPopup'
import useShowOffersPopupStore from '../../../store/showOffersPopupStore'

const AdminTable = (
    {
        tableName,
        ID,
        customerID,
        time,
        deliveryAddress,
        amount,
        paymentMethod,
        contact,
        image,
        name,
        slug,
        title,
        description,

        items,
        getAllItems,
        deleteItem,
        itemId,
        setItemId
    }
) => {

    const [activateModal, setActivateModal] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [editData, setEditData] = useState(null);

    const { showCategoryPopup, setShowCategoryPopup } = showCategoryPopupStore(state => {
        return state
    })

    const { showOffersPopup, setShowOffersPopup } = useShowOffersPopupStore(state => {
        return state
    })

    const { refresh } = useDeleteModalStore();

    useEffect(() => {
        getAllItems()
    }, [])

    useEffect(() => {
        getAllItems()
    }, [refresh])

    const itemsPerPage = 6
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const subset = items.slice(startIndex, endIndex)
    useEffect(() => {
        setTotalPages(Math.ceil(items.length / itemsPerPage))
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
                            {ID && <StyledTableCell>ID</StyledTableCell>}
                            {image && <StyledTableCell align='right'>Image</StyledTableCell>}
                            {name && <StyledTableCell align='right'>Name</StyledTableCell>}
                            {slug && <StyledTableCell align='right'>Slug</StyledTableCell>}
                            {title && <StyledTableCell>Title</StyledTableCell>}
                            {description && <StyledTableCell>Description</StyledTableCell>}
                            {customerID && <StyledTableCell>Customer ID</StyledTableCell>}
                            {time && <StyledTableCell>Time</StyledTableCell>}
                            {deliveryAddress && <StyledTableCell>Delivery Address</StyledTableCell>}
                            {amount && <StyledTableCell>Amount</StyledTableCell>}
                            {paymentMethod && <StyledTableCell>Payment Method</StyledTableCell>}
                            {contact && <StyledTableCell>Contact</StyledTableCell>}
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subset.map(row => (
                            <StyledTableRow key={row.id} hover={true}>
                                {
                                    ID && <StyledTableCell component='th' scope='row'>
                                        <span className={styles.id}>{row.id}</span>
                                    </StyledTableCell>
                                }
                                {
                                    image && <StyledTableCell align='right'>
                                        <img src={row.img_url} className={styles.image} />
                                    </StyledTableCell>
                                }
                                {
                                    name && <StyledTableCell align='right'>{row.name}</StyledTableCell>
                                }
                                {
                                    slug && <StyledTableCell align='right'>{row.slug}</StyledTableCell>
                                }
                                {
                                    title && <StyledTableCell align='right'>{row.name}</StyledTableCell>
                                }
                                {
                                    description && <StyledTableCell align='right'>
                                        {row.description}
                                    </StyledTableCell>
                                }
                                {
                                    customerID && <StyledTableCell align='right'>
                                        {row.customer_id}
                                    </StyledTableCell>
                                }
                                {
                                    time && <StyledTableCell align='right'>{row.created}</StyledTableCell>
                                }
                                {
                                    deliveryAddress && <StyledTableCell align='right'>
                                        {row.delivery_address}
                                    </StyledTableCell>
                                }
                                {amount && <StyledTableCell align='right'>{row.amount}</StyledTableCell>}
                                {
                                    paymentMethod && <StyledTableCell align='right'>
                                        {row.payment_method}
                                    </StyledTableCell>
                                }
                                {contact && <StyledTableCell align='right'>{row.contact}</StyledTableCell>}
                                <StyledTableCell align='right'>
                                    <div className='flex flex-row justify-end  my-3 me-[5px]'>
                                        <div className={styles.edit}>
                                            <BorderColorIcon style={{ color: '#00B2A9' }}
                                                onClick={() => {
                                                    if (tableName === "Category") {
                                                        setShowCategoryPopup(true)
                                                    } else if (tableName === "Offers") {
                                                        setShowOffersPopup(true)
                                                    }
                                                    setEditData(row)
                                                    setItemId(row.id)
                                                }}
                                            />
                                        </div>
                                        <div className={styles.delete}>
                                            <DeleteForeverIcon
                                                style={{ color: '#EB5757' }}
                                                onClick={() => {
                                                    setActivateModal(true)
                                                    setItemId(row.id)
                                                    setOpenModal(!openModal)
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
            {activateModal && <DeleteModal id={itemId} deleteItem={deleteItem} openModal={openModal} />}
            {showCategoryPopup && <CategoryPopup editData={editData} setEditData={setEditData} />}
            {showOffersPopup && <OffersPopup editData={editData} setEditData={setEditData} />}
        </div>
    )
}

export default AdminTable