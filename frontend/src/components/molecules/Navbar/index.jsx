import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useRouter } from 'next/navigation';
import { useGetUserSessionContext } from '@/context';

export default function Navbar() {
  const router = useRouter();
  const { userSession, setUserSession } = useGetUserSessionContext();
  return (
    <nav className={styles.main}>
      <Link href="/profile"> Profile</Link>
      <Link href="/patients">Patients</Link>
      <div
        role="button"
        onClick={() => {
          router.push('/login');
          setTimeout(() => {
            setUserSession(null);
          }, 1000);
        }}
      >
        log out
      </div>
    </nav>
  );
}
