type PortfolioContext = {
  profileUpdate?: () => void;
  isLoggedIn: boolean;
};

const Profile = ({ profileUpdate, isLoggedIn }: PortfolioContext) => {
  return (
    <div className="grid place-content-center absolute w-[120px] md:w-[170px] object-fill object-center aspect-square -bottom-5 md:-bottom-10 left-0 rounded-full bg-emerald-50">
      <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M28.4189 25.3637C28.1855 25.3403 27.9055 25.3403 27.6489 25.3637C22.0955 25.177 17.6855 20.627 17.6855 15.027C17.6855 9.31033 22.3055 4.66699 28.0455 4.66699C33.7622 4.66699 38.4055 9.31033 38.4055 15.027C38.3822 20.627 33.9722 25.177 28.4189 25.3637Z"
          stroke="#009254"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.7545 33.973C11.1079 37.753 11.1079 43.913 16.7545 47.6697C23.1712 51.963 33.6945 51.963 40.1112 47.6697C45.7579 43.8897 45.7579 37.7297 40.1112 33.973C33.7179 29.703 23.1945 29.703 16.7545 33.973Z"
          stroke="#009254"
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {isLoggedIn && (
        <label
          className="absolute md:bottom-4 bottom-1 -right-2 w-[33%] md:w-[30%] bg-brand-green-primary aspect-square rounded-full grid place-content-center cursor-pointer"
          onClick={() => profileUpdate && profileUpdate()}
        >
          <svg
            className="w-[30px] md:w-[25px] md:h-25px h-[30px]"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2871 22.3994C17.7871 22.3994 22.2871 17.8994 22.2871 12.3994C22.2871 6.89941 17.7871 2.39941 12.2871 2.39941C6.78711 2.39941 2.28711 6.89941 2.28711 12.3994C2.28711 17.8994 6.78711 22.3994 12.2871 22.3994Z"
              stroke="white"
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.28711 12.3994H16.2871"
              stroke="white"
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.2871 16.3994V8.39941"
              stroke="white"
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input disabled={true} id="avatarUpload" type="file" className="hidden" accept="image/png, image/jpeg" />
        </label>
      )}
    </div>
  );
};

export default Profile;

type coverDiv = {
  className: string;
};

const CoverDiv = ({ className }: coverDiv) => {
  return <div className={className}></div>;
};

export { CoverDiv };
