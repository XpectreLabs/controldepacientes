import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './AddNewPatientModal.module.css';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Modal from '@/components/atoms/Modal';
import { createPatient } from '@/api';
import { useGetUserSessionContext } from '@/context';

export default function AddNewPatientModal({ isOpen, onClose }) {
  // const router = useRouter();
  const { userSession } = useGetUserSessionContext();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      ssn: '',
      user_id: userSession.user_id,
    },
    onSubmit: (values) => {
      toast
        .promise(createPatient(values), {
          pending: 'Loading',
          success: `Patient: ${values.firstName} created👌`,
          error: 'Error creating patient 🤯',
        })
        .then(() => {
          onClose();
        });
    },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add a Patient">
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
          placeholder="SSN"
          required
          id="outlined-required"
          label="SSN"
          name="ssn"
          value={formik.values.ssn}
          onChange={formik.handleChange}
        />
        <TextField
          placeholder="First Name"
          required
          id="outlined-required"
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        <TextField
          placeholder="Last Name"
          required
          id="outlined-required"
          label="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        <TextField
          placeholder="Phone"
          required
          id="outlined-required"
          label="Phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <TextField
          placeholder="Email"
          required
          id="outlined-required"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <Button variant="outlined" type="submit">
          Add New Patient
        </Button>
      </form>
    </Modal>
  );
}
