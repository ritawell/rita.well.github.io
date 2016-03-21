/**
 * Created by Ritok on 14.10.2015.
 */
/**Task 3*/
var userName = prompt( 'Your login', '' );
if (userName == admin) {
    var pass = prompt('Enter your password', '');
    if (pass == passw0rd) {
        alert('Welcome home !');
    } else if (pass == null) {
        alert('canceled');
    } else {
        alert('Wrong password');
    }
} else if (userName == null) {
    alert( 'Canceled' );
} else {
    alert( 'Accesses denied' );
}



