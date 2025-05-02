/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button
                onClick={handleOpen}
                className="w-full px-6 py-3 text-center text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary border border-transparent rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Buy Now
            </Button>

            <Dialog
                open={open}
                handler={handleOpen}
                className="bg-white rounded-2xl shadow-2xl"
                size="md"
            >
                <DialogHeader className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900">Enter Delivery Details</h3>
                    
                </DialogHeader>

                <DialogBody className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={addressInfo.name}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        name: e.target.value
                                    })
                                }}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors duration-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Delivery Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={addressInfo.address}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        address: e.target.value
                                    })
                                }}
                                placeholder="Enter your complete delivery address"
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors duration-200"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                                    Pincode
                                </label>
                                <input
                                    type="number"
                                    id="pincode"
                                    name="pincode"
                                    value={addressInfo.pincode}
                                    onChange={(e) => {
                                        setAddressInfo({
                                            ...addressInfo,
                                            pincode: e.target.value
                                        })
                                    }}
                                    placeholder="Enter pincode"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={addressInfo.mobileNumber}
                                    onChange={(e) => {
                                        setAddressInfo({
                                            ...addressInfo,
                                            mobileNumber: e.target.value
                                        })
                                    }}
                                    placeholder="Enter mobile number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors duration-200"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="button"
                                onClick={() => {
                                    handleOpen();
                                    buyNowFunction();
                                }}
                                className="w-full px-6 py-3 text-center text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary border border-transparent rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Place Order
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;