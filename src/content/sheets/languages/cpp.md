---
title: "C++"
short: "General-purpose programming language, developed as an extension of the C programming language."
topic: programming-language compiled
---

## Introduction

### History of the C language

C is an `imperative procedural language`. It was designed to be
`compiled` to provide `low-level access to memory`.

It was developed between 1972 and 1973 by `Dennis Ritchie`, initially to
construct utilities running on the `Unix` operating system. During the
1980s, C gradually gained popularity and became one of the most widely
used programming languages.

Today, the C is not as popular as it used to be, but it's still a very
good language to begin with and understand the rules of programmation.
Moreover, it is realy `fast and light` and permit to manage the low
level datas with the `pointers`, one thing that most of the high level
languages can't.

### Evolution toward C++

C++ was developped in 1979 by `Bjarne Stroustrup`. It was firstly named
`C with Classes` by it's creator, then renamed in 1983. It is an
evolution toward an more `Object Oriented programming language`, that it
implements with Classes, Inheritance and many others functionnalities.

The current version of it is `C++17` (2017). A new one is standardized
by the ISO every 3 years since 2011, the next versions is `C++20`,
already released but not every functionnality are supported yet on the
compilators.

## Programming in C

### First Program : helloworld.c

```cpp
#include <stdio.h>

int main() {
   printf("Hello, World!");
   return 0;
}
```

This file is a simple `.txt file`, I just edited the **extension**. Like
you can see, it is `.c` for the base language, and `.cpp` for C++, but
these are not the only ones that exist, there are many others, like `.h`
and `.hpp` for the **header files**, `.cuh` and `.cu` for CUDA\...

To have your program working, you'll have to **build the file**: To put
it simply, we get the `source code` (helloworld.c) and put it into a
`compiler` with the right settings and dependancies, and this compiler
output and `executable` (helloworld.exe) that you can run from your
machine. We will use the `command line` to build and run this file,
it's realy easy.

### Compiling

But first of all, you will need a compiler. That's a piece of software
that transform your file from `readable instructions` (in english) into
a language that your machine can understand: `binaries` (0 and 1),
that's what an `.exe` file is (if you open it with and text editor, you
will see some stranges charaters).

Many C compiler exists, ([See all](https://en.wikipedia.org/wiki/List_of_compilers#C_compilers))

I recommand these ones:

* GCC (from GNU, Open sources): [Download GCC from GNU](https://gcc.gnu.org/)
* MSVC (from Microsoft Visual Studio): [Download Visual Studio](https://visualstudio.microsoft.com/fr/downloads/)

For this example, I'm using [GCC 10.0.1](ftp://ftp.lip6.fr/pub/gcc/releases/gcc-10.1.0/), the base `command line` from **Windows 10** and the text editor [Sublime Text 3](https://www.sublimetext.com/3)

> I recommand to install GCC from MinGW instead of compiling it yourself.
> 
> you will find explanations on how to proceed [here](http://mingw.org/wiki/Getting_Started)


#### Setup GCC and compiling a basic program

1. If you are on windows, you can press `Windows` + `Q` then type `cmd` to open the command line.

   1. Open it and try to type `gcc` and press `Enter`

   2. If you have a message that look like that: `'gcc' is not recognised as an internal command`, make sure that you downloaded GCC and go to the next step: We will add GCC to the environment variables so the system can find it.

   3. The system need to know where the compiler is to understand that you call it from the command line.

      1. Press `Windows` + `Q` then type `env` and open `Edit the system environment variables`

      2. Click on the `Environment variables` button

      3. Select `Path` and click on `Edit`

      4. Finally, click on `New` and paste the link to GCC (ex: `C:\MinGW\bin`)

   4. Open a new command and type `gcc`, now it should work and diplay that message: `gcc: fatal error: no input files. compilation terminated.`

2.  Now we will compile the file `helloworld.c`

    1.  Open a command in the same directory as the C file

    2.  type `gcc helloworld.c -o helloworld.exe`

    3.  then `./helloworld.exe`

    4.  The program will output this string: `Hello, World!`

3.  Great, you have now a `working basis` to begin your learning of the `C` and `C++` languages.

#### Compilator settings and flags

> You can call the compiler by `gcc` for the **C compiler** and `g++`
> for the **C++ compiler**. I explain here the flags that I use and find
> the **most important**, but you can find all the gcc flags
> [HERE](https://gcc.gnu.org/onlinedocs/gcc/Option-Summary.html). If you
> want, you can even create a `.bat` file to automate the command and
> launch the compilations.

Command Syntax:

```gcc [options] [source files] [object files] -o output file```

If you don't put `-o output file`, the output file will be `a.exe` per default.

Add libraries:   

```-I %libpath%\include -L %libpath%\lib -l libfileA -l libfileB```

 * `-I` define the include folder, generally where the headers files `.h` are
 *  `-L` define the folder where to look at the source files
 *  `-l` define the name/link for the library to include `.dll` if the lib is dynamically compiled, and `.lib` if it is staticaly compiled

Warnings and Errors:   

The **Errors Flags** begin with a `-W` (for Warning):

-   `-w` disable all warnings messages, the program will keep compiling
-   `-Wall` enables all the warnings for minors errors
-   `-Wextra` enables some extra warning flags that -Wall don't
    activate
-   `-Werror` make all warnings into errors.
-   `-Wfatal-errors` abort compilation on the first error

Debug Flags:

```-Wall -Wextra -Wold-style-cast -Woverloaded-virtual -Wfloat-equal -Wwrite-strings -Wpointer-arith -Wcast-qual -Wcast-align -Wconversion -Wshadow -Weffc++ -Wredundant-decls -Wdouble-promotion -Winit-self -Wswitch-default -Wswitch-enum -Wundef -Wlogical-op -Winline ```

> For the Debug config, you can put all the flags to detect and display every error or unrecommanded feature of your code.

Release Flags

```-Werror -Wfatal-errors```

> For the Release config, the process abort at the first error

The **Debug Flags** begin with a `-g` (for Generate debug informations)

 * `-g0` no debug informations
 * `-g1` minimal debug informations
 * `-g` default debug informations
 * `-g3` maximal debug informations


> I recommand to stay with the default value `-g` and switch to higher level `-g3` if you have no clue on the error.

Optimisation:  

The **Optimisation Flags** begin with a `-O` (for Optimisation)

<table>
<thead>
<tr>
  <th>Option</th>
  <th>Optimization Level</th>
  <th>Execution Time</th>
  <th>Code Size</th>
  <th>Memory Usage</th>
  <th>Compilation Time</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-O0</code></td>
<td>compilation time</td>
<td>+</td>
<td>+</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>-O1 /-O</code></td>
<td>code size/exe time</td>
<td>-</td>
<td>-</td>
<td>+</td>
<td>+</td>
</tr>
<tr>
<td><code>-O2</code></td>
<td>code size/exe time</td>
<td>- -</td>
<td>=</td>
<td>+</td>
<td>+ +</td>
</tr>
<tr>
<td><code>-O3</code></td>
<td>code size/exe time</td>
<td>- - -</td>
<td>=</td>
<td>+</td>
<td>+ + +</td>
</tr>
<tr>
<td><code>-Os</code></td>
<td>code size</td>
<td>=</td>
<td>-</td>
<td>=</td>
<td>++</td>
</tr>
<tr>
<td><code>-Ofast</code></td>
<td>imprecise fast math</td>
<td>- - -</td>
<td>=</td>
<td>+</td>
<td>+ + +</td>
</tr>
</tbody>
</table>

*informations from https://www.rapidtables.com/code/linux/gcc/gcc-o.html#optimization*

### Import and use Libraries

#### Includes and Dependancies

To **include a library** we use the `#include` command.

-   `#include <library.h>` when the headers folder is already linked in
    the compiler
-   `#include "folder/library.h"` to search in a specific folder with
    the path

List of the most common and used system libraries:   

-   **C** Input/Output library: `#include <stdio.h>`
-   **C** General library: `#include <stdlib.h>`
-   **C** Numerics library : `#include <cmath.h>`
-   **C** Strings library: `#include <string.h>`
-   **C** Time library: `#include <time.h>`
-   **C++** Time library: `#include <chrono>`
-   **C++** Treads library: `#include <thread>`

*informations from https://en.cppreference.com/w/cpp/header*

#### Namespace and utilities

When you use multiple libraries, it could be some `conflicts` under
names between some libraries, that's why we use `namespaces`.

> "Namespaces provide a method for preventing name conflicts in large projects."
[source](https://en.cppreference.com/w/cpp/language/namespace)

We can use namespaces like that: `sf::...`

``` cpp
sf::RectangleShape rectangle(sf::Vector2f(120,50));
```

Or like that: `namespace sf { ... }`

``` cpp
namespace sf {
  RectangleShape rectangle(Vector2f(120,50));
}
```

Or even like that: `using namespace sf;`

``` cpp
using namespace sf;

RectangleShape rectangle(Vector2f(120,50));
```

> **I recommand the first two methods**, the problem with the last one is
> that you `loose all the purpose` of the namespace, and it's `confusing`
> when you want to use both functions from libraries that would be in
> conflict, you will have to mix the third and the first method\...


## Cheat Sheets

### Usefull Informations

> Unofficial Documentation: https://en.cppreference.com/w/

**About Cpp**
* **Type of Language:** Procedural, Object-Oriented
* **Born in:** 1985
* **Caracteristics:** Statically typed, low level, fast
* **Popularity:** 5.8% (6th) [src](http://pypl.github.io/PYPL.html)
* **Usefull for:** softwares, games, embedded...

### Basic C Cheat Sheet

#### Types and Variables

`/s/` stand for **Signed** and `/u/` for **Unsigned**

**NUMERICS**

<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Syntax</th>
<th>Size</th>
<th>Min</th>
<th>Max</th>
<th>Letter</th>
<th>Aliases</th>
</tr>
</thead>
<tbody>
<tr>
<td>Short <code>/s/</code> Integer</td>
<td><code>short int</code></td>
<td><code>16+ bits</code></td>
<td>-32 768 <span
class="math inline">(−2<sup>15</sup>)</span></td>
<td>32 767 <span
class="math inline">(2<sup>15</sup>−1)</span></td>
<td><code>%h</code></td>
<td><code>short</code>
<code>signed short</code></td>
</tr>
<tr>
<td>Short <code>/u/</code> Integer</td>
<td><code>unsigned short int</code></td>
<td><code>16+ bits</code></td>
<td>0 <span
class="math inline">(0)</span></td>
<td>65 535 <span
class="math inline">(2<sup>16</sup>−1)</span></td>
<td><code>%h</code></td>
<td><code>unsigned</code>
<code>short</code></td>
</tr>
<tr>
<td>Integer <code>/s/</code></td>
<td><code>int</code></td>
<td><code>16+ bits</code></td>
<td>-32 768 <span
class="math inline">(−2<sup>15</sup>)</span></td>
<td>32 767 <span
class="math inline">(2<sup>15</sup>−1)</span></td>
<td><code>%i</code></td>
<td><code>signed</code>
<code>signed int</code></td>
</tr>
<tr>
<td>Integer <code>/u/</code></td>
<td><code>unsigned int</code></td>
<td><code>16+ bits</code></td>
<td>0 <span
class="math inline">(0)</span></td>
<td>65 535 <span
class="math inline">(2<sup>16</sup>−1)</span></td>
<td><code>%i</code></td>
<td><code>unsigned</code>
<code>unsigned int</code></td>
</tr>
<tr>
<td>Long <code>/s/</code> Integer</td>
<td><code>long int</code></td>
<td><code>32+ bits</code></td>
<td>-2 147 483 648 <span
class="math inline">(−2<sup>31</sup>)</span></td>
<td>2 147 483 647 <span
class="math inline">(2<sup>31</sup>−1)</span></td>
<td><code>%l</code></td>
<td><code>signed long int</code></td>
</tr>
<tr>
<td>Long <code>/u/</code> Integer</td>
<td><code>unsigned long int</code></td>
<td><code>32+ bits</code></td>
<td>0 <span
class="math inline">(0)</span></td>
<td>4 294 967 295 <span
class="math inline">(2<sup>32</sup>−1)</span></td>
<td><code>%l</code></td>
<td><code>unsigned long</code></td>
</tr>
<tr>
<td>Long Long <code>/s/</code> Integer</td>
<td><code>long long int</code></td>
<td><code>64+ bits</code></td>
<td>-9.223e-15 <span
class="math inline">(−2<sup>63</sup>)</span></td>
<td>9.223e+15 <span
class="math inline">(2<sup>63</sup>−1)</span></td>
<td><code>%ll</code></td>
<td><code>signed long long</code></td>
</tr>
<tr>
<td>Long Long <code>/u/</code> Integer</td>
<td><code>unsigned long long int</code></td>
<td><code>64+ bits</code></td>
<td>0 <span
class="math inline">(0)</span></td>
<td>18.446e+15 <span
class="math inline">(2<sup>64</sup>−1)</span></td>
<td><code>%ll</code></td>
<td><code>unsigned long long</code></td>
</tr>
</tbody>
</table>

> Integers are not rounded they are truncated toward 0. I recommand to not use short appart if you know what you do.

**CHARS**

<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Syntax</th>
<th>Size</th>
<th>Min</th>
<th>Max</th>
<th>Letter</th>
<th>Aliases</th>
</tr>
</thead>
<tbody>
<tr>
<td>Char <code>/s/</code></td>
<td><code>char</code></td>
<td><code>8+ bits</code></td>
<td>-128 <span
class="math inline">(−2<sup>7</sup>)</span></td>
<td>127 <span
class="math inline">(2<sup>7</sup>−1)</span></td>
<td><code>%hh</code></td>
<td><code>signed char</code></td>
</tr>
<tr>
<td>Char <code>/u/</code></td>
<td><code>unsigned char</code></td>
<td><code>8+ bits</code></td>
<td>0 <span
class="math inline">(0)</span></td>
<td>255 <span
class="math inline">(2<sup>8</sup>−1)</span></td>
<td><code>%hh</code></td>
<td></td>
</tr>
<tr>
<td>char8_t <code>/u/</code></td>
<td><code>unsigned char</code></td>
<td><code>8+ bits</code></td>
<td>0 <span
class="math inline">(0)</span></td>
<td>255 <span
class="math inline">(2<sup>8</sup>−1)</span></td>
<td><code>%hh</code></td>
<td></td>
</tr>
<tr>
<td>char16_t <code>/u/</code></td>
<td><code>unsigned char</code></td>
<td><code>8+ bits</code></td>
<td>0 <span
class="math inline">(0)</span></td>
<td>255 <span
class="math inline">(2<sup>8</sup>−1)</span></td>
<td><code>%hh</code></td>
<td></td>
</tr>
<tr>
<td>char32_t <code>/u/</code></td>
<td><code>unsigned char</code></td>
<td><code>8+ bits</code></td>
<td>0 <span
class="math inline">(0)</span></td>
<td>255 <span
class="math inline">(2<sup>8</sup>−1)</span></td>
<td><code>%hh</code></td>
<td></td>
</tr>
<tr>
<td>wchar_t <code>/u/</code></td>
<td><code>unsigned char</code></td>
<td><code>8+ bits</code></td>
<td>0 <span
class="math inline">(0)</span></td>
<td>255 <span
class="math inline">(2<sup>8</sup>−1)</span></td>
<td><code>%hh</code></td>
<td></td>
</tr>
</tbody>
</table>

> Chars are just integers linked to an characted by the ascii table.

*informations from https://fr.cppreference.com/w/cpp/language/ascii*

#### Input Output

```cpp
#include <stdio.h>

int main() {

	// We define the age variable as an Integer
	int age; 

	// We use printf to output a line of text from a string
	printf("Enter an integer for your age: "); 
	
	// Scanf convert the input variable and put it in age by reference. 
	// It will not stop until scanf detect a non null "string" input.
	scanf("%i", &age); 

	// Then we use printf to output the string with the variable.
	printf("You are %i years old.\nGreat!", age);

	// fflush clean the output buffer, it discards any buffered data that has been fetched from 
	// the underlying output file, but has not been consumed by the application. Thanks to that
	// we are sure to have a clean output the next time we call the function printf.
	fflush(stdin);
}
```

**output**
``` 
Enter an integer for your age: 19
You are 19 years old.
Great!
```

Note:

> If you input `a` you will have an output of `4194432`. That's because
> scanf don't convert the string to an int. When the value is not in
> the right format, it will get the `memory location`.

> For the boundaries, an input of `2147483647` will output `2147483647`,
> but if you try to enter a value of `2147483648` you will have an
> output of `-2147483648`. Thats because the signed value is greater
> than $2^{31}-1$. The default int boundaries are `32bits` on my
> `x64 processor`

#### Variables, Tests and Loops

**VARIABLES DECLARATIONS**

```cpp
int main() {

	// Variable declaration and Operators
	int value = 10;

	value += 5; // 10+5 = 15
	value -= 3; // 15-3 = 12
	value *= 2; // 12*2 = 24
	value /= 4; // 24/4 = 6

	value++; // 6+1 = 7
	++value; // 7+1 = 8

	value--; // 8-1 = 7
	--value; // 7-1 = 6

	// Binary Operators
	int binA = 60, binB = 6;

	binA & binB // 60 AND 6 = 4
	// 0011 1100 (60)
	// 0000 0110 (6)
	// ---------------
	// 0000 0100 (4)
	
	binA | binB // 60 OR 6 = 62
	// 0011 1100 (60)
	// 0000 0110 (6)
	// ---------------
	// 0011 1110 (62)

	binA ^ binB // 60 XOR 6 = 58
	// 0011 1100 (60)
	// 0000 0110 (6)
	// ---------------
	// 0011 1010 (58)

	~binB // NOT 6 = -9
	// (0) 0110 (6)
	// ---------------
	// (1) 1001 (-9)
	
	binB <<= 3 // 6 LEFT-SHIFTED BY 3 = 48
	// 0000 0110 (6)
	// ---------------
	// 0011 0000 (48)

	binA = binA >> 2 // 60 RIGHT-SHIFTED BY 2 = 15
	// 0011 1100 (60)
	// ---------------
	// 0000 1111 (15)

	// Tests
	bool A = true; // A=true=1
	bool B = !A; // B=false=0

	if (A) { /* (IS) TRUE */ }
	if (!A) { /* (IS NOT) FALSE */ }

	if (A && B) { /* (AND) FALSE */ }
	if (A || B) { /* (OR) TRUE */ }
	if(!A != !B) { /* (XOR) TRUE */ }

	if (A==1) { /* (EQUAL) TRUE */ }
	if (A!=42) { /* (NOT EQUAL) TRUE */ }
	if (A>1) { /* (GREATER THAN) FALSE */ }
	if (A>=1) { /* (GREATER OR EQUAL) TRUE*/ }
	if (A<-2) { /* (LOWER THAN) FALSE*/ }
	if (A<=B) { /* (LOWER OR EQUAL) FALSE*/ }
}
```

**TESTS**

```c
if (Condition) {
}

if(Condition)
  // Action

if (Condition) {
  // Action
} else if (Condition) {
  // Action
} else {
  // Action
}

```

**SWITCH**

``` c
switch (variable) {
  case 1: // Action
    break;
  case 2: // Action
    break;
  default: // Action
}
```

**LOOPS**

``` c

do {
  // Action
} while(conditions);

while (conditions) {
  // Action
}

for (int i = 0; i < 10; ++i) {
  // Action
}
```

> You can use `break;` to stop a loop.

#### Random numbers

**RANDOM**

```cpp
#include <stdio.h> 	// NULL
#include <stdlib.h> //srand, rand
#include <time.h> 	// time
#include <math.h>	// pow

int main() {
	
	rand()%100; // Rand integer from 0 to 99

	srand(time(NULL)); // Initialise the random generator with the internal clock as a Seed
	rand()%100; // This one is a more random number (current seed is quite special)

	srand (1); // The random generator's seed is 1 by default, go put it back to see
	rand()%100; // This next random number should be the SAME as the first one
	
	// To have a delimited random number, you can use this:
	int max=112, min=75;
	srand(time(NULL));
	for (int i = 0; i < 10; ++i)
	{
		int random = (rand()%(max-min))+min;
		printf("%i ", random); // (ex: 110 109 98 89 105 94 79 103 93 101)
	}
}
```

> You can see the max of `rand()` with `RAND_MAX` (32767+). For betters randoms number you can use the BOOST library.

#### Arrays

**ARRAYS**

```cpp
#include <stdio.h>

int main()
{
	// We declare an array of 4 integers 
	int numbers[5] = {0, 1, 2, 4, 8};

	// You can also declare arrays like that, the array will have the size of the elements you define
	float prime[] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97};

	// You can compute it's size like that
	int length = sizeof(numbers) / sizeof(int); // 20 / 4 = 5

	for (int i=0; i<length; i++) {
		printf("%i ", numbers[i]); //display: 0 1 2 4 8
	}

	numbers[0] = 20; // {20, 1, 2, 4, 8}
	numbers[3] = 10; // {20, 1, 2, 10, 8}

	// But the solution with the size calculation is not optimal: it can be a problem when 
	// the array is not declared on the stack but on the heat, a better solution can be :
	
	const int better_length = 10;
	int better_numbers[better_length];

	for(int i=0; i<better_length; i++) {
		better_numbers[i] = i;
	}
}
```

**STRINGS**

```cpp
#include <string.h>

int main()
{
	// The end delimiter of an array of chars is always '\0'
	char word[6] = {'G','u','i','t','a','r'};

	// We can define multi-dimentionnal arrays like that
	char week[7][9];

	strcpy(week[0], "Lundi");
	strcpy(week[1], "Mardi");
	strcpy(week[2], "Mercredi");
	strcpy(week[3], "Jeudi");
	strcpy(week[4], "Vendredi");
	strcpy(week[5], "Samedi");
	strcpy(week[6], "Dimanche");

	strlen(word); // The length of word is 6

	switch(strcmp(week[0], week[1])) {

		case 0: // week[0] == week[1]
			break;
		case -1: // week[0] < week[1]
			break;
		case 1: // week[0] > week[1]
			break;
	}
}
	
```

```cpp
string entry;
int test;

do { 
  // Test if the input string is composed of chars bewteen 'a' and 'z'
  test = scanf("%1\[a-z\]c\", &entry);
} while(test != 1)
```

#### Functions

``` cpp
int random(int min, int max) {
  return (rand()%(max-min)) + min;
}

void nothing() {
   // return nothing \...
}
```

#### Structures

**RECTANGLE STRUCTURE EXAMPLE**

```cpp
#include <stdio.h>

// We define the Rectangle structure. 
typedef struct {

	// It contains some of it's Properties like the position (x,y) and the size (height, width)
	float x;
	float y;
	float height;
	float width;

	// Structs are not like Classes, wecannot create functions inside it.

} Rectangle;

// We create a function to calculate the area of a Rectangle
float calcArea(Rectangle r) {
	return r.height * r.width;
}

// We alse create a function to print the properties of the struct, it call the precedent function to compute the area
void toString(Rectangle r) {
	printf("structure: Rectangle\n + Position: [%f, %f]\n + Size: [%f, %f]\n + Area: %f", r.x, r.y, r.height, r.width, calcArea(r));
}

int main() {

	// We instantiate a Rectangle with the name rectangle
	Rectangle rectangle;

	// We edit it's properties
	rectangle.x = 10.0;
	rectangle.y = 2.0;
	rectangle.height = 3.7;
	rectangle.width = 6.5;

	// We call the toString function to see if the properties have changed
	toString(rectangle);
}
```

output
```
   	structure: Rectangle
    + Position: [10.000000, 2.000000]
    + Size: [3.700000, 6.500000]
    + Area: 24.050000
```

> Take care of the order in which you declare your structure fields, because it will impact the size of the final data.

**For instance...**

```cpp
#include <iostream>
#include <stdint.h>

// small first
struct large
{
  uint8_t a;
  uint32_t b;
  uint8_t c;
  uint32_t d;
};

// small last
struct small
{
  uint32_t a;
  uint32_t b;
  uint8_t c;
  uint8_t d;
};

// packed
struct __attribute__((packed)) packed
{
  uint32_t a;
  uint32_t b;
  uint8_t c;
  uint8_t d;
};

int main()
{
  uint8_t sz_plain = 2 * sizeof(uint8_t) + 2 * sizeof(uint32_t);
  uint8_t sz_large = sizeof(large);
  uint8_t sz_small = sizeof(small);
  uint8_t sz_packed = sizeof(packed);

  std::cout << "plain  = " << std::to_string(sz_plain) << std::endl;
  std::cout << "large  = " << std::to_string(sz_large) << std::endl;
  std::cout << "small  = " << std::to_string(sz_small) << std::endl;
  std::cout << "packed = " << std::to_string(sz_packed) << std::endl;

  // plain  = 10
  // large  = 16
  // small  = 12
  // packed = 10
}
```

#### Pointers and Smart pointers

```cpp
TODO
```

### Basic C++ Cheat Sheet

#### Macros

```cpp
#include <stdio.h>

#define NUMARGS(...)  (sizeof((int[]) { __VA_ARGS__ }) / sizeof(int))
#define FIRSTARG(...) FIRSTARG0(__VA_ARGS__, ERROR_NO_ARGS_PROVIDED) // assign an undeclared var to trigger the compiler error 
#define FIRSTARG0(X, ...) X // to avoid "warning: ISO C99 requires rest arguments to be used [enabled by default]" when 1 arg

int main() {
        printf("%i\n", NUMARGS(1,2,3,4));
        printf("%i\n", FIRSTARG(1));
        printf("%i\n", FIRSTARG(1,2,3));
        return 1;
}
```

#### Arrays

```cpp
#include <iostream>
#include <array>
#include <vector>

// We are not editing the values so we add const
void Function(const std::vector<int>& values) {
	// ...
}

int main()
{
	// We initialize an array of 5 int 
	std::array<int, 5> numbers;

	for (int i=0; i<numbers.size();i++) {
		numbers[i] = i*10;
		std::cout << numbers[i] << std::endl;
	}


	// TODO Vector type and arrays of pointers, redifine 
	std::vector<int> values;
	values.push_back(10);

	for (int i=0; i<values.size(); i++) {
		std::cout << values[i] << std::endl;
	}

	// Or even
	
	for (const values& v : int) {
		std::cout << v << std::endl;
	}

	values.erase(values.begin() + 2); // Erase the third element, we cannot just pas the position
	values.clear(); // Set back size to 0

	// We pass the values by Reference to avoid copies
	Function(values);

	// HEAT vs STACK, copying and optimisation...
	return 0;
}
```

#### Inheritances

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <chrono>

template <typename T>
using spt = std::shared_ptr<T>;

template <typename T>
using vec = std::vector<T>;

class Base
{
protected:
    int value = 0;

public:
    virtual void print() = 0;
    virtual void perf() = 0;
};

class A : public Base
{
public:
    void print()
    {
        std::cout << " - A derived class" << std::endl;
    }
    void perf() { value++; }
    void specA() { value++; }
};

class B : public Base
{
public:
    void print()
    {
        std::cout << " - B derived class" << std::endl;
    }
    void perf() { value++; }
    void specB() { value++; }
};

class Container
{
private:
    int value = 0;

public:
    Container(spt<Base> d) : data(d) {}
    void perf() { value++; }
    spt<Base> data;
};

void call()
{
    vec<spt<Base>> vec = {};

    A tmp_A = A();
    B tmp_B = B();

    std::cout << "\nTest objects print" << std::endl;
    tmp_A.print();
    tmp_B.print();

    std::cout << "\nTest pointer print" << std::endl;
    Base *ptr_A = &tmp_A;
    Base *ptr_B = &tmp_B;
    ptr_A->print();
    ptr_B->print();

    std::cout << "\nTest smart print" << std::endl;
    spt<Base> sptr_A = std::make_shared<A>(tmp_A);
    spt<Base> sptr_B = std::make_shared<B>(tmp_B);

    sptr_A->print();
    sptr_B->print();

    std::cout << "\nTest array print" << std::endl;
    vec.push_back(sptr_A);
    vec.push_back(sptr_B);

    for (auto ptr : vec)
    {
        ptr->print();

        if (A *uncast_A = dynamic_cast<A *>(ptr.get()))
        {
            uncast_A->specA();
        }
        else if (B *uncast_B = dynamic_cast<B *>(ptr.get()))
        {
            uncast_B->specB();
        }
    }
}

void perf()
{
    vec<A> vec_A = {};
    vec<B> vec_B = {};

    vec<spt<A>> vec_sptA = {};
    vec<spt<B>> vec_sptB = {};

    vec<spt<Base>> vec_sptBase = {};
    vec<Container> vec_container = {};

    for (int i = 0; i < 10000000; ++i)
    {
        vec_A.push_back(A());
        vec_B.push_back(B());

        vec_sptA.push_back(std::make_shared<A>(A()));
        vec_sptB.push_back(std::make_shared<B>(B()));

        vec_sptBase.push_back(std::make_shared<A>(A()));
        vec_sptBase.push_back(std::make_shared<B>(B()));

        vec_container.push_back(Container(std::make_shared<A>(A())));
        vec_container.push_back(Container(std::make_shared<B>(B())));
    }

    std::cout << "\nVectors size" << std::endl;
    std::cout << " - vecA + vec_B: \t\t" << std::to_string(vec_A.size() + vec_B.size()) << std::endl;
    std::cout << " - vec_sptA + vec_sptB:  \t" << std::to_string(vec_sptA.size() + vec_sptB.size()) << std::endl;
    std::cout << " - vec_sptBase:  \t\t" << std::to_string(vec_sptBase.size()) << std::endl;
    std::cout << " - vec_container:  \t\t" << std::to_string(vec_container.size()) << std::endl;

    std::cout << "\nDurations" << std::endl;
    {
        auto start = std::chrono::steady_clock::now();

        for (auto obj : vec_A)
        {
            obj.perf();
        }

        for (auto obj : vec_B)
        {
            obj.perf();
        }

        auto end = std::chrono::steady_clock::now();

        auto diff = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
        std::cout << " - simple array of obj iteration: \t\t" << std::to_string(diff) << "μs" << std::endl;
    }

    {
        auto start = std::chrono::steady_clock::now();

        for (auto ptr : vec_sptA)
        {
            ptr->perf();
        }

        for (auto ptr : vec_sptB)
        {
            ptr->perf();
        }

        auto end = std::chrono::steady_clock::now();

        auto diff = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
        std::cout << " - array of shared_ptr iteration: \t\t" << std::to_string(diff) << "μs" << std::endl;
    }

    {
        auto start = std::chrono::steady_clock::now();

        for (auto ptr : vec_sptBase)
        {
            ptr->perf();
        }

        auto end = std::chrono::steady_clock::now();

        auto diff = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
        std::cout << " - merged array of shared_ptr iteration: \t" << std::to_string(diff) << "μs" << std::endl;
    }

    {
        auto start = std::chrono::steady_clock::now();

        for (auto ptr : vec_sptBase)
        {
            if (A *uncast_A = dynamic_cast<A *>(ptr.get()))
            {
                uncast_A->specA();
            }
            else if (B *uncast_B = dynamic_cast<B *>(ptr.get()))
            {
                uncast_B->specB();
            }
        }

        auto end = std::chrono::steady_clock::now();

        auto diff = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
        std::cout << " - merged array of shared_ptr with casting: \t" << std::to_string(diff) << "μs" << std::endl;
    }

    {
        auto start = std::chrono::steady_clock::now();

        for (auto ptr : vec_container)
        {
            ptr.perf();
        }

        auto end = std::chrono::steady_clock::now();

        auto diff = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
        std::cout << " - array of container with iteration: \t\t" << std::to_string(diff) << "μs" << std::endl;
    }

    {
        auto start = std::chrono::steady_clock::now();

        for (auto ptr : vec_container)
        {
            if (A *uncast_A = dynamic_cast<A *>(ptr.data.get()))
            {
                uncast_A->specA();
            }
            else if (B *uncast_B = dynamic_cast<B *>(ptr.data.get()))
            {
                uncast_B->specB();
            }
        }

        auto end = std::chrono::steady_clock::now();

        auto diff = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
        std::cout << " - array of container with data casting: \t" << std::to_string(diff) << "μs" << std::endl;
    }
}

int main()
{
    // call();
    perf();
}

// https://www.cppstories.com/2014/05/vector-of-objects-vs-vector-of-pointers/
// g++ -o inheritance -Werror -Wfatal-errors -O3 -s -fexpensive-optimizations ./inheritance.cpp

/*
Vectors size
 - vecA + vec_B: 		    20 000 000
 - vec_sptA + vec_sptB:     20 000 000
 - vec_sptBase:  		    20 000 000
 - vec_container:  		    20 000 000

Durations:

Good, but can't use polymorphism (heavy)
 - simple array of obj iteration: 		              1 μs  // pre optimisation
 - array of shared_ptr iteration: 		        543 048 μs

Meh, polymorphism but slow for nothing on base function
 - merged array of shared_ptr iteration:        408 033 μs
 - merged array of shared_ptr with casting: 	659 349 μs

Same, no gain of perf by extracting the base function
 - array of container with iteration: 		    403 188 μs
 - array of container with data casting: 	    638 731 μs
*/
```

#### Threads

```cpp
#include <iostream>
#include <thread>

static bool s_Finished = false;

// Just print a line of text
void DoWork() {

	using namespace std::literals::chrono_literals;

	std::cout << "Function thread id=" << std::this_thread::get_id() << std::endl;

	while(!s_Finished) {
		// \n is performance wise better than endl, unless flushing of stream is required
		std::cout << "Working...\n";

		// Prevent the thread to be CPU Usage 100% (if it print as fast as he can)
		std::this_thread::sleep_for(1s); 
	}
}

int main() {
	std::cout << "Main thread id=" << std::this_thread::get_id() << std::endl;
	// This worker will just print Working as fast as it can until we press Enter
	std::thread worker(DoWork);

	// When whe press Enter, set s_Finished to true and stop the function printing by the otehr thread
	std::cin.get();
	s_Finished = true;
	
	// Tell the main thread to wait that the thread worker finish his task before it run the next ones
	worker.join();

	std::cout << "Finished." << std::endl;
	// Dont do cin.get() while the otehr thread is running
	std::cin.get();

	return 0;
}
```

## SFML

```cpp
#include <SFML/Graphics.hpp>

int main()
{
    // Create the main window
    sf::RenderWindow window(sf::VideoMode(800, 600), "SFML window");

    // Create a Rectangle shape to display
    sf::RectangleShape rectangle(sf::Vectir2f(120,50)); // Width, Height
    rectangle.setFillColor(sf::Color(150, 50, 250));
    rectangle/setOutlineThickness(10);
    rectangle.setOutlineColor(sf::Color::Red);
    rectangle.setorigin(sf::Vector2f(100, 100));
    rectangle.setPosition(100, 200);
    rectangle.setRotation(30);

    // Create a Circle shape to display
    sf::CircleShape circle(50, 0); // Radius, Number of faces (0=circle, 3=triangle ...)

    // Create a Triangle shape to display
    sf::ConvexShape triangle;
    triangle.setPointCount(3);
    triangle.setPoint(0, sf::Vector2f(10,10));
    triangle.setPoint(1, sf::Vector2f(20,20));
    triangle.setPoint(2, sf::Vector2f(30,10));


    // Create a graphical text to display
    sf::Font font;
    if (!font.loadFromFile("arial.ttf"))
        return EXIT_FAILURE;
    sf::Text text("Text", font, 50);

    // Start display loop
    while (window.isOpen())
    {
        // Process events
        sf::Event event;
        while (window.pollEvent(event))
        {
        	// Close window: exit
            if (event.type == sf::Event::KeyPressed)
                system("pause");
            // Close window: exit
            if (event.type == sf::Event::Closed)
                window.close();
        }
        // Clear screen
        window.clear(sf::Color::Black);

        // Draw the rectangle
        window.draw(rectangle);

        // Draw the circle
        window.draw(circle);

		// Draw the triangle
        window.draw(triangle);

        // Draw the string
        window.draw(text);

        // Update the window
        window.display();

		// Set delay to update
        sleep(milliseconds(10));
    }

}
```

## Qt

> TODO

## CUDA

> TODO

## CMake and Builds

> TODO