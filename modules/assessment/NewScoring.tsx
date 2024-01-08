import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Input } from '@ui/Input';
import { ToPushContext } from '../../pages/super-admin/assessment/new';
import Mintime from './component/mintime';

const Newscoring = () => {
  const [newobject, setObject]: any = useContext(ToPushContext);

  const handleInputChange = (e: any) => {
    if (e.target.value != '') {
      if (e.target.name === 'hours') {
        Mintime.hours = Number(e.target.value);
        console.log(e.target.value);
      } else if (e.target.name === 'minutes') {
        Mintime.mins = Number(e.target.value);
      } else {
        Mintime.secs = Number(e.target.value);
      }
      const newt = { ...newobject };
      newt.duration_in_minutes = Math.round(Mintime.hours * 60 + Mintime.mins + Mintime.secs / 60);
      setObject(newt);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      {/* Timing System */}
      <div className="w-full rounded-tr-2xl rounded-tl-2xl overflow-hidden sm:w-[604px] border border-[#DFE3E6] border-solid">
        <div className="w-full h-5 bg-[#BF8443]"></div>
        <div className="mt-5 mb-7 px-3 sm:px-14">
          <h3 className="text-2xl text-[#191C1E] font-manropeB mb-8">Timing System</h3>
          <p className="text-[#191C1E] text-4 font-manropeB mb-4 mt-4">
            Set the maximum time allotted to each assessment
          </p>
          <div className="flex gap-5">
            <div>
              <label htmlFor="hours" className="text-xs text-gray-400">
                Hours
              </label>
              <Input
                type="text"
                name="hours"
                id="min-score"
                max={100}
                onChange={(e) => handleInputChange(e)}
                placeHolder="0"
                value={Mintime.hours}
                className="h-8 w-14 sm:w-20 rounded-md border text-base font-bold text-black"
                style={{ textAlign: 'center' }}
              />
            </div>
            <div>
              <label htmlFor="hours" className="text-xs text-gray-400">
                Minutes
              </label>
              <Input
                type="text"
                name="minutes"
                id="min-score"
                onChange={(e) => handleInputChange(e)}
                value={Mintime.mins}
                placeHolder="0"
                className="h-8 w-14 sm:w-20 rounded-md border text-base font-bold text-black"
                style={{ textAlign: 'center' }}
              />
            </div>
            <div>
              <label htmlFor="hours" className="text-xs text-gray-400">
                Seconds
              </label>
              <Input
                type="text"
                name="seconds"
                id="min-score"
                onChange={(e) => handleInputChange(e)}
                value={Mintime.secs}
                placeHolder="0"
                className="h-8 w-14 sm:w-20 rounded-md border text-base font-bold text-black"
                style={{ textAlign: 'center' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newscoring;
