import { Notification } from 'iconsax-react';
import Image from 'next/image';

const UserSideProfile = ({ showNotification = false, parentComp }) => {
  const image = 'https://img.freepik.com/free-photo/handsome-man-smiling-happy-face-portrait-close-up_53876-139608.jpg';
  return (
    <div className={`flex items-center gap-4 ${!showNotification ? 'mb-14 md:mb-16' : ''}`}>
      {showNotification ? (
        <div className={`${parentComp === 'navbar' ? 'hidden md:block' : ''}`}>
          <Notification size="24" color="#464646" />
        </div>
      ) : null}
      <div className={`${parentComp === 'navbar' ? 'hidden md:block' : ''}`}>
        <p className="font-manropeB">Babatunde Walters</p>
        <p className="text-xs text-gray-500 font-manropeL">Super Admin</p>
      </div>
      <div className="w-10 h-10 rounded-full border border-[#009254] overflow-hidden">
        <Image
          loader={() => image}
          src={image}
          width={100}
          height={100}
          alt="profile picture"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default UserSideProfile;
