import React from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <p> Start your session</p>
        <Button variant="outlined">
          <Link href="/login"> Login</Link>
        </Button>
      </div>
      <div>
        <p>Don't you have account yet? Sign Up here</p>
        <Button variant="outlined">
          <Link href="/signup"> Sign Up</Link>
        </Button>
      </div>
    </main>
  );
}
