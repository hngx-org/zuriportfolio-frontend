import Button from '@ui/Button';
import Modal from '@ui/Modal';
import Link from 'next/link';

import Image from 'next/image';
// /assets/myfolder/Icon.png

import { useState, FormEvent } from 'react';

function ComplaintsDetails() {
  const [showform, setshowForm] = useState(false);
  const [text, setText] = useState('');
  const [profile, setProfile] = useState(false);

  const [modalOpen, setmodalOpen] = useState(false);

  const [confirmModal, setconfirmModal] = useState(false);

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
      <div className="p-10 container mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/">
            {' '}
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
            <div className="mb-20 flex flex-col items-start">
              <h1 className="mb-2 text-base">Feedback</h1>
              <p className="mb-2 text-xs">Order not recieved</p>
              <p className="mb-2 text-sm">
                I recently purchased this digital product and I&apos;m thrilled with it! It&apos;s been a game-changer
                for me. The user interface is incredibly intuitive, making it easy for even a tech novice like me to
                navigate. The product&apos;s functionality is top-notch, and it has exceeded my expectations. It&apos;s
                incredibly fast and efficient, saving me both time and frustration. Customer support has been
                exceptional.
              </p>

              <div className="mt-5">
                <button onClick={toggleForm} className="text-gray-100 text-sm">
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
                    className="my-4 flex items-center gap-4  border border-gray-100 rounded-md p-3"
                  >
                    <textarea
                      className="bg-transparent outline-none"
                      name="message"
                      id=""
                      cols={70}
                      rows={2}
                    ></textarea>
                    <button type="submit">Send</button>
                  </form>
                )}
              </div>
            </div>

            <Button onClick={() => setmodalOpen(true)}>Set as Resolved</Button>

            <Modal isOpen={modalOpen} closeModal={() => setmodalOpen(false)} title="Confirm Status">
              {<p className="text-center text-3xl my-8">Please confirm complaint has been resolved</p>}

              <div className="flex gap-4 justify-center my-6">
                <Button onClick={confirmStatus}>Confirm</Button>
                <Button>Cancel</Button>
              </div>
            </Modal>

            <Modal isOpen={confirmModal} closeModal={() => setconfirmModal(false)}>
              <div className="flex justify-center my-8">
                <Image src="/assets/complaintsassets/Group 765.png" alt="done" width={120} height={120} />
              </div>
              {<p className="text-center text-4xl">Complaint Resolved</p>}
              <div className="flex justify-center my-7">
                <Button>Done</Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComplaintsDetails;
