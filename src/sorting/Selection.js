export function selectionSort(nums) {
    let len = nums.length;
    let animationArray = [];

    for (let i = 0; i < len; i++) {
        let min = i;

        for (let j = i + 1; j < len; j++) {
            if (nums[min] > nums[j]) {
                min = j;
            }
        }
        if (min !== i) {
            animationArray.push([i, min]);

            let tmp = nums[i];
            nums[i] = nums[min];
            nums[min] = tmp;
        }
    }

    return animationArray;
}