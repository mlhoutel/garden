---
title: "PHP"
short: "dynamically-typed, interpreted language for building server-side web applications"
topic: programming-language web
---

## Cheat Sheets

### Usefull Informations

**Official Documentation**: https://www.php.net/docs.php

**About PHP**
* **Type of Language:** Imperative, Object-Oriented
* **Born in:** 1994
* **Caracteristics:** Simple, permissive, html imbedded
* **Popularity:** 5.85% (5th) [src](http://pypl.github.io/PYPL.html)
* **Usefull for:** website backend, database linking

### Types and Variables

> `variable typing` is **automatic** in PHP

<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Expression</th>
<th>Size</th>
<th>Min</th>
<th>Max</th>
</tr>
</thead>
<tbody>
<tr>
<td>Boolean</td>
<td><code>$foo = true;</code></td>
<td><code>1 bits</code></td>
<td>0 (false)</td>
<td>1 (true)</td>
</tr>
<tr>
<td>Int</td>
<td><code>$foo = 1234;</code></td>
<td><code>32+ bits</code></td>
<td>-9.223e+15</td>
<td>9.223e+15</td>
</tr>
<tr>
<td>Float/Double</td>
<td><code>$foo = 1.24;</code></td>
<td><code>32+ bits</code></td>
<td>accuracy 1.11e-16</td>
<td></td>
</tr>
<tr>
<td>String</td>
<td><code>echo 'test';</code></td>
<td><code>32+ bits</code></td>
<td>64-bits =&gt; no restriction, else
1.6e+10</td>
<td></td>
</tr>
</tbody>
</table>

> It's also possible do define the type like `$foo = (double)4;` or like
`settype($foo,'double');`

### Input Output

``` php
   <?php
   	$age = 18;
   	var_dump($age); // => int(18)
   	echo gettype($age); // => integer

   	define("MAX",10);
   	echo('he is '.$age.'years old');
   	$input = trim(fgets(STDIN));
```

### Variables, Tests and Loops

##### TESTS

``` php
<?php

if (Condition) {
  // Action
}

if (Condition) {
  // Action
} elseif (Condition) {
  // Action
} else {
  // Action
}

if(Condition)
  // Action

($a == $b); // test equality of value ($a === $b); // test
equality of value AND type
```

##### SWITCH

``` php
<?php

switch (variable) {
  case 1: // Action
    break;

  case 2: // Action
    break;

  case 3: // Action
    break;
}
```

##### LOOPS

``` php
<?php

for ($i=0; $i < 10; $i++) {
  // Action
}

do {
  // Action
} while($i > 0);

while ($i > 0) {
  // Action
}

foreach ($items as $item) {
  // Action
}
```

> You can use `break;` to stop a loop.

### Random numbers

``` php
<?php

define("MIN", 0); define("MAX", 100);

$alea = rand(MIN,MAX); // alias of mt_rand(MIN,MAX) since PHP
```

### Arrays

``` php
<?php

$table = array("E1"=>0, "E2"=>6, "E3"=>5);
$table['E1'] = 10; $table['E2'] = 13;
$table['V1'] = 5;

echo($table['E1']); // 10

foreach ($table as $key => $value) {

echo ("$key : $value n");

}

for($i=0; $i<count($table);$i++) {

echo $test[$i;]

}

print_r($table);

/* Array ( [E1] => 10 [E2] => 13 [E3] => 5 [V1] => 5 ) */

$test = array(10, 15, 20); count($test); // 3
```

##### ARRAYS OPERATORS

``` php
<?php

$array_a = array(...); $array_b = array(...);

$array_a + $array_b // union of a and b
array_merge($array_a, $[array]()) // addition of items
array_intersect($array_a, $[array]()) // intersection of items

min($array_a); // return the min elem
max($array_a); // return the max elem
array_sum($array_a, $array_b); // return the sum of elem
in_array("test", $array_a); // search and return true/false
array_search("test", $array_a); // search and return the position
array_shift($array_a); // extract the first value 
array_pop($array_a); // extract the last value

echo(round(6.1234, 2)); // 6.12 echo(pow(5,2)); // 25

array_slice($array,2,1);
```

##### STRINGS

``` php
<?php

$string = 'my String'; echo('length: ' . strlen($string));
// length: 9

echo('substr 0 7: ' . substr($string, 0, 7)); // substr 0 7: my Stri

echo('substr 1 1: ' . substr($string, 2, 2)); // substr 1 1: y 
echo('substr 1: ' . substr($string, 1)); // substr 1: y String
echo('strpos S: ' . strpos($string, "S")); // strpos S: 3 (First occurence)
echo('strpos s: ' . strpos($string, "s")); // strpos s: false (Case sensitive)
echo('stripos s: ' . stripos($string, "s")); // stripos s: 3 (Not case sensitive)
echo('strrpos s: ' . strrpos($string, "s")); // strrpos s: 3 (Last occurence)

echo('lower: ' . strtolower($string)); // lower: my string
echo('upper: ' . strtoupper($string)); // upper: MY STRING

echo('first maj: ' . ucfirst($string)); // first maj: My String
echo('first min: ' . lcfirst($string)); // first min: my string

explode(" ", $chain);
```

##### FILTER

``` php
<?php

filter_var($mail, FILTER_VALIDATE_EMAIL); $verification =
preg_match($pattern, $string);
```

filter table:
<table>
<tbody>
<tr>
<td><code>$</code></td>
<td>end chain</td>
</tr>
<tr>
<td><code>^</code></td>
<td>begin chain</td>
</tr>
<tr>
<td><code>.</code></td>
<td>anything</td>
</tr>
<tr>
<td><code>{1}</code></td>
<td>exact number</td>
</tr>
<tr>
<td><code>[a-z]</code></td>
<td>chars</td>
</tr>
<tr>
<td><code>[^b]</code></td>
<td>not char</td>
</tr>
</tbody>
</table>

##### FOLDERS

``` php
<?php

$handle = fopen("file.txt","r"); // pointer or false if
($handle) { 
  while ($buffer = fgets($handle,2) != false) {
  // return the line of a defined size 
  echo $buffer; 
  } 
}

fwrite($handle, $string); fclose($handle);

file($filename [, FILE_IGNORE_NEW_LINES /
FILE_SKIP_EMPTY_LINES]); // return file in array
```

options:
<table>
<tbody>
<tr>
<td><code>r</code></td>
<td>read from beggining</td>
</tr>
<tr>
<td><code>r+</code></td>
<td>writing from end</td>
</tr>
<tr>
<td><code>w</code></td>
<td>reset and write</td>
</tr>
<tr>
<td><code>a</code></td>
<td>reate or write from end</td>
</tr>
</tbody>
</table>

##### DATE

``` php
<?php

date_default_timezone_set('Europe/Paris');
date('Y')/date('m')/date('d');
```

### Functions

``` php
<?php

function say($text[, $language="EN"]) {

echo($text); return $language;

}
```

## Embedded PHP

### Post/Get

##### FORM

``` html
<form id="inscription" method="post" action="form.php">

<p>

<label for="name">Name:</label> <input
type="text" name="name" id="name">

</p> <input type="submit" name="validate"
id="validate" value="Send"/>

</form>
```

> TODO

##### Text Input

-   **value:** displayed value
-   **size:** handler size
-   **name:** datas in php
-   **placeholder:** information
-   **maxlength:** max enabled
-   **title:** hovering info
-   **required:** needed to validate
-   **pattern** ="^[A-Za-z]+$"

##### TextArea Input

``` html
<textarea name="area" id="area" rows="10" cols="10">

default text

</textarea>
```

##### Radio Input

-   **value:** 0 or 1
-   **checked:** default

##### Checkbox Input

-   name="array[]"

##### Select Input

``` html
<select name="departement" id="departement">

<option value="choice A">Choice A</option> <option
value="choice B">Choice B</option> <option
value="choice C">Choice C</option>

</select>
```

##### Special Inputs

-   **url**
-   **email**
-   **number**
-   **tel**
-   **date**
-   **time**
-   **search**
-   **color**
-   **range**

##### FieldSet

``` html
<fieldset>

<legend> Legend </legend>

<!-- FORM -->

</fieldset>
```

##### Datas

``` php
<?php

print_r($_POST); echo ("Hello ".$_POST["name"]);

if (isset($_POST["sports"] as $sport)) {

echo "<ul>"; foreach ($_POST["sports"] as $sport)
{ echo "<li> $sport </li>"; } echo "</ul>";

}
```

##### Include in same page

``` php
<?php

if (!empty($_POST[])) {

include_once("file.php");

}
```

##### Dynamic variable

``` php
<?php

$names = array('name','surname');

foreach ($names as $name) {

$$name = $_POST[$name];

}

echo $name; // instead of echo $_POST["name"]; echo
$surname;
```

## MVC

> TODO

## Laravel

> TODO