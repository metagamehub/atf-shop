import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';

import { useEffect, useState } from 'react'
import { Toolbar } from '../components'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { connect, disconnect, setChain, setAddress } from '../state/account'
import ShopCard from '../components/ShopCard'
import ShopItemDetail from '../components/ShopItemDetail'

import { TezosToolkit } from '@taquito/taquito'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { NetworkType } from '@airgap/beacon-sdk'
import { connectWallet, disconnectWallet, _walletConfig } from '../state/walletActions'



const Profile: NextPage = () => {

    const dispatch = useAppDispatch()
    const [openDetail, setOpenDetail] = useState(false)
    const user  = useAppSelector((state) => state.account.walletConfig.user)
    const [Tezos, setTezos] = useState(
        new TezosToolkit('https://ithacanet.smartpy.io')
    )
    const [wallet, setWallet] = useState<any>(null)

    const handleConnectWallet = async () => {
        console.log("Connect")
        await dispatch(connectWallet({ Tezos, wallet }))
      }
    
      const handleDisconnectWallet = async () => {
        console.log("Disconnect")
        await dispatch(disconnectWallet({ wallet, setTezos }))
      }

    useEffect(() => {
        ;(async () => {
          const wallet_instance = new BeaconWallet({
            name: 'ATF Beacon',
          })
          Tezos.setWalletProvider(wallet_instance)
          const activeAccount = await wallet_instance.client.getActiveAccount()
          if (activeAccount) {
            const userAddress = await wallet_instance.getPKH()

            dispatch(
              _walletConfig({
                userAddress: userAddress,
              }),
            )
          }
          setWallet(wallet_instance)
        })()
      }, [Tezos, dispatch])

    useEffect(() => {
        console.log(user, 'ADDRESS')
    })
    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            <div className="flex flex-col pt-20 items-center justify-center space-y-5 font-jost">
                <div
                    onClick={
                        handleConnectWallet
                          
                      }
                    className="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center"
                >
                    Connect Wallet
                </div>
                <Link href="/orders">
                    <a className='rounded-full mt-10 border border-black p-4 cursor-pointer w-44 text-center font-medium self-center'>
                        My Orders
                    </a>
                </Link>

            </div>
        </>
    )
}


export default Profile
