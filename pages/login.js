import Header from '../components/Header'
import Image from 'next/image'
// import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import HeadComponent from '../components/HeadComponent';
import LoadingScreen from '../components/LoadingScreen';
import Layout from '../components/Layout';
import {auth,signInWithEmailAndPassword,onAuthStateChanged} from '../firebase-app'
import {useRouter} from 'next/router'

function Index(){
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const loginUser = async () => {
        if (email.trim().length == 0 || password.trim().length == 0) {
            setError('All fields required.');
            return;
        }
        setLoading(true);
        await signInWithEmailAndPassword(auth, email.trim(), password.trim()).then((user) => {
            // setLoading(false);
            router.replace('/')

        }).catch((er) => {
            const msg = er.message.split(':')[1]
            setError(msg);
        })
        setLoading(false);

    }
   
    return (<>
    <HeadComponent title='Login' />
            <div className='flex    justify-center items-center  bg-gray-100 p-2'>
                <div className='flex flex-col p-10 shadow-md border border-gray-100 rounded-lg space-y-3 border-dotted bg-white my-20'>
                    <div className='flex justify-center items-center'>
                        <div className='relative w-20 h-20 '>
                            <Image src='/logo.png' layout='fill' />
                        </div>
                    </div>
                    <input type="email" placeholder='Email' className='outline-none  focus:shadow-md px-4 py-1 transition duration-200 focus:scale-101 border border-gray-200 rounded-md text-gray-700 w-64 sm:w-96' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' className='outline-none w-full focus:shadow-md px-4 transition duration-200 focus:scale-101    py-1 border border-gray-200 rounded-md text-gray-700 ' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button disabled={loading} className='bg-green-600 px-7 py-1 rounded-md border border-green-600 text-white hover:bg-white hover:text-green-600 hover:border hover:border-green-600 hover:border-dashed text-center' onClick={loginUser}>{loading ? <center>Loading</center> : 'Login'} </button>
                    <div className='my-4'>
                        {error.length > 0 ? (<h1 className='text-red-500 text-center'>{error}</h1>) : (<></>)}
                    </div>
                </div>

            </div></>)
}

function Login() {
    
    const [user,setUser] = useState(0)
  const router = useRouter()
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        // setUser(1)
        router.replace('/')
      }else{
        setUser(1)
      }
    },(error)=>{
    //   router.replace('/login')
    },(com)=>{
    //   router.replace('/login')
    })
  },[])
  return user==0 ? <Layout Component={<LoadingScreen />} /> : <Layout Component={<Index />} />
}

export default Login