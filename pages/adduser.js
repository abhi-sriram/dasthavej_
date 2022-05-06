import React from 'react'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { auth, signInWithEmailAndPassword, onAuthStateChanged,collection,setDoc,doc,db ,createUserWithEmailAndPassword} from '../firebase-app'
import LoadingScreen from '../components/LoadingScreen'
import { useRouter } from 'next/router'
function Index() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const addUser = async () => {
        if (email.trim().length == 0 || password.trim().length == 0 || name.trim().length == 0 || confirmPassword.trim().length == 0) {
            setError('All fields required.');
            return;
        }
        if (password.trim() != confirmPassword.trim()) {
            setError('Incorrect passwords')
            return;
        }
        setLoading(true);
        await createUserWithEmailAndPassword    (auth, email.trim(), password.trim()).then(async(user) => {
            // setLoading(false);
            // router.replace('/')
            const userRef = doc(collection(db, "users"));
            await setDoc(userRef, {
                'name':name.trim(),
                'email':email.trim(),
                'role':role,
            });
            setError("User added succesfully");


        }).catch((er) => {
            const msg = er.message.split(':')[1]
            setError(msg);
        })
        setLoading(false);

    }


    return (
        <div className='max-w-6xl mx-auto px-5 md:px-0 flex flex-col items-center my-5 space-y-2'>
            <h1 className='text-xl text-gray-700'>Add User</h1>
            <input type="text" placeholder='Name' className='outline-none  focus:shadow-md px-4 py-2 border border-gray-100 rounded-md text-gray-700 w-full transition duration-200 focus:scale-101' value={name} required onChange={(e)=>setName(e.target.value)} />
            <input type="email" placeholder='Email' className='outline-none  focus:shadow-md px-4 py-2 border border-gray-100 rounded-md text-gray-700 w-full transition duration-200 focus:scale-101' required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder='Password' className='outline-none  focus:shadow-md px-4 py-2 border border-gray-100 rounded-md text-gray-700 w-full transition duration-200 focus:scale-101' required value={password} onChange={(e)=>setPassword(e.target.value)} />
            <input type="text" placeholder='Confirm Password' className='outline-none  focus:shadow-md px-4 py-2 border border-gray-100 rounded-md transition duration-200 focus:scale-101 text-gray-700 w-full' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            <select className='outline-none  focus:shadow-md px-4 py-2 border border-gray-100 rounded-md transition duration-200 focus:scale-100 text-gray-700 w-full' value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="signer">Signer</option>
            </select>
            <button disabled={loading} onClick={addUser} className='flex space-x-1 items-center shadow-md w-full  py-2 bg-indigo-400 text-white rounded-md transition duration-200 ease-in-out hover:scale-95 hover:bg-indigo-500 justify-center'>
                {loading ? <center>Adding...</center> : (<div className='flex items-center'>
                    Add User<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                </div>)}
            </button>


            <div className='my-4'>
                {error.length > 0 ? (<h1 className='text-red-500 text-center'>{error}</h1>) : (<></>)}
            </div>
        </div>
    )
}

function AddUser() {
    const [user, setUser] = useState(0)
    const router = useRouter()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(1)
            } else {
                router.replace('/login')
            }
        }, (error) => {
            router.replace('/login')
        }, (com) => {
            // router.replace('/login')
        })
    }, [])
    return user == 0 ? <Layout Component={<LoadingScreen />} /> : <Layout Component={<Index />} />
}

export default AddUser