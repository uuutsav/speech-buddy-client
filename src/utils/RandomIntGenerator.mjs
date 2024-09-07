export const getRandomInt = (a, b) => {
    // Generate random integer between a and b (inclusive)
    const rand = Math.floor(Math.random() * b) + a;
    return rand;
}