import logoImg from '@/../public/logo.png';
import {
    FacebookIcon,
    MailIcon,
    MapPinIcon,
    PhoneCallIcon,
    TwitchIcon,
    TwitterIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="wrapper space-y-4 border-t bg-white pt-14">
            <div className="flex flex-wrap justify-between gap-8">
                <div className="max-w-sm space-y-2">
                    <Link href="/">
                        <Image src={logoImg} width={150} alt="Availly LOGO" />
                    </Link>
                    <p className="text-gray-600">
                        Availly simplifies appointment booking for businesses
                        and users. Schedule appointments effortlessly, save
                        time, and manage your schedule with ease.
                    </p>
                    <div className="flex gap-2 *:text-gray-600">
                        <Link
                            href="#"
                            className="transition duration-300 hover:text-primary"
                        >
                            <TwitterIcon className="size-6" />
                        </Link>
                        <Link
                            href="#"
                            className="transition duration-300 hover:text-primary"
                        >
                            <TwitchIcon className="size-6" />
                        </Link>
                        <Link
                            href="#"
                            className="transition duration-300 hover:text-primary"
                        >
                            <FacebookIcon className="size-6" />
                        </Link>
                    </div>
                </div>

                <div className="space-y-2 *:flex *:gap-2">
                    <h3 className="mb-4 text-xl font-semibold text-[#424242]">
                        Contact Us
                    </h3>
                    <p className="text-gray-600">
                        <MapPinIcon className="size-6" />
                        1234 Street Name, City Name, United States
                    </p>
                    <p className="text-gray-600">
                        <PhoneCallIcon className="size-6" />
                        +123 456 7890
                    </p>
                    <Link
                        href="mailto:availly@gmaill.com"
                        className="text-gray-600"
                    >
                        <MailIcon className="size-6" />
                        availly@gmail.com
                    </Link>
                </div>
            </div>
            <div className="border-t py-4">
                <p className="text-center text-gray-600">
                    &copy; {new Date().getFullYear()} Availly. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
