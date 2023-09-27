import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import styles from './EditPatientModal.module.css';
import Modal from '@/components/atoms/Modal';
import { editPatient } from '@/api';

export default function EditPatientModal({ isOpen, onClose, patientData }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: patientData,
    onSubmit: (values) => {
      toast
        .promise(editPatient(values), {
          pending: 'Loading',
          success: `Patient: ${values.firstName} edited👌`,
          error: 'Error editing patient 🤯',
        })
        .then(() => {
          onClose();
        });
    },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Patient">
      <form className={styles.formi} onSubmit={formik.handleSubmit}>
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
          Edit Patient
        </Button>
      </form>
    </Modal>
  );
}
