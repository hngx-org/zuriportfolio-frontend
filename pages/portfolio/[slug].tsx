'use-client';
import React, { useContext, useEffect, useState } from 'react';
import Portfolio, { PortfolioCtxProvider } from '../../context/PortfolioLandingContext';
import ExternalView from '@modules/portfolio/component/landing/external-view';
import MainLayout from '../../components/Layout/MainLayout';
import Cover from '@modules/portfolio/component/landing/cover-avatar';
import Image from 'next/image';
import { CoverDiv } from '@modules/portfolio/component/landing/avatars';
import { useRouter} from 'next/router';
// import { useAuth } from '../../context/AuthContext';
import Loader from '@modules/portfolio/component/landing/Loader';
import { useParams } from 'next/navigation';
import withAuth from '../../helpers/withAuth';


const View = () => {
  const router = useRouter();
  const urlSlug = router.query.slug;
  

  // Auth to get userid
  // const { auth } = useAuth();
  
  // const urlSlug = Array.isArray(router?.query?.slug) ? router?.query?.slug[0] : router?.query?.slug;
 
  // const params = useParams();
  // useEffect(() => {
  //   console.log("Slug",urlSlug);
  
  //   // console.log(params);
  //   // wait for router to be ready
  //   if (!router.isReady) return;
  //   if (!auth?.user?.slug) {
  //     return
  //   }
  //   // if user is logged in and user id is same as id in url, redirect to dashboard
  //   if (auth?.user?.slug === urlSlug) {
  //     router.push(`/portfolio`);
  //   } else {
  //     // if user is not logged in and id is not in url, fetch info with the id from url
  //     if (urlSlug) {
  //       getUser();
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // auth?.user?.slug, urlSlug, router

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

  console.log(userData, isLoading);
  
  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/v1/portfolio/${urlSlug}`);
      const data = await response.json();
      console.log("data", data);
      
      if (!response.ok) throw new Error(data.error);
      setUserData({
        firstName: data?.data?.user?.firstName,
        lastName: data?.data?.user?.lastName,
        avatarImage: data?.data?.user?.profilePic,
        city: data?.data?.portfolio?.city,
        country: data?.data?.portfolio?.country,
        tracks: data?.data?.tracks,
        coverImage: data?.data?.user?.profileCoverPhoto,
      });
      const {
        about,
        projects,
        workExperience,
        education,
        skills,
        contact,
        interestArray,
        awards,
        language,
        reference,
        certificates,
        shop,
        custom,
      } = data.data;
      setUserSections([
        { title: 'About', id: 'about', data: about },
        { title: 'Project', id: 'projects', data: projects },
        { title: 'Work Experience', id: 'workExperience', data: workExperience },
        { title: 'Education', id: 'education', data: education },
        { title: 'Skills', id: 'skills', data: skills },
        { title: 'Interests', id: 'interests', data: interestArray },
        { title: 'Awards', id: 'awards', data: awards },
        { title: 'Certificate', id: 'certificate', data: certificates },
        { title: 'Language', id: 'language', data: language },
        { title: 'Reference', id: 'reference', data: reference },
        { title: 'Shop', id: 'shop', data: shop },
        { title: 'Contact', id: 'contact', data: contact },
        { title: 'Custom', id: 'custom', data: custom },
      ]);
      setIsLoading(false);
      console.log(isLoading);
      
    } catch (error: any) {
      setIsLoading(false);
      setError({ state: true, error: error.message });
    }
  };
  const { firstName, lastName, city, country, coverImage, tracks } = userData;

  const headerMargin = `w-full h-[200px] sm:h-[250px] md:h-[300px] object-center object-cover`;

  const cover = coverImage ? (
    <Image src={coverImage} priority unoptimized width={0} height={0} alt="" className={`${headerMargin}`} />
  ) : (
    <CoverDiv className={`bg-[#F0F1F0] opacity-80 ${headerMargin}`} />
  );

  return (
    <PortfolioCtxProvider>
    
      
      <MainLayout showTopbar showDashboardSidebar={false} activePage="portfolio" showFooter>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <div className="mx-auto w-[min(90vw,1240px)] relative font-manropeB pb-20 min-h-[50vh]">
            <div className="relative w-full flex-col justify-center items-center shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] rounded-b-lg -mt-5 mb-10">
              {cover}
              <Cover userData={userData} />
              <div className="flex justify-between items-baseline px-5 md:px-10 pb-5 pt-16">
                <div className="flex justify-between items-center ">
                  <div>
                    <h1 className="font-semibold text-lg md:text-[23px] text-gray-700">
                      {firstName === 'undefined' || !firstName ? '' : firstName}{' '}
                      {lastName === 'undefined' || !lastName ? '' : lastName}
                    </h1>
                    <div className="flex items-center space-x-2">
                      {tracks.length > 0 && (
                        <p className="flex flex-col text-gray-500 font-semibold text-[15px]">
                          {(tracks[0] as { track: string }).track}
                        </p>
                      )}
                    </div>
                    <p className="text-gray-500 text-[14px] md:text-base font-semibold">
                      {city ? city : ``}
                      {`${city && country ? ',' : ''}`} {country ? country : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ExternalView userSections={userSections} />
          </div>
        )}
      </MainLayout> 
    </PortfolioCtxProvider>
  );
};

export default withAuth(View);

export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  return {
    props: {
      userslug: slug,
    },
  };
}
