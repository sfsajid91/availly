const businesses = [
    {
        name: 'Sushi Place',
        description:
            'Sushi Place is a restaurant that serves delicious sushi. It is located in the heart of the city.',
        rating: 3.2,
        category: 'restaurant',
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
        slug: 'sushi-place',
    },
    {
        name: 'Jack’s Barbershop',
        description:
            'Jack’s Barbershop is a barbershop that offers haircuts and shaves.',
        rating: 4.5,
        category: 'salon',
        image: 'https://images.pexels.com/photos/4625616/pexels-photo-4625616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        slug: 'jacks-barbershop',
    },
    {
        name: 'The Coffee Shop',
        description:
            'The Coffee Shop is a cozy cafe that serves coffee and pastries.',
        rating: 4.8,
        category: 'cafe',
        image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=600',
        slug: 'the-coffee-shop',
    },
];

export const getAllBusinesses = () => businesses;

export const getBusinessBySlug = (slug: string) =>
    businesses.find((business) => business.slug === slug);
