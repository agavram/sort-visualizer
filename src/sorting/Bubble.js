export function bubbleSort(nums) {

    let len = nums.length;
    let animationArray = [];

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (nums[j] > nums[j + 1]) {
                animationArray.push([j, j + 1])

                let tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
            }
        }
    }
    
    return animationArray;
}