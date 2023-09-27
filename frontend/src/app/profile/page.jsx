'use client';

import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import styles from './profile.module.css';
import EditProfileModal from '@/components/organisms/EditProfileModal';
import useGetUserData from '@/hooks/useGetUserData';
import { useGetUserSessionContext } from '@/context';
import Navbar from '@/components/molecules/Navbar';
import { getUserData } from '@/api';

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userSession } = useGetUserSessionContext();
  const { userData, setUserData } = useGetUserData(userSession.user_id);
  const { firstName, lastName, email, username } = userData;

  return (
    <main className={styles.main} style={{ opacity: isModalOpen ? 0.2 : 1 }}>
      <Navbar />
      <h1 className={styles.title}>Profile</h1>
      <List
        sx={{
          width: '100%',
          color: 'black',
        }}
        component="div"
        aria-label="mailbox folders"
      >
        <ListItem>
          <ListItemText primary="Username" secondary={username} />
        </ListItem>
        <ListItem>
          <ListItemText primary="First Name" secondary={firstName} />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary="Last Name" secondary={lastName} />
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemText primary="email" secondary={email} />
        </ListItem>
      </List>
      <Button
        variant="outlined"
        className={styles.addPatientButton}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Edit Profile
      </Button>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          getUserData(userData.user_id).then((data) => {
            setUserData(data);
          });
        }}
        currentProfileData={userData}
      />
    </main>
  );
}
