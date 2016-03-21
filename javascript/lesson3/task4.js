/**
 * Created by Ritok on 14.10.2015.
 */
/**Задание 4 (FizzBuzz 2)

 Исправьте 1ю задачу так, чтобы она выводила «FizzBuzz» для всех чисел, которые делятся и на 3, и на 5.*/


for (var hundred = 1; hundred <= 100; hundred++) {
    if (hundred % 5 === 0 && hundred % 3 === 0) {
        console.log('FizzBuzz');
    }
    else if (hundred % 3 === 0) {
        console.log('Fizz');
    } else
    if (hundred % 5 === 0 || hundred % 3 === !0) {
        console.log('Buzz');
    }
    else {
        console.log(hundred);
    }
}
