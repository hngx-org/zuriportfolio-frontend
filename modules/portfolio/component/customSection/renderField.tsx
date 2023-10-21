import { UseFormReturnType } from '@mantine/form';
import { years } from '@modules/portfolio/data';
import { Input } from '@ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { CloseCircle, Trash } from 'iconsax-react';

export const renderFields = (
  field: string,
  id: number,
  form?: UseFormReturnType<
    { addList: { id: string; fields: any[] }[] },
    (values: { addList: { id: string; fields: any[] }[] }) => { addList: { id: string; fields: any[] }[] }
  >,
  index?: number | undefined,
) => {
  switch (field) {
    case 'title':
      return (
        <div className="flex flex-col gap-1 mb-7 items-start" id={`${id}`}>
          <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem;] font-semibold">#1 Title</p>
          <div className="">
            <input
              className="border-brand-green-primary border-b-[5px] w-min-[9rem] pb-2 text-2xl inline-block focus:outline-none placeholder-black"
              placeholder="Section Title"
              {...form?.getInputProps(`addList.0.title`)}
            />
          </div>
        </div>
      );
    case 'subtitle':
      return (
        <div className="flex flex-col gap-1 items-start" id={`${id}`}>
          <div className="flex justify-between items-center w-full">
            <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem] font-semibold">#2 Subtitle</p>
            <CloseCircle size={18} className="text-gray-200 cursor-pointer" />
          </div>
          <input
            type="text"
            className="text-left mb-2 text-custom-color43 w-full font-semibold font-manropeL outline-none"
            placeholder="Field Title"
            {...form?.getInputProps(`addList.0.subtitle.title`)}
          />
          <div className="w-full">
            <Input
              placeHolder="Senior project manager"
              className="border-[#E1E3E2] w-full h-[54px] rounded-md border-[1px]"
              inputSize={'lg'}
              {...form?.getInputProps(`addList.0.subtitle.value`)}
            />
          </div>
        </div>
      );
    case 'links':
      return (
        <div className="flex text-left flex-col gap-1 items-start" id={`${id}`}>
          <div className="flex justify-between items-center w-full">
            <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem] font-semibold">#4 Links</p>
            <CloseCircle size={18} className="text-white-400 cursor-pointer" />
          </div>
          <div>
            <input
              type="text"
              className="text-left mb-1 text-custom-color43 w-full font-semibold font-manropeL outline-none"
              placeholder="Link text"
              {...form?.getInputProps(`addList.0.fields.${index}.links`)}
            />
          </div>
          <div className="w-full">
            <Input
              placeHolder="Links"
              className="border-[#E1E3E2] w-full h-[54px] rounded-md border-[1px]"
              inputSize={'lg'}
              {...form?.getInputProps(`addList.0.fields.${index}.value`)}
            />
          </div>
        </div>
      );
    case 'description':
      return (
        <div className="flex flex-col text-left gap-1 items-start" id={`${id}`}>
          <div className="flex justify-between items-center w-full">
            <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem] font-semibold">
              #5 Description
            </p>
            <CloseCircle size={18} className="text-white-400 cursor-pointer" />
          </div>
          <div>
            <p className="text-left mb-1 text-custom-color43 w-full font-semibold font-manropeL">Description</p>
          </div>
          <div className="w-full">
            <textarea
              className="resize-none border-[1px] w-full border-solid border-[#E1E3E2] pt-2 pl-2 text-white-650 font-semibold rounded-lg outline-none focus:border-brand-green-primary "
              rows={3}
              {...form?.getInputProps(`addList.0.description`)}
            ></textarea>
          </div>
        </div>
      );
    case 'inputfield':
      return (
        <div className="flex flex-col gap-1 items-start" id={`${id}`}>
          <div className="flex justify-between items-center w-full">
            <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem] font-semibold">
              #3 Input field
            </p>
            <CloseCircle size={18} className="text-white-400 cursor-pointer" />
          </div>
          <input
            type="text"
            className="text-left mb-2 text-custom-color43 w-full font-semibold font-manropeL outline-none"
            placeholder="Field Title"
            {...form?.getInputProps(`addList.0.fields.${index}.inputfield`)}
          />
          <div className="w-full">
            <Input
              placeHolder="Senior project manager"
              className="border-[#E1E3E2] w-full h-[54px] rounded-md border-[1px]"
              inputSize={'lg'}
              {...form?.getInputProps(`addList.0.fields.${index}.value`)}
            />
          </div>
        </div>
      );
    case 'dates':
      return (
        <div className="flex flex-col gap-2 items-start" id={`${id}`}>
          <div className="flex justify-between items-center w-full">
            <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem] font-semibold">#6 Dates</p>
            <CloseCircle size={18} className="text-white-400 cursor-pointer" />
          </div>
          <div className="w-full">
            <div className="flex justify-between gap-7">
              <div className="w-full">
                <p className="text-[#444846] mb-2 text-left font-semibold">From *</p>
                <Select
                  {...form?.getInputProps('addList.0.dates.from')}
                  onValueChange={(value) => form?.setFieldValue('addList.0.dates.from', value)}
                >
                  <SelectTrigger className="w-full border-[1px] border-brand-disabled">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <>
                    <SelectContent>
                      {years.map((year, index) => (
                        <SelectItem key={index} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </>
                </Select>
              </div>
              <div className="w-full">
                <p className="text-[#444846] mb-2 text-left font-semibold">To *</p>
                <Select
                  {...form?.getInputProps('addList.0.dates.to')}
                  onValueChange={(value) => form?.setFieldValue('addList.0.dates.to', value)}
                >
                  <SelectTrigger className="w-full border-[1px] border-brand-disabled">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <>
                    <SelectContent>
                      {years.map((year, index) => (
                        <SelectItem key={index} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </>
                </Select>
              </div>
            </div>
          </div>
        </div>
      );
  }
};
