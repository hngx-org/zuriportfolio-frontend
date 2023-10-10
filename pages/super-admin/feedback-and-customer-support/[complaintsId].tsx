import Button from '@ui/Button';
import Modal from '@ui/Modal';
import Link from 'next/link';
import Nav from '../../view-components/super-admin/navbar';

import Image from 'next/image';
// /assets/myfolder/Icon.png

import { useState, FormEvent } from 'react';

function ComplaintsDetails() {
  const [showform, setshowForm] = useState(false);
  const [text, setText] = useState('');
  const [profile, setProfile] = useState(false);

  const [modalOpen, setmodalOpen] = useState(false);

  const [confirmModal, setconfirmModal] = useState(false);

  const [resolve, setResolve] = useState(false);

  const [resolveButton, setResolveButton] = useState(true);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = e.currentTarget.message.value;
    setText(message);
    setshowForm(false);
    showProfile();
  };

  const toggleForm = () => {
    setshowForm(!showform);
  };

  const showProfile = () => {
    setProfile(!profile);
  };

  return (
    <>
      <Nav />
      <div className="p-10 container mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/super-admin/feedback-and-customer-support/general-complaints">
            <Image src="/assets/complaintsassets/arrow-right.svg" alt="back" width={20} height={20} />{' '}
          </Link>

          <div>
            <h3 className="text-lg">Complaint Details</h3>
            <p className="text-sm text-gray-500">Basic vendor details</p>
          </div>
        </div>
        <div>
          <div>
            <div className="flex items-center gap-4 my-6">
              <div className="rounded-full bg-black w-20 h-20">
                <Image src="/assets/complaintsassets/Ellipse 32.png" alt="profilepic" width={100} height={100} />
              </div>
              <div>
                <h1 className="text-3xl">Gustavo Silas</h1>
                <p className="text-base text-gray-500">gustavosilas@gmail.com</p>
              </div>

              {resolve && (
                <div className="bg-green-30 px-3 py-2 flex items-center gap-2 rounded-full">
                  <div className="w-2 h-2 bg-green-700 rounded-md "></div>
                  <p className="text-xs text-green-750">Resolved</p>
                </div>
              )}
            </div>
            <h1 className="text-2xl">
              A UX Designer loves to make UX and the career easier for others, no fancy stuff.
            </h1>
          </div>

          <div className="flex gap-10 my-2">
            <h1 className="text-sm font-bold text-gray-500">12th April, 2023.</h1>
            <h1 className="text-sm font-bold text-gray-500">3.3/5</h1>
          </div>

          <div>
            <div className="mb-20 flex flex-col ">
              <h1 className="mb-2 text-base">Feedback</h1>
              <p className="mb-2 text-xs">Order not recieved</p>
              <p className="mb-2 text-sm">
                I recently purchased this digital product and I&apos;m thrilled with it! It&apos;s been a game-changer
                for me. The user interface is incredibly intuitive, making it easy for even a tech novice like me to
                navigate. The product&apos;s functionality is top-notch, and it has exceeded my expectations. It&apos;s
                incredibly fast and efficient, saving me both time and frustration. Customer support has been
                exceptional
              </p>

              <div className="mt-5">
                <button onClick={toggleForm} className="text-black text-sm">
                  Reply
                </button>

                <div>
                  {profile && (
                    <div className="p-4 bg-white-200 mt-2">
                      <div className="flex justify-between">
                        <p className="font-bold text-sm mb-2">ZuriCare</p>
                        <p className="text-xs text-white-400">September 22, 2023.</p>
                      </div>
                      <p>{text}</p>
                    </div>
                  )}
                </div>

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

export default ComplaintsDetails;
