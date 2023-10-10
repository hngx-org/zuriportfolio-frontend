import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import Modal from '@ui/Modal';

export interface SuccessFeedbackModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const SuccessFeedbackModal: FC<SuccessFeedbackModalProps> = ({ showModal, setShowModal }) => {
  const router = useRouter();

  return (
    <Modal isOpen={showModal} closeModal={() => setShowModal(false)} isCloseIconPresent={false}>
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <p className="text-[#000] font-manropeL text-3xl font-semibold text-center">Bravo! 😊</p>

        <p className="text-[#191C1D] font-manropeL text-base font-semibold text-center">
          Your answers have been successfully submitted and graded.
        </p>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => router.push('/assessments/feedback')}
            className="lg:px-[55px] md:px-[45px] px-[35px] py-[12px] border border-[#009254] rounded-xl bg-[#009254] text-white-100 text-base flex items-center gap-2"
          >
            Check My Score
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.5586 3.05737C11.8087 2.80741 12.1477 2.66699 12.5013 2.66699C12.8549 2.66699 13.1939 2.80741 13.444 3.05737L19.444 9.05737C19.6939 9.30741 19.8344 9.64649 19.8344 10C19.8344 10.3536 19.6939 10.6927 19.444 10.9427L13.444 16.9427C13.1925 17.1856 12.8557 17.32 12.5061 17.3169C12.1565 17.3139 11.8221 17.1737 11.5749 16.9265C11.3277 16.6793 11.1874 16.3448 11.1844 15.9952C11.1814 15.6456 11.3158 15.3088 11.5586 15.0574L15.168 11.3334H2.5013C2.14768 11.3334 1.80854 11.1929 1.55849 10.9429C1.30844 10.6928 1.16797 10.3537 1.16797 10C1.16797 9.64642 1.30844 9.30728 1.55849 9.05723C1.80854 8.80718 2.14768 8.66671 2.5013 8.66671H15.168L11.5586 4.94271C11.3087 4.69267 11.1683 4.35359 11.1683 4.00004C11.1683 3.64649 11.3087 3.30741 11.5586 3.05737Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};
