import React, { useEffect, useState } from 'react';
import hotelService from '../../service/hotel.service';
import { ThreeCircles } from 'react-loader-spinner';
import toast from 'react-hot-toast';

const initialForm = {
  firstName: '',
  lastName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: ''
};

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await hotelService.getProfile();
      if (res.data) {
        setProfile(res.data);
      }
    } catch (error) {
      console.log('No existing profile, please create.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    
    // ✅ Validation Check: Ensure all fields are filled
    const isFormComplete = Object.values(formData).every(value => value.trim() !== '');
    if (!isFormComplete) {
      toast.error('Please fill all the fields.');
      return;
    }

    try {
      await hotelService.createProfile(formData);
      await fetchProfile();
      setFormData(initialForm);
    } catch (error) {
      toast.error('Error creating profile.');
      console.error('Error creating profile:', error);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    
    // ✅ Validation Check: Ensure all fields are filled before saving
    try {
      await hotelService.updateProfile(formData);
      await fetchProfile();
      setEditing(false);
    } catch (error) {
      toast.error('Error updating profile.');
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#000000"
          ariaLabel="three-circles-loading"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 bg-slate-200">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        {!profile ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Create Profile</h2>
            <form onSubmit={handleCreateProfile} className="space-y-4">
              {Object.keys(initialForm).map((key) => (
                <InputField
                  key={key}
                  label={getLabel(key)}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              ))}
              <button
                type="submit"
                className="px-6 py-2 pop-button text-white rounded-md"
              >
                Create Profile
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 subheader">My Profile</h2>
            {!editing ? (
              <div className="space-y-4">
                {Object.keys(initialForm).map((key) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm font-medium mb-1">{getLabel(key)}</label>
                    <div className="border rounded-md p-2 bg-gray-100">{profile[key] || '-'}</div>
                  </div>
                ))}
                <button
                  className="mt-6 px-6 py-2 text-white rounded-md pop-button"
                  onClick={() => {
                    setFormData(profile);
                    setEditing(true);
                  }}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleEditProfile} className="space-y-4">
                {Object.keys(initialForm).map((key) => (
                  <InputField
                    key={key}
                    label={getLabel(key)}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                ))}
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2  text-white rounded-md pop-button"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// 🔹 Reusable Input Field Component
const InputField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded-md p-2 bg-white"
    />
  </div>
);

// 🔹 Function to display user-friendly labels
const getLabel = (key) => {
  const labels = {
    firstName: 'First Name *',
    lastName: 'Last Name *',
    phone: 'Phone Number *',
    addressLine1: 'Address Line 1 *',
    addressLine2: 'Address Line 2 *',
    city: 'City *',
    state: 'State *',
    zipCode: 'Zip Code *'
  };
  return labels[key] || key;
};

export default Profile;
