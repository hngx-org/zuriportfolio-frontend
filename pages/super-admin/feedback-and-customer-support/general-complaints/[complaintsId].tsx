import Button from '@ui/Button';
import Modal from '@ui/Modal';
import Link from 'next/link';
import Nav from '../../../view-components/super-admin/navbar';

import Image from 'next/image';
import axios from 'axios';

import { useState, FormEvent, useEffect } from 'react';
import index from '../../../marketplace/error-page';

import { useRouter } from 'next/router';
import { withAdminAuth } from '../../../../helpers/withAuth';

interface ComplaintDetails {
  data: {
    id: number;
    user: string;
    complaint_text: string;
    createdAt: string;
    status: string;
    user_details: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      profile_pic: string;

      // Add other properties as needed
    };
    // Add other properties as needed
  };
  // Add other properties as needed
}

const newStatus = 'Resolved';

async function updateComplaintStatus(complaintId: number, newStatus: string) {
  try {
    // Create the URL for the specific complaint using complaintId
    const apiUrl = `https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/complaints/${complaintId}/`;

    const bearertoken = localStorage.getItem('zpt');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearertoken}`,
    };

    // Fetch the complaint using the specific URL
    const response = await fetch(apiUrl, {
      method: 'GET', // Use GET to retrieve the complaint data
      headers,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const complaint = await response.json();

    // Update the status of the complaint
    complaint.status = newStatus;

    // Send a PATCH request to update the complaint on the server
    const patchResponse = await fetch(apiUrl, {
      method: 'PATCH', // Use PATCH to update the complaint
      headers: headers,
      body: JSON.stringify(complaint),
    });

    if (!patchResponse.ok) {
      throw new Error('Network response for the PATCH request was not ok');
    }

    console.log(`Status of complaint ${complaintId} updated to ${newStatus}`);
  } catch (error) {
    console.error('Error updating complaint status:', error);
  }
}

function ComplaintsDetails() {
  const [complainDetails, setcomplainDetails] = useState<ComplaintDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { complaintsId } = router.query;
    console.log(complaintsId);

    if (complaintsId) {
      fetchcomplaindetails(complaintsId);
    }
  }, [router.query]);

  const fetchcomplaindetails = async (complaintsId: any) => {
    const bearertoken = localStorage.getItem('zpt');
    console.log(complaintsId);

    try {
      const response = await axios.get(
        `https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/complaints/${complaintsId}/`,
        {
          headers: {
            Authorization: `Bearer ${bearertoken}`,
          },
        },
      );
      if (response.status === 200) {
        const data = await response.data;
        setcomplainDetails(data);
        console.log(data);
      } else {
        console.error('Failed to fetch complaint details');
      }
    } catch (error) {
      console.error('Error fetching complaint details:', error);
    }
  };

  const [showform, setshowForm] = useState(false);
  const [text, setText] = useState('');
  const [profile, setProfile] = useState(false);

  const [modalOpen, setmodalOpen] = useState(false);

  const [confirmModal, setconfirmModal] = useState(false);

  const [resolve, setResolve] = useState(false);

  const [resolveButton, setResolveButton] = useState(true);

  const [replies, setReplies] = useState<any[]>([]);

  const showResolveButton = () => {
    setResolveButton(false);
  };

  const onResolve = () => {
    setResolve(true);
  };

  const confirmStatus = () => {
    setconfirmModal(true);
  };

  const openModal = () => {
    setmodalOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Ensure you have the required data in complainDetails
    if (!complainDetails || !complainDetails.data || !complainDetails.data.user_details) {
      console.log('Invalid complainDetails data');
      return;
    }

    const bearertoken = localStorage.getItem('zpt');
    e.preventDefault();
    const message = e.currentTarget.message.value;

    try {
      const requestBody = {
        user: complainDetails.data.user_details.id,
        comment: message,
        complaint: complainDetails.data.id,
      };

      const response = await axios.post(
        'https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/comments/',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${bearertoken}`,
          },
        },
      );

      if (response.status === 201) {
        const newReply = { message, date: new Date().toISOString() };
        setReplies([...replies, newReply]);
        showProfile();
        toggleForm();
        console.log('Message Sent');
      } else {
        console.log('Failed to post the message');
      }
    } catch (error) {
      console.log('Error posting reply', error);
    }
  };

  const toggleForm = () => {
    setshowForm(!showform);
  };

  const showProfile = () => {
    setProfile(!profile);
  };

  let formattedDate = 'Date Unavailable'; // Default value for cases when createdAt is not available

  if (complainDetails?.data.createdAt) {
    const createdDate = new Date(complainDetails.data.createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    formattedDate = createdDate.toLocaleDateString('en-US');
  }

  return (
    <>
      <Nav />
      <div className="p-10 container mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/super-admin/feedback-and-customer-support/general-complaints">
            <Image src="/assets/complaintsassets/arrow-right.svg" alt="back" width={20} height={20} />{' '}
          </Link>

          <div>
            <h3 className="text-lg">Complaint Details </h3>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-center gap-4 my-6">
              <div className="rounded-full bg-black w-20 h-20 ">
                <Image
                  className="rounded-full"
                  src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80" // Replace '/default-profile-pic.png' with the actual path to your default profile picture
                  alt="profilepic"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <div className="flex gap-2">
                  <h1 className="text-3xl">
                    {complainDetails && 'data' in complainDetails && complainDetails.data.user_details.first_name ? (
                      complainDetails.data.user_details.first_name
                    ) : (
                      <div className="bg-white-115 w-50 h-8 rounded-lg text-white-115 "> loading... </div>
                    )}
                  </h1>
                  <h1 className="text-3xl">
                    {complainDetails && 'data' in complainDetails && complainDetails.data.user_details.last_name ? (
                      complainDetails.data.user_details.last_name
                    ) : (
                      <div className="bg-white-115 w-50 h-8 rounded-lg text-white-115 "> loading... </div>
                    )}
                  </h1>
                </div>
                <p className="text-sm text-gray-100 mt-2">
                  {complainDetails && 'data' in complainDetails && complainDetails.data.user_details.email ? (
                    complainDetails.data.user_details.email
                  ) : (
                    <div className="bg-white-115 w-50 h-5 rounded-lg text-white-115 "> loading... </div>
                  )}
                </p>
              </div>

              <div>
                {
                  complainDetails?.data.status === 'In Progress' || complainDetails?.data.status === 'in Progress' ? (
                    <div className="bg-blue-50 px-3 py-2 flex items-center gap-2 rounded-full">
                      <div className="w-2 h-2 bg-blue-105 rounded-md"></div>
                      <p className="text-xs text-blue-105">In Pending</p>
                    </div>
                  ) : complainDetails?.data.status === 'Resolved' ? (
                    <div className="bg-green-30 px-3 py-2 flex items-center gap-2 rounded-full">
                      <div className="w-2 h-2 bg-green-700 rounded-md "></div>
                      <p className="text-xs text-green-750">Resolved</p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 px-3 py-2 flex items-center gap-2 rounded-full">
                      <div className="w-2 h-2 bg-yellow-300 rounded-md"></div>
                      <p className="text-xs text-yellow-300">Pending</p>
                    </div>
                  ) // Add another case or null if needed
                }
              </div>
            </div>
            <h1 className="text-1xl">
              A UX Designer loves to make UX and the career easier for others, no fancy stuff.
            </h1>
          </div>

          <div className="flex gap-10 my-2">
            {complainDetails?.data.user_details && complainDetails.data.createdAt ? (
              <p className="font-manropeL font-medium text-base truncate text-slate-500">
                {new Date(complainDetails?.data.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  // hour: '2-digit',
                  // minute: '2-digit',
                })}
              </p>
            ) : (
              <p className="font-manropeL font-medium text-base text-slate-500">Date Unavailable</p>
            )}
            <h1 className="text-sm font-bold text-gray-500">3.3/5</h1>
          </div>

          <div>
            <div className="mb-2 flex flex-col ">
              <h1 className="mb-2 text-base">Feedback</h1>
              <p className="mb-2 text-xs">Order not recieved</p>

              <p className="mb-2 text-2xl">
                {complainDetails && 'data' in complainDetails && complainDetails.data.complaint_text ? (
                  complainDetails.data.complaint_text
                ) : (
                  <div className="bg-white-115 w-50 h-10 rounded-lg text-white-115 "> loading... </div>
                )}
              </p>

              <div className="mt-5 mb-8">
                <button onClick={toggleForm} className="text-black text-sm">
                  Reply
                </button>

                {showform && (
                  <form
                    onSubmit={handleSubmit}
                    className="my-4 flex items-center gap-4  border border-gray-100  rounded-md p-3"
                  >
                    <div className="flex items-center w-full gap-5 justify-between">
                      <input className="bg-transparent outline-none w-full h-14" name="message" id=""></input>
                      <button className="text-gray-100" type="submit">
                        Send
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div>
              {profile && (
                <div className="p-4 bg-white-200 mt-2 mb-8">
                  <div className="flex justify-between">
                    <p className="font-bold text-sm mb-2">ZuriCare</p>
                    <p className="text-xs text-white-400">September 22, 2023.</p>
                  </div>
                  {replies.map((reply, index) => (
                    <p key={index}>{reply.message}</p>
                  ))}
                </div>
              )}
            </div>

            {resolveButton && <Button onClick={() => setmodalOpen(true)}>Set as Resolved</Button>}

            <Modal isOpen={modalOpen} closeModal={() => setmodalOpen(false)}>
              {
                <div>
                  <p className="text-center my-8 text-3xl">Confirm Status</p>
                  <div className="w-100 h-px bg-black"></div>
                  <p className="text-center text-3xl my-4 p-8">Please confirm complaint has been resolved</p>
                </div>
              }

              <div className="flex gap-4 justify-center my-6">
                <Button className="px-6" onClick={confirmStatus}>
                  Confirm
                </Button>
                <button
                  onClick={() => setmodalOpen(false)}
                  className="border border-green-300 px-8 rounded-2xl font-bold text-green-300 bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </Modal>

            <Modal isOpen={confirmModal} closeModal={() => setconfirmModal(false)}>
              <div className="flex justify-center my-8">
                <Image src="/assets/complaintsassets/Group 765.png" alt="done" width={120} height={120} />
              </div>
              {<p className="text-center text-4xl">Complaint Resolved </p>}
              <div className="flex justify-center my-7">
                <Button
                  onClick={() => {
                    setconfirmModal(false);
                    setmodalOpen(false);
                    setResolve(true);
                    if (complainDetails) {
                      updateComplaintStatus(complainDetails.data.id, newStatus);
                    }

                    setResolveButton(false);
                  }}
                >
                  Done
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(ComplaintsDetails);
