import React, { useEffect, useState } from 'react';
import CartPaymentsuccessModal, { CartPaymentFailureModal } from '../../components/Modals/CartPaymentModal';
import { confirmTransaction } from '../../http/checkout';



export default function successful() {
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=> {
    async function confirmTransactionStatus() {
      const query = new URLSearchParams(window.location.search);
      const token = localStorage.getItem('zpt') as string;
      const payment_gateway = localStorage.getItem('gateway') as string;
      const queryKey = payment_gateway == "paystack" ? 'trxref': "tx_ref";
      const txn_ref = query.get(queryKey) as string;
      const confirmResponse = await confirmTransaction({token,txn_ref,payment_gateway})
      setSuccess(confirmResponse)
      setIsLoading(false)
    }
    confirmTransactionStatus()
  })
  return (
    !isLoading && (success ? <CartPaymentsuccessModal></CartPaymentsuccessModal> : <CartPaymentFailureModal></CartPaymentFailureModal>)
  
  )
}

