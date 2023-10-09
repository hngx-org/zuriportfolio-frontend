import Button from '@ui/Button';

function AccountManagement() {
  return (
    <div className="flex flex-col gap-y-[1rem]">
      <h3 className=" font-manropeEB lg:font-manropeB text-[1rem] lg:text-[1.375rem] text-[#2E3130] leading-[1.5rem] lg:leading-[1.75rem]">
        Account Management
      </h3>
      <form className="flex flex-col gap-y-[2rem]">
        <div className="flex flex-col gap-y-[0.5rem]">
          <label
            htmlFor="email"
            className=" font-manropeEB text-[0.875rem] lg:text-[1rem] leading-[1.25rem] lg:leading-[1.5rem] text-[#344054]"
          >
            Email
          </label>
          <div className="flex flex-col gap-y-[0.375rem]">
            <p className=" font-manropeB text-[0.875rem] leading-[1.25rem] text-[#344054]">Current Email Address</p>
            <div className="relative w-[35rem] flex flex-row">
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                className="w-full border py-[0.625rem] px-[0.875rem] pr-7 rounded-[0.5rem] font-manropeL text-[0.875rem] lg:text-[1rem] leading-[1.5rem] text-[#667085]"
              />
              <svg
                className="absolute bottom-3 right-3"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2386_11946)">
                  <path
                    d="M6.06016 5.9987C6.2169 5.55314 6.52626 5.17744 6.93347 4.93812C7.34067 4.6988 7.81943 4.61132 8.28495 4.69117C8.75047 4.77102 9.17271 5.01305 9.47688 5.37438C9.78106 5.73572 9.94753 6.19305 9.94683 6.66536C9.94683 7.9987 7.94683 8.66536 7.94683 8.66536M8.00016 11.332H8.00683M14.6668 7.9987C14.6668 11.6806 11.6821 14.6654 8.00016 14.6654C4.31826 14.6654 1.3335 11.6806 1.3335 7.9987C1.3335 4.3168 4.31826 1.33203 8.00016 1.33203C11.6821 1.33203 14.6668 4.3168 14.6668 7.9987Z"
                    stroke="#98A2B3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2386_11946">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-[0.5rem]">
          <label
            htmlFor="currentPassword"
            className=" font-manropeEB text-[0.875rem] lg:text-[1rem] leading-[1.5rem] text-[#344054]"
          >
            Change Password
          </label>
          <div className="flex flex-col gap-y-[0.375rem]">
            <p className=" font-manropeB text-[0.875rem] leading-[1.25rem] text-[#344054]">Current Passowrd</p>
            <div className="relative w-[35rem] flex flex-row">
              <input
                name="currentPassword"
                type="password"
                placeholder="Enter passowrd"
                className="w-full border py-[0.625rem] px-[0.875rem] pr-7 rounded-[0.5rem] font-manropeL text-[0.875rem] lg:text-[1rem] leading-[1.5rem] text-[#667085]"
              />
              <svg
                className="absolute bottom-3 right-3"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2386_11946)">
                  <path
                    d="M6.06016 5.9987C6.2169 5.55314 6.52626 5.17744 6.93347 4.93812C7.34067 4.6988 7.81943 4.61132 8.28495 4.69117C8.75047 4.77102 9.17271 5.01305 9.47688 5.37438C9.78106 5.73572 9.94753 6.19305 9.94683 6.66536C9.94683 7.9987 7.94683 8.66536 7.94683 8.66536M8.00016 11.332H8.00683M14.6668 7.9987C14.6668 11.6806 11.6821 14.6654 8.00016 14.6654C4.31826 14.6654 1.3335 11.6806 1.3335 7.9987C1.3335 4.3168 4.31826 1.33203 8.00016 1.33203C11.6821 1.33203 14.6668 4.3168 14.6668 7.9987Z"
                    stroke="#98A2B3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2386_11946">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-y-[0.375rem]">
            <label
              htmlFor="newPassword"
              className=" font-manropeB lg:font-manropeB text-[0.875rem] leading-[1.25rem] text-[#344054]"
            >
              New Password
            </label>
            <div className="relative w-[35rem] flex flex-row">
              <input
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                className="w-full border py-[0.625rem] px-[0.875rem] pr-7 rounded-[0.5rem] font-manropeL text-[0.875rem] lg:text-[1rem] leading-[1.5rem] text-[#667085]"
              />
              <svg
                className="absolute bottom-3 right-3"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2386_11946)">
                  <path
                    d="M6.06016 5.9987C6.2169 5.55314 6.52626 5.17744 6.93347 4.93812C7.34067 4.6988 7.81943 4.61132 8.28495 4.69117C8.75047 4.77102 9.17271 5.01305 9.47688 5.37438C9.78106 5.73572 9.94753 6.19305 9.94683 6.66536C9.94683 7.9987 7.94683 8.66536 7.94683 8.66536M8.00016 11.332H8.00683M14.6668 7.9987C14.6668 11.6806 11.6821 14.6654 8.00016 14.6654C4.31826 14.6654 1.3335 11.6806 1.3335 7.9987C1.3335 4.3168 4.31826 1.33203 8.00016 1.33203C11.6821 1.33203 14.6668 4.3168 14.6668 7.9987Z"
                    stroke="#98A2B3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2386_11946">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-y-[0.375rem]">
            <p className=" font-manropeB text-[0.875rem] leading-[1.25rem] text-[#344054]">Confirm New Password</p>
            <div className="relative w-[35rem] flex flex-row">
              <input
                name="newPassword"
                type="password"
                placeholder="Enter new passowrd"
                className="w-full border py-[0.625rem] px-[0.875rem] pr-7 rounded-[0.5rem] font-manropeL text-[0.875rem] lg:text-[1rem] leading-[1.5rem] text-[#667085]"
              />
              <svg
                className="absolute bottom-3 right-3"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2386_11946)">
                  <path
                    d="M6.06016 5.9987C6.2169 5.55314 6.52626 5.17744 6.93347 4.93812C7.34067 4.6988 7.81943 4.61132 8.28495 4.69117C8.75047 4.77102 9.17271 5.01305 9.47688 5.37438C9.78106 5.73572 9.94753 6.19305 9.94683 6.66536C9.94683 7.9987 7.94683 8.66536 7.94683 8.66536M8.00016 11.332H8.00683M14.6668 7.9987C14.6668 11.6806 11.6821 14.6654 8.00016 14.6654C4.31826 14.6654 1.3335 11.6806 1.3335 7.9987C1.3335 4.3168 4.31826 1.33203 8.00016 1.33203C11.6821 1.33203 14.6668 4.3168 14.6668 7.9987Z"
                    stroke="#98A2B3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2386_11946">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </form>
      <Button size="md" intent="primary" className="w-fit mb-8 rounded-[0.5rem] py-[0.5rem] px-[1.25rem] mt-[2rem]">
        Confirm Changes
      </Button>
    </div>
  );
}

export default AccountManagement;
