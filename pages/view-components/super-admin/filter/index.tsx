import SuperAdminFilter from '@modules/super-admin/components/filter';
import { useState } from 'react';

const Filter = () => {
  const options = [
    {
      value: 'active',
      label: 'activated',
    },
    {
      value: 'deactivated',
      label: 'deactivated',
    },
    {
      value: 'suspended',
      label: 'suspended',
    },
  ];
  const complaintsArray = [
    {
      id: 1,
      name: 'Jeffery Dahmer',
      email: 'dahmerbones@gmail.com',
      complaintDescription: 'Order Eaten',
      image: '/../../images/vendorComplaint.png',
      date: '07-09-99',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Mark Essien',
      email: 'markessien@gmail.com',
      image: '/../../images/vendorComplaint.png',
      complaintDescription: 'Bad Product',
      date: '09-07-23',
      status: 'Resolved',
    },
    {
      id: 3,
      name: 'John Kennedy',
      email: 'ken006john@yahoo.com',
      image: '/../../images/vendorComplaint.png',
      complaintDescription: 'Order not recieved',
      date: '09-07-23',
      status: 'InProgress',
    },
    {
      id: 4,
      name: 'Jeffery Dahmer',
      email: 'dahmerbones@gmail.com',
      complaintDescription: 'Order Eaten',
      image: '/../../images/vendorComplaint.png',
      date: '07-09-99',
      status: 'Pending',
    },
    {
      id: 5,
      name: 'Mark Essien',
      email: 'markessien@gmail.com',
      image: '/../../images/vendorComplaint.png',
      complaintDescription: 'Bad Product',
      date: '09-07-23',
      status: 'Resolved',
    },
    {
      id: 6,
      name: 'John Kennedy',
      email: 'ken006john@yahoo.com',
      image: '/../../images/vendorComplaint.png',
      complaintDescription: 'Order not recieved',
      date: '09-07-23',
      status: 'InProgress',
    },
    {
      id: 7,
      name: 'Jeffery Dahmer',
      email: 'dahmerbones@gmail.com',
      complaintDescription: 'Order Eaten',
      image: '/../../images/vendorComplaint.png',
      date: '07-09-99',
      status: 'Pending',
    },
    {
      id: 8,
      name: 'Mark Essien',
      email: 'markessien@gmail.com',
      image: '/../../images/vendorComplaint.png',
      complaintDescription: 'Bad Product',
      date: '09-07-23',
      status: 'Resolved',
    },
    {
      id: 9,
      name: 'John Kennedy',
      email: 'ken006john@yahoo.com',
      image: '/../../images/vendorComplaint.png',
      complaintDescription: 'Order not recieved',
      date: '09-07-23',
      status: 'InProgress',
    },
  ];
  const [tableData, setTableDate] = useState(complaintsArray);
  return (
    <div>
      <SuperAdminFilter options={options} tableData={tableData} setTableDate={setTableDate} />
    </div>
  );
};

export default Filter;
