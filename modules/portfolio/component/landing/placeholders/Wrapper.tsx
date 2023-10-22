import { Edit2, Trash } from 'iconsax-react';

type WrapperProps = {
  id?: string;
  title?: string;
  edit?: () => void;
  remove?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  disableEdit?: boolean;
  className?: string;
};

const Wrapper = ({ id, title, edit, remove, icon, children, disableEdit, className }: WrapperProps) => {
  return (
    <div
      className={`${className} flex justify-start items-start gap-2 md:gap-4 w-full p-5 md:p-10 shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] rounded-lg`}
      id={id}
    >
      <div className="w-full">
        <div className="flex justify-between items-start w-full">
          <div className="flex justify-center items-center gap-2 mb-6 md:mb-4">
            <div className="pb-1">{icon}</div>
            <h3 className="text-lg text-gray-600 md:text-[21px] font-semibold border-b-2 border-brand-green-primary pb-1">
              {title}
            </h3>
          </div>
          {!disableEdit && (
            <div className="flex gap-5">
              <span
                onClick={() => edit && edit()}
                className="p-2 cursor-pointer rounded-full shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] hover:scale-105 transition-all duration-200"
              >
                <Edit2 size="20" color="#009254" variant="Outline" />
              </span>
              <span
                onClick={() => remove && remove()}
                className="p-2 cursor-pointer rounded-full shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] hover:scale-105 transition-all duration-200"
              >
                <Trash size="20" color="#FF2E2E" />
              </span>
            </div>
          )}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
