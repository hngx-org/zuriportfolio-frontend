import DatePicker from 'react-multi-date-picker';
import { useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
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
      <DatePicker
        value={values}
        onChange={handleDateChange}
        className="green"
        arrow={false}
        rangeHover
        range
        dateSeparator=" - "
      />
    </>
  );
};

export default MultiCalender;
