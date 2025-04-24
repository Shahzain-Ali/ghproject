import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // Always force 'en' locale
  const locale = 'en';
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

