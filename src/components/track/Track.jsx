const Track = () => {
    return (
        <section className="bg-gray-50">
            <div className="container mx-auto px-5 py-10 md:py-14">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: 'Free Shipping',
                            description: 'On orders over $50',
                            icon: '🚚'
                        },
                        {
                            title: '24/7 Support',
                            description: 'Dedicated support team',
                            icon: '💬'
                        },
                        {
                            title: 'Secure Payment',
                            description: '100% secure checkout',
                            icon: '🔒'
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-xl"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                            <p className="mt-2 text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Track;