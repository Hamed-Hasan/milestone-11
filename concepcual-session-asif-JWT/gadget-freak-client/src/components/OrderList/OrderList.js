import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase.init';

const OrderList = () => {

const [user] = useAuthState(auth)
const [orderList, setOrderList] = useState([]);
useEffect(() => {
  const url = `http://localhost:5000/orderList`
  fetch(url,{
    headers: {
      'authorization':`${user.email} ${localStorage.getItem("accessToken")}`
    }
  })
  .then(res => res.json())
  .then(data => setOrderList(data))
}, [user.email]);
const handleDelete = id => {

const proceed = window.confirm('you want to delete this item?')
if(proceed) {
  const url = `http://localhost:5000/delete/${id}`;
  fetch(url, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(data => {
      const remaining = orderList.filter(product => product._id !== id);
      setOrderList(remaining);
  })

}





}
  return (
    <div>
      <h2>Total Orders : {orderList.length}</h2>
      <ol>
        {
          orderList?.map(order=><li>
            <h2>
            {order.name}
            </h2>
            <p> {order.email}</p>
            <p> {order.price}</p>
           <img src={order.img} width="200px" alt="" />

          <button onClick={() => handleDelete(order._id)}>x</button>
          </li>)
        }
      </ol>
    </div>
  )
}

export default OrderList