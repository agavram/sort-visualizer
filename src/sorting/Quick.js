import { swap } from "../utilities/Utilities";

export function quickSort(nums) {
    let animationArray = [];
    return quickSortRecur(nums, 0, nums.length - 1, animationArray)
}

function quickSortRecur(items, left, right, animationArray) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right, animationArray);
        if (left < index - 1) {
            quickSortRecur(items, left, index - 1, animationArray);
        }
        if (index < right) {
            quickSortRecur(items, index, right, animationArray);
        }
    }
    
    return animationArray;
}

function partition(items, left, right, animationArray) {
    var pivot = items[Math.floor((right + left) / 2)], i = left, j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            animationArray.push([i, j]);
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}