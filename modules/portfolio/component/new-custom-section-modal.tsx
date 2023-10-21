import React from 'react';
import { useForm } from '@mantine/form';
import CustomFooter from './customSection/customFooter';
import CustomHeader from './customSection/customHeader';
import { renderFields } from './customSection/renderField';
import CustomNewSections from './customSection/customNewSections';
import { CloseSquare } from 'iconsax-react';

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

function CreateCustomSection({ onClose }: { onClose: () => void }) {
  const [getNewSection, setGetNewSection] = React.useState(false);
  const [newSection, setNewSection] = React.useState(true);
  const [renderedFields, setRenderedFields] = React.useState<React.ReactNode[]>([]);
  const [imageSrc, setImageSrc] = React.useState('');

  const form = useForm({
    initialValues: {
      addList: [
        {
          id: '',
          fields: [],
        },
      ],
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

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        form.setFieldValue('addList.0.images', result);
        setImageSrc(result);
        console.log(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = (field: string) => {
    const newKey = Math.random();
    if (field === 'title') {
      form.setFieldValue('addList.0.title', '');
      form.setFieldValue('addList.0.id', Math.random());
      setRenderedFields((prev) => [renderFields(field, 6554, '', console.log, form), ...prev]);
    } else if (field === 'subtitle') {
      form.setFieldValue('addList.0.subtitle', { title: '', value: '' });
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, '', console.log, form)]);
    } else if (field === 'dates') {
      form.setFieldValue('addList.0.dates', { from: '', to: '' });
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, '', console.log, form)]);
    } else if (field === 'images') {
      form.setFieldValue('addList.0.images', '');
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, imageSrc, handleImageChange, form)]);
    } else if (field === 'description') {
      form.setFieldValue('addList.0.description', '');
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, '', console.log, form)]);
    } else {
      form.insertListItem('addList.0.fields', { [field]: '', value: '', key: newKey });
      const fieldIndex = form.values.addList[0].fields.length;
      setRenderedFields((prev) => [...prev, renderFields(field, newKey, '', console.log, form, fieldIndex)]);
    }
  };

  const handleClose = () => {
    onClose();
    form.reset();
    setGetNewSection(false);
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    sectionForm.setFieldValue('section', values?.addList);
    setGetNewSection(true);
    setNewSection(false);
    form.reset();
    setRenderedFields([]);
  };

  return (
    <>
      {getNewSection && <CustomNewSections onClose={onClose} />}
      {newSection && (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <div className="flex flex-col gap-3 my-19">
            {!getNewSection && (
              <>
                <div className="flex justify-between items-center">
                  <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">
                    Customize your section
                  </p>
                  <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
                </div>
                <div className="bg-brand-green-primary h-1 rounded-sm"></div>
              </>
            )}
          </div>
          <CustomHeader
            list={form.values.addList}
            sectionButtonsData={sectionButtonsData}
            handleChange={handleChange}
          />
          {form.values.addList[0].id !== '' ? (
            <div className="border-brand-disabled rounded p-5 mt-2 mb-10 text-center border-[1px] space-y-4">
              {renderedFields}
            </div>
          ) : (
            <div className="border-brand-disabled h-[250px] font-manropeL text-[#444846] flex items-center justify-center flex-col gap-7 rounded p-5 mt-3 mb-8 text-center border-[1px]">
              Customize and arrange your fields by clicking on the options above
            </div>
          )}
          {form.values.addList[0].id !== '' ? <CustomFooter handleClose={handleClose} /> : null}
        </form>
      )}
    </>
  );
}

export default CreateCustomSection;
