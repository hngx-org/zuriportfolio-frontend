import React from 'react';

function ExperienceCard({ children, title, content }: { children: React.ReactNode; title: string; content: string }) {
  return (
    <li className=" flex flex-col items-center text-center md:items-start md:text-left">
      <span className="h-[27px] w-[30px] rounded-[18px] grid place-content-center mb-2.5 bg-brand-green-ttr">
        {children}
      </span>
      <h4 className="text-black font-manropeL mb-2 text-sm sm:text-[14px] font-bold tracking-[0.046px]">{title}</h4>
      <p className="text-[#475367] font-manropeL text-10px]">{content}</p>
    </li>
  );
}

export default ExperienceCard;
