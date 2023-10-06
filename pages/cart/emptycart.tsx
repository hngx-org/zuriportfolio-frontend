import React from 'react'
//import withAuth from '../../helpers/withAuth'
import Image from 'next/image'
import { ArrowCircleRight } from 'iconsax-react'

const emptycart = () => {
  return (
   <>
    <section className='px-[100px] pt-[211px] pb-[72px] border'> 
    <div className='flex flex-col gap-[32px] items-center justify-center'>
        <div className='heading flex flex-col items-center gap-[8px]'>
            <h1 className='text-[57px] font-bold leading-[64px] font-manropeL text-[#2E3130]'>Your Cart is Empty</h1>
            <p className='text-[24px] font-bold leading-[24px] font-manropeL text-[#737876]'>Looks like you haven’t added anything to Your Cart yet</p>

        </div>

        <button className='rounded-[8px] bg-brand-green-primary w-[345px] h-[60px] px-[20px] py-[12px] flex gap-[16px] items-center justify-center '>
            <p className='text-[#fff] text-[14px] font-[600] leading-[20px] font-manropeL'>Start Shopping</p>
         <ArrowCircleRight color='#fff'/>
        </button>
    </div>

    </section>
   </>
  )
}

export default emptycart