import React, { useState, useContext } from 'react';
import { Edit } from 'iconsax-react';
import { ToPushContext } from '../../../pages/assessment/new';
const Edithead = () => {
  const [disable, setDisable] = useState(true);
  const [newobject, setObject]: any = useContext(ToPushContext);
  const readInput = (e: any) => {
    const newt = { ...newobject };
    newt.assessment_name = e.target.value;
    setObject(newt);
    console.log(newobject);
  };
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
            name="assessment_name"
            disabled={disable}
            onChange={(e) => readInput(e)}
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
