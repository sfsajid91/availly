import Image from 'next/image';

type HitImageProps = {
    imgSrc: string;
    title: string;
    description: string;
    index: number;
};

export default function HitImage({
    imgSrc,
    title,
    description,
    index,
}: HitImageProps) {
    return (
        <div
            className={`mx-auto flex max-w-4xl items-center justify-between gap-8 py-4 ${index % 2 !== 0 && 'md:flex-row-reverse'}`}
        >
            <Image
                src={imgSrc}
                alt={title}
                width={250}
                className="hidden md:inline"
            />
            <div className="max-w-sm">
                <h3 className="mt-4 text-2xl font-bold text-[#424242]">
                    {`${index + 1}. ${title}`}
                </h3>
                <p className="mt-4 text-gray-600">{description}</p>
            </div>
        </div>
    );
}
