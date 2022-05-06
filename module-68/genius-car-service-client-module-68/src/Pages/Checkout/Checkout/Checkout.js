import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    // step 1 module 68
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user, loading, error] = useAuthState(auth);
    
    // const [user, setUser] = useState({
    //     name: 'enter your name', 
    //     email: 'example@gmail.com',
    //     address: 'BD programming hero',
    //     phone: '0999993333333'
    // });
    // const handleChange = (event) => {
    //    const {address, ...rest} = user
    //    const newAddress = event.target.value
    //    const newUser = {address: newAddress, ...rest}
    //    setUser(newUser)
    // }
    const handlePlaceOrder = (event) => {
        event.preventDefault();
        const order = {
            name: service.name,
            email: user.email,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
    axios.post('http://localhost:5000/order', order)
    .then(res => {
        const {data} = res
        if(data.insertedId){
            toast.success('sent info to server')
            event.target.reset()
        }
    })
    }
    return (
        <div>
            <h2>Please bookd your booking {service.name}</h2>
            <form className="w-50 mx-auto" onSubmit={handlePlaceOrder}>
                <input type="text" name='name' placeholder="Name" value={user?.displayName} className="w-100 mb-2"/> <br />
                <input type="email" name='email' value={user?.email} className="w-100 mb-2"/> <br />
                <input type="text" name='address' placeholder="Address"  className="w-100 mb-2"/> <br />
                <input type="phone" name='phone' placeholder="Phone" className="w-100 mb-2"/> <br /> <br />
                <input type="submit" value="submit" className='btn btn-primary' />
            </form>
        </div>
    );
};

export default Checkout;