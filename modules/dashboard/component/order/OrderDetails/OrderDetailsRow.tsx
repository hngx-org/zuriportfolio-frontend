import { OrderHistory } from '../../../../../@types';
const formatNum = (num: number) => {
  const formatter = new Intl.NumberFormat();
  return formatter.format(num);
};
const OrderDetailsRow = (props: OrderHistory) => {
  return (
    <tr className="font-manropeL border border-custom-color1 font-normal text-custom-color2 [&>*]:px-6  [&>*]:py-4 whitespace-nowrap">
      <td className={`text-custom-color10 font-manropeB text-center`}>#{props.id}</td>
      <td className="hidden lg:table-cell">{props.productName}</td>
      <td className={`text-custom-color10 font-manropeB`}>{props.productType}</td>
      <td>#{formatNum(props.price)}</td>
      <td>#{props.sales}</td>
      <td>#{formatNum(props.revenue)}</td>
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
        <p className="text-custom-color2 font-normal text-[14px] leading-[142.857%] tracking-[0.014px]">
          {' '}
          No. of sales: {props.sales}
        </p>
        <p className="text-custom-color2 font-normal text-[14px] leading-[142.857%] tracking-[0.014px]">
          {' '}
          Revenue: #{formatNum(props.revenue)}
        </p>
      </div>
    </div>
  );
};
export default OrderDetailsRow;
