import React, { useState } from "react";
import { User, Phone, Home, ClipboardList, Heart, AlertCircle } from "lucide-react";

const PatientRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    contact: "",
    address: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactNumber: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Show success popup
    setShowPopup(true);

    // Hide popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Patient Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <span>Full Name</span>
                </div>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <span>Contact Number</span>
                </div>
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-blue-500" />
                <span>Address</span>
              </div>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className="input-field"
              required
            />
          </div>

          {/* Medical History */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-blue-500" />
                <span>Medical History</span>
              </div>
            </label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              rows={2}
              className="input-field"
            />
          </div>

          {/* Emergency Contact */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} placeholder="Name" className="input-field" required />
              <input type="text" name="emergencyContactRelation" value={formData.emergencyContactRelation} onChange={handleChange} placeholder="Relation" className="input-field" required />
              <input type="tel" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleChange} placeholder="Contact Number" className="input-field" required />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-green-600">🎉 Registration Successful!</h3>
            <p className="text-gray-700 mt-2">Thank you for registering.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRegistration;
