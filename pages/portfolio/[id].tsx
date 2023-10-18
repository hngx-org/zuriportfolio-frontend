'use-client';
import React, { useContext, useEffect, useState } from 'react';
import { PortfolioCtxProvider } from '../../context/PortfolioLandingContext';
import ExternalView from '@modules/portfolio/component/landing/external-view';
import MainLayout from '../../components/Layout/MainLayout';
import Cover from '@modules/portfolio/component/landing/cover-avatar';
import Loader from '@ui/Loader';
import Image from 'next/image';
import { CoverDiv } from '@modules/portfolio/component/landing/avatars';
import { useRouter } from 'next/router';
// import { EducationModalContextProvider } from '@modules/portfolio/context/education-context';

const View = () => {
  const router = useRouter();
  const id = Array.isArray(router?.query?.id) ? router?.query?.id[0] : router?.query?.id;

  const getUserId = async () => {
    const token = localStorage.getItem('zpt');
    const response = await fetch(`https://staging.zuri.team/api/auth/api/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1NDkzNDVhLTQ2MWMtNGM2Yy1iZTNjLWU3YWZlMzg4ZWIyOSIsImlhdCI6MTY5NzQxNzU4Nn0.Lm7HAisj-TWpmP2TivhqMhYGqPpnw_c8G62p3Tdf-F8',
        permission: 'product.read',
      }),
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    if (!router.isReady) return;
    const authUser = async () => {
      const data = await getUserId();
      if (data?.user?.id === id) {
        router.push(`/portfolio`);
      } else {
        if (id) {
          getUser(id);
        }
      }
    };
    authUser();
  }, [id, router, router.isReady]);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    avatarImage: '',
    city: '',
    country: '',
    tracks: [],
    coverImage: '',
  });
  const [userSections, setUserSections] = useState<any>([]);
  const [error, setError] = useState({ state: false, error: '' });

  const getUser = async (userId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/getPortfolioDetails/${userId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setUserData({
        firstName: data?.user?.firstName,
        lastName: data?.user?.lastName,
        avatarImage: data?.user?.profilePic,
        city: data?.portfolio?.city,
        country: data?.portfolio?.country,
        tracks: data?.tracks,
        coverImage: data?.user?.profileCoverPhoto,
      });
      const {
        about,
        projects,
        workExperience,
        education,
        skills,
        contact,
        interests,
        awards,
        language,
        reference,
        certificate,
        shop,
        custom,
      } = data;
      setUserSections([
        { title: 'About', id: 'about', data: about },
        { title: 'Project', id: 'projects', data: projects },
        { title: 'Work Experience', id: 'workExperience', data: workExperience },
        { title: 'Education', id: 'education', data: education },
        { title: 'Skills', id: 'skills', data: skills },
        { title: 'Interests', id: 'interests', data: interests },
        { title: 'Awards', id: 'awards', data: awards },
        { title: 'Certificate', id: 'certificate', data: certificate },
        { title: 'Language', id: 'language', data: language },
        { title: 'Reference', id: 'reference', data: reference },
        { title: 'Shop', id: 'shop', data: shop },
        { title: 'Contact', id: 'contact', data: contact },
        { title: 'Custom', id: 'custom', data: custom },
      ]);
      setIsLoading(false);
    } catch (error: any) {
      setError({ state: true, error: error.message });
    }
  };
  const { firstName, lastName, city, country, coverImage } = userData;

  console.log(userSections);

  const headerMargin =
    'mt-[81px] lg:mt-[96px] h-[200px] md:h-[250px] lg:h-[300px] absolute top-0 left-0 -z-50 w-screen object-cover';

  const cover = coverImage ? (
    <Image src={coverImage} priority unoptimized width={0} height={0} alt="" className={`${headerMargin}`} />
  ) : (
    <CoverDiv className={`bg-[#F0F1F0] opacity-80 ${headerMargin}`} />
  );

  return (
    <PortfolioCtxProvider>
      {/* <EducationModalContextProvider> */}
      <MainLayout showTopbar showDashboardSidebar={false} activePage="portfolio" showFooter>
        {error.state ? (
          <div className="flex justify-center items-center h-[50vh] text-red-200 text-3xl font-bold font-manropeEB text-center opacity-60">
            An error occured, please try again later
          </div>
        ) : (
          <div className="mx-auto w-[min(90vw,1200px)] font-manropeB pb-20 min-h-[50vh]">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="h-[200px] md:h-[250px] lg:h-[300px]">
                  {cover}
                  <Cover userData={userData} isLoggedIn={false} />
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
                  <>
                    <ExternalView userSections={userSections} />
                  </>
                </div>
              </>
            )}
          </div>
        )}
      </MainLayout>
      {/* </EducationModalContextProvider> */}
    </PortfolioCtxProvider>
  );
};

export default View;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  return {
    props: {
      userId: id,
    },
  };
}
