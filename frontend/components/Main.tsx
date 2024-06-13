import HomeNavbar from '../components/HomeNavbar'
import { Link } from "react-router-dom";
import HomeFront from './HomeFront'
import Homemid from './HomeMid'
export default function Main() {
    return (
        <>
            <HomeNavbar />
            <div className='bg-black'>
            <HomeFront />
           <Homemid />
            <footer className="bg-gray-900 text-white py-8 pb-4">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-">
                    <div>
                        <h3 className="text-lg font-bold mb-4">MoneyTransferX</h3>
                        <p className="text-sm">
                            Seamlessly Send Money to other Users
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 ml-40">Quick Links</h3>
                        <ul className="ml-40">
                            <li className="mb-2">
                               <a href='/'>Home</a> </li>
                            <li className="mb-2"><a href='/signup'>Signup</a> </li>
                            <li className="mb-2"><a href='/signin'>SignIn</a></li>
                            <li className="mb-2"><a href='/dashboard'>Dashboard</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 pl-40">Follow Us</h3>
                        <div className="flex space-x-4 pl-40">
                            <Link to="https://x.com/Sanghrakshit12" className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.555-2.003.959-3.127 1.184-.897-.959-2.173-1.559-3.59-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.088-.205-7.719-2.165-10.148-5.144-.422.722-.666 1.561-.666 2.457 0 1.69.861 3.178 2.168 4.048-.801-.026-1.555-.246-2.21-.616v.061c0 2.362 1.679 4.337 3.907 4.778-.409.111-.84.171-1.284.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.415-1.68 1.319-3.809 2.105-6.102 2.105-.397 0-.79-.023-1.177-.067 2.179 1.393 4.768 2.207 7.548 2.207 9.054 0 14.002-7.5 14.002-14.002 0-.209 0-.42-.015-.631.961-.695 1.8-1.562 2.462-2.549z" />
                                </svg>
                            </Link>
                            <Link to="https://github.com/Sanghrakshit12" className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35c-.73 0-1.325.595-1.325 1.325v21.351c0 .729.595 1.324 1.325 1.324h11.498v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.919.001c-1.504 0-1.794.715-1.794 1.762v2.314h3.588l-.467 3.622h-3.12v9.293h6.116c.73 0 1.324-.595 1.324-1.324v-21.35c0-.73-.594-1.325-1.324-1.325z" />
                                </svg>
                            </Link>
                            <Link to="https://www.linkedin.com/in/sanghrakshit/" className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.616 3.017c1.179 0 2.134.955 2.134 2.134s-.955 2.134-2.134 2.134-2.134-.955-2.134-2.134.955-2.134 2.134-2.134zM9.847 8.143h-3.713v12.922h3.713v-12.922zM8.001 4.978c-1.19 0-2.155.965-2.155 2.155s.965 2.155 2.155 2.155 2.155-.965 2.155-2.155-.965-2.155-2.155-2.155zM15.136 8.143h-3.711v12.922h3.711v-6.505c0-2.576 3.308-2.793 3.308 0v6.505h3.711v-7.359c0-5.172-6.187-4.988-6.187 0v7.359h-.132v-12.922h-.132z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-4 border-t border-gray-700 pt-4">
                    <p className="text-center text-sm text-gray-400">
                        © 2024 MoneyTransferX All rights reserved.
                    </p>
                </div>
            </footer>
            </div>
        </>
    );
}
