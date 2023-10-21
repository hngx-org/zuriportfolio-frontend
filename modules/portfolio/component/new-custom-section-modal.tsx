// @ts-nocheck
import React from 'react';
import { useForm } from '@mantine/form';
import CustomFooter from './customSection/customFooter';
import CustomHeader from './customSection/customHeader';
import { renderFields } from './customSection/renderField';
import CustomNewSections from './customSection/customNewSections';
import { CloseSquare } from 'iconsax-react';
import { Popover, Transition } from '@headlessui/react';
import { notify } from '@ui/Toast';

const sectionButtonsData = [
  {
    type: 'subtitle',
    title: 'Sub Title',
  },
  {
    type: 'inputfield',
    title: 'Input field',
  },
  {
    type: 'links',
    title: 'Links',
  },
  {
    type: 'description',
    title: 'Description',
  },
  {
    type: 'dates',
    title: 'Dates',
  },
];

function CreateCustomSectionContainer({ onClose }: { onClose: () => void }) {
  const [getNewSection, setGetNewSection] = React.useState(false);
  const [newSection, setNewSection] = React.useState(true);
  const [renderedFields, setRenderedFields] = React.useState<React.ReactNode[]>([]);

  const form = useForm({
    initialValues: {
      addList: [
        {
          id: '',
          fields: [],
        },
      ],
    },
    validateInputOnChange: true,
    validate: {
      addList: {
        title: (value) => (value?.length === 0 ? 'Title is required' : null),
        subtitle: {
          title: (value) => (value?.length === 0 ? 'Subtitle title is required' : null),
          value: (value) => (value?.length === 0 ? 'Subtitle value is required' : null),
        },
        dates: {
          from: (value) => (value?.length === 0 ? 'From date is required' : null),
          to: (value) => (value?.length === 0 ? 'To date is required' : null),
        },
        description: (value) => (value?.length === 0 ? 'Description is required' : null),
        fields: (value, allValues) => {
          const fields = allValues.addList[0].fields;
          const errors = [];
          for (let i = 0; i < fields.length; i++) {
            if (fields[i].type === 'inputfield' && fields[i].value === '') {
              errors.push(`Field #${i + 1} is required`);
            }
            if (fields[i].type === 'links' && fields[i].value === '') {
              errors.push(`Link #${i + 1} is required`);
            }
          }
          return errors.length ? errors : null;
        },
      },
    },
  });

  const sectionForm = useForm({
    initialValues: {
      section: [],
    },
  });

  const handleChange = (e: string) => {
    addItem(e);
  };

  const addItem = (field: string) => {
    const newKey = Math.random();
    if (field === 'title') {
      form.setFieldValue('addList.0.title', '');
      form.setFieldValue('addList.0.id', Math.random());
      setRenderedFields((prev) => [renderFields(field, newKey, form), ...prev]);
    } else if (field === 'subtitle') {
      form.setFieldValue('addList.0.subtitle', { title: '', value: '' });
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, form)]);
    } else if (field === 'dates') {
      form.setFieldValue('addList.0.dates', { from: '', to: '' });
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, form)]);
    } else if (field === 'description') {
      form.setFieldValue('addList.0.description', '');
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, form)]);
    } else {
      form.insertListItem('addList.0.fields', { [field]: '', value: '', key: newKey });
      const fieldIndex = form.values.addList[0].fields.length;
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, form, fieldIndex)]);
    }
  };

  const handleClose = () => {
    onClose();
    setGetNewSection(false);
  };

  const handleSubmit = (values: any) => {
    sectionForm.setFieldValue('section', values?.addList);
    setGetNewSection(true);
    setNewSection(false);
  };

  return (
    <CreateCustomSection
      getNewSection={getNewSection}
      setGetNewSection={setGetNewSection}
      newSection={newSection}
      setNewSection={setNewSection}
      renderedFields={renderedFields}
      form={form}
      sectionForm={sectionForm}
      sectionButtonsData={sectionButtonsData}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      onClose={onClose}
    />
  );
}

function CreateCustomSection({
  getNewSection,
  setGetNewSection,
  newSection,
  setNewSection,
  renderedFields,
  form,
  sectionForm,
  sectionButtonsData,
  handleChange,
  handleClose,
  handleSubmit,
  onClose,
}: {
  getNewSection: boolean;
  setGetNewSection: React.Dispatch<React.SetStateAction<boolean>>;
  newSection: boolean;
  setNewSection: React.Dispatch<React.SetStateAction<boolean>>;
  renderedFields: React.ReactNode[];
  form: any;
  sectionForm: any;
  sectionButtonsData: { type: string; title: string }[];
  handleChange: (e: string) => void;
  handleClose: () => void;
  handleSubmit: (values: any) => void;
  onClose: () => void;
}) {
  const errorMessages = Object.values(form.errors)
    .flat()
    .map((error, index) => <p key={index}>{error}</p>);

  const isErrorsEmpty = Object.keys(form.errors).length === 0;

  return (
    <>
      {!newSection && (
        <CustomNewSections
          onClose={onClose}
          data={sectionForm.values.section}
          setNewSection={setNewSection}
          setGetNewSection={setGetNewSection}
        />
      )}
      <Transition show={newSection} as={React.Fragment} unmount={false}>
        <form onSubmit={form.onSubmit((values: any) => handleSubmit(values))}>
          <div className="flex flex-col gap-3 my-19">
            <>
              <div className="flex justify-between items-center">
                <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">
                  Customize your section
                </p>
                <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
              </div>
              <div className="bg-brand-green-primary h-1 rounded-sm"></div>
            </>
          </div>
          <CustomHeader
            list={form.values.addList}
            sectionButtonsData={sectionButtonsData}
            handleChange={handleChange}
          />
          {!isErrorsEmpty && (
            <Popover className="relative">
              <Popover.Button>
                <p className="text-red-300 mb-4 text-[0.6875rem] tracking-[0.00344rem] font-semibold">
                  Click to see errors
                </p>
              </Popover.Button>

              <Popover.Panel className="absolute w-[250px] font-manropeL text-[12px] text-red-300 z-10 bg-white-100 p-2 border-white-300 border-2">
                {errorMessages}
              </Popover.Panel>
            </Popover>
          )}
          {form.values.addList[0].id !== '' ? (
            <div
              className={`${
                isErrorsEmpty ? 'border-brand-disabled ' : 'border-red-300'
              } rounded p-5 mt-2 mb-10 text-center border-[1px] space-y-4`}
            >
              {renderedFields}
            </div>
          ) : (
            <div className="border-brand-disabled h-[250px] font-manropeL text-[#444846] flex items-center justify-center flex-col gap-7 rounded p-5 mt-3 mb-8 text-center border-[1px]">
              Customize and arrange your fields by clicking on the options above
            </div>
          )}
          {form.values.addList[0].id !== '' ? <CustomFooter handleClose={handleClose} /> : null}
        </form>
      </Transition>
    </>
  );
}

export default CreateCustomSectionContainer;
