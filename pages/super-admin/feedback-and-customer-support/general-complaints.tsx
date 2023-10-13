import { Input } from '@ui/Input';
import React, { useEffect, useState } from 'react';
import Pagination from '../../view-components/super-admin/pagination';
import Nav from '../../view-components/super-admin/navbar';
import Image from 'next/image';
import Link from 'next/link';
import VendorComplaint from '../../../public/assets/images/vendorComplaint.png';

interface ResolvedType {
  total_resolved: number;
  // Add other properties as needed
}

interface PendingType {
  total_pending: number;
  // Add other properties as needed
}

interface InProgressType {
  total_in_progress: number;
  // Add other properties as needed
}

interface Complain {
  id: number;
  status: string;
  // Add other properties based on your data structure
}

function GeneralComplaints({ complain }: { complain: Complain }) {
  const initialStatus = complain ? complain.status : '';
  const [complainStatus, setComplainStatus] = useState(initialStatus);

  const handleStatusUpdate = async () => {
    // New status value (e.g., 'resolved')
    const newStatus = 'in Progress';

    // Update the complainStatus in the component's state
    setComplainStatus(newStatus);

    // Send a request to update the status on the server
    try {
      const response = await fetch('https://team-mirage-super-amind2.onrender.com/api/admin/feedback/complaints', {
        method: 'PUT', // or 'POST' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: complain.id, // Include the complain ID for identification
          status: newStatus, // Updated status value
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      // Revert the status in the component's state if there was an error
      setComplainStatus(initialStatus);
    }
  };

  const [fetchComplains, setfetchComplaints] = useState([]);
  const [search, setSearch] = React.useState<string>('');
  const [filter, setFilter] = React.useState<string>('');
  const [tag, setTag] = React.useState<string>('pending');

  function changeTag() {
    setTag('In Review');
  }

  React.useEffect(() => {
    fetch('https://team-mirage-super-amind2.onrender.com/api/admin/feedback/complaints/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const dataArray = data.data;
        setfetchComplaints(dataArray);
        console.log(dataArray);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle the error or set an error state in your component
      });
  }, []);

  // State to store the API data
  const [pending, setpending] = useState<PendingType | null>(null);

  // Fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/admin/feedback/pending-complaints/',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setpending(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // State to store the API data
  const [inProgress, setinProgress] = useState<InProgressType | null>(null);

  // Fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/admin/feedback/in-progress-complaints/',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setinProgress(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // State to store the API data
  const [resolved, setResolved] = useState<ResolvedType | null>(null);

  // Fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/admin/feedback/resolved-complaints/',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResolved(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-4/5 flex justify-center items-start flex-col">
          <div className="w-full flex flex-col items-start justify-between h-42 ">
            <h1 className="font-manropeL text-2xl mb-2.5 mt-2.5  font-semibold">Complaints Overview</h1>
            <div className="w-full flex flex-row justify-between max-md:flex max-md:flex-col">
              <div className="w-96 flex flex-col justify-between p-6 items-start h-28 shadow-md rounded-lg max-lg:w-60 max-md:w-full">
                <div className="flex justify-between w-full ">
                  <h2 className="font-manropeL text-sm font-normal h-5 text-neutral-500">Resolved</h2>
                  <svg
                    className="h-5 cursor-pointer"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.66797 15.8333C8.66797 16.75 9.41797 17.5 10.3346 17.5C11.2513 17.5 12.0013 16.75 12.0013 15.8333C12.0013 14.9167 11.2513 14.1667 10.3346 14.1667C9.41797 14.1667 8.66797 14.9167 8.66797 15.8333Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.66797 4.16732C8.66797 5.08398 9.41797 5.83398 10.3346 5.83398C11.2513 5.83398 12.0013 5.08398 12.0013 4.16732C12.0013 3.25065 11.2513 2.50065 10.3346 2.50065C9.41797 2.50065 8.66797 3.25065 8.66797 4.16732Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.66797 9.99935C8.66797 10.916 9.41797 11.666 10.3346 11.666C11.2513 11.666 12.0013 10.916 12.0013 9.99935C12.0013 9.08268 11.2513 8.33268 10.3346 8.33268C9.41797 8.33268 8.66797 9.08268 8.66797 9.99935Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {resolved ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{resolved.total_resolved}</h1>
                  ) : (
                    <p>Loading....</p>
                  )}
                  <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl bg-green-100">
                    <svg width="67" height="24" viewBox="0 0 67 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.333984" width="66" height="24" rx="12" fill="#E6F5EA" />
                      <path
                        d="M20.3804 10.3807L16.3338 6.33398L12.2871 10.3807"
                        stroke="#009254"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.334 17.6673V6.44727"
                        stroke="#009254"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M29.5008 17V8.299L27.6038 9.447V8.054L29.5008 6.92H30.7678V17H29.5008ZM36.8683 17.21C36.215 17.21 35.6317 17.063 35.1183 16.769C34.6097 16.4703 34.206 16.0667 33.9073 15.558C33.6133 15.0447 33.4663 14.4613 33.4663 13.808V10.112C33.4663 9.45867 33.6133 8.87533 33.9073 8.362C34.206 7.84867 34.6097 7.445 35.1183 7.151C35.6317 6.857 36.215 6.71 36.8683 6.71C37.5217 6.71 38.105 6.857 38.6183 7.151C39.1317 7.445 39.5353 7.84867 39.8293 8.362C40.1233 8.87533 40.2703 9.45867 40.2703 10.112V13.808C40.2703 14.4613 40.1233 15.0447 39.8293 15.558C39.5353 16.0667 39.1317 16.4703 38.6183 16.769C38.105 17.063 37.5217 17.21 36.8683 17.21ZM36.8683 16.013C37.265 16.013 37.6243 15.9173 37.9463 15.726C38.2683 15.5347 38.525 15.278 38.7163 14.956C38.9077 14.6293 39.0033 14.27 39.0033 13.878V10.035C39.0033 9.63833 38.9077 9.279 38.7163 8.957C38.525 8.635 38.2683 8.37833 37.9463 8.187C37.6243 7.99567 37.265 7.9 36.8683 7.9C36.4763 7.9 36.117 7.99567 35.7903 8.187C35.4683 8.37833 35.2117 8.635 35.0203 8.957C34.829 9.279 34.7333 9.63833 34.7333 10.035V13.878C34.7333 14.27 34.829 14.6293 35.0203 14.956C35.2117 15.278 35.4683 15.5347 35.7903 15.726C36.117 15.9173 36.4763 16.013 36.8683 16.013ZM43.385 17L42.545 16.16L51.799 6.92L52.639 7.76L43.385 17ZM50.539 17.21C50.077 17.21 49.6547 17.098 49.272 16.874C48.894 16.6453 48.5907 16.342 48.362 15.964C48.1333 15.5813 48.019 15.1567 48.019 14.69C48.019 14.2327 48.1357 13.8127 48.369 13.43C48.6023 13.0473 48.9103 12.7417 49.293 12.513C49.6757 12.2843 50.091 12.17 50.539 12.17C51.001 12.17 51.4233 12.2843 51.806 12.513C52.1887 12.737 52.492 13.0403 52.716 13.423C52.9447 13.801 53.059 14.2233 53.059 14.69C53.059 15.1567 52.9447 15.5813 52.716 15.964C52.492 16.342 52.1887 16.6453 51.806 16.874C51.4233 17.098 51.001 17.21 50.539 17.21ZM50.539 16.111C50.7957 16.111 51.0313 16.0457 51.246 15.915C51.4653 15.7843 51.638 15.6117 51.764 15.397C51.8947 15.1823 51.96 14.9467 51.96 14.69C51.96 14.4333 51.8947 14.1977 51.764 13.983C51.638 13.7637 51.4653 13.591 51.246 13.465C51.0313 13.3343 50.7957 13.269 50.539 13.269C50.2823 13.269 50.0467 13.3343 49.832 13.465C49.6173 13.591 49.4447 13.7637 49.314 13.983C49.1833 14.1977 49.118 14.4333 49.118 14.69C49.118 14.9467 49.1833 15.1823 49.314 15.397C49.4447 15.6117 49.6173 15.7843 49.832 15.915C50.0467 16.0457 50.2823 16.111 50.539 16.111ZM44.645 11.75C44.183 11.75 43.7607 11.638 43.378 11.414C42.9953 11.1853 42.6897 10.882 42.461 10.504C42.237 10.1213 42.125 9.69667 42.125 9.23C42.125 8.77267 42.2417 8.35267 42.475 7.97C42.7083 7.58733 43.0163 7.28167 43.399 7.053C43.7817 6.82433 44.197 6.71 44.645 6.71C45.107 6.71 45.527 6.82433 45.905 7.053C46.2877 7.277 46.5933 7.58033 46.822 7.963C47.0507 8.341 47.165 8.76333 47.165 9.23C47.165 9.69667 47.0507 10.1213 46.822 10.504C46.5933 10.882 46.2877 11.1853 45.905 11.414C45.527 11.638 45.107 11.75 44.645 11.75ZM44.645 10.651C44.9017 10.651 45.1373 10.5857 45.352 10.455C45.5713 10.3243 45.744 10.1517 45.87 9.937C46.0007 9.72233 46.066 9.48667 46.066 9.23C46.066 8.97333 46.0007 8.73767 45.87 8.523C45.744 8.30367 45.5713 8.131 45.352 8.005C45.1373 7.87433 44.9017 7.809 44.645 7.809C44.3883 7.809 44.1527 7.87433 43.938 8.005C43.7233 8.131 43.5507 8.30367 43.42 8.523C43.2893 8.73767 43.224 8.97333 43.224 9.23C43.224 9.48667 43.2893 9.72233 43.42 9.937C43.5507 10.1517 43.7233 10.3243 43.938 10.455C44.1527 10.5857 44.3883 10.651 44.645 10.651Z"
                        fill="#009254"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-96 flex flex-col justify-between p-6 items-start h-28 shadow-md rounded-lg max-lg:w-60 max-md:w-full">
                <div className="flex justify-between w-full ">
                  <h2 className="font-manropeL text-sm font-normal h-5 text-neutral-500">Pending</h2>
                  <svg
                    className="h-5 cursor-pointer"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.66797 15.8333C8.66797 16.75 9.41797 17.5 10.3346 17.5C11.2513 17.5 12.0013 16.75 12.0013 15.8333C12.0013 14.9167 11.2513 14.1667 10.3346 14.1667C9.41797 14.1667 8.66797 14.9167 8.66797 15.8333Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.66797 4.16732C8.66797 5.08398 9.41797 5.83398 10.3346 5.83398C11.2513 5.83398 12.0013 5.08398 12.0013 4.16732C12.0013 3.25065 11.2513 2.50065 10.3346 2.50065C9.41797 2.50065 8.66797 3.25065 8.66797 4.16732Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.66797 9.99935C8.66797 10.916 9.41797 11.666 10.3346 11.666C11.2513 11.666 12.0013 10.916 12.0013 9.99935C12.0013 9.08268 11.2513 8.33268 10.3346 8.33268C9.41797 8.33268 8.66797 9.08268 8.66797 9.99935Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {pending ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{pending.total_pending}</h1>
                  ) : (
                    <p>Loading...</p>
                  )}
                  <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl bg-yellow-50">
                    <svg width="67" height="24" viewBox="0 0 67 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.667969" width="66" height="24" rx="12" fill="#FFF6AF" />
                      <path
                        d="M20.7144 10.3807L16.6678 6.33398L12.6211 10.3807"
                        stroke="#E5B800"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.668 17.6673V6.44727"
                        stroke="#E5B800"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M29.8348 17V8.299L27.9378 9.447V8.054L29.8348 6.92H31.1018V17H29.8348ZM37.2023 17.21C36.549 17.21 35.9656 17.063 35.4523 16.769C34.9436 16.4703 34.54 16.0667 34.2413 15.558C33.9473 15.0447 33.8003 14.4613 33.8003 13.808V10.112C33.8003 9.45867 33.9473 8.87533 34.2413 8.362C34.54 7.84867 34.9436 7.445 35.4523 7.151C35.9656 6.857 36.549 6.71 37.2023 6.71C37.8556 6.71 38.439 6.857 38.9523 7.151C39.4656 7.445 39.8693 7.84867 40.1633 8.362C40.4573 8.87533 40.6043 9.45867 40.6043 10.112V13.808C40.6043 14.4613 40.4573 15.0447 40.1633 15.558C39.8693 16.0667 39.4656 16.4703 38.9523 16.769C38.439 17.063 37.8556 17.21 37.2023 17.21ZM37.2023 16.013C37.599 16.013 37.9583 15.9173 38.2803 15.726C38.6023 15.5347 38.859 15.278 39.0503 14.956C39.2416 14.6293 39.3373 14.27 39.3373 13.878V10.035C39.3373 9.63833 39.2416 9.279 39.0503 8.957C38.859 8.635 38.6023 8.37833 38.2803 8.187C37.9583 7.99567 37.599 7.9 37.2023 7.9C36.8103 7.9 36.451 7.99567 36.1243 8.187C35.8023 8.37833 35.5456 8.635 35.3543 8.957C35.163 9.279 35.0673 9.63833 35.0673 10.035V13.878C35.0673 14.27 35.163 14.6293 35.3543 14.956C35.5456 15.278 35.8023 15.5347 36.1243 15.726C36.451 15.9173 36.8103 16.013 37.2023 16.013ZM43.719 17L42.879 16.16L52.133 6.92L52.973 7.76L43.719 17ZM50.873 17.21C50.411 17.21 49.9887 17.098 49.606 16.874C49.228 16.6453 48.9247 16.342 48.696 15.964C48.4673 15.5813 48.353 15.1567 48.353 14.69C48.353 14.2327 48.4697 13.8127 48.703 13.43C48.9363 13.0473 49.2443 12.7417 49.627 12.513C50.0097 12.2843 50.425 12.17 50.873 12.17C51.335 12.17 51.7573 12.2843 52.14 12.513C52.5227 12.737 52.826 13.0403 53.05 13.423C53.2787 13.801 53.393 14.2233 53.393 14.69C53.393 15.1567 53.2787 15.5813 53.05 15.964C52.826 16.342 52.5227 16.6453 52.14 16.874C51.7573 17.098 51.335 17.21 50.873 17.21ZM50.873 16.111C51.1297 16.111 51.3653 16.0457 51.58 15.915C51.7993 15.7843 51.972 15.6117 52.098 15.397C52.2287 15.1823 52.294 14.9467 52.294 14.69C52.294 14.4333 52.2287 14.1977 52.098 13.983C51.972 13.7637 51.7993 13.591 51.58 13.465C51.3653 13.3343 51.1297 13.269 50.873 13.269C50.6163 13.269 50.3807 13.3343 50.166 13.465C49.9513 13.591 49.7787 13.7637 49.648 13.983C49.5173 14.1977 49.452 14.4333 49.452 14.69C49.452 14.9467 49.5173 15.1823 49.648 15.397C49.7787 15.6117 49.9513 15.7843 50.166 15.915C50.3807 16.0457 50.6163 16.111 50.873 16.111ZM44.979 11.75C44.517 11.75 44.0947 11.638 43.712 11.414C43.3293 11.1853 43.0237 10.882 42.795 10.504C42.571 10.1213 42.459 9.69667 42.459 9.23C42.459 8.77267 42.5757 8.35267 42.809 7.97C43.0423 7.58733 43.3503 7.28167 43.733 7.053C44.1157 6.82433 44.531 6.71 44.979 6.71C45.441 6.71 45.861 6.82433 46.239 7.053C46.6217 7.277 46.9273 7.58033 47.156 7.963C47.3847 8.341 47.499 8.76333 47.499 9.23C47.499 9.69667 47.3847 10.1213 47.156 10.504C46.9273 10.882 46.6217 11.1853 46.239 11.414C45.861 11.638 45.441 11.75 44.979 11.75ZM44.979 10.651C45.2357 10.651 45.4713 10.5857 45.686 10.455C45.9053 10.3243 46.078 10.1517 46.204 9.937C46.3347 9.72233 46.4 9.48667 46.4 9.23C46.4 8.97333 46.3347 8.73767 46.204 8.523C46.078 8.30367 45.9053 8.131 45.686 8.005C45.4713 7.87433 45.2357 7.809 44.979 7.809C44.7223 7.809 44.4867 7.87433 44.272 8.005C44.0573 8.131 43.8847 8.30367 43.754 8.523C43.6233 8.73767 43.558 8.97333 43.558 9.23C43.558 9.48667 43.6233 9.72233 43.754 9.937C43.8847 10.1517 44.0573 10.3243 44.272 10.455C44.4867 10.5857 44.7223 10.651 44.979 10.651Z"
                        fill="#E5B800"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-96 flex flex-col justify-between p-6 items-start h-28 shadow-md rounded-lg max-lg:w-60 max-md:w-full">
                <div className="flex justify-between w-full ">
                  <h2 className="font-manropeL text-sm font-normal h-5 text-neutral-500">In Progress</h2>
                  <div className="relative flex flex-row">
                    <svg
                      className=" cursor-pointer h-5"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.66797 15.8333C8.66797 16.75 9.41797 17.5 10.3346 17.5C11.2513 17.5 12.0013 16.75 12.0013 15.8333C12.0013 14.9167 11.2513 14.1667 10.3346 14.1667C9.41797 14.1667 8.66797 14.9167 8.66797 15.8333Z"
                        fill="#C4C7C6"
                        stroke="#C4C7C6"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8.66797 4.16732C8.66797 5.08398 9.41797 5.83398 10.3346 5.83398C11.2513 5.83398 12.0013 5.08398 12.0013 4.16732C12.0013 3.25065 11.2513 2.50065 10.3346 2.50065C9.41797 2.50065 8.66797 3.25065 8.66797 4.16732Z"
                        fill="#C4C7C6"
                        stroke="#C4C7C6"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8.66797 9.99935C8.66797 10.916 9.41797 11.666 10.3346 11.666C11.2513 11.666 12.0013 10.916 12.0013 9.99935C12.0013 9.08268 11.2513 8.33268 10.3346 8.33268C9.41797 8.33268 8.66797 9.08268 8.66797 9.99935Z"
                        fill="#C4C7C6"
                        stroke="#C4C7C6"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {inProgress ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{inProgress.total_in_progress}</h1>
                  ) : (
                    <p>Loading...</p>
                  )}
                  <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl bg-blue-50">
                    <svg width="66" height="24" viewBox="0 0 66 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <rect width="66" height="24" rx="12" fill="#C4D9FF" />
                        <path
                          d="M20.0465 10.3807L15.9998 6.33398L11.9531 10.3807"
                          stroke="#004FC4"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 17.6673V6.44727"
                          stroke="#004FC4"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M29.1668 17V8.299L27.2698 9.447V8.054L29.1668 6.92H30.4338V17H29.1668ZM36.5343 17.21C35.881 17.21 35.2977 17.063 34.7843 16.769C34.2757 16.4703 33.872 16.0667 33.5733 15.558C33.2793 15.0447 33.1323 14.4613 33.1323 13.808V10.112C33.1323 9.45867 33.2793 8.87533 33.5733 8.362C33.872 7.84867 34.2757 7.445 34.7843 7.151C35.2977 6.857 35.881 6.71 36.5343 6.71C37.1877 6.71 37.771 6.857 38.2843 7.151C38.7977 7.445 39.2013 7.84867 39.4953 8.362C39.7893 8.87533 39.9363 9.45867 39.9363 10.112V13.808C39.9363 14.4613 39.7893 15.0447 39.4953 15.558C39.2013 16.0667 38.7977 16.4703 38.2843 16.769C37.771 17.063 37.1877 17.21 36.5343 17.21ZM36.5343 16.013C36.931 16.013 37.2903 15.9173 37.6123 15.726C37.9343 15.5347 38.191 15.278 38.3823 14.956C38.5737 14.6293 38.6693 14.27 38.6693 13.878V10.035C38.6693 9.63833 38.5737 9.279 38.3823 8.957C38.191 8.635 37.9343 8.37833 37.6123 8.187C37.2903 7.99567 36.931 7.9 36.5343 7.9C36.1423 7.9 35.783 7.99567 35.4563 8.187C35.1343 8.37833 34.8777 8.635 34.6863 8.957C34.495 9.279 34.3993 9.63833 34.3993 10.035V13.878C34.3993 14.27 34.495 14.6293 34.6863 14.956C34.8777 15.278 35.1343 15.5347 35.4563 15.726C35.783 15.9173 36.1423 16.013 36.5343 16.013ZM43.051 17L42.211 16.16L51.465 6.92L52.305 7.76L43.051 17ZM50.205 17.21C49.743 17.21 49.3207 17.098 48.938 16.874C48.56 16.6453 48.2567 16.342 48.028 15.964C47.7993 15.5813 47.685 15.1567 47.685 14.69C47.685 14.2327 47.8017 13.8127 48.035 13.43C48.2683 13.0473 48.5763 12.7417 48.959 12.513C49.3417 12.2843 49.757 12.17 50.205 12.17C50.667 12.17 51.0893 12.2843 51.472 12.513C51.8547 12.737 52.158 13.0403 52.382 13.423C52.6107 13.801 52.725 14.2233 52.725 14.69C52.725 15.1567 52.6107 15.5813 52.382 15.964C52.158 16.342 51.8547 16.6453 51.472 16.874C51.0893 17.098 50.667 17.21 50.205 17.21ZM50.205 16.111C50.4617 16.111 50.6973 16.0457 50.912 15.915C51.1313 15.7843 51.304 15.6117 51.43 15.397C51.5607 15.1823 51.626 14.9467 51.626 14.69C51.626 14.4333 51.5607 14.1977 51.43 13.983C51.304 13.7637 51.1313 13.591 50.912 13.465C50.6973 13.3343 50.4617 13.269 50.205 13.269C49.9483 13.269 49.7127 13.3343 49.498 13.465C49.2833 13.591 49.1107 13.7637 48.98 13.983C48.8493 14.1977 48.784 14.4333 48.784 14.69C48.784 14.9467 48.8493 15.1823 48.98 15.397C49.1107 15.6117 49.2833 15.7843 49.498 15.915C49.7127 16.0457 49.9483 16.111 50.205 16.111ZM44.311 11.75C43.849 11.75 43.4267 11.638 43.044 11.414C42.6613 11.1853 42.3557 10.882 42.127 10.504C41.903 10.1213 41.791 9.69667 41.791 9.23C41.791 8.77267 41.9077 8.35267 42.141 7.97C42.3743 7.58733 42.6823 7.28167 43.065 7.053C43.4477 6.82433 43.863 6.71 44.311 6.71C44.773 6.71 45.193 6.82433 45.571 7.053C45.9537 7.277 46.2593 7.58033 46.488 7.963C46.7167 8.341 46.831 8.76333 46.831 9.23C46.831 9.69667 46.7167 10.1213 46.488 10.504C46.2593 10.882 45.9537 11.1853 45.571 11.414C45.193 11.638 44.773 11.75 44.311 11.75ZM44.311 10.651C44.5677 10.651 44.8033 10.5857 45.018 10.455C45.2373 10.3243 45.41 10.1517 45.536 9.937C45.6667 9.72233 45.732 9.48667 45.732 9.23C45.732 8.97333 45.6667 8.73767 45.536 8.523C45.41 8.30367 45.2373 8.131 45.018 8.005C44.8033 7.87433 44.5677 7.809 44.311 7.809C44.0543 7.809 43.8187 7.87433 43.604 8.005C43.3893 8.131 43.2167 8.30367 43.086 8.523C42.9553 8.73767 42.89 8.97333 42.89 9.23C42.89 9.48667 42.9553 9.72233 43.086 9.937C43.2167 10.1517 43.3893 10.3243 43.604 10.455C43.8187 10.5857 44.0543 10.651 44.311 10.651Z"
                          fill="#004FC4"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 w-full h-auto border-2 border-zinc-200 max-md:overflow-x-scroll rounded-xl overflow-x-scroll">
            <div className="complaintHeading h-18 p-3 flex flex-row items-center max-md:flex-col max-md:items-start justify-between ">
              <div className="headerText min-w-[300px] mr-2">
                <h2 className="font-manropeL text-xl font-semibold">My Complaint</h2>
                <h3 className="font-manropeL text-base font-normal text-slate-600">
                  List of all complaint and their details
                </h3>
              </div>
              <div className="searchFunc flex flex-row max-md:mt-1.5 items-center ">
                <div className="search h-11 rounded-lg border-solid border-2 border-zinc-200 px-2 w-auto flex flex-row justify-evenly items-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                      stroke="#667085"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Input
                    type="search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    className="  border-none focus:outline-none ml-1 h-6 w-96 max-md:w-56"
                  />
                </div>
                <div className="filter cursor-pointer rounded-lg ml-2 p-2.5 flex flex-row h-auto w-auto justify-center items-center border-solid border-zinc-200 border-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                      stroke="#344054"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <select
                    name=""
                    onChange={(e) => setFilter(e.target.value)}
                    id=""
                    className="border-none outline-none pl-2 text-slate-600 font-manropeL text-xs font-normal"
                  >
                    <option value="Filter">Filter</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Pending">Pending</option>
                    <option value="In-progress">In-progress</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="complaintList">
              <div className="tableHead border-solid border-b-2 border-t-2 max-md:w-max max-lg:w-max border-zinc-200">
                <div className="vendorComplaints p-3 flex flex-row items-center justify-between ">
                  <input className="w-6 min-w-[32px] h-5 cursor-pointer" type="checkbox" name="" id="" />
                  <div className="w-80 name flex flex-row items-center justify-start min-w-[250px]">
                    <p className=" pr-2 font-manropeL font-medium text-base text-slate-500">Name</p>
                    <svg
                      className="cursor-pointer"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.00065 3.33398V12.6673M8.00065 12.6673L12.6673 8.00065M8.00065 12.6673L3.33398 8.00065"
                        stroke="#667085"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="w-40 font-manropeL flex items-center justify-center font-medium text-base text-slate-500 max-lg:min-w-[160px] min-w-[120px]">
                    Description
                  </p>
                  <p className="w-40 font-manropeL flex items-center justify-center font-medium text-base text-slate-500  min-w-[120px]">
                    Date
                  </p>
                  <p className=" w-36 font-manropeL flex items-center justify-center font-medium text-base text-slate-500  min-w-[120px]">
                    Status
                  </p>
                  <p className=" flex items-center justify-center font-manropeL min-w-[80px] font-medium text-base text-slate-500 ">
                    Action
                  </p>
                </div>
              </div>
              {fetchComplains
                .filter((item: any) => {
                  return search.toLowerCase() === '' ? item : item.user_name.toLowerCase().includes(search);
                })
                .map((complain: any) => {
                  return (
                    <div
                      key={complain.id}
                      className="vendorComplaints p-3 flex flex-row items-center justify-between border-solid border-b-2 border-zinc-200"
                    >
                      <input className="w-6 h-5 cursor-pointer min-w-[32px]" type="checkbox" name="" id="" />
                      <div className="name w-80 flex flex-row items-center min-w-[250px]">
                        <div className="displayPicture">
                          {complain.user_details && complain.user_details.profile_pic && (
                            <Image
                              alt=""
                              src={complain.user_details.profile_pic}
                              className="h-10 w-10 rounded-full object-contain"
                              width={40}
                              height={40}
                            />
                          )}
                          {/* <img src="" className="h-10 w-10 rounded-full object-contain" alt="" /> */}
                        </div>
                        <Link
                          onClick={handleStatusUpdate}
                          key={complain.id}
                          id={complain.id}
                          href={complain && complain.id ? `/super-admin/feedback-and-customer-support/[id]` : '#'}
                          className="identity pl-2"
                        >
                          <div>
                            {complain.user_details ? (
                              <h2 className="font-manropeL font-semibold text-base">
                                {complain.user_details.first_name} {complain.user_details.last_name}
                              </h2>
                            ) : (
                              <h2 className="font-manropeL font-semibold text-base">User Details Unavailable</h2>
                            )}
                            {complain.user_details ? (
                              <p className="font-manropeL text-xs font-normal text-slate-500">
                                {complain.user_details.email}
                              </p>
                            ) : (
                              <p className="font-manropeL text-xs font-normal text-slate-500">Email Unavailable</p>
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className="description w-40  min-w-[120px] max-lg:min-w-[160px] flex items-center justify-center">
                        <p className="font-manropeL font-medium text-base max-md:text-xs text-slate-500">
                          {complain.complaint_text}
                        </p>
                      </div>
                      <div className="date w-40 min-w-[120px] flex items-center justify-center">
                        {complain.user_details && complain.createdAt ? (
                          <p className="font-manropeL font-medium text-base text-slate-500">{complain.createdAt}</p>
                        ) : (
                          <p className="font-manropeL font-medium text-base text-slate-500">Date Unavailable</p>
                        )}
                      </div>
                      <div>
                        <div className="bg-yellow-50 px-3 py-2 flex items-center gap-2 rounded-full">
                          <div className="w-2 h-2 bg-yellow-300 rounded-md "></div>
                          <p className="text-xs text-yellow-300">{complain.status}</p>
                        </div>
                      </div>
                      <div className="action w-20 flex items-center justify-center cursor-pointer min-w-[80px]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                            stroke="#464646"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                            stroke="#464646"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                            stroke="#464646"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralComplaints;
