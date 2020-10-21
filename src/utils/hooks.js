import { useState } from 'react';

export const useForm = (callback) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return  handleSubmit;
};