import React, { useState, useEffect, useRef } from 'react';

interface ScoreDropdownProps {
  item: string; // Specify the type for the 'item' prop
}

const ScoreDropdown = (props: { item: string }) => {
  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-base text-gray-500 w-32">{props.item}:</h3>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-gray-400">Min Score</span>
            <input
              type="number"
              name="min"
              id="min"
              className="text-sm text-center rounded-md border border-solid border-gray-100 w-14 py-2 px-4 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-gray-400">Max Score</span>
            <input
              type="number"
              name="max"
              id="max"
              className="text-sm text-center rounded-md border border-solid border-gray-100 w-14 py-2 px-4 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDropdown;
