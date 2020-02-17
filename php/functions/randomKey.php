<?php
/*
* @param $length (number) -> length of the random alphanumeric token
* @author MrXploder

*/
function randomKey($length) {
    $pool = array_merge(range(0,9), range('a', 'z'),range('A', 'Z'));

    for($i=0; $i < $length; $i++) {
        $key .= $pool[mt_rand(0, count($pool) - 1)];
    }
    return $key;
}
//USAGE:
//echo $token = randomKey(20);
?>