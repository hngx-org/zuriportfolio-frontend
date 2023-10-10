import React from 'react';
import { SelectInput } from '@ui/Input';
import { filterProps } from '../../../../../@types';

export default function Filter(props: filterProps) {
  return (
    <div className="w-max">
      <p className="text-sm font-semibold mb-2">SORT BY</p>
      <div className="flex flex-row">
        <div className="viewSort">
          <SelectInput
            size={1}
            options={[
              {
                value: 'topReviews',
                label: 'Top Reviews',
              },
              {
                value: 'newestReviews',
                label: 'Newest Reviews',
              },
            ]}
            disabled={false}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
        <div className="starSort">
          <SelectInput
            className="ml-7"
            size={1}
            options={[
              {
                value: 'all',
                label: 'All Stars',
              },
              {
                value: '5',
                label: '5 stars',
              },
              {
                value: '4',
                label: '4 stars',
              },
              {
                value: '3',
                label: '3 stars',
              },
              {
                value: '2',
                label: '2 stars',
              },
              {
                value: '1',
                label: '1 Star',
              },
            ]}
            disabled={false}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>
      <div className=" text-base mt-8">
        {props.rating} total ratings, {props.review} with reviews
      </div>
    </div>
  );
}
