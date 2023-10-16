import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IntrestedProducts, ProductData } from '../../../@types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function ProductWeThoughtMightInterestYou({ id }: any) {
  const { auth } = useAuth();
  const [response, setResponse] = useState<IntrestedProducts[]>([]);
  const [product, setProduct] = useState<ProductData | null>(null);

  const url = `https://coral-app-8bk8j.ondigitalocean.app/api/similar_products/${id}/`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponse(data.products);
      });
  }, [url]);

  function formatPrice(price: number | string) {
    if (typeof price === 'string') {
      price = parseFloat(price);
    }

    if (isNaN(price)) {
      return price;
    }

    return price.toLocaleString('en-US', {
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  }

  const addToCart = async (ids: string) => {
    const apiUrl = `https://zuri-cart-checkout.onrender.com/api/checkout/api/carts`;
    if (auth) {
      try {
        const response = await axios.post(
          apiUrl,
          { product_ids: [`${ids}`] },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          },
        );

        if (response.status === 200) {
          toast.success('Added to Cart');
          console.log('success');
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      }
    } else {
      const products: any[] = [];
      if (product) {
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        console.log(products);
        toast.success('Item added to cart🎊');
      }
    }
  };

  return (
    <div className="mt-[80px] px-[30px] flex flex-col items-center justify-center">
      <h1 className="font-manropeL font-semibold text-[32px] text-brand-green-shade0 text-center">
        Products we thought might interest you!
      </h1>

      <div className="lg:flex lg:flex-row lg:items-center lg:gap-[16px] lg:overflow-hiddenlg:w-[100%] lg:my-[40px] my-[40px] md:grid-cols-2 md:grid md:gap-[16px]">
        {response.map((item, index) => (
          <div className="p-[16px] border-[1px] border-custom-color32 rounded-[8px] w-[298px]" key={index}>
            <Link href={`/marketplace/product-details?id=${item?.id}`}>
              <div>
                <div className="flex flex-col items-center">
                  <div>
                    <div className="absolute flex flex-row justify-between">
                      <div className=" w-[100px] h-[36px] bg-custom-color23 rounded-[8px] flex items-center justify-center tracking-[0.4%] text-white-100 font-manropeL font-semibold text-[12px]">
                        Top Picks
                      </div>
                      <div className="border-[2px] border-white-100 ml-[115px]">
                        <Image src="/close-circle.png" alt="close" width={32} height={32} />
                      </div>
                    </div>
                    <div className="w-[256px] h-[186px] overflow-hidden rounded-[8px]">
                      <Image
                        src={item.images[0]?.url || '/assets/dummyImage.jpg'}
                        alt="dummy image"
                        width={266}
                        height={186}
                        className="rounded-[8px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between mt-[12px] gap-[10px]">
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-custom-color16 font-manropeL text-[12px] font-normal leading-[20px]">
                      {item.category.name}
                    </p>
                    <p className="text-custom-color43 font-manropeL text-[20px] font-normal leading-[24px]">
                      {item?.name.length > 15 ? `${item?.name.slice(0, 15)} ...` : item?.name}
                    </p>
                  </div>
                  <p className="text-custom-color43 font-manropeL text-[22px] font-bold ">
                    {`$${formatPrice(item.price)}`}
                  </p>
                </div>

                <div className="mt-[12px] text-custom-color22 font-manropeL text-[13px] font-normal leading-[16px]">
                  {item?.description.length > 40 ? `${item?.description.slice(0, 40)} ...` : item?.description}
                  <div className="mt-[8px] flex flex-row items-center gap-[4px]">Show More</div>
                </div>
              </div>
            </Link>
            <div className="flex flex-row items-center gap-[8px] mt-[24px]">
              <button
                className="w-[48px] py-[12px] px-[8px] border-[1px] border-custom-color32 rounded-[8px]"
                onClick={() => addToCart(item?.id)}
              >
                <Image src="/cart.png" width={24} height={24} alt="cart" />
              </button>
              <div className="text-custom-color43 text-[16px] font-normal tracking-[0.08px] w-[100%] px-[16px] py-[12px] rounded-[8px] flex items-center justify-center border-[1px] border-brand-green-primary">
                Buy Now
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
