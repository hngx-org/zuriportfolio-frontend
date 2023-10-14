export default function CartPageSkeleton() {
  return (
    <main className="max-w-[1240px] animate-pulse mx-auto flex w-full flex-col items-center md:justify-between mb-8 px-4 lg:px-0">
      <section className="w-full mt-[3%] flex flex-col lg:flex-row lg:gap-5">
        <div className="w-full flex flex-col justify-center md:w-full lg:w-4/5">
          <h1 className="text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] -2xl mb-7 font-manropeEB">Loading...</h1>

          <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5 cart-item">
            <div className="skeleton-image w-[250px] h-[140px] bg-[#f0f0f0]"></div>
            <div className="flex flex-col md:w-2/4">
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
            </div>
            <div className="skeleton-button w-[100px] h-[40px] bg-[#f0f0f0] ml-[auto] mt-[10px] "></div>
          </div>

          <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5 cart-item">
            <div className="skeleton-image w-[250px] h-[140px] bg-[#f0f0f0]"></div>
            <div className="flex flex-col md:w-2/4">
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
            </div>
            <div className="skeleton-button w-[100px] h-[40px] bg-[#f0f0f0] ml-[auto] mt-[10px] "></div>
          </div>

          <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5 cart-item">
            <div className="skeleton-image w-[250px] h-[140px] bg-[#f0f0f0]"></div>
            <div className="flex flex-col md:w-2/4">
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
              <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
            </div>
            <div className="skeleton-button w-[100px] h-[40px] bg-[#f0f0f0] ml-[auto] mt-[10px] "></div>
          </div>
        </div>

        <div className="flex md:flex-none md:mx-0 lg:w-2/5">
          <section className="flex lg:px-10 py-8 w-full">
            <div className="cart-summary_wrapper w-full flex flex-col space-y-6">
              <div className="cart-summary__header border border-gray-300 rounded-md shadow-sm">
                <h1 className="font-bold capitalize text w-[100%] h-[20px] bg-[#f0f0f0] my-[5px] -xl px-4 py-4">
                  Loading...
                </h1>
                <hr className="border-b-1 border-gray-500" />
                <div className="coupon flex flex-col py-4 px-4">
                  <div className="skeleton-text w-[100%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
                </div>
              </div>

              <div className="cart-summary__details cart-summary__header border border-gray-300 rounded-md px-6 rounded-lg py-8 shadow-sm">
                <div className="cart-summary__prices flex flex-col space-y-3">
                  <div className="sum flex justify-between">
                    <div className="skeleton-text w-[100%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
                  </div>
                </div>

                <hr className="border-b-5 border-gray-300 my-4 mx-3" />

                <div className="cart-total">
                  <div className="sum flex justify-between">
                    <div className="skeleton-text w-[80%] h-[20px] bg-[#f0f0f0] my-[5px] "></div>
                  </div>
                </div>

                <div className="skeleton-button w-[100px] h-[40px] bg-[#f0f0f0] ml-[auto] mt-[10px] "></div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="w-full flex flex-col mt-[50px] mb-[10%]">
        <h1 className="text w-[100%] h-[20px] bg-[#f0f0f0] my-[5px] py-[15px] font-bold md:ml-0 font-manropeEB">
          Recently Viewed
        </h1>

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
