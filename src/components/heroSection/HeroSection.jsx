import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight animate-fade-in">
                        <span className="block">Discover Amazing</span>
                        <span className="block text-primary-light mt-2">Products</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 animate-fade-in">
                        Shop the latest trends with our curated collection of premium products.
                        Quality, style, and value - all in one place.
                    </p>
                    <div className="mt-10 flex justify-center animate-slide-up">
                        <Link
                            to="/allproduct"
                            className="btn-primary px-8 py-3 text-lg font-medium"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;