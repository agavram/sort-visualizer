export function insertionSort(nums) {
    let animationArray = [];

    for (let i = 1; i < nums.length; i++) {
        let j = i - 1;
        let temp = nums[i];
        while (j >= 0 && nums[j] > temp) {
            const swapNum = j + 1;
            animationArray.push([swapNum, swapNum - 1])
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = temp;
    }

    return animationArray;
}