import React, { useState } from 'react'
import { deleteOrderFromDB } from '../../../services/axios'
import toast from 'react-hot-toast'
import useTypeStore from '../../../store/typeStore'
import AdminTable from '../AdminTable'

const OrdersItem = () => {

  const [orderId, setOrderId] = useState("")
  const data = {
    "order_id": orderId
  }
  const { getOrdersState, states } = useTypeStore(state => {
    return state
  })

  const deleteOrder = async (data) => {
    const response = await deleteOrderFromDB(data);
    if (response.status == 204) {
      toast.success("Order successfully deleted")
    } else {
      toast.error(response.statusText)
    }
  }
  return (
    <div>
      <AdminTable ID={true} customerID={true} time={true} deliveryAddress={true} amout={true} paymentMethod={true} contact={true} items={states} getAllItems={getOrdersState} deleteItem={deleteOrder} itemId={data}
        setItemId={setOrderId} />
    </div>
  )
}

export default OrdersItem
