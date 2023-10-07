import React from 'react';
import ProductCardWrapper from '@modules/marketplace/component/landingpage/productCardWrapper/product-card-wrapper';
// import React from 'react';
// import MainLayout from '../../../../components/Layout/MainLayout';
import { ProductCardProps } from '../../../@types';
import MainLayout from '../../../components/Layout/MainLayout';
// import ProductCard from '../ProductCard';
// import ProductCardWrapper from './productCardWrapper/product-card-wrapper';
// import ExperienceCard from './experience-cards/experience-card';
import GraphicAndDesigns from '@modules/marketplace/component/categories/GraphicAndDesigns';

const graphic_design_templates = () => {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <div className="py-6 px-4 overflow-hidden w-full">
        <div className="max-w-[1240px] mx-auto">
          <GraphicAndDesigns />
        </div>
      </div>
    </MainLayout>
  );
};

export default graphic_design_templates;
