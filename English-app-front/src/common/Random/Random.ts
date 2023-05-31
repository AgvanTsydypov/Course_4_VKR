export const getRandomInt: (max: number) => number = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const getRandomForTelegramConfirm: () => number = () => {
    return getRandomInt(9000) + 1000
}
