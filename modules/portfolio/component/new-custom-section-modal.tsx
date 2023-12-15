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
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
];

function CreateCustomSectionContainer({ onClose, userId }: { onClose: () => void; userId: string }) {
  const [getNewSection, setGetNewSection] = React.useState(false);
  const [newSection, setNewSection] = React.useState(true);
  const [renderedFields, setRenderedFields] = React.useState<React.ReactNode[]>([]);
  const urlRegex = /^(https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=]*)?$/;

  function containsWhitespace(str) {
    return /\s/.test(str);
  }
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
        title: (value) => (value?.length === 0 ? 'Title is empty or contains whitespaces' : null),
        subtitle: {
          title: (value) => (value?.length === 0 ? 'Subtitle is empty or contains whitespaces' : null),
          value: (value) => (value?.length === 0 ? 'Subtitle - value is empty or contains whitespaces' : null),
        },
        dates: {
          from: (value) => (value?.length === 0 ? 'From date is empty' : null),
          to: (value, allValues) => {
            const fromDate = parseInt(allValues.addList[0].dates.from);
            const toDate = parseInt(value);

            if (toDate < fromDate) {
              return 'To date should not be earlier than From date';
            }

            return null;
          },
        },
        description: (value) => (value?.length === 0 ? 'Description is empty' : null),

        fields: (value) => {
          const errors = value?.reduce((acc, field, index) => {
            if (field?.inputfield !== undefined) {
              if (field.inputfield?.length === 0) {
                acc.push(`Input title is empty or contains whitespaces`);
              }
              if (field?.value?.length === 0) {
                acc.push(`Input field is empty`);
              }
            }
            if (field?.links !== undefined) {
              if (field.links?.length === 0) {
                acc.push(`Link title is empty or contains whitespaces`);
              }
              if (!urlRegex.test(field.value)) {
                acc.push(`Link is not a valid URL`);
              }
            }
            return acc;
          }, []);

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
    } else if (field === 'description') {
      form.setFieldValue('addList.0.description', '');
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, form)]);
    } else {
      form.insertListItem('addList.0.fields', { [field]: '', value: '', key: newKey, type: field });
      const fieldIndex = form.values.addList[0].fields.length;
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, form, fieldIndex)]);
    }
  };

  const createNewCustomSectionOption = useMutation(async () => {
    const response = await axios.post(`${PORTFOLIO_BASE_URL}/custom/`, {
      sectionId: 55,
      title: form?.values?.addList[0]?.title,
      userId: userId,
    });
    return response.data;
  });

  const createNewCustomSectionMutation = useMutation(async () => {
    const fields = [];

    if (sectionForm?.values?.section[0].subtitle) {
      fields.push({
        fieldType: 'subtitle',
        fieldName: sectionForm?.values?.section[0].subtitle.title,
        value: sectionForm?.values?.section[0].subtitle.value,
      });
    }
    if (sectionForm?.values?.section[0].dates?.from && sectionForm?.values?.section[0].dates?.to) {
      fields.push({
        fieldType: 'date',
        fieldName: 'date',
        value: `${values.addList[0].dates.from} - ${values.addList[0].dates.to}`,
      });
    }

    if (sectionForm?.values?.section[0].description) {
      fields.push({
        fieldType: 'description',
        fieldName: 'Description',
        value: sectionForm?.values?.section[0].description,
      });
    }
    fields.push(
      ...sectionForm?.values?.section[0].fields
        .filter((field) => field.type && field.inputfield && field.value)
        .map((field) => {
          return {
            fieldType: field.type,
            fieldName: field.inputfield,
            value: field.value,
          };
        }),
    );

    if (fields.length < 1) {
      const response = await axios.post(`${PORTFOLIO_BASE_URL}/custom/field`, {
        customUserSectionId: sectionForm?.values?.section[0]?.id,
        fields: fields,
      });
      return response.data;
    }
  });

  const handleCreateNewCustomSection = () => {
    createNewCustomSectionMutation.mutate(undefined, {
      onSuccess: (res) => {
        console.log('onSuccess', res);
        notify({
          message: 'Custom Section created successfully',
          autoClose: 1000,
          type: 'success',
        });
        onClose();
        setGetNewSection(false);
        setNewSection(true);
      },
      onError: (error) => {
        notify({
          message: 'No fields added',
          autoClose: 1000,
          type: 'error',
        });
      },
    });
  };

  const handleSubmit = (values: any) => {
    createNewCustomSectionOption.mutate(undefined, {
      onSuccess: (res) => {
        sectionForm.setFieldValue('section', values?.addList);
        sectionForm.setFieldValue('section.0.id', res?.data?.id);
        setGetNewSection(true);
        setNewSection(false);
      },
      onError: () => {
        notify({
          message: 'An error occurred please try again',
          autoClose: 1000,
          type: 'error',
        });
      },
    });
  };

  const handleClose = () => {
    onClose();
    setGetNewSection(false);
    setNewSection(true);
  };

  const deleteSection = () => {
    form.reset();
    sectionForm.reset();
    setRenderedFields([]);
    setGetNewSection(false);
    setNewSection(true);
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
      isLoading={createNewCustomSectionOption.isLoading}
      isCreatingSection={createNewCustomSectionMutation.isLoading}
      createCustomSection={handleCreateNewCustomSection}
      deleteSection={deleteSection}
    />
  );
}

function CreateCustomSection({
  getNewSection,
  isLoading,
  isCreatingSection,
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
  createCustomSection,
  deleteSection,
}: {
  getNewSection: boolean;
  isLoading: boolean;
  isCreatingSection: boolean;
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
  createCustomSection: () => void;
  deleteSection: () => void;
}) {
  const errorMessages = Object.values(form.errors)
    .flat()
    .map((error, index) => (
      <p key={index} className="py-1">
        - {error}
      </p>
    ));

  const isErrorsEmpty = Object.keys(form.errors).length === 0;

  return (
    <>
      {!newSection && (
        <CustomNewSections
          onClose={onClose}
          data={sectionForm.values.section}
          setNewSection={setNewSection}
          setGetNewSection={setGetNewSection}
          isLoading={isCreatingSection}
          createCustomSection={createCustomSection}
          deleteSection={deleteSection}
        />
      )}
      <Transition show={newSection} as={React.Fragment} unmount={false}>
        <form onSubmit={form.onSubmit((values: any) => handleSubmit(values))} className="md:mx-5">
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
                  Click to view errors
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
              } rounded p-5 sm:p-8 mt-2 mb-10 text-center border-[1px] space-y-6 max-h-[500px] overflow-y-auto renderedFields`}
            >
              {renderedFields}
            </div>
          ) : (
            <div className="border-brand-disabled h-[250px] font-manropeL text-[#444846] flex items-center justify-center flex-col gap-7 rounded p-5 mt-3 mb-8 text-center border-[1px]">
              Customize your fields by clicking on the options above
            </div>
          )}
          {form.values.addList[0].id !== '' ? <CustomFooter handleClose={handleClose} isLoading={isLoading} /> : null}
        </form>
      </Transition>
    </>
  );
}

export default CreateCustomSectionContainer;
