/**
 * Created by Ritok on 14.10.2015.
 */
/**������� 6 (pow)

 �������� ������� pow(x,n), ������� ���������� x � ������� n. ����� ������, �������� x �� ���� n ��� � ���������� ���������.

 pow(3, 2) = 3 * 3 = 9
 pow(1, 100) = 1 * 1 * ...* 1 = 1*/
var x = prompt ('x');
var n =prompt ('n');
function pow (x, n) {
    var result = x;
    for (var i=1; i<n; i++) {
        result = result * x;
    }
    return result;
}

alert (pow(x,n));