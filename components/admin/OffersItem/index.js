'use client'

import React, { useState } from 'react'
import AdminTable from '../AdminTable'
import useTypeStore from '../../../store/typeStore'
import { deleteOfferById } from '../../../services/axios'
import toast from 'react-hot-toast'

const OffersItem = () => {

  const [offerId, setOfferId] = useState("")
  const { getOffersState, states } = useTypeStore(state => {
    return state
  })

  const deleteOffer = async (id) => {
    const response = await deleteOfferById(id);
    if (response.status == 204) {
      toast.success("Offer successfully deleted")
    } else {
      toast.error(response.statusText)
    }
  }
  return (
    <div>
      <AdminTable ID={true} image={true} title={true} description={true} items={states} getAllItems={getOffersState} deleteItem={deleteOffer} itemId={offerId}
        setItemId={setOfferId} />
    </div>
  )
}

export default OffersItem
