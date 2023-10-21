import React from 'react';
import CartPaymentsuccessModal, { CartPaymentFailureModal } from '../../components/Modals/CartPaymentModal';

type Props = {};

export default function successful({}: Props) {
  // return <CartPaymentsuccessModal></CartPaymentsuccessModal>;
  return <CartPaymentFailureModal></CartPaymentFailureModal>;
}
