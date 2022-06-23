import { useRouter } from 'next/router'
import "animate.css"
import { IoMdClose } from "react-icons/io"
import products from "../data/products.json"
import { addItem, removeItem, increase, decrease } from '../state/basket'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { useEffect, useState } from 'react'
import { BsDash, BsFileMinus, BsPlus } from 'react-icons/bs'
import useSWR from 'swr'
import Loader from '../components/general/Loader'
import Error from '../components/general/Error'

const fetcher = (url: string) => fetch(url).then((res) => res.json())


const ShopItemDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useAppDispatch()
    const { basketItems } = useAppSelector(state => state.basket)
    const [inBasketCount, setInBasketCount] = useState(0)
    const [loading, setLoading] = useState(false)

    // const product = products.filter(product => product.id === id)[0]
    const { data, error } = useSWR(`https://atf-test.backendboyz.repl.co/api/product/${id}`, fetcher)
    const product = data

    const addToBasket = () => {
        dispatch(addItem({ id: id, count: 1 }))
    }

    useEffect(() => {
        if (id) {
            const item = basketItems.find(item => item.id === id[0])
            item && setInBasketCount(item.count)
        }
        return (() => setInBasketCount(0))
    }, [basketItems])

    
    if (error || !id) return <Error />
    if (!data) return <Loader />

    return (
        <div className='w-screen min-h-screen animate__animated animate__fadeIn bg-gray-50 flex flex-col items-center'>
            <IoMdClose onClick={() => history.back()} className="absolute top-3 right-3 text-5xl cursor-pointer bg-gray-200 p-2 rounded-full" />

            <p className='font-bold text-3xl max-w-[80%] p-5 self-start'>{product.title}</p>

            <img src={product.image} className='h-auto w-1/2 mb-10 mt-5' />

            <div className='fixed bottom-5 z-10 shadow-2xl rounded-full flex items-center justify-between w-[95%] p-2 bg-gray-50'>
                <p className='font-bold text-3xl p-3 ml-10'>{product.price}</p>


                {inBasketCount === 0 ?
                    <div onClick={addToBasket} className='bg-[#020202] text-[#FDE100] rounded-full p-4 font-jost text-lg cursor-pointer min-w-max'>
                        Add to basket
                    </div>
                    :
                    <div className='flex items-center space-x-5'>
                        <BsDash onClick={() => dispatch(decrease(id))} className='text-5xl rounded-full bg-gray-200 p-2 cursor-pointer' />
                        <p className='text-xl font-jost'>{inBasketCount}</p>
                        <BsPlus onClick={() => dispatch(increase(id))} className='text-5xl rounded-full bg-gray-300 p-2 cursor-pointer' />
                    </div>
                }

            </div>

            <div className="w-full bg-white p-5 font-jost font-light">
                {product.description}
            </div>

            <div className="bg-white flex flex-col w-full px-5 pb-10">
                <div className='max-w-max bg-[#020202] rounded-full text-[#FDE100] font-jost p-2 text-xs mb-10'>
                    Include Metaverse
                </div>
                <div className="grid grid-cols-2 justify-items-center ">
                    <div className="bg-gray-200 animate-pulse rounded-xl h-44 w-36" />
                    <div className="bg-gray-200 animate-pulse rounded-xl h-56 w-36" />
                    <div className="bg-gray-200 animate-pulse rounded-xl h-36 w-36" />
                </div>
            </div>

        </div>
    )
}

export default ShopItemDetail
