import Image from "next/image";

const Badges = ({ badgeLabel, badgeImage }) => {
    return (
      <div>
        <div>
          <h3>Badge Label: {badgeLabel}</h3>
        </div>
        <div>
          <Image src={badgeImage} alt="Badge" />
        </div>
      </div>
    );
  };
  
  export default Badges;
  