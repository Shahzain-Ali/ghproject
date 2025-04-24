// import React from 'react';
// import Image from 'next/image';
// import { useTranslations } from 'next-intl';

// const ShopexOffer = () => {
//   const t = useTranslations('shopexOffer');

//   const offers = [
//     { key: 'Free Delivery', img: '/free-delivery-1.png' },
//     { key: 'Cashback', img: '/cashback_1.png' },
//     { key: 'Premium Quality', img: '/Group.png' },
//     { key: '24/7 Support', img: '/24_hours_support_1.png' }
//   ];

//   return (
//     <div className="w-full mb-6 px-4">
//       {/* Heading */}
//       <div className="text-center mb-6">
//         <h1 className="text-[#151875] text-[24px] font-bold">
//           {t('heading')}
//         </h1>
//       </div>

//       {/* Card Container */}
//       <div className="flex flex-wrap justify-center gap-6 mx-auto w-full max-w-[1200px]">
//         {/* Cards */}
//         {offers.map((offer, ind) => (
//           <div
//             key={ind}
//             className="shadow-md w-[90%] sm:w-[280px] md:w-[200px] lg:w-[220px] h-auto p-4 text-center bg-white rounded-lg flex flex-col items-center"
//           >
//             <Image
//               src={offer.img}
//               alt={t(`${offer.key}.title`)}
//               className="w-[50px] h-[55px] mb-4"
//               width={50}
//               height={50}
//             />
//             <h2 className="text-[16px] font-semibold text-[#151875] mb-2">
//               {t(`${offer.key}.title`)}
//             </h2>
//             <p className="text-[14px] text-[#a4a3a3] leading-5">
//               {t(`${offer.key}['description']`)}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopexOffer;
