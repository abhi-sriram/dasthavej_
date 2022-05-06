import { useEffect, useState } from "react"
import Layout from '../components/Layout'
import { auth, onAuthStateChanged, collection, getDocs, doc, db, query,setDoc } from '../firebase-app'
import LoadingScreen from '../components/LoadingScreen'
import { useRouter } from 'next/router'
function Index() {



    const [users, setUsers] = useState([

    ])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        setUsersLoading(true)
        const u = []
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            u.push(doc.data()['name'])
        });
        console.log(u);
        setUsersLoading(false)
        setUsers(u)
    }

    const [loading, setLoading] = useState(false)
    const [usersLoading, setUsersLoading] = useState(false)
    const [searchedUsers, setSearchedUsers] = useState([

    ])
    const [error, setError] = useState('');

    const [selectedUsers, setSelectedUsers] = useState([])
    const [title, setTitle] = useState("")
    const [search, setSearch] = useState("")
    const [onChangedText, setOnChangedText] = useState(false)
    function removeUser(user) {
        const k = [...selectedUsers, user]
        setSelectedUsers(k)
        console.log(k);
        // setSelectedUsers([...selectedUsers ,user])
        const u = []
        const s = []
        users.forEach((us) => {
            if (us != user) {
                u.push(us)

            }
        })
        searchedUsers.forEach((us) => {
            if (us != user) {
                s.push(us)

            }
        })
        setUsers(u);
        setSearchedUsers(s)
    }

    const addEventType = async () => {
        if (title.trim().length == 0 || selectedUsers.length == 0) {
            setError('All fields required.');
            return;
        }

        setLoading(true);
        const userRef = doc(collection(db, "event-type"));
        await setDoc(userRef, {
            'title': title.trim(),
            'signers': selectedUsers
        });
        setLoading(false);
        setTitle("")
        setSearch("")
        setSelectedUsers([])
        setSearchedUsers([])

    }
    return (
        <div>
            <div className='max-w-6xl mx-auto px-5 md:px-0 flex flex-col items-center my-5 space-y-2'>
                <h1 className='text-xl text-gray-700'>Add Event Type</h1>
                <input type="text" placeholder='Title' className='outline-none  focus:shadow-md px-4 py-2 border border-gray-100 rounded-md text-gray-700 w-full transition duration-200 focus:scale-101' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Add Signer' className='outline-none  focus:shadow-md px-4 py-2 border border-gray-100 rounded-md text-gray-700 w-full transition duration-200 focus:scale-101' value={search} onChange={(e) => {
                    console.log(e.target.value);
                    setSearch(e.target.value);

                    if (e.target.value.trim().length > 0) {
                        const u = []
                        users.forEach(element => {
                            if (element.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) {
                                u.push(element)
                            }
                        });
                        setSearchedUsers(u);
                        setOnChangedText(true);
                    } else {
                        setOnChangedText(false);
                    }
                }} />
                {
                    usersLoading ? (<p>Loading...</p>) : (<div>
                        {onChangedText ? <div className="space-y-2">
                            <h1 className="text-center text-lg text-gray-700">Select Signers</h1>
                            {

                                searchedUsers.map((user) => (
                                    <div key={user} className="flex space-x-2 items-center justify-between shadow-md px-5 py-2 bg-red-white rounded-lg border border-gray-200">
                                        <div className="space-x-2 flex items-center">
                                            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 ">{user.substring(0, 1)}</div>
                                            <h1>{user}</h1>

                                        </div>
                                        <div   >
                                            <svg onClick={() => removeUser(user)} xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 hover:text-green-600 transition hover:scale-95 p-2 duration-300 hover:bg-gray-200 cursor-pointer rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                    </div>))
                            }
                        </div> : (<> </>)}
                        <div className="h-px w-full bg-gray-300"></div>
                        {selectedUsers.length > 0 ? <div className="space-y-2">
                            <h1 className="text-center text-lg text-gray-700">Selected Signers</h1>
                            {

                                selectedUsers.map((user) => (
                                    <div key={user} className="flex space-x-2 items-center justify-between shadow-md px-5 py-2 bg-red-white rounded-lg border border-gray-200">
                                        <div className="space-x-2 flex items-center">
                                            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 ">{user.substring(0, 1)}</div>
                                            <h1>{user}</h1>

                                        </div>

                                    </div>))
                            }
                        </div> : (<> </>)}
                    </div>)
                }




                <button disabled={loading} onClick={addEventType} className='flex space-x-1 items-center shadow-md w-full  py-2 bg-indigo-400 text-white rounded-md transition duration-200 ease-in-out hover:scale-95 hover:bg-indigo-500 justify-center'>
                    {loading ? <center>Adding...</center> : (<div className='flex items-center'>
                        Add Event Type<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>)}
                </button>


                <div className='my-4'>
                    {error.length > 0 ? (<h1 className='text-red-500 text-center'>{error}</h1>) : (<></>)}
                </div>
            </div>
        </div>
    )
}

function AddEventType() {
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

export default AddEventType