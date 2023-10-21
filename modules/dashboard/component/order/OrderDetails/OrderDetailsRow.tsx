import { Clock } from 'iconsax-react';
import { OrderHistory } from '../../../../../@types';
const formatNum = (num: number) => {
  const formatter = new Intl.NumberFormat();
  return formatter.format(num);
};
const OrderDetailsRow = (props: OrderHistory) => {
  return (
    <tr
      className="font-manropeL border border-custom-color1 font-normal text-custom-color2 [&>*]:px-6  [&>*]:py-4 whitespace-nowrap"
      key={props.id}
    >
      <td className={`text-custom-color10 font-manropeB text-center`}>#{props.id}</td>
      <td className="hidden lg:table-cell">{props.productName}</td>
      <td className={`text-custom-color10 font-manropeB`}>{props.productType}</td>
      <td>
        {props.currency}
        {formatNum(props.price)}
      </td>
      <td>
        {props.status === 'completed' && <CompletedTab />}
        {props.status === 'cancelled' && <CancelledTab />}
        {props.status === 'pending' && <PendingTab />}
      </td>
    </tr>
  );
};

export const OrderDetailsMobile = (props: OrderHistory) => {
  return (
    <div
      className="font-manropeB font-semibold px-[10px]  py-4 rounded-2xl flex justify-between items-center"
      style={{
        boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.14)`,
      }}
    >
      <div className="flex flex-col">
        <h2 className=" text-[14px] font-semibold mb-2 text-custom-color10  tracking-[0.014px] leading-[144%]">
          {props.productName}
        </h2>
        <p className="text-[12px] mb-3  text-custom-color10">{props.productType}</p>
        <p className="text-custom-color22 text-[14px] leading-[142.857%] tracking-[0.014px] font-semibold">
          ID: <span className="text-custom-color10 font-manropeL font-normal ">#{props.id}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-end gap-2 whitespace-nowrap">
        <p className="text-custom-color11 leading-[166.667%] text-[12px] tracking-[0.06px]">
          #{formatNum(props.price)} units
        </p>
      </div>
    </div>
  );
};
export default OrderDetailsRow;

const CancelledTab: React.FC = () => {
  return (
    <div
      className={`md:bg-custom-color4 text-custom-color5 font-manropeB mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit rounded-2xl  `}
    >
      <div className="hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
          <path
            d="M9.5 3L3.5 9M3.5 3L9.5 9"
            stroke="#F04438"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="md:hidden lg:inline-block">Cancelled</span>
    </div>
  );
};
const CompletedTab: React.FC = () => {
  return (
    <div
      className={`md:bg-custom-color6 text-custom-color7 font-manropeB mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit rounded-2xl `}
    >
      <div className="md:block hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
          <path
            d="M10.5 3L5 8.5L2.5 6"
            stroke="#12B76A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="md:hidden lg:inline-block">Completed</span>
    </div>
  );
};
const PendingTab = () => {
  return (
    <div
      className={`md:bg-yellow-100 text-custom-color9 font-manropeB  mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit rounded-2xl `}
    >
      <div className="md:block hidden">
        <Clock size="16" color="#837737" />
      </div>
      <span className="md:hidden lg:inline-block">Pending</span>
    </div>
  );
};
