import { useState, useEffect } from 'react';

export const useFormValidation = (initialState, validationRules) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return '';
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some(error => error);
    const hasValues = Object.values(formData).some(value => value);
    setIsValid(!hasErrors && hasValues);
  }, [formData, errors]);

  return {
    formData,
    errors,
    isValid,
    handleInputChange,
    setFormData
  };
};

// Validation rules
export const validationRules = {
  email: [
    (value) => !value ? 'Email is required' : '',
    (value) => !/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : ''
  ],
  phone: [
    (value) => !value ? 'Phone is required' : '',
    (value) => !/^\d{10}$/.test(value.replace(/\D/g, '')) ? 'Invalid phone number' : ''
  ],
  name: [
    (value) => !value ? 'Name is required' : '',
    (value) => value.length < 2 ? 'Name must be at least 2 characters' : ''
  ],
  company: [
    (value) => !value ? 'Company name is required' : '',
    (value) => value.length < 2 ? 'Company name must be at least 2 characters' : ''
  ],
  message: [
    (value) => !value ? 'Message is required' : '',
    (value) => value.length < 10 ? 'Message must be at least 10 characters' : ''
  ]
}; 