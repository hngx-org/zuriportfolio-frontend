'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
function GoogleRedirect() {
  const router = useRouter();
  useEffect(() => {
    const query = window.location.search.split('?')[1];
    const url = `/api/auth/google/redirect?${query}`;
    const Oauth = async () => {
      const $http = axios.create({
        baseURL: 'https://auth.akuya.tech',
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          // 'Access-Control-Allow-Origin': '*',
        },
        // withCredentials: true,
      });
      try {
        const { data } = await $http.get(url);
        console.log(data);
        const token = data.token;
        localStorage.setItem('zpt', token);
        router.push('/dashboard');
      } catch (e: any) {
        router.push('/auth/signup-with-email');
        // throw new Error(e)
      }
    };
    Oauth();
  }, []);
  return <div className="flex item-center justify-center mt-[2rem]">Please Wait...</div>;
}
export default GoogleRedirect;
