import React from 'react'
import { activity } from '../../../@types';

const ActivityDetails = () => {

    const activityDetails: activity[] = [
        {
          name: 'Demi Wikinson',
          purchased: 'Purchased',
          pItem: 'Webflow 101',
          id: 1,
        },
        {
          name: 'John Doe',
          purchased: 'Purchased',
          pItem: 'Figma Course',
          id: 2,
        },
        {
          name: 'Jane Smith',
          purchased: 'Purchased',
          pItem: 'Webflow 101',
          id: 3,
        },
        {
          name: 'Bob Johnson',
          purchased: 'Purchased',
          pItem: 'ProductZ',
          id: 4,
        },
        {
          name: 'Alice Brown',
          purchased: 'Purchased',
          pItem: 'Webflow 101',
          id: 5,
        },
        {
          name: 'Charlie Davis',
          purchased: 'Purchased',
          pItem: 'Website Template',
          id: 6,
        },
        {
          name: 'Eva White',
          purchased: 'Purchased',
          pItem: 'SEO Masterclass',
          id: 7,
        },
        {
          name: 'Frank Miller',
          purchased: 'Purchased',
          pItem: 'Webflow 101',
          id: 8,
        },
        {
          name: 'Grace Wilson',
          purchased: 'Purchased',
          pItem: 'Webflow 101',
          id: 9,
        },
        {
          name: 'Grace Wilson',
          purchased: 'Purchased',
          pItem: 'Webflow 101',
          id: 10,
        },
        {
          name: 'Grace Wilson',
          purchased: 'Purchased',
          pItem: 'Webflow 101',
          id: 11,
        },
      ];
  return (
    <section className="lg:w-[25%]">
    <div className="py-[50px] px-5  whitespace-nowrap  bg-white-100 lg:border-white-200 lg:border lg:rounded-lg xl:px-10 xl:max-w-[1270px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[19px]">Activity</h3>
        <p className="text-custom-color15 text-[15px]">View All</p>
      </div>
      <div className="space-y-5 md:space-y-[15.5px]">
        {activityDetails.map((item) => (
          <div key={item.id}>
            <h3 className="text-custom-color15 text-[16px]">{item.name}</h3>
            <div className="flex gap-1.5">
              <p className="text-custom-color22 font-light text-[15px]">{item.purchased}</p>
              <span className="text-orange-110 text-[15px]">{item.pItem}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default ActivityDetails