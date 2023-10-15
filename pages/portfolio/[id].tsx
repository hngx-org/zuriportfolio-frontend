'use-client';
import React, { useContext, useEffect, useState } from 'react';
import Portfolio, { PortfolioCtxProvider } from '../../context/PortfolioLandingContext';
import ExternalView from '@modules/portfolio/component/landing/external-view';
import MainLayout from '../../components/Layout/MainLayout';
import Cover from '@modules/portfolio/component/landing/cover-avatar';
import Loader from '@ui/Loader';
import Image from 'next/image';
import { CoverDiv } from '@modules/portfolio/component/landing/avatars';
import { useRouter } from 'next/router';

const View = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  useEffect(() => {
    if (!router.isReady) {
      setIsLoading(true);
    } else if (id) {
      getUser(id);
    }
  }, [id, router.isReady]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ state: false, error: '' });
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    avatarImage: '',
    city: '',
    country: '',
    tracks: [],
    coverImage: '',
  });

  const getUser = async (userId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/users/${userId}`);
      const data = await response.json();
      setUserData({
        firstName: data?.user?.firstName,
        lastName: data?.user?.lastName,
        avatarImage: data?.user?.profilePic,
        city: data?.portfolio?.city,
        country: data?.portfolio?.country,
        tracks: data?.tracks,
        coverImage: data?.user?.profileCoverPhoto,
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError({ state: true, error: error.message });
    }
  };

  const {} = useContext(Portfolio);
  const { firstName, lastName, city, country, coverImage } = userData;

  const headerMargin =
    'mt-[81px] lg:mt-[96px] h-[200px] md:h-[250px] lg:h-[300px] absolute top-0 left-0 -z-50 w-screen object-cover';

  const cover = coverImage ? (
    <Image src={coverImage} priority unoptimized width={0} height={0} alt="" className={`${headerMargin}`} />
  ) : (
    <CoverDiv className={`bg-[#F0F1F0] opacity-80 ${headerMargin}`} />
  );

  return (
    <PortfolioCtxProvider>
      <MainLayout showTopbar showDashboardSidebar={false} activePage="portfolio" showFooter>
        <div className="mx-auto w-[min(90vw,1200px)] font-manropeB pb-20 min-h-[50vh]">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="h-[200px] md:h-[250px] lg:h-[300px]">
                {cover}
                <Cover isLoggedIn={false} />
              </div>
              <div className="flex justify-between items-center pt-8 md:pt-14">
                <div>
                  <h1 className="font-semibold text-lg md:text-2xl text-gray-600">
                    {firstName === 'undefined' || !firstName ? '' : firstName}{' '}
                    {lastName === 'undefined' || !lastName ? '' : lastName}
                  </h1>

                  <p className="text-gray-500 font-semibold text-[14px] md:text-[14px]">
                    {city ? city : ``}
                    {`${city && country ? ',' : ''}`} {country ? country : ''}
                  </p>
                </div>
              </div>
              <div className="mt-10 md:mt-20">
                <ExternalView />
              </div>
            </>
          )}
        </div>
      </MainLayout>
    </PortfolioCtxProvider>
  );
};

export default View;
