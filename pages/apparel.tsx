import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Toolbar } from '../components';

import ShopCard from '../components/ShopCard';
import { BsFilterRight } from "react-icons/bs"

import products from "../data/products.json"
import Filter from '../components/Filter';
import Link from 'next/link';


const Apparel: NextPage = (data) => {
    const [openFilter, setOpenFilter] = useState(false)

    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            {openFilter &&
                <>
                    <div onClick={() => setOpenFilter(false)} className='w-screen h-screen absolute inset-0 z-20' />
                    <Filter close={() => setOpenFilter(false)} />
                </>
            }

            <main className="flex flex-col p-5">

                <div className='flex space-x-5 items-center mb-5 font-jost -mt-5'>
                    <input placeholder='Search' className='bg-gray-100 rounded-full p-3 outline-none grow' />
                    <BsFilterRight onClick={() => setOpenFilter(!openFilter)} className='text-3xl cursor-pointer' />
                </div>

                <div className='w-screen -ml-5 mb-5 h-auto '>
                    <img src="/images/banner-2.jpg" className={`w-full`} />
                </div>


                <p className='font-bold text-3xl mb-5'>Apparel</p>

                <div className="grid grid-cols-2 place-items-center gap-5">
                    {products.filter(product => product.category === "apparel").map(product => (
                        <ShopCard key={product.id} id={product.id} price={product.price} title={product.title} image={product.image} />
                    ))}
                </div>

            </main>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`https://atf-test.backendboyz.repl.co/api/products`)
    const data = await res.json()
  
    return { props: { data } }
  }
  


export default Apparel
