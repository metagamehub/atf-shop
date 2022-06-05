import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { Toolbar } from '../components';

import ShopCard from '../components/ShopCard';
import ShopItemDetail from '../components/ShopItemDetail';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import products from "../data/products.json"
import { ProductData, basketItem } from '../lib/types';
import { removeItem } from '../state/basket';
import { IoMdClose } from 'react-icons/io';
import { getLocal } from '../lib/local';


const Home: NextPage = () => {
    const dispatch = useAppDispatch()
    const { basketItems } = useAppSelector(state => state.basket)
    const [basketList, setBasketList] = useState<ProductData[]>([])

    useEffect(() => {
        basketItems.forEach(item => {
            setBasketList(basketList => [...basketList, { ...products.filter(product => product.id === item.id)[0], count: item.count }])
        })
        return (() => { setBasketList([]) })
    }, [basketItems])

    const calcTotal = () => {
        let total: number = 0;
        basketList.map(item => {
            total += item.price * (item.count || 1)
        })
        return total
    }


    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            <main className="flex font-jost flex-col p-5 animate__animated animate__fadeIn">
                <IoMdClose onClick={() => history.back()} className="absolute top-3 right-3 text-5xl cursor-pointer bg-gray-200 p-2 rounded-full" />

                <p className='font-sans text-2xl'>My basket</p>

                <hr className='my-10' />

                <div className='flex flex-col space-y-10 w-full'>
                    {basketList.map(item => (
                        <div key={item.id} className='flex items-center space-x-7'>
                            <BsTrash onClick={() => dispatch(removeItem(item.id))} className='text-4xl cursor-pointer' />
                            <p className='font-medium text-sm'>{item.title}</p>
                            <p className='bg-gray-100 py-2 px-3 rounded-lg font-medium'>{item.count}</p>
                            <p className='font-medium'>{item.price * (item.count || 1)}</p>
                        </div>
                    ))}
                </div>

                <hr className='mt-10' />

                <div className='flex items-center justify-between mt-5'>
                    <p className='font-light'>Grand Total</p>
                    <p className='font-bold'>{calcTotal()}</p>
                </div>

                <div className='rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 w-44 cursor-pointer text-center font-medium self-center'>
                    Continue
                </div>

            </main>


        </>
    )
}


export default Home
