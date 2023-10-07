// @ts-expect-error
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CloseCircle } from 'iconsax-react';
import { ModalProps } from '../../@types';
import Button from './Button';

const sizes: Record<'xl' | 'lg' | 'md' | 'sm', string> = {
  xl: 'max-w-[700px]',
  lg: 'max-w-xl',
  md: 'max-w-lg',
  sm: 'max-w-[480px]',
};
function Modal({
  isOpen,
  closeModal,
  closeOnOverlayClick = false,
  children,
  title,
  size = 'lg',
  isCloseIconPresent = true,
}: ModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeOnOverlayClick ? closeModal : () => null}>
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
          <div className="fixed inset-0  overflow-y-auto">
            <div className="flex min-h-full items-center md:items-start md:pt-14 justify-center p-4 text-center">
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
                  className={`relative w-full ${sizes[size]} bg-white-100 and p-4 font-nunito font-light transform overflow-hidden text-sm rounded-[12px] text-left align-middle shadow-xl transition-all`}
                >
                  {title && (
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                  )}
                  {/* Close button */}
                  {isCloseIconPresent ? (
                    <div className="absolute right-1 top-2">
                      <Button onClick={closeModal}>
                        <CloseCircle />
                      </Button>
                    </div>
                  ) : null}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default Modal;
