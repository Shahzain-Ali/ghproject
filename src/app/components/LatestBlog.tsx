"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface BlogPost {
  id: number;
  imgSrc: string;
  author: string;
  date: string;
  title: string;
  description: string;
  readMore: string
}

function LatestBlog() {
  const t = useTranslations('latestBlog');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setBlogPosts([
      {
        id: 1,
        imgSrc: "/blog1.jpg",
        author: t('author1'),
        date: t('date1'),
        title: t('title1'),
        description: t('description1'),
        readMore: t('readMore')
      },
      {
        id: 2,
        imgSrc: "/blog3.jpg",
        author: t('author2'),
        date: t('date2'),
        title: t('title2'),
        description: t('description2'),
        readMore: t('readMore')
      },
      {
        id: 3,
        imgSrc: "/blog2.jpg",
        author: t('author3'),
        date: t('date3'),
        title: t('title3'),
        description: t('description3'),
        readMore: t('readMore')
      }
    ]);
  }, [t]); // <- Jab bhi language change hogi, yeh update karega

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-8">
        {t('heading')}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xlg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-md shadow-md p-4 flex flex-col"
          >
            <div className="relative w-full h-40 mb-4">
              <Image
                src={post.imgSrc}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-md"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwZHzkkJ3tMSzoyUDpJODxKRVVRV1lORpJjbWhtcX6BgoFOYI2XlK7Dx83W0f/bAEMBFRcXHhoeNyEhNbdMSzS3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t//AABEIAAUACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlgAH/9k="
              />
            </div>
            <div className="flex-grow">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mt-2">{post.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{post.description}</p>
              <button className="text-blue-500 underline mt-4">
                {post.readMore}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestBlog;