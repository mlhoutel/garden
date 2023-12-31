---
title: 'Oneliner'
date: 2023-05-14
topic: python ast one-liner
short: Generalisation of one liner techniques for Python
---

<script context="module">
  import { base } from "$app/paths";
</script>

## Introduction

Have you ever been challenged to write a program in as few lines as possible? This happened to me recently as, during a seminar, a colleague dared me to compress a Python code snippet, involving intricate I/O operations and file reading coupled with data processing.

Python, with its design emphasizing the significance of line breaks and tabs, might seem an unlikely candidate for such exercises. While in languages like C++ or Java, line breaks and tabs are often merely aesthetic, in Python, they serve as integral components of the language's structure.

> Whereas this code will run without a problem
>
> ```python
> for i in range(3):
>    for j in range(3):
>        print(i, j)
> ```
>
> The same snippet without the right indentation will output a Syntax Error
>
> ```python
> for i in range(3): for j in range(3): print(i, j)
>                    ^
> SyntaxError: invalid syntax
> ```

In the midst of the exercice, I found myself pleasantly surprised by the myriad of creative tricks available to overcome the constraints imposed by Python's design.

This sparked an intriguing thought: could these techniques be generalized to encompass the entire Python language? In other words, is it within the realm of possibility to devise a subset of Python that preserves the full range of language functionalities while adhering strictly to the constraint of never breaking lines?

### The rules

#### Program must be displayed on 1 line

The entire Python program, encompassing all its functionalities, is to be condensed into a single line.

To maintain the spirit of the challenge, the use of the `exec` keywork or similar constructs is prohibited as it is simply possible to escape the code lines breaks and indentation with it:

```python
exec("for i in range(3):\n\tfor j in range(3):\n\t\tprint(i, j)")
```

#### Consistent Output for Accepted Cases:

To ensure coherence and regression checks, this challenge was developed with Test-Driven Development (TDD). The outputs of the program, both before and after the one-lining process, must strictly match for acceptance.

The Python version used throughout this challenge is v3.11 with the reference version Cpython. It is imperative that valid Python programs, both in terms of syntax and functionality, will be translated into one-liners that output valid python code.

### Disclamers

One-liners will compromise legibility. The solutions presented below are by no means best practice. Furthermore, these solutions have NOT been thoroughly tested and should NOT be used for mission-critical applications.

## Where to start

So, let's say we have a random Python program. How can we alter it to be into a single line while ensuring it remains a valid program with similar functionality?

To start, we need to analyse the structure of our Python program. Enter the Abstract Syntax Tree (AST), a pivotal tool in comprehending and manipulating the program's syntax.

An AST is a hierarchical tree-like representation of the syntactic structure of a Python program. It breaks down the code into nodes, each representing a distinct element such as statements, expressions, and more.

<blockquote>

Consider this provided code snippet as an example:

```python
def f(x):
    print(x + 5)

f(10)
```

When this code is processed by the lexer, it breaks down the source code into individual tokens, which are the smallest units of meaning.

```js
Tokens:
[NAME=def][NAME=f][OP=(][NAME=x][OP=)][OP=:][NEWLINE][INDENT]
[NAME=print][OP=(][NAME=x][OP=+][NUMBER=5][OP=)][DEDENT]
[NAME=f][OP=(][NAME=10][OP=)][ENDMARKER]
```

Based on these tokens, we can parse the code and interpret the hierarchical structure of the program as an Abstract Syntax Tree.

![AST Graph]({base}/images/articles/oneliner/AST.png)
_graphical representation of the AST generated for the program [fig.1]_

</blockquote>

### Mutating the AST

Now that we have a structure that better represents the properties of our program, we will be able to navigate it and alter it to achieve our objectives. However, it is crucial to note that while making modifications, the program must retain its semantics, encompassing the behavior and functionality observed during execution. Therefore, any changes must involve replacing specific parts with behavioral equivalents, ensuring that the transformation maintains syntactic correctness.

As we delve into the intricacies of condensing Python code into a single line, a tantalizing question arises: Can we evaluate the Abstract Syntax Tree (AST) in advance to simplify it into a single root, essentially reducing it to a single line?

Consider the following code snippet:

```python
a = 1
b = a + 2
print(b)
```

We can totally replace the values to reach this single line

```python
print(1 + 2)
```

This technique is known as [inlining](https://en.wikipedia.org/wiki/Inline_expansion), a process where expressions or statements are replaced with their corresponding values or definitions at compile time. In the realm of traditional programming languages, compilers often perform inlining to optimize code execution. The idea is to eliminate redundant variable assignments and directly substitute expressions, potentially enhancing runtime efficiency.

While inlining is a powerful optimization strategy, its generalization encounters significant challenges in the Python context. Python's dynamic nature, emphasis on sequential execution, and support for mutable objects pose obstacles to comprehensive inlining. Inlining, by its nature, may disrupt this sequence, potentially altering the program's behavior. The non-terminating problem further emphasizes that not all programs will reach an end state, making precomputation impossible in certain scenarios.

#### Maintain sequentiality

An easy way to keep the sequantiality of operations in one line, is to use the ";" kewords:

```python
a = 1; a = a + 1; print(a)
```

However, its utility is somewhat constrained. The use of ";" is not permissible before loops, within lambda bodies, or in situations where maintaining program scopes is crucial.

But, it's not the end yet, as by keeping the same idea, we can use an interesting property of the python arrays:
[evaluations are always done sequentially](https://docs.python.org/3/library/stdtypes.html#lists)

```python
[print("1"), print("2"), print("3")]
```

This trick can generally be employed to simulate the ordered instructions of bodies in the code.

However, a notable limitation arises: not every Python keyword can be contained within a list. For example, the "assign" keyword will trigger a SyntaxError:

```python
    [a = 3]
       ^
SyntaxError: invalid syntax
```

To discern the types of code compatible with this trick, an exploration of the Python AST nodes is necessary. There are two primary categories of these nodes:

- **Statements:**

  Statements are units of code that perform an action or have an effect, but they don't return a value. They are primarily employed to control the flow of a program and encompass assignments, loops, conditionals, and function definitions. A statement can consist of multiple sub-statements, such as the body of a loop or a function definition.

- **Expressions:**

  An expression is a specific type of statement. It is a piece of code that evaluates to a value. Expressions can be embedded within statements or exist independently. An interesting property of expressions is that they can be used in many places without significant constraints, and specifically in our case, within lists.

So, if we manage to convert each statement of our program into a similar expression, we can translate the entire program while maintaining sequentiality. To initiate this process, the walrus operator (":=") allows us to encapsulate declarations and assignments within a list.

```python
[a := 3]
```

By employing these combined techniques, we can already transform small and simple programs, as such:

```python
[a := 1, b := a + 2, print(b)]
```

#### Based on this premise

Expanding on this premise, numerous statements lend themselves to straightforward conversions. Take if statements, for example, which can be effortlessly transformed into equivalent ternary operators with sub-flows for each part of the program:

```python
if True:
  print("yes")
```

This can be succinctly converted to:

```python
[print("yes")] if True else None
```

Similarly, the realm of function declarations can be entirely approximated by the concise syntax of lambda functions. However, a specific issue arises: the flow management keywords (`return`, `continue`, `break`, and `pass`) are statements; they cannot be used in a Python list or in a lambda body!

This means that explicit handling of flow statements becomes necessary. Let's focus specifically on the `return` statement, which influences the value yielded by the "function call" expression.

> **(i) Information:**
>
> The chosen solution introduces additional code and checks, potentially affecting program performance.

To address this issue, a (quite) straight forward approach involves pre-processing every body:

- **I. Program state handling**

  The initial step is to initialize a `STATE` variable at the beginning of each "root scope" (program and functions base indentation). This state is a tuple structured as follows:

  ```
  [STATE := (None, 1), ...]

  [0]: The return value buffer
  [1]: The target indentation
  ```

  Return statement can then simply alter the `STATE[0]` value with the one to be passed on.

- **II. Explit flow management**

  We can assume that all code in a branch after a flow statement will never be reached, and can be removed safely ([Dead code elimination](https://en.wikipedia.org/wiki/Dead-code_elimination)).

  If a return statement occurs in a conditional branching, we explicitly move all remaining code to an else block.

  While iterating through the code, we will continuously compute the current "indentation" of the different scopes and add checks at each branching to iterate towards the target indentation.

  ```python
  [..., <branching>, [...] if STATE[1] > 1 else None, ...]
  ```

- **III. Value forwarding**

  Finally, to coalesce the return value, we can simply extract the `STATE` value the end of the body expressions list, with the subscript to the last value, as such:

  ```python
  [..., STATE[0]][-1]
  ```

To provide a simple example of the results, consider the following code snippet:

```python
def greet(name):
    if name == '':
        return 'Bye!'
    return 'Hello, ' + name
```

The equivalent lambda expression would be:

```python
[
  greet := (lambda name: [
    STATE := (None, 1), # I. state init for the scope

    [
      STATE := ('Bye!', 0) # I. state update on return
    ] if name == '' else None,

    [
      STATE := ('Hello, ' + name, 0)
    ] if STATE[1] >= 1 else None, # II. target check after branching

    STATE[0] # III. Explicit state value append
  ][-1])
]
```

#### Unraveling loops

After tinkering with scope handling and flow management for function bodies, we are now stepping into a more challenging terrain: facing loops! As you might already suspect, both `for` and `while` loops are statements and can't be easily integrated into our sequential expressions method using lists.

We can start by exploring list comprehensions as a means to replace for loops.

```python
for i in range(10):
  a = i * 3
  print(a)
```

This simple loop can be transformed into a list comprehension as follows:

```python
[[a := i * 3, print(a)] for i in range(10)]
```

However, it soon becomes apparent that this task is not as straightforward. List comprehensions demand maintaining the cardinality in the mapping between the range and the body actions, introducing the need once again for flow statement tricks, involving performing state checks at each iteration to ensure the desired behavior. Yet, we still need to find a way to implement `while` loops, essentially doubling the workload if we choose this path.

The preferred approach here is to initially approximate `for` loops with `while` loops using an iterator:

```python
# we create an iterator from the loop range
ITERATOR = iter(range(10))

# we avoid out or range exception with a default value
CURSOR = next(ITERATOR, 'END_REACHED')

# we check for termination with the default value
while (CURSOR != 'END_REACHED'):

  ...

  # we go to the next iteration of the loop
  CURSOR = next(ITERATOR, 'END_REACHED')
```

Once this is done, we have a new unified base to treat all kinds of loops. Translating this resulting statement involves some work, but it's all based on a simple premise: using recursive lambdas. It's a naive approach I took to solve the initial challenge in the small I/O program, and it involves identifying the loop variants, ensuring variables are maintained according to the inner and outer scope, and repeating the loop instructions until the stopping condition is met.

First, we need to define an appropriate structure for the recursion to avoid side effects. We can start by using an anonymous lambda to avoid impacting subsequent loops.

**I. How can the anonymous lambda call itself back, if it has not a reference to itself in it's scope ?**

A straight foward approach is to pass the function to itself as a parameter:

```python
(lambda f: f(f))
```

**II. But how to pass a function to itself if it is not named ?**

As observed in the example above, the function will never initiate; it only ensures continuity. To initiate the process, we need a "starter" by passing the same construct as a parameter to guarantee induction:

```python
(lambda f: f(f))(lambda f: f(f))
```

This construct illustrates a technique known as self-application in lambda calculus. Interestingly, this pattern can be generalized and formalized with the [Y combinator](https://en.wikipedia.org/wiki/Fixed-point_combinator#Y_combinator)

> **The Y combinator**
>
> expressed as `Y = λf. (λx. f(x x)) (λf. f(x x))`, is a fixed-point combinator used in [lazy evaluated](https://en.wikipedia.org/wiki/Lazy_evaluation) contexts. Its essence lies in the ability to abstract recursive behavior within a concise and elegant form. In Python, it can be represented as follows:
>
> ```python
> Y = (lambda f:
>       (lambda x: f(x(x)))
>       (lambda x: f(x(x))))
> ```
>
> However, its direct application in Python is constrained due to the language's lack of lazy evaluation: it will expand indefinitely, leading to a stack overflow (or, in the case of tail-call optimization, may never halt).

**III. How can we add other parameters ?**

Now that we have our basis, we need to incorporate additional parameters into the recursive lambda to provide data for termination checks and computations.

```python
# We can manualy define params and fill the params
(lambda f, a, b: f(f, a, b))(lambda f, a, b: f(f, a, b))

# Or even use the spread operator with varargs
(lambda f, *args: f(f, *args))(lambda f, *args: f(f, *args))
```

> **Currying and Z combinator**
>
> A third solution exists using what is called [Currying](https://en.wikipedia.org/wiki/Currying)
>
> ```python
> # Original function with three arguments
> f = (lambda a, b, c: print(a, b, c))
> f(1,2,3)
>
> # The same Curried  function
> f = (lambda a: lambda b: lambda c: print(a, b, c))
> f(1)(2)(3)
> ```
>
> As the recursive call `x(x)` of the Y combinator is a problem becuase of the eagerly evaluation of python, we can apply the currying technique to delay the recursive call until it is explicitly invoked. Heres `(lambda x: f(x(x)))` becomes `(lambda g: f(lambda x: g(g)(x)))`, introducing a level of indirection with the use of the variable `g`.
>
> ```python
> Z = (lambda f:
>       (lambda g: f(lambda x: g(g)(x)))
>       (lambda g: f(lambda x: g(g)(x))))
>
> factorial = Z(lambda f: lambda n: 1 if n == 0 else n * f(n - 1))
>
> print(factorial(5)) # yield 120
> ```
>
> This construct is called the the [Z combinator](https://en.wikipedia.org/wiki/Fixed-point_combinator#Strict_fixed-point_combinator), and is expressed as `Z = λg.(λr.g (λy.r r y)) (λr.g (λy.r r y))` in lambda calculus.

What is left to us is to incorporates the loop closure. Its primary role will be to assess whether the termination condition has been satisfied or not.

- As long as the termination condition has not been met, lambda continues to execute the instructions in the loop. It then recursively calls itself with the updated values, ensuring that the loop continues within the current scope.

- When the termination condition is satisfied, the lambda quickly returns the resulting state and any locally copied variables that may have been modified during the loop to udpate in the outer scope.

Here is an example for a primitive loop, starting with the value `i = 0` and terminating when `i >= 10`, with an increment of `1` each loop while printing the current `i` value.

```python
[
  i := (lambda f, i: f(f, i)) # launcher lambda
  (lambda f, i:
    i # returning inputs vars for update in outer scope
    if i >= 10 # checking for termination
    else [
      i := i + 1,
      print(i),
      f(f, i) # recursive call
    ],
  0)
]
```

To implement flow management for loops, we need to introduce state incrementation signatures corresponding to the various loop control keywords. Setting the increment of the loops to `target + 2` upon entering a standard loop provides a structured approach for handling different loop scenarios:

- `pass` => No need to change the target; continue with the current loop.
- `continue` => Decrease the target by `1` to skip the current loop body and move to the next iteration.
- `break` => Decrease the target by `2` to exit the current loop entirely.
- `return` => Set the target to `0`, indicating a return to the function or program root.

Before executing the body of the current iteration, we need to check that no changes have been made to the program flow in the last iteration body. The flow tree for loop execution can be visualized as follows:

![Loop Graph]({base}/images/articles/oneliner/Loop.png)
_graphical representation of the Flowchart for a loop [fig.2]_

Combination all of the above techniques adds a lot of code to simulate the various scope and flow mechanisms. Here's a minimal example putting the principles into action:

```python
i = 0
while (i < 10):
  i += 1
  if i % 2 == 0:
    continue
  print(i)
```

When we translate it in a one liner, we obtain:

```python
[
  STATE := (None, 1),

  i := 0, # `i = 0` [l.1]

  [
    STATE := (None, 3),
    TEMP := (lambda f, STATE, i: f(f, STATE, i))(
      (lambda f, STATE, i: [
        [
          [
            [
              [
                STATE := (None, 3),
                f(f, STATE, i),
              ][-1]
              if STATE[1] < 3
              else [
                STATE := (None, 3),
                [
                  i := i + 1, # `i += 1` [l.3]

                  [
                    STATE := (None, 2) # `continue` [l.5]
                  ] if i % 2 == 0 # `if i % 2 == 0` [l.4]
                  else None,

                  [
                    print(i) # `print(i)` [l.6]
                  ] if STATE[1] >= 3
                  else None,

                  f(f, STATE, i),
                ][-1],
              ][-1]
            ][-1]
            if i < 10 # `while (i < 10):` [l.2]
            else [
              STATE := (None, 1),
              (STATE, i)
            ][-1]
          ][-1]
          if STATE[1] >= 2
          else (STATE, i)
        ][-1]
      ][-1]
    ), STATE, i),
    STATE := TEMP[0],
    i := TEMP[1]
  ],
]
```

This approach has a notable drawback in its heavy reliance on recursion, especially when using the standard Python implementation (CPython), which lacks any [built-in tail recursion optimizations](https://neopythonic.blogspot.com/2009/04/tail-recursion-elimination.html).

Unfortunately, our implementation can't introduce such optimizations because we lack access to standard non-enumerated loops (simply said, the only "expression" kind of loops are list comprehensions, which have predetermined fixed length) that would allow us to delay the evaluation of each recursion iteration.

> **Beyond restrictions**
>
> We need to be aware that there are checks in place to limit the number of recursive calls a function can make. This limitation is in effect to prevent the stack from consuming excessive memory due to the accumulation of unresolved functions (stacking until the last iteration of our loop for instance).
>
> It is also a safeguard against functions caught in infinite recursion, which could potentially lead to program blockage and resource monopolization. In case we need to accommodate larger loops with program traduced by our implementation, it becomes necessary to manually set the recursion limit using the following code:
>
> ```python
> import sys
> sys.setrecursionlimit(<new limit>)
> ```

#### Completing python constructs

Some of the problems I encountered later on were solved easely through the utilization of Python built-in tools. Notably, functions such as `setattr` and `__setitem__` played a pivotal role in circumventing issues related to accessors in the form of statements and prohibited attribute allocations. This was particularly beneficial when dealing with scenarios like the following, where direct attribute assignment faced limitations:

```python
[..., self.a := 1, ...] # setattr(self, a, 1)
             ^
SyntaxError: invalid syntax
```

By leveraging these tools, we can tackle problems like the use of the `global` keyword in lambdas scopes by check before entering in a body scope if there is the use of a global, and if so, import it at the beggining, and update it at the end.

```python
[
  g := globals()["g"],
  ...
  globals().update({'g': g}),
]
```

Furthermore, we can employ a powerful tool as the `type` keywordn which serves as both a function and a metaclass. When using type as a function, as in `type(name, bases, dict)`, it can be employed to dynamically define new classes (with `name` the name of the new class, `bases` for inheritance, and dict for the `attributes`, `methods`, and `properties` of the class).

For instance, we can inline a Person class definition with an empty constructor as such:

```python
type('Person', (object,), { '__init__': (lambda self: []) })
```

### Exceptions and Contexts

We are now confronted with the most challenging aspect of our task yet: the translation of context managers and exception handlers. To address this, we can start bt simplifying the problem with an approximation of the `with` keyword for context handling using `try/finally`, as illustrated below:

```python
with ContextManager() as ctx:
    <code>
```

will be approximated by the following code snippet:

```python
try:
    ctx = ContextManager().__enter__()
    <code>
finally:
    ctx.__exit__(None, None, None)
```

> We refrain from using the intermediary `except` block, to mimic the behavior of context managers, as the program will still come to a halt after executing the cleaning exit phase.

The `raise` keyword can be easily transformed from a statement to an expression by utilizing the [throw method for generators](https://peps.python.org/pep-0342/#new-generator-method-throw-type-value-none-traceback-none):

```python
(_ for _ in ()).throw(Exception("..."))
```

#### Exception handling

The initial approach that crossed my mind was to substitute the default exception handler of the program—the component responsible for displaying the trace—with a custom handler tailored around the desired scope. Subsequently, we would restore the default handler after the execution of the `try` block. This manual handling of the exception hook involves using the `sys.excepthook`.

However, a significant hurdle presented itself: how could we seamlessly return to the remaining portion of the code after dealing with the error? Was it possible to navigate back to the program stack, execute the `finally` block and resume program execution following the error handling process?

```python
import sys

...

tmp = sys.excepthook
sys.excepthook = (lambda t, v, b: [<except block>, <jump to (1)>])

<try block>

(1)

<finally block>

...
```

The recovery from the exception handler function requires a way to jump back to the stack, and the "goto" library in Python (https://github.com/snoack/python-goto) is designed to implement this concept by allowing an absolute jump to a designated flag in the program.

Unfortunately, leveraging this library isn't feasible in this case, as after the `sys.excepthook` is invoked, the program is in an exceptional state, and the stack is effectively unwound as part of the process of handling the uncaught exception (to create the stack trace for instance). Consequently, the remaining frames on the call stack no longer exist and cannot be executed.

We come to the conclusion that we cannot recover from an unhandled exception in Python. However, as we are delving into the `goto` library, we discover that runtime bytecode alteration is feasible in this scripting language, enabling a wide range of possibilities...

#### Bytecode trials

So, can we emulate the `try/except/catch` code with Python bytecode injection? Recall the class definitions as expressions using the `type` keyword from earlier? We can leverage it to create a code object directly, like this:

```python
print(type((lambda: 0).__code__).__doc__)

"""    
code(argcount, posonlyargcount, kwonlyargcount, nlocals, stacksize,
      flags, codestring, constants, names, varnames, filename, name,
      firstlineno, lnotab[, freevars[, cellvars]])

Create a code object.  Not for the faint of heart.
"""
```

Using it, we can easily define our own Python code injection by leveraging the right parameters. Since Python provides a significant amount of metadata, including information during runtime and introspection, I was able to create a function that automates the step of extracting the bytecode from Python functions:

```python
def make_bytecode(f):
    code = {attr: getattr(f.__code__, attr) for attr in dir(f.__code__) if attr.startswith('co_')}
    return f'''{f.__name__} = type(lambda: 0)(type((lambda: 0).__code__)(
        {code['co_argcount']},
        {code['co_posonlyargcount']},
        {code['co_kwonlyargcount']},
        {code['co_nlocals']},
        {code['co_stacksize']},
        {code['co_flags']},
        {code['co_code']},
        {code['co_consts']},
        {code['co_names']},
        {code['co_varnames']},
        '{code['co_filename']}',
        '{code['co_name']}',
        {code['co_firstlineno']},
        {code['co_lnotab']},
        {code['co_freevars']},
        {code['co_cellvars']},
    ), {{ }})'''
```

Trying it with a minimal try except catch function on `3.8.5 (default, Jul 20 2020, 23:11:29) [GCC 9.3.0]`

```python
def tef(t, e, f):
    try:
        t()
    except:
        e()
    finally:
        f()

print(make_bytecode(tef))
```

We obtain the following object

```python
tef = type(lambda: 0)(type((lambda: 0).__code__)(
        3,
        0,
        0,
        3,
        7,
        67,
        b'z"z\\n|\\x00\\x83\\x00\\x01\\x00W\\x00n\\x12\\x01\\x00\\x01\\x00\\x01\\x00|\\x01\\x83\\x00\\x01\\x00Y\\x00n\\x02X\\x00W\\x005\\x00|\\x02\\x83\\x00\\x01\\x00X\\x00d\\x00S\\x00',
        (None,),
        (),
        ('t', 'e', 'f'),
        'untitled.py',
        'tef',
        23,
        b'\\x00\\x01\\x04\\x01\\n\\x01\\x06\\x01\\x10\\x02',
        (),
        (),
    ), { })
```

Using a small code example with the extracted function on the same python compiler, we can check that it works accordingly to the first definition:

```python
tef(lambda: 1/0, lambda: print("Inside except_lambda"), lambda: print("Inside finally_lambda"))

"""
Inside except_lambda
Inside finally_lambda
"""
```

We can even check that the code object are the same between the two `tef` functions using the python class dissasembler (`dis.dis(tef)`):

```
 25           0 SETUP_FINALLY           34 (to 36)
              2 SETUP_FINALLY           10 (to 14)
 26           4 LOAD_FAST                0 (t)
              6 CALL_FUNCTION            0
              8 POP_TOP
             10 POP_BLOCK
             12 JUMP_FORWARD            18 (to 32)
 27     >>   14 POP_TOP
             16 POP_TOP
             18 POP_TOP
 28          20 LOAD_FAST                1 (e)
             22 CALL_FUNCTION            0
             24 POP_TOP
             26 POP_EXCEPT
             28 JUMP_FORWARD             2 (to 32)
             30 END_FINALLY
        >>   32 POP_BLOCK
             34 BEGIN_FINALLY
 30     >>   36 LOAD_FAST                2 (f)
             38 CALL_FUNCTION            0
             40 POP_TOP
             42 END_FINALLY
             44 LOAD_CONST               0 (None)
             46 RETURN_VALUE
```

The problem is that the bytecode generated is wildly inconsistent between python compiler versions. Not a good solution, that not what we want, so we still have to find things

#### Contextlib solution

At this point, I found myself running out of options. My knowledge about the intricacies of the Python language was limited, and I had been exploring global concepts and small tricks thus far, so I was not sure it was even possible. But, as I was wrapping up the initial version of the program, I stumbled upon the work of MIT research students who had delved into a similar concept back in 2016, though with Python 2. This project, dubbed "onelinerizer," is available for exploration at https://github.com/csvoss/onelinerizer.

As is often the case, when you conceive an idea, you are not the first. Discovering that others have ventured into similar territories can be both disconcerting and reassuring. That implementation adopted a pure functional programming approach, which proved to be the better choice in the end, as this approach presented fewer edge cases to handle and a more consistent behavior compared to the hybrid imperative style translation I opted for. I highly recommend watching the [associated talk "Chelsea Voss - Oneliner-izer: An Exercise in Constrained Coding - PyCon 2016"](https://www.youtube.com/watch?v=DsUxuz_Rt8g) for further insights.

This is watching that talk that I learned about the `contextlib.nested` trick to block the handled exceptiions (todo explain more here). Saldy, this function used at first to combine multiple ContextHandler in one `with` is deprecated in Python 3, as the `with` keyword now support chained handlers. But, it can be easely replaced with the `contextlib.ExitStack`, as such`:

```python
with contextlib.nested(a, b, c):
    ...

with contextlib.ExitStack() as stack:
    stack.enter_context(arg)
    ...
```

Using the example given by Chelsea, we can use the same trick in python 3 syntax:

```python
import contextlib

def tef(t, e, f):
    class Body:
        def __enter__(self): pass
        def __exit__(self, et, ev, tb):
            t()
    class Handler:
        def __enter__(self): pass
        def __exit__(self, et, ev, tb):
            if et is not None:
                e(ev)
                return True
            return False
    class Closure:
        def __enter__(self): pass
        def __exit__(self, et, ev, tb):
          f()

    ctx = contextlib.ExitStack()
    ctx.enter_context(Closure())
    ctx.enter_context(Handler())
    ctx.enter_context(Body())
    ctx.__enter__()
    ctx.__exit__(None, None, None)
```

We now have our general-purpose exception handler in operation! We can now encapsulate it into a concise one-liner form for seamless integration into the translation process, and utilize it to emulate the `with` keyword as previously outlined.

### Current state

Throughout this article, we've explored fun applications stemming from theoretical lambda programming concepts and intriguing Python peculiarities. We even ventured into basic Python bytecode exploration.
This project was truly enjoyable, and I never anticipated delving so deeply into it. It also provided me with the opportunity to uncover aspects of the language that had eluded me in prior projects.

While I'm not a professional Python coder (yet), there might be mistakes or aspects I overlooked. Feel free to reach out through the project repository's issues section with any concerns or questions. I don't have plans for active development on this as it was conceived as a small proof of concept. While incomplete, I'm particularly interested in learning if someone can devise a general working solution for the `yield` keyword.

### Web demo

<a href="https://mlhoutel.github.io/compy/" target="_blank">
  <img alt="Compy website screenshot" src="{base}/images/articles/oneliner/Compy.png" />
  <em>screenshot of the compy website at https://mlhoutel.github.io/compy/ [fig.3]</em>
</a>

The current implementation in Rust is built upon the parser ([v0.1.2](https://crates.io/crates/rustpython-parser/0.1.2)) sourced from the [ruspython](https://github.com/RustPython/RustPython) Python compiler. This decision was influenced by the clear code structures and secure handling offered by the Rust programming language. The source code is publicly accessible, although it might not be the most explicit at this stage. Additionally, it's worth noting that the project is still in an unstable state.

> **Last disclamer**
>
> Once again, it's crucial to note that the code has not undergone thorough testing. It was developed to address a specific challenge presented to me, and its scope is not intended to handle more complex problems or edge cases. The implementation focuses on providing a basic solution that was deemed sufficient for the given challenge. However, for those interested in conducting tests with a more refined version, a potentially more polished implementation can be explored [here](https://github.com/hhc97/flatliner-src/tree/master).
