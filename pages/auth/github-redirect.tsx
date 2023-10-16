'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export const ADMIN_ID = 3;

function GithubRedirect() {
  const router = useRouter();
  useEffect(() => {
    const query = window.location.search.split('?')[1];
    const url = `/github/redirect?${query}`;
    const Oauth = async () => {
      const $http = axios.create({
        baseURL: 'https://staging.zuri.team/api/auth/api/auth',
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          // 'Access-Control-Allow-Origin': '*',
        },
        // withCredentials: true,
      });
      try {
        const { data } = await $http.get(url);
        const token = data.data.token;
        console.log(data);
        localStorage.setItem('zpt', token);
        // Checking if user enabled 2fa
        if (data.data.user.twoFactorAuth) {
          const email = data?.data?.user?.email;
          // uncomment if the 2fa message is not being sent automatically
          // send2FaCode.mutate({ email });
          router.push('/auth/2fa');
          return;
        }
        // redirecting the user  to admin dashbord if they are an admin
        if (data.data.user.roleId === ADMIN_ID) {
          router.push('/super-admin/product-listing');
          return;
        }
        router.push('/dashboard');
      } catch (e: any) {
        router.push('/auth/signup');
      }
    };
    Oauth();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  return <div className="flex item-center justify-center mt-[2rem]">Please Wait...</div>;
}
export default GithubRedirect;
