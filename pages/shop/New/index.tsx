import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import axios from 'axios';
import Image from 'next/image';

const NewProduct: React.FC = () => {
  const [data, setData] = useState({
    name: '',
    category: 'Fiction', // Set the default category to Fiction
    image: '',
    price: '',
    description: '',
    specification: '',
    shopOwner: 'Mark Essien',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        setData((prev) => ({
          ...prev,
          image: imageData,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, image, category, price, description, specification, shopOwner } = data;

    if (name && image && category && price && description && specification && shopOwner) {
      try {
        const response = await axios.post('http://localhost:4000/uploadProduct', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response.data);
        console.log(response.data.message);

        setData({
          name: '',
          category: 'Fiction',
          image: '',
          price: '',
          description: '',
          specification: '',
          shopOwner: '',
        });
      } catch (error) {
        console.error(error);
        console.error('Server error');
      }
    } else {
      console.error('Enter required fields');
    }
  };

  return (
    <div className="p-4">
      <div className="py-32">
        <form className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type={'text'}
            name="name"
            className="bg-slate-200 p-1 my-1"
            onChange={handleOnChange}
            value={data.name}
          />

          <label htmlFor="category">Category</label>
          <select
            className="bg-slate-200 p-1 my-1 outline-none"
            id="category"
            name="category"
            onChange={handleOnChange}
            value={data.category}
          >
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="E-book">E-book</option>
          </select>
          <label htmlFor="image">
            Image
            <div className="h-40 w-full  bg-slate-200  rounded flex items-center justify-center cursor-pointer">
              {data.image ? (
                <Image
                  src={data.image}
                  alt={data.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover bg-center"
                />
              ) : (
                <span className="text-5xl">
                  <BsCloudUpload />
                </span>
              )}

              <input type={'file'} accept="image/*" id="image" onChange={uploadImage} className="hidden" />
            </div>
          </label>

          <label htmlFor="price" className="my-1">
            Price
          </label>
          <input
            type={'text'}
            className="bg-slate-200 p-1 my-1"
            name="price"
            onChange={handleOnChange}
            value={data.price}
          />
          <label htmlFor="price" className="my-1">
            Shop Owner
          </label>

          <input
            type={'text'}
            className="bg-slate-200 p-1 my-1"
            name="shopOwner"
            onChange={handleOnChange}
            value={data.shopOwner}
          />

          <label htmlFor="description">Description</label>
          <textarea
            rows={2}
            value={data.description}
            className="bg-slate-200 p-1 my-1 resize-none"
            name="description"
            onChange={handleOnChange}
          ></textarea>

          <label htmlFor="specification">Specification</label>
          <textarea
            rows={2}
            value={data.specification}
            className="bg-slate-200 p-1 my-1 resize-none"
            name="specification"
            onChange={handleOnChange}
          ></textarea>
          <button
            type="submit"
            className="bg-[#FB320D] hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow border-none outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
