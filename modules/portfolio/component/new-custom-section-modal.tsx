import React, { useContext } from 'react';
import { useForm } from '@mantine/form';
import CustomFooter from './customSection/customFooter';
import CustomHeader from './customSection/customHeader';
import { renderFields } from './customSection/renderField';
import CustomNewSections from './customSection/customNewSections';
import Portfolio from '../../../context/PortfolioLandingContext';
import Modal from '@ui/Modal';

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
    type: 'images',
    title: 'Images',
  },
  {
    type: 'dates',
    title: 'Dates',
  },
];

function CreateCustomSection() {
  const { openCustom, setOpenCustom } = useContext(Portfolio);

  let isOpen = openCustom,
    onClose = () => setOpenCustom(false);

  const [fieldInput, setFieldInput] = React.useState(false);
  const [renderedFields, setRenderedFields] = React.useState<React.ReactNode[]>([]);

  const form = useForm({
    initialValues: {
      addList: [
        {
          id: '',
          fields: [],
        },
      ],
      section: [
        {
          id: '',
          fields: [],
        },
      ],
    },
  });

  const handleChange = (e: string) => {
    addItem(e);
  };

  const addItem = (field: string) => {
    const newKey = Math.random();
    if (field === 'title') {
      form.setFieldValue('addList.0.title', field);
      form.setFieldValue('addList.0.id', Math.random());
      setRenderedFields((prev) => [renderFields(field, 6554), ...prev]);
    } else if (field === 'subtitle') {
      form.setFieldValue('addList.0.subtitle', '');
      setRenderedFields((prev) => [...prev, renderFields(field, newKey)]);
    } else if (field === 'dates') {
      form.setFieldValue('addList.0.dates', '');
      setRenderedFields((prev) => [...prev, renderFields(field, newKey)]);
    } else if (field === 'images') {
      form.setFieldValue('addList.0.images', '');
      setRenderedFields((prev) => [...prev, renderFields(field, newKey)]);
    } else {
      form.insertListItem('addList.0.fields', { [field]: '', value: '', key: newKey });
      setRenderedFields((prev) => [...prev, renderFields(field, newKey)]);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
    setFieldInput(false);
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    setFieldInput(true);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={fieldInput}
        closeModal={() => null}
        closeOnOverlayClick={false}
        isCloseIconPresent={false}
        size="xl"
      >
        <CustomNewSections onClose={handleClose} />
        <CustomFooter handleClose={handleClose} />
      </Modal>

      <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <CustomHeader
            list={form.values.addList}
            sectionButtonsData={sectionButtonsData}
            handleChange={handleChange}
          />
          {form.values.addList[0].id !== '' || form.values.section[0].fields.length > 0 ? (
            <div className="border-brand-disabled rounded p-5 mt-2 mb-10 text-center border-[1px] space-y-4">
              {renderedFields}
            </div>
          ) : (
            <div className="border-brand-disabled h-[250px] font-manropeL text-[#444846] flex items-center justify-center flex-col gap-7 rounded p-5 mt-3 mb-8 text-center border-[1px]">
              Customize and arrange your fields by clicking on the options above
            </div>
          )}
          <CustomFooter handleClose={handleClose} />
        </form>
      </Modal>
    </>
  );
}

export default CreateCustomSection;
