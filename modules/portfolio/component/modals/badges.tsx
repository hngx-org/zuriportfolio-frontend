import Image from 'next/image';

const Badges = ({ name, badgeImage }) => {
  return (
    <div>
      <div>
        <p>Badge Label: {name}</p>
      </div>
      <div>
        <Image src={badgeImage} alt="Badge" />
      </div>
    </div>
  );
};

export default Badges;
