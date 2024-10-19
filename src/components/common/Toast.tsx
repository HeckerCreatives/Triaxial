'use client'
import React from 'react'
import { toast } from 'react-hot-toast'

export const ToastSuccess = ( success: string) => {
  toast.success(success, {
    style: {
      backgroundColor: '#343A40',
      color: 'white',
      border: '2px',
      borderColor: 'gray',
    },
  });
};


export const ToastError = ( error: string) => {
  toast.error(error, {
    style: {
      backgroundColor: '#262C32',
      color: 'white',
      border: '2px',
      borderColor: 'gray',
    },
  });
};

export const ToastPromise = (promise: Promise<unknown>, messages: { pending: any; success: any; error: any; }) => {
  return toast.promise(promise, {
    loading: messages.pending || 'Loading...',
    success: messages.success || 'Success!',
    error: messages.error || 'Error occurred!',
  });
};