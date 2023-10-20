export default function CartPageSkeleton() {
  return (
    <main className="max-w-[1240px] animate-pulse mx-auto flex w-full flex-col items-center md:justify-between mb-8 px-4 lg:px-0">
      <section className="w-full mt-[3%] flex flex-col lg:flex-row lg:gap-5">
        <div className="w-full flex flex-col justify-center md:w-full lg:w-4/5">
          <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5 cart-item">
            <div className="skeleton-image w-[250px] rounded-md h-[180px] bg-[#f0f0f0]"></div>
            <div className="flex flex-col md:w-2/4">
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
            </div>
            <div className="skeleton-button rounded-md w-[100px] h-[40px] bg-[#f0f0f0] ml-[auto] mt-[8%] "></div>
          </div>

          <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5 cart-item">
            <div className="skeleton-image w-[250px] rounded-md h-[180px] bg-[#f0f0f0]"></div>
            <div className="flex flex-col md:w-2/4">
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
            </div>
            <div className="skeleton-button rounded-md w-[100px] h-[40px] bg-[#f0f0f0] ml-[auto] mt-[8%] "></div>
          </div>

          <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5 cart-item">
            <div className="skeleton-image w-[250px] rounded-md h-[180px] bg-[#f0f0f0]"></div>
            <div className="flex flex-col md:w-2/4">
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
            </div>
            <div className="skeleton-button rounded-md w-[100px] h-[40px] bg-[#f0f0f0] ml-[auto] mt-[8%] "></div>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col mt-[50px] mb-[10%]">
        <div className="w-full flex flex-row overflow-scroll gap-x-8 md:overflow-hidden items-center lg:items-start lg:justify-between md:flex-row md:justify-center md:flex-wrap md:gap-x-4 gap-y-4 lg:gap-x-2 mt-4">
          <div className="skeleton-recently-viewed w-[250px] h-[270px] bg-[#f0f0f0] mt-[10px] rounded-md "></div>
          <div className="skeleton-recently-viewed w-[250px] h-[270px] bg-[#f0f0f0] mt-[10px] rounded-md "></div>
          <div className="skeleton-recently-viewed w-[250px] h-[270px] bg-[#f0f0f0] mt-[10px] rounded-md "></div>
          <div className="skeleton-recently-viewed w-[250px] h-[270px] bg-[#f0f0f0] mt-[10px] rounded-md "></div>
        </div>
      </section>
    </main>
  );
}
