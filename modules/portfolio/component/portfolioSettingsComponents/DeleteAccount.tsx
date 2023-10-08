import Modal from '@ui/Modal';

function DeleteAccount() {
  const handleCloseModal = () => {
    alert('close now!!');
  };
  return (
    <div className="">
      <div className="flex flex-col gap-y-[1rem]">
        <h3 className=" font-manropeB text-[1rem] sm:text-[1.375rem] text-[#2E3130] leading-[1.75rem]">
          Delete Account
        </h3>
        <p className="text-[#737876] font-manropeEL sm:font-manropeB text-[0.875rem] leading-[1.25rem] ">
          Would you like to delete your portfolio account:{' '}
          <span className="text-[#009254] text-[0.875rem] sm:text-[1rem]  font-manropeB leading-[1.5rem]">
            @pleroma
          </span>
          ?
        </p>
        <p className="text-[#737876] font-manropeEL text-[0.875rem] sm:text-[1rem] leading-[1.25rem] sm:leading-[1.5rem]">
          Deleting your account will remove all of your content and data associated with it.
        </p>
        <p className="text-[#FF2E2E] text-[0.875rem] sm:text-[1rem] leading-[1.25rem] sm:leading-[1.5rem] font-manropeB sm:font-manropeEB">
          I want to delete my account
        </p>
      </div>
      {/* <Modal size="sm" title="Warning:" isOpen isCloseIconPresent closeModal={handleCloseModal}>
                Are you sure you want to delete your account? This action will permanently remove your profile, projects, and all associated data from the platform.
            </Modal> */}
    </div>
  );
}

export default DeleteAccount;
