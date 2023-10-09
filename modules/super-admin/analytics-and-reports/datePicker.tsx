import DatePicker from 'react-multi-date-picker';
import { useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import Image from 'next/image';
import 'react-multi-date-picker/styles/colors/green.css';

const MultiCalender: React.FC = () => {
  const [values, setValues] = useState<DateObject[]>([
    new DateObject().subtract(4, 'days'),
    new DateObject().add(4, 'days'),
  ]);

  const handleDateChange = (
    date: DateObject | DateObject[] | null,
    options: { validatedValue: string | string[]; input: HTMLElement; isTyping: boolean },
  ) => {
    if (date !== null && !Array.isArray(date)) {
      setValues([date]);
    } else if (Array.isArray(date)) {
      setValues(date);
    }
  };

  return (
    <>
      <div className="flex justify-between w-[18.275rem] border border-[#C4C7C6] rounded-[0.25rem] px-[1rem] py-[0.62rem] max-[375px]:max-w-100% max-[375px]:w-full">
        <Image src="/assets/images/cal.svg" alt="Calender-Icon" width={24} height={24} />
        <DatePicker
          value={values}
          onChange={handleDateChange}
          className="green"
          arrow={false}
          rangeHover
          range
          dateSeparator=" - "
          style={{
            border: 'none',
            color: '#A8ACAB',
            outline: 'none',
            cursor: 'pointer',
          }}
        />
        <Image src="/assets/images/sel.svg" alt="Calender-Icon" width={24} height={24} />
      </div>
    </>
  );
};

export default MultiCalender;
