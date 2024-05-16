import scheduleImg from '@/../public/home/schedule.svg';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <main className="wrapper container flex items-center justify-between gap-4 bg-gradient-to-r from-white via-blue-200 to-white py-20">
            <div className="space-y-4 text-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-[#424242] lg:text-5xl">
                    Start <span className="text-primary">Booking </span>
                    Smarter Today
                </h1>
                <h4 className="scroll-m-20 text-lg font-medium tracking-tight text-gray-600">
                    Sign up for Availly and experience effortless scheduling
                </h4>
                <Button className="group gap-2" size="lg" asChild>
                    <Link href="/business">
                        <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                        Get Started
                    </Link>
                </Button>
            </div>
            <Image
                src={scheduleImg}
                alt="Next.js"
                className="hidden max-w-md md:inline"
            />
        </main>
    );
}
