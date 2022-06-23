import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Toolbar } from '../components';

import ShopCard from '../components/ShopCard';
import { BsFilterRight } from "react-icons/bs"

import products from "../data/products.json"
import Filter from '../components/Filter';
import Link from 'next/link';


const Home: NextPage = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const [slide, setSlide] = useState(0)

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         if (slide > 2) {
    //             setSlide(0)
    //         } else {
    //             setSlide(slide=>slide+=1)
    //         }
    //     }, 5000)
    // }, [slide])

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
                    <img src="/images/banner-home.jpg" className={`w-full`} />
                </div>

                <p className='font-bold text-3xl'>Shop</p>

                <div className='flex justify-between items-end pb-3 mt-10'>
                    <p className='text-xl'>Apparel</p>
                    <Link href="/apparel">
                        <a className='text-gray-500 font-jost'>See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {products.filter(product => product.category === "apparel").map(product => (
                        <ShopCard key={product.id} id={product.id} price={product.price} title={product.title} image={product.image} classes="min-w-[12rem]" />
                    ))}
                </div>

                <div className='flex justify-between items-end pb-3 mt-10'>
                    <p className='text-xl'>NFTs</p>
                    <Link href="/nfts">
                        <a className='text-gray-500 font-jost'>See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {products.filter(product => product.category === "nfts").map(product => (
                        <ShopCard key={product.id} id={product.id} price={product.price} title={product.title} image={product.image} classes="min-w-[12rem]" />
                    ))}
                </div>

                <div className='flex justify-between items-end pb-3 mt-10'>
                    <p className='text-xl'>Events</p>
                    <Link href="/events">
                        <a className='text-gray-500 font-jost'>See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {products.filter(product => product.category === "events").map(product => (
                        <ShopCard key={product.id} id={product.id} price={product.price} title={product.title} image={product.image} classes="min-w-[12rem]" />
                    ))}
                </div>

                <div className='flex justify-between items-end pb-3 mt-10'>
                    <p className='text-xl'>Metaverse Events</p>
                    <Link href="/metaverse-events">
                        <a className='text-gray-500 font-jost'>See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {products.filter(product => product.category === "metaverse-events").map(product => (
                        <ShopCard key={product.id} id={product.id} price={product.price} title={product.title} image={product.image} classes="min-w-[12rem]" />
                    ))}
                </div>

            </main>
        </>
    )
}


export default Home
