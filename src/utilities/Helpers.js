/**
 * Used to swap the positions of two elements
 * @param {*} id1 ID of first element
 * @param {*} id2  ID of second element
 */
export function swapDivPositions(id1, id2) {
    const tempLeft = document.getElementById(id1).style.left
    document.getElementById(id1).style.left = document.getElementById(id2).style.left;
    document.getElementById(id2).style.left = tempLeft;

    document.getElementById(id1).id = -1;
    document.getElementById(id2).id = id1;
    document.getElementById(-1).id = id2;
}

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