export function shellSort(nums) {
    let animationArray = [];

    var increment = nums.length / 2;
    while (increment > 0) {
        for (let i = increment; i < nums.length; i++) {
            var j = i;
            var temp = nums[i];

            while (j >= increment && nums[j - increment] > temp) {
                animationArray.push([j, j - increment]);

                nums[j] = nums[j - increment];
                j = j - increment;
            }

            nums[j] = temp;
        }

        if (increment === 2) {
            increment = 1;
        } else {
            increment = parseInt(increment * 5 / 11);
        }
    }

    return animationArray;
}