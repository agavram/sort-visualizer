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

/**
* This method generates the arrray of numbers to be sorted
*/
export function getArray() {
    let nums = [];
    const bars = document.getElementsByClassName('bar');

    for (let i = 0; i < bars.length; i++) {
        nums.push(parseInt(bars[i].getAttribute('value')));
    }
    return nums;
}