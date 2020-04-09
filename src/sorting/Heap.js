import { swap } from '../utilities/Utilities';

export function heapSort(nums) {

    let animationArray = [];
    let length = nums.length;

    for (var i = Math.floor(length / 2); i >= 0; i -= 1) {
        heap_root(nums, i, length, animationArray);
    }

    for (i = nums.length - 1; i > 0; i--) {
        animationArray.push([0, i]);
        swap(nums, 0, i);
        length--;

        heap_root(nums, 0, length, animationArray);
    }

    return animationArray;
}

function heap_root(nums, i, length, animationArray) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < length && nums[left] > nums[max]) {
        max = left;
    }

    if (right < length && nums[right] > nums[max]) {
        max = right;
    }

    if (max !== i) {
        animationArray.push([i, max]);
        swap(nums, i, max);
        heap_root(nums, max, length, animationArray);
    }
}