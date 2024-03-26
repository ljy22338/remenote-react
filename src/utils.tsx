export function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = array.slice(); // 复制原始数组，以避免修改原数组

    // Fisher-Yates 洗牌算法
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 随机选择一个位置
        // 交换元素
        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[j];
        shuffledArray[j] = temp;
    }

    return shuffledArray;
}