/**
 * Created by Ritok on 14.10.2015.
 */
/**������� 3 (FizzBuzz)

 �������� ���������, ������� ������� ����� console.log ��� ����� �� 1 �� 100, � ����� ������������. ��� �����, ������ ��������� �� 3, ��� ������ �������� �Fizz�, � ��� �����, ��������� �� 5 (�� �� �� 3) � �Buzz�.*/

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