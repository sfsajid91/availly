import bookedImg from '@/../public/home/booked.svg';
import timeSlot from '@/../public/home/time-slot.svg';
import webSearch from '@/../public/home/web-search.svg';
import HitImage from './hit-image';

const hitImages = [
    {
        imgSrc: webSearch,
        title: 'Find the Perfect Provider',
        description:
            "Browse the provider's calendar and effortlessly select a time slot that works best for your busy schedule. Availly displays real-time availability, so you can book appointments with confidence.",
    },
    {
        imgSrc: timeSlot,
        title: 'Choose Your Time Slot',
        description:
            " Browse the provider's calendar and effortlessly select a time slot that works best for your busy schedule. Availly displays real-time availability, so you can book appointments with confidence.",
    },
    {
        imgSrc: bookedImg,
        title: 'Book Your Appointment & Relax',
        description:
            "Once you've selected a time slot, simply confirm your appointment and relax. Availly will send you a reminder before your appointment, so you never miss a beat.",
    },
];

export default function HIT() {
    return (
        <section className="wrapper bg-gray-50 py-14">
            <h1 className="mb-8 scroll-m-20 text-center text-4xl font-bold tracking-tight text-[#424242] lg:text-5xl">
                How It Works
            </h1>

            {hitImages.map((image, index) => (
                <HitImage
                    key={index}
                    imgSrc={image.imgSrc}
                    title={image.title}
                    description={image.description}
                    index={index}
                />
            ))}
        </section>
    );
}
