// @ts-expect-error
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ModalProps } from '../../@types';
import Button from '@ui/Button';
import { IoPaperPlaneOutline } from 'react-icons/io5';

const sizes: Record<'xxl' | 'xl' | 'lg' | 'md' | 'sm', string> = {
  xxl: 'max-w-[980px]',
  xl: 'max-w-[700px]',
  lg: 'max-w-xl',
  md: 'max-w-lg',
  sm: 'max-w-[480px]',
};

function ReviewReplyModal({
  isOpen,
  closeModal,
  closeOnOverlayClick = false,
  children,
  size = 'sm',
  isCloseIconPresent = true,
  closeBtnClass,
}: ModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={closeOnOverlayClick ? closeModal : () => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0  flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`relative w-full ${sizes[size]} bg-white p-4 font-nunito font-light transform overflow-hidden text-sm rounded-[12px] text-center shadow-xl transition-all`}
              >
                <div className="mb-4 ">
                  <IoPaperPlaneOutline size={96} className="w-20 mx-auto flex justify-center align-center" />
                  {/* <i alt="Icon" className="w-20 mx-auto" />{' '} */}
                  {/* Replace with your image source */}
                </div>
                <h3 className="text-5xl font-medium leading-6 text-gray-900 py-4">Sent</h3>
                <p className="text-gray-500 text-4xl py-4">Thanks for the feedback.</p>
                {/* Close button */}
                {isCloseIconPresent ? (
                  <div className="absolute top-2 right-2">
                    <Button onClick={closeModal} className={closeBtnClass}>
                      <IoMdClose />
                    </Button>
                  </div>
                ) : null}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ReviewReplyModal;
