import React, { useState } from 'react';

interface MyComponentProps {
  item: string;
}

const SubCategories: React.FC<MyComponentProps> = ({ item }) => {
  const [popupClass, setPopupClass] = useState(false);

  return (
    <p
      className="px-4 py-2 hover:bg-white-200 w-full flex justify-between items-center"
      onMouseOver={() => setPopupClass(true)}
      onMouseLeave={() => setPopupClass(false)}
    >
      {item}
      {/* <Icon className="text-gray-400" icon="grommet-icons:next" /> */}
      <span
        className={`border-[2px]  border-slate-50 flex flex-col gap-2 ${
          popupClass ? 'visible opacity-100' : 'invisible opacity-0'
        } text-start rounded-lg rounded-tr-none absolute -translate-x-[106%] translate-y-[70%] transition-all duration-500 w-[286px]`}
      >
        {['sub-categories', 'sub-categories'].map((item, i) => (
          <a className="pl-4 py-2 hover:bg-white-200 w-full" href="#" key={i + 1}>
            {item}
          </a>
        ))}
      </span>
    </p>
  );
};

export default SubCategories;

//
//

// import React, { useState } from 'react';
// import ButtonCat from './ButtonCat';
// import SubCategories from './SubCategories';

// const navItems: string[] = [
//   'All Categories',
//   ' Design & Graphics',
//   ' Development & Programming',
//   ' Content Creation',
//   ' Digital Arts & Media',
//   ' Audio & Sound',
//   ' Photography',
// ];

// const CategoriesNav = () => {
//   const [popupClass, setPopupClass] = useState(false);
//   return (
//     <ul className="hidden md:flex gap-8 py-5 relative">
//       {navItems.map((item, i) => {
//         return (
//           <li key={i + 1} className="text-base relative">
//             <ButtonCat item={item} />
//           </li>
//         );
//       })}
//       <li>
//         <button className="" onMouseOver={() => setPopupClass(true)} onMouseLeave={() => setPopupClass(false)}>
//           More...
//           <div
//             className={` border-[2px] border-slate-50 flex flex-col gap-2 ${
//               popupClass ? 'visible opacity-100' : 'invisible opacity-0'
//             } text-start rounded-lg absolute transition-all duration-500 w-[286px] z-50 translate-y-4`}
//           >
//             {['categories', 'categories', 'categories', 'categories', 'categories', 'categories', 'categories'].map(
//               (item, i) => (
//                 <SubCategories key={i + 1} item={item} />
//               ),
//             )}
//           </div>
//         </button>
//       </li>
//     </ul>
//   );
// };

// export default CategoriesNav;
