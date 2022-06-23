import Link from "next/link";

interface ShopCardProps {
    id: string;
    price: number;
    title: string;
    image: string;
    classes?: string;
}


const ShopCard = ({ id, price, title, image, classes }: ShopCardProps) => {
    return (
        <Link href={`/detail?id=${id}`}>
            <a className={`${classes} cursor-pointer relative rounded-xl bg-gray-100 items-center justify-start pt-8 flex flex-col w-40 h-56 overflow-hidden`}>
                <div className='absolute top-2 right-2 rounded-xl flex space-x-3 items-center justify-center min-w-max px-2 bg-white'>
                    <p className='font-bold'>{price}</p>
                </div>

                <img src={image} className='h-24 w-auto' />

                <div className='font-jost absolute bottom-16 z-10 bg-[#020202] rounded-xl text-[#FDE100] px-2 py-1 text-xs'>
                    Include Metaverse
                </div>

                <div className='absolute bg-indigo-800 w-[120%] h-20 -rotate-6 -bottom-2 px-5 py-5 flex items-center justify-center'>
                    <p className='text-white text-center rotate-6 font-jost font-medium text-xs'>{title}</p>
                </div>

            </a>
        </Link>

    )
}

export default ShopCard
