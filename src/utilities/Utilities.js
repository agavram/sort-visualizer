/**
 * Swaps indexes of an array
 * @param {*} nums 
 * @param {*} left 
 * @param {*} right 
 */
export function swap(nums, left, right) {
    var temp = nums[left];
    nums[left] = nums[right];
    nums[right] = temp;
}