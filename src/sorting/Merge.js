export function mergeSort(nums) {
    if (nums.length <= 1) {
        return nums;
    }
    
    let mid = Math.floor(nums.length / 2),
        left = mergeSort(nums.slice(0, mid)),
        right = mergeSort(nums.slice(mid));

    return merge(left, right);
}

function merge(arr1, arr2) {
    let sorted = [];

    while (arr1.length && arr2.length) {
        if (arr1[0] < arr2[0]) sorted.push(arr1.shift());
        else sorted.push(arr2.shift());
    }

    return sorted.concat(arr1.slice().concat(arr2.slice()));
}
