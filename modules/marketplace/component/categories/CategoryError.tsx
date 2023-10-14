const CategoryError = ({ message }: { message: string }) => {
  return (
    <div className="bg-white-100 rounded-[1rem] h-[300px] p-[1rem] flex items-center justify-center text-[1rem] border-[1px] my-[2.5rem] text-center md:my-[3.5rem] md:text-[1.3rem] lg:my-[5rem] lg:text-[1.5rem] font-[600] border-[#00000024]">
      {message}
    </div>
  );
};
export default CategoryError;
