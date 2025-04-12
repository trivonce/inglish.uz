// lib/alert.ts
import Swal, { SweetAlertOptions } from 'sweetalert2';

export const showAlert = (options: SweetAlertOptions) => {
  return Swal.fire({
    background: '#f0fdf4',
    color: '#064e3b',
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#f87171',
    buttonsStyling: false,
    reverseButtons: true,
    customClass: {
      confirmButton: 'px-4 py-2 rounded-md text-white bg-emerald-600 hover:bg-emerald-700 ml-4',
      cancelButton: 'px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600'
    },
    ...options
  });
};
