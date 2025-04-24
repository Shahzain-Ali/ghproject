import React from 'react'
import Home from './(pages)/home/page'
// import { useTranslations } from 'next-intl';

const Main = () => {
  // const t = useTranslations('HomePage');
  return(
    <div>
     {/* <h1>{t('title')}</h1>; */}
     <Home/>
     </div>
)}

export default Main;