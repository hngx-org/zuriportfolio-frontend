import Image from 'next/image';
import Pagination from '../../../../pages/view-components/super-admin/pagination';

const TopSellingProducts: React.FC = () => {
  const CardDataOne: {
    id: number;
    products: string;
    categories: string;
    vendor: string;
    order: number;
    price: string;
    sales: string;
    action: string;
  }[] = [
    {
      id: 1,
      products: 'Product Design Course',
      categories: 'Tech Learning',
      vendor: 'Mark Essen',
      order: 123456,
      price: '$20',
      sales: '$1558767',
      action: '/assets/images/svg.svg',
    },
    {
      id: 2,
      products: 'Full JavaScript Course',
      categories: 'Tech Learning',
      vendor: 'Mark Essen',
      order: 113456,
      price: '$22',
      sales: '$1262621',
      action: '/assets/images/red.svg',
    },
    {
      id: 3,
      products: 'Data Anaylics Course',
      categories: 'Tech Learning',
      vendor: 'Mark Essen',
      order: 103456,
      price: '$17',
      sales: '$1178882',
      action: '/assets/images/svg.svg',
    },
    {
      id: 4,
      products: 'HTML & CSS Course',
      categories: 'Tech Learning',
      vendor: 'Mark Essen',
      order: 93456,
      price: '$19',
      sales: '$1287873',
      action: '/assets/images/ruby.svg',
    },
    {
      id: 5,
      products: 'Python Complete Course',
      categories: 'Tech Learning',
      vendor: 'Mark Essen',
      order: 92456,
      price: '$28',
      sales: '$1287873',
      action: '/assets/images/red.svg',
    },
    {
      id: 6,
      products: 'Product Management Course',
      categories: 'Tech Learning',
      vendor: 'Mark Essen',
      order: 89456,
      price: '$34',
      sales: '$1977637',
      action: '/assets/images/ruby.svg',
    },
    {
      id: 7,
      products: 'Digital Marketing Course',
      categories: 'Tech Learning',
      vendor: 'Mark Essen',
      order: 86456,
      price: '$26',
      sales: '$1456421',
      action: '/assets/images/svg.svg',
    },
  ];

  return (
    <>
      <div className="max-[1310px]:px-[1rem] max-[834px]:px-[2.5rem] max-[800px]:pr-0 max-[830px]:px-[1.5rem] mb-[4.5rem]">
        <div className="max-w-[77.5rem] w-full mt-[3rem] flex flex-col gap-[0.9375rem] rounded-[0.5rem] border border-[#E1E3E2] bg-[#FFF] mx-auto max-[730px]:max-w-[100%] max-[800px]:rounded-tr-none max-[800px]:rounded-br-none max-[800px]:border-r-0">
          <div className="px-[1rem] py-[0.75rem] max-w-[77.5rem] w-full border-b-[0.0625rem] border-[#EAECF0]">
            <p className="font-manropeL font-medium leading-[1.75rem] text-[1.25rem] text-gray-900 max-[834px]:text-[1.125rem] max-[880px]:text-[1.125rem] max-[834px]:max-w-none">
              PortFolio Creation
            </p>
          </div>
          <div className="w-full">
            <div className="max-[778px]:overflow-x-scroll no-scrollbar">
              <div className="flex items-center justify-between px-[1.5rem] py-[0.75rem] bg-[#FCFCFD] border-b-[0.0625rem] border-[#EAECF0] max-[730px]:w-fit max-[730px]:flex max-[778px]:pr-0">
                <div className="flex items-center gap-[0.25rem] max-w-[18.9rem] max-[1000px]:max-w-[16.3rem] w-full max-[778px]:min-w-[18.9rem] max-[500px]:min-w-[17.5rem]">
                  <h6 className="text-[0.875rem] font-manropeL text-[#444846] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[880px]:text-[0.75rem] ">
                    Product Name
                  </h6>
                  <Image src="/assets/images/arrow-down.svg" alt="Down Arrow" width={16} height={16} />
                </div>
                <div className="max-w-[8.5rem] w-full max-[730px]:ml-0 max-[1000px]:max-w-[6.5rem] max-[778px]:min-w-[8.5rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Categories
                  </p>
                </div>
                <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[11.8rem] max-[834px]:hidden">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    vendor
                  </p>
                </div>
                <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[8.5rem] max-[1000px]:max-w-[3.313rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Order
                  </p>
                </div>
                <div className="max-w-[8.63rem] w-full max-[778px]:min-w-[8.63rem] max-[1000px]:max-w-[2.1rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Price
                  </p>
                </div>
                <div className="max-w-[7.38rem] w-full max-[778px]:min-w-[7.38rem] max-[1000px]:max-w-[5rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Total Sales
                  </p>
                </div>
                <div className="hidden max-w-[2.69rem] w-full max-[778px]:min-w-[2.69rem] max-[834px]:block">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Action
                  </p>
                </div>
              </div>
              {CardDataOne.map((last) => (
                <>
                  <div
                    className="flex items-center justify-between px-[1.5rem] py-[1rem] border-b-[0.0625rem] border-[#EAECF0] bg-[#FFF] max-[730px]:flex max-[730px]:pr-0"
                    key={last.id}
                  >
                    <div className="flex items-center gap-[1.5rem] max-w-[18.9rem] max-[1000px]:max-w-[16.3rem] w-full max-[778px]:min-w-[18.9rem] max-[500px]:min-w-[17.5rem]">
                      <Image src={last.action} alt="Down Arrow" width={16} height={16} />
                      <h6 className="text-[0.875rem] font-manropeL text-[#101828] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[880px]:text-[0.75rem] ">
                        {last.products}
                      </h6>
                    </div>
                    <div className="max-w-[8.5rem] w-full max-[1000px]:max-w-[6.5rem] max-[778px]:min-w-[8.5rem]">
                      <h6 className="text-[0.875rem] text-center font-manropeL font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                        {last.categories}
                      </h6>
                    </div>
                    <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[9.8rem] max-[834px]:hidden">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                        {last.vendor}
                      </p>
                    </div>
                    <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[8.5rem] max-[1000px]:max-w-[3.313rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                        {last.order}
                      </p>
                    </div>
                    <div className="max-w-[8.63rem] w-full max-[778px]:min-w-[8.63rem] max-[1000px]:max-w-[2.1rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                        {last.price}
                      </p>
                    </div>
                    <div className="max-w-[7.38rem] w-full max-[778px]:min-w-[7.38rem] max-[1000px]:max-w-[5rem]">
                      <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                        {last.sales}
                      </p>
                    </div>
                    <div className="hidden max-w-[2.96rem] w-full max-[834px]:block max-[778px]:min-w-[2.96rem]">
                      <Image
                        src="/assets/images/opt.svg"
                        className="text-[0.875rem] font-manropeL mx-auto font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]"
                        alt="More"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div>
              <div className="border-b-[0.0625rem] border-[#EAECF0]"></div>
              <Pagination />
              <div className="h-[0.94rem] rounded-b-[0.5rem] border-[0.001rem] border-t-0 border-[#EAECF0] max-[800px]:rounded-br-none"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSellingProducts;
