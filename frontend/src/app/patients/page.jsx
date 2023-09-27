'use client';

import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import styles from './patients.module.css';
import AddNewPatientModal from '@/components/organisms/AddNewPatientModal';
import EditPatientModal from '@/components/organisms/EditPatientModal';
import useGetPatientList from '@/hooks/useGetPatientList';
import { useGetUserSessionContext } from '@/context';
import { deletePatient, getPatientsList } from '@/api';
import Navbar from '@/components/molecules/Navbar';

export default function Patients() {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);
  const { userSession } = useGetUserSessionContext();

  const { patients, setPatients } = useGetPatientList(userSession.user_id);
  const [patientToEdit, setPatientToEdit] = useState({});

  const onSetPatients = () => {
    getPatientsList(userSession.user_id).then((patientsList) => {
      setPatients(patientsList);
    });
  };

  const onDeletePatient = (patientId, name) => {
    toast
      .promise(deletePatient(patientId), {
        pending: 'Loading',
        success: `user: ${name} deleted👌`,
        error: 'Error deleting user 🤯',
      })
      .then(() => {
        onSetPatients();
      });
  };

  const columns = [
    {
      field: 'ssn',
      headerName: 'SSN',
      flex: 1,
    },
    {
      field: 'firstName',
      headerName: 'First name',
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'tel',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      flex: 1,
    },
    {
      field: 'edit',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <CreateIcon
          onClick={() => {
            setPatientToEdit(params.row);
            setIsEditPatientModalOpen(true);
          }}
        />
      ),
    },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <DeleteIcon
          onClick={() => {
            onDeletePatient(params.row.patient_id, params.row.firstName);
          }}
        />
      ),
    },
  ];

  return (
    <main
      className={styles.main}
      style={{
        opacity: isAddPatientModalOpen || isEditPatientModalOpen ? 0.2 : 1,
      }}
    >
      <Navbar />
      <h1 className={styles.title}> Patients</h1>
      <DataGrid
        rows={patients.map((patient) => ({
          id: patient.patient_id,
          patient_id: patient.patient_id,
          firstName: patient.firstname,
          lastName: patient.lastname,
          phone: patient.phone,
          email: patient.email,
          ssn: patient.ssn,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      <Button
        variant="outlined"
        className={styles.addPatientButton}
        onClick={() => {
          setIsAddPatientModalOpen(true);
        }}
      >
        Add a New Patient
      </Button>
      <AddNewPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => {
          setIsAddPatientModalOpen(false);
          onSetPatients();
        }}
      />
      <EditPatientModal
        patientData={patientToEdit}
        isOpen={isEditPatientModalOpen}
        onClose={() => {
          setIsEditPatientModalOpen(false);
          setPatientToEdit({});
          onSetPatients();
        }}
      />
    </main>
  );
}
