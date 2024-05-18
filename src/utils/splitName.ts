export const splitName = (name: string) => {
    const split = name.split(' ');
    if (split.length === 1) {
        return split[0].toUpperCase();
    }
    return split[0][0].toUpperCase() + split[1][0].toUpperCase();
};
