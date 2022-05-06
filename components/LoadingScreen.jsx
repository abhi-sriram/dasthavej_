// import ReactLoading from 'react-loading';

function LoadingScreen() {
    return (
        <div className='flex w-full h-screen justify-center items-center'>
            <h1 className='text-gray-800 font-semibold text-xl uppercase'>
                Loading
            </h1>
            {/* <ReactLoading type={'spinningBubbles'} color={'#30b353'} height={50} width={50} /> */}
        </div>
    )
}

export default LoadingScreen