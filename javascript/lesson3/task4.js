/**
 * Created by Ritok on 14.10.2015.
 */
/**������� 4 (FizzBuzz 2)

 ��������� 1� ������ ���, ����� ��� �������� �FizzBuzz� ��� ���� �����, ������� ������� � �� 3, � �� 5.*/


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
