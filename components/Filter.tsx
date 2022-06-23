import { useState } from "react";

interface FilterProps {
    close: () => void
}

const Filter = ({ close }: FilterProps) => {
    const [filter, setFilter] = useState<string[]>([])

    const updateFilter = (name: string) => {
        const index = filter.findIndex(item => item === name);
        if (index === -1) {
            setFilter(filter => [...filter, name])
        } else {
            setFilter(filter => filter.filter(item => item !== name))
        }
    }

    return (
        <div className='fixed flex flex-col justify-between bottom-0 left-0 p-5 w-screen min-h-[80vh] bg-white z-20 animate__animated animate__fadeInUpBig animate__faster shadow-round rounded-t-2xl'>

            <div className='flex flex-col space-y-2 font-jost'>
                <p className='text-3xl mb-5 font-sans'>Filters</p>

                <div onClick={() => updateFilter("Event")} className={`${filter.indexOf("Event") !== -1 && "border border-black"} rounded-xl bg-gray-100 p-3 text-xl cursor-pointer`}>
                    Apparel and Sports Equipment
                </div>

                <div onClick={() => updateFilter("Clothes")} className={`${filter.indexOf("Clothes") !== -1 && "border border-black"} rounded-xl bg-gray-100 p-3 text-xl cursor-pointer`}>
                    Events
                </div>

                <div onClick={() => updateFilter("Goodies")} className={`${filter.indexOf("Goodies") !== -1 && "border border-black"} rounded-xl bg-gray-100 p-3 text-xl cursor-pointer`}>
                    NFTs
                </div>

                <div onClick={() => updateFilter("Real Life")} className={`${filter.indexOf("Real Life") !== -1 && "border border-black"} rounded-xl bg-gray-100 p-3 text-xl cursor-pointer`}>
                    Metaverse Events
                </div>

            </div>

            <div className='flex items-center font-jost w-full justify-center space-x-10'>
                <p onClick={close} className='text-xl cursor-pointer'>Dismiss</p>
                <div onClick={close} className='bg-[#020202] text-[#FDE100] rounded-full p-4 w-30 text-center font-jost text-lg cursor-pointer'>
                    Apply
                </div>

            </div>
        </div>

    )
}

export default Filter