import { Link } from "react-router-dom";

export default function Homefront() {
    const isLoggedIn = localStorage.getItem("token");

    return (
        <div className="flex flex-col items-center md:mt-20 mt-28 md:flex-row">
            <section className="flex-1 md:ml-20 lg:ml-52">
                <div className="text-center font-bold md:text-left pt-16">
                    <h2 className="mb-3 font-serif text-6xl text-white md:text-7xl">
                        MoneyTransferX
                    </h2>
                    <h1 className="mb-1 font-serif text-3xl text-white md:text-4xl">
                        Effortlessly Transfer Money with Security and Ease
                    </h1>
                    <div className="mt-8 flex flex-col items-center md:flex-row md:items-start">
                        <input
                            placeholder="Email"
                            className="mb-2 w-full rounded p-2 md:mb-0 md:mr-2 md:w-64"
                        />
                        {!isLoggedIn && (
                            <Link
                                to="/signup"
                                className="inline-block bg-green-500 hover:bg-green-800 text-white font-semibold px-5 py-2 rounded shadow"
                            >
                                Sign Up
                            </Link>
                        )}
                    </div>
                </div>
            </section>
            <div className="flex justify-center md:w-1/3 md:justify-end">
                <div className="m-10 inline-block rounded mr-14">
                    <img src="/img3.png" alt="Money Transfer Illustration" className="w-full h-auto" />
                </div>
            </div>
        </div>
    );
}
