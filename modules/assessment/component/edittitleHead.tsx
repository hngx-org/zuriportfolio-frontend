import React, { useState } from 'react';
import { Edit } from 'iconsax-react';
const Edithead = () => {
  const [disable, setDisable] = useState(true);

  return (
    <div className="border-[1px] border-[#DFE3E6] rounded-t-[20px]">
      <div className="bg-[#BF8443] p-2 rounded-t-[20px]"></div>
      <div className="p-4 flex justify-between items-center">
        <div className="text-[20px]">
          <input
            type="text"
            id="input_assessment"
            className="outline-none border-none bg-transparent placeholder-black focus:placeholder-transparent focus:border-transparent focus:ring-transparent"
            placeholder="Untitled Assessment"
            disabled={disable}
          />
        </div>
        <div>
          <label htmlFor="input_assessment">
            <Edit className="w-[25px] cursor-pointer" onClick={() => setDisable(false)} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Edithead;
