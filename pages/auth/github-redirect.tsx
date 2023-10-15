'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
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
        const token = data.token.token;
        localStorage.setItem('zpt', token);
        router.push('/dashboard');
      } catch (e: any) {
        router.push('/auth/signup');
      }
    };
    Oauth();
  }, [router]);
  return <div className="flex item-center justify-center mt-[2rem]">Please Wait...</div>;
}
export default GithubRedirect;
