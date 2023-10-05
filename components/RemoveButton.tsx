

export default function RemoveButton() {
  return (
    <div className="flex border gap-1 items-center justify-center shadow-md w-[100px] h-[40px] border-[#d5dbdd] rounded-md cursor-pointer">
      <img src="./assets/icons/trash.svg" alt="" />
      <p className="text-[#555757]">Remove</p>
    </div>
  );
}
