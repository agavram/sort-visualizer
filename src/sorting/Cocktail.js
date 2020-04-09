import { swap } from '../utilities/Utilities';

export function cocktail(nums) {
    let isSorted = true;
    let animationArray = [];

    while (isSorted) {
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                animationArray.push([i, i + 1]);
                swap(nums, i, i + 1);
                isSorted = true;
            }
        }

        if (!isSorted)
            break;

        isSorted = false;

        for (let j = nums.length - 1; j > 0; j--) {
            if (nums[j - 1] > nums[j]) {
                animationArray.push([j, j - 1]);
                swap(nums, j, j - 1);
                isSorted = true;
            }
        }
    }

    return animationArray;
}
