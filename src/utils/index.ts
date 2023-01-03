export const randomElement = <T>(array: T[]): T => {
    const index = Math.floor(Math.random() * array.length);

    return array[index];
};

export const randomElementList = <T>(array: T[], length: number): T[] => {
    const randomArr: T[] = [];

    for (let i = 0; i < length; i++) {
        randomArr.push(randomElement(array));
    }

    return randomArr;
};
