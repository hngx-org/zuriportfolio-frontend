function DefaultImage(props: { name: string }) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((e) => e.charAt(0))
      .join('');
  };
  return (
    <div className="w-[7rem] h-[7rem] grid place-items-center rounded-full bg-[#0092541F] font-manropeL text-4xl text-[#009254]">
      {getInitials(props?.name)}
    </div>
  );
}

export default DefaultImage;
