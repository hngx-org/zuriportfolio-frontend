'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const FacebookRedirect = () => {
  const router = useRouter();
  useEffect(() => {
    const query = window.location.search.split('?')[1];
    console.log('query', query);

    const url = `/facebook/redirect?${query}`;
    const Oauth = async () => {
      const $http = axios.create({
        baseURL: 'https://staging.zuri.team/api/auth',
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          // 'Access-Control-Allow-Origin': '*',
        },
        // withCredentials: true,
      });
      try {
        console.log('started');
        const { data } = await $http.get(url);
        console.log('data gotten', data);
        const token = data.token;
        localStorage.setItem('zpt', token);
        router.push('/dashboard');
      } catch (e: any) {
        router.push('/auth/signup');
        throw new Error(e);
      }
    };
    Oauth();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  return <div className="flex item-center justify-center mt-[2rem]">Please Wait...</div>;
};
export default FacebookRedirect;
