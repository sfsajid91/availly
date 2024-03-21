import Navbar from '@/components/Navbar';

export default function HomePage() {
    return (
        <div>
            <Navbar />
            <section className="bg-gradient-to-r from-white via-blue-200 to-white px-16 py-52">
                <h1>Home Page</h1>
            </section>

            <header className="flex justify-between bg-gray-900/20 px-4 py-2 backdrop-blur-md">
                <a href="/" className="text-xl font-bold text-white">
                    Availly
                </a>
                <nav className="space-x-4">
                    <a
                        href="#features"
                        className="text-white hover:text-gray-200"
                    >
                        Features
                    </a>
                    <a
                        href="#benefits"
                        className="text-white hover:text-gray-200"
                    >
                        Benefits
                    </a>
                    <a
                        href="#contact"
                        className="text-white hover:text-gray-200"
                    >
                        Contact
                    </a>
                </nav>
            </header>

            <section
                className="hero min-h-screen bg-cover bg-center"
                // style="background-image: url('hero-image.jpg');"
            >
                <div className="container mx-auto flex h-full flex-col items-center justify-center px-4">
                    <h1 className="mb-8 text-5xl font-bold leading-tight text-white">
                        Effortless Appointment Booking
                    </h1>
                    <a
                        href="#"
                        className="rounded-md bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
                    >
                        Try Availly for Free
                    </a>
                </div>
            </section>
        </div>
    );
}
