
export default function Homemid(){
    return   <div className="flex min-h-screen items-center justify-center">
    <div className="grid grid-cols-2 gap-8">
        <div className="max-w-sm overflow-hidden rounded bg-gray-900 shadow-lg">
            <div className="px-10 py-6">
                <div className="mb-4 text-center text-xl font-bold text-white">
                    Transfer Money
                </div>
                <p className="pb-5 text-center text-base text-white">
                    Seamlessly Send Money to other Users
                </p>
                <img src="/wallet.png" alt="image" width={620} height={640} />
            </div>
            <div className="px-6 pb-4 pt-2">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    #UPI
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    #Moneytransferx
                </span>
            </div>
        </div>
        <div className="max-w-sm overflow-hidden rounded bg-gray-900 shadow-lg">
            <div className="px-10 py-6">
                <div className=" pb-5 text-center text-xl font-bold text-white">
                    Secure Payments
                </div>
                <p className="text-center text-base text-white">
                    Secure MoneyTransfer to Authenticated Users
                </p>
                <img className='pt-5' src="/sol.png" alt="image" width={620} height={640} />
            </div>
            <div className="px-6 pb-4 pt-2">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    #Authentication
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    #Security
                </span>
            </div>
        </div>
    </div>
</div>
}