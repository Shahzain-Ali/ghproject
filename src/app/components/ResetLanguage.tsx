'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function ResetLanguage() {
  const router = useRouter();
  
  useEffect(() => {
    // Always set the cookie to 'en' on every page load
    const currentLocale = Cookies.get('NEXT_LOCALE');
    
    // If the locale isn't 'en' or isn't set, set it to 'en'
    if (currentLocale !== 'en') {
      Cookies.set('NEXT_LOCALE', 'en', { path: '/' });
      // Force a refresh only if we changed the cookie
      router.refresh();
    }
  }, [router]);
  
  // This component doesn't render anything visible
  return null;
}