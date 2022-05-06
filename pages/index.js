import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useEffect,useState } from 'react'
import {auth,signInWithEmailAndPassword,onAuthStateChanged} from '../firebase-app'
import LoadingScreen from '../components/LoadingScreen'
import {useRouter} from 'next/router'

function Index() {
  return (
    <div className='max-w-6xl mx-auto py-5 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6 px-5 md:px-0'>
      <Link href='/adduser'>
        <div className='flex space-x-2 h-72 items-center justify-center text-white  p-5 shadow-md border border-gray-200 rounded-md hover:scale-105 transition ease-in-out  duration-300  bg-indigo-400 hover:bg-indigo-500 hover:-translate-y-1 cursor-pointer  delay-150'>
          <h1>Add User</h1>
          <div >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>
      </Link>
      <Link href='/addeventtype'>
        <div className='flex space-x-2 items-center justify-center text-white p-5 shadow-md border h-72 border-gray-200 rounded-md hover:scale-105 transition ease-in-out  duration-300 bg-indigo-400 hover:bg-indigo-500  hover:-translate-y-1 cursor-pointer delay-150'>
          <h1>Add Event Type</h1>
          <div >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function Home() {
  const [user,setUser] = useState(0)
  const router = useRouter()
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(1)
      }else{
        router.replace('/login')
      }
    },(error)=>{
      router.replace('/login')
    },(com)=>{
      router.replace('/login')
    })
  },[])
  return user==0 ? <Layout Component={<LoadingScreen />} /> : <Layout Component={<Index />} />
}
