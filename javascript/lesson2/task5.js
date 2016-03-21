/**
 * Created by Ritok on 14.10.2015.
 */
/**TAsk 5:
 var name = 'admin', text;
 if (name == 'admin') {
  text = 'Hi';
} else if (name == 'manager') {
  text = 'Hello';
} else if (name == '') {
  text = 'No login';
} else {
  text = '';
}*/

var name = ('admin') ? 'Hi':
    (name == 'manager') ? 'Hello':
        (name == '') ? 'No login':
            '';