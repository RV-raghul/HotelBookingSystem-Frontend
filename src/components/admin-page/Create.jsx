import React, { useState } from 'react';
import { UploadCloud } from 'react-feather';
import { indianCity, hotelType } from '../common/Constants';
import { useForm } from 'react-hook-form';
import hotelService from '../../service/hotel.service';
import toast from 'react-hot-toast';

function Create() {
  const allowedFormat = ['jpeg', 'png', 'jpg'];
  const [image, setImage] = useState('');

  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    let extension = file.name.split('.').pop();
    if (allowedFormat.includes(extension) && file.size < 1000000) {
      const base64 = await convertToBase64(file);
      setImage(base64);
    } else {
      toast.error(
        `Only ${allowedFormat.join(', ')} formats are allowed and size should be less than 1 MB`
      );
    }
  };

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const {
      title,
      description,
      guest,
      location,
      type,
      price,
      wifi,
      ac,
      tv,
      pets,
      bar,
    } = data;
    try {
      await hotelService.addHotel({
        userId: sessionStorage.getItem('userID'),
        title,
        description,
        guest,
        location,
        type,
        price,
        image,
        wifi,
        ac,
        tv,
        pets,
        bar,
      });
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong! Try again later'
      );
    }
  };

  return (
    
    <div className='h-[90vh] w-full flex justify-center items-center bg-cover bg-center px-4 py-10 bg-slate-200'>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-4xl bg-white p-6 rounded-md shadow-md flex flex-col gap-4'
      >
        <h1 className='text-xl font-semibold subheader'>Title *</h1>
        <input
          name='title'
          type='text'
          placeholder='Enter Title'
          {...register('title', { required: true })}
          className='w-full p-2 border rounded-md'
        />

        <h1 className='text-xl font-semibold subheader'>Description *</h1>
        <textarea
          name='description'
          placeholder='Enter Description'
          className='w-full p-2 border rounded-md h-24'
          {...register('description', { required: true })}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h1 className='font-medium subheader'>Accommodation *</h1>
            <div className='flex gap-4 mt-1'>
              {[2, 3, 4].map((num) => (
                <label key={num} className='flex items-center gap-1'>
                  <input type='radio' value={num} {...register('guest', { required: true })} />
                  <span>{num}</span>
                </label>
              ))}
            </div>

            <h1 className='font-medium mt-4 subheader'>Location *</h1>
            <select
              {...register('location', { required: true })}
              className='w-full p-2 border rounded-md'
            >
              {indianCity.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            <h1 className='font-medium mt-4 subheader'>Type *</h1>
            <select
              {...register('type', { required: true })}
              className='w-full p-2 border rounded-md'
            >
              {hotelType.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>

            <h1 className='font-medium mt-4 subheader'>Image *</h1>
            <label className='flex items-center gap-2 border p-2 rounded-md cursor-pointer w-fit'>
              <UploadCloud />
              <span>Choose File</span>
              <input
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageUpload}
              />
            </label>

            <h1 className='font-medium mt-4 subheader'>Price *</h1>
            <input
              name='price'
              type='number'
              step='0.01'
              placeholder='Enter Amount'
              className='w-full p-2 border rounded-md'
              {...register('price', { required: true })}
            />
          </div>

          <div>
            <h1 className='font-semibold mb-2 subheader'>Amenities *</h1>
            {[
              { name: 'wifi', label: 'Wifi Available' },
              { name: 'tv', label: 'TV Available' },
              { name: 'ac', label: 'AC Available' },
              { name: 'pets', label: 'Pets Allowed' },
              { name: 'bar', label: 'Bar Available' },
            ].map((amenity) => (
              <div key={amenity.name} className='mb-3'>
                <p className='font-medium subheader'>{amenity.label}?</p>
                <div className='flex gap-4'>
                  <label className='flex items-center gap-1'>
                    <input
                      type='radio'
                      name={amenity.name}
                      value='true'
                      {...register(amenity.name, { required: true })}
                    />
                    Yes
                  </label>
                  <label className='flex items-center gap-1'>
                    <input
                      type='radio'
                      name={amenity.name}
                      value='false'
                      {...register(amenity.name, { required: true })}
                    />
                    No
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type='submit'
          className='w-fit subheader pop-button bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition'
        >
          Add Hotel
        </button>
      </form>
    </div>
  );
}

export default Create;
