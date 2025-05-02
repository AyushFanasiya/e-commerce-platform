/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        What Our Customers Say
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Don't just take our word for it - hear from our satisfied customers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center mb-6">
                            <img
                                alt="testimonial"
                                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                                src="https://niqox.com/assets/img/team/mitul.jpg"
                            />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">Mitul Kalsariya</h3>
                                <p className="text-sm text-gray-600">Senior Frontend Developer</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            "Clean code, responsive design, and smooth interactions — exactly what any frontend developer would appreciate. Loved working with this interface!"
                        </p>
                        <div className="mt-4 flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center mb-6">
                            <img
                                alt="testimonial"
                                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                                src="https://niqox.com/assets/img/team/6.png"
                            />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">Karan Kakadiya</h3>
                                <p className="text-sm text-gray-600">Lead UI/UX Designer</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            "The UI is sleek, intuitive, and performs flawlessly across devices. It's clear that a lot of thought and care went into every component. Truly a frontend developer's delight."
                        </p>
                        <div className="mt-4 flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center mb-6">
                            <img
                                alt="testimonial"
                                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                                src="https://niqox.com/assets/img/team/hardik.jpg"
                            />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">Kinay Dhanani</h3>
                                <p className="text-sm text-gray-600">React Developer</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            "This project showcases a strong grasp of React component structuring. The state management is clean, and the UI responsiveness is good."
                        </p>
                        <div className="mt-4 flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;