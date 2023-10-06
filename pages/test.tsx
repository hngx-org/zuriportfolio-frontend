import React from 'react'
//import EmptyCart from '@modules/shop/component/cart/EmptyCart'
import MainLayout from '../components/Layout/MainLayout'
//import CancelPaymentModal from '@modules/shop/component/cart/checkout/CancelPaymentModal'
import PaymentRedirect from '@modules/shop/component/cart/checkout/PaymentRedirect'

const test = () => {
  return (
    <MainLayout activePage="home" showDashboardSidebar={false} showTopbar>

<div><PaymentRedirect/></div>
        </MainLayout>
   
  )
}

export default test