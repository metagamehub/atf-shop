import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { BsDash, BsPlus, BsTrash } from 'react-icons/bs';
import { Toolbar } from '../components';

import ShopCard from '../components/ShopCard';
import ShopItemDetail from '../components/ShopItemDetail';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { ProductData, basketItem } from '../lib/types';
import { decrease, increase, removeItem } from '../state/basket';
import { IoMdClose } from 'react-icons/io';
import { getLocal } from '../lib/local';

import orders from "../data/orders.json"
import products from "../data/products.json"


const Orders: NextPage = () => {

    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            <main className="flex font-jost flex-col p-5 animate__animated animate__fadeIn">
                <IoMdClose onClick={() => history.back()} className="absolute top-3 right-3 text-5xl cursor-pointer bg-gray-200 p-2 rounded-full" />

                <p className='font-sans text-2xl'>My orders</p>

                <div className='flex flex-col space-y-10 w-full'>
                    {orders.map(item => (
                    <div key={item.id} className="mt-10">
                        <hr className='mb-10' />
                        <div className='flex flex-col items-center space-y-5'>
                            <div className='flex items-center justify-between w-full space-x-5'>
                                <p className='font-jost'>{item.date}</p>
                                <p className='font-jost'>{item.total}</p>
                            </div>
                            <div className='flex flex-col space-y-3'>
                                {Object.entries(item.items).map(product => (
                                    <p key={product[0]} className='text-xs font-light w-full'><span className='font-normal'>{product[1]}x</span> {products.find(element => element.id === product[0])?.title}</p>
                                ))}
                            </div>
                        </div>

                    </div>
                    ))}
                </div>

            </main>


        </>
    )
}


export default Orders
