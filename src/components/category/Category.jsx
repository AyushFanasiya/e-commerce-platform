import { useNavigate } from "react-router-dom";

const categories = [
    {
        image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png',
        name: 'Fashion',
        color: 'from-pink-500 to-rose-500'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png',
        name: 'Shirt',
        color: 'from-blue-500 to-indigo-500'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png',
        name: 'Jacket',
        color: 'from-purple-500 to-violet-500'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
        name: 'Mobile',
        color: 'from-green-500 to-emerald-500'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png',
        name: 'Laptop',
        color: 'from-yellow-500 to-amber-500'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
        name: 'Shoes',
        color: 'from-red-500 to-orange-500'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png',
        name: 'Home',
        color: 'from-teal-500 to-cyan-500'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png',
        name: 'Books',
        color: 'from-indigo-500 to-blue-500'
    }
];

const Category = () => {
    const navigate = useNavigate();

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Shop by Category
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Browse our wide range of products by category
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap py-2 -mx-2 px-2">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/category/${item.name}`)}
                            className="group cursor-pointer inline-block align-top min-w-[120px]"
                        >
                            <div className={`relative rounded-2xl bg-gradient-to-br ${item.color} p-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                                <div className="aspect-square flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-contain filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <h3 className="mt-3 text-center text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                                {item.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;