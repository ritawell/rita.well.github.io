/**
 * Created by Ritok on 14.10.2015.
 */
/**«адание 3 (FizzBuzz)

 Ќапишите программу, котора€ выводит через console.log все числа от 1 до 100, с двум€ исключени€ми. ƒл€ чисел, нацело дел€щихс€ на 3, она должна выводить СFizzТ, а дл€ чисел, дел€щихс€ на 5 (но не на 3) Ц СBuzzТ.*/

for (var current = 1; current<=100; current++) {
    if (current % 3 === 0) {
        console.log('Fizz');
    } else {
        if (current % 5 === 0 || current % 3 === !0) {
            console.log('Buzz');
        } else {
            console.log(current);
        }
    }