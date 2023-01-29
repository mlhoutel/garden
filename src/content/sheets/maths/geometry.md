---
title: "Geometry"
short: ""
topic: maths geometry
---



<script>
    import GraphPythagore from "$components/maths/geometry/GraphPythagore.svelte";
    import GraphThales from "$components/maths/geometry/GraphThales.svelte";
    import GraphCircle from "$components/maths/geometry/GraphCircle.svelte";
    import GraphElipsis from "$components/maths/geometry/GraphElipsis.svelte";
    import GraphComplex from "$components/maths/geometry/GraphComplex.svelte";
    import GraphRotation from "$components/maths/geometry/GraphRotation.svelte";
    import GraphTranslation from "$components/maths/geometry/GraphTranslation.svelte";
    import GraphHomothety from "$components/maths/geometry/GraphHomothety.svelte";
    import GraphSimilarity from "$components/maths/geometry/GraphSimilarity.svelte";
</script>

## Shapes

### Triangles

##### Pythagorean Theorem (Rectangle Triangle):

> $c^2=a^2+b^2 \Leftrightarrow c=\sqrt{a^2+b^2}$

Example:

<GraphPythagore />

##### Thales Theorem (Homothety)

> $\Large\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}$

Example:

<GraphThales />

### Circles

##### Circle Equation

> $(x-a)^2+(y-b)^2=r^2 \Leftrightarrow \sqrt{(x-a)^2+(y-b)^2}=r$

 *  Diameter: $D = 2 × r$
 *  Circumference: $C = 2 × π × r$
 *  Area: $A = π × r²$ 

Example:

<GraphCircle />

### Ellipses

##### Ellipse Equation

> $(\frac{(x-a)}{Hrad})^2+\frac{(y-b)}{Vrad})^2=1 \Leftrightarrow \sqrt{(\frac{(x-a)}{Hrad})^2+\frac{(y-b)}{Vrad})^2}=1$

| Semi-major Diameter | $Da = 2 \times a$            |
|---------------------|------------------------------|
| Semi-minor Diameter | $Db = 2 \times b $           |
| h                   | $\frac{(a-b)^2}{(a+b)^2}$   |
| Exentricity e       | $\frac{\sqrt{a^2-b^2}}{a}$  |
| Area                | $A=\pi \times a \times b$   |

An exact of the circumference does not exist, here's some approximations (in order of precision):

* Popular approximation (5%) 
> $2 \pi \sqrt{\frac{a^2+b^2}{2}}$
* Ramanujan first approximation (0.005%) 
> $\pi (3 (a+b) - \sqrt{(3a+b)(a+3b)})$
* Ramanujan second approximation (0.0000005%) 
> $\pi (a+b)(1+\frac{3h}{10+\sqrt{4-3h}}$
* Series approximation (0.0000\...%) 
> $\pi (a+b)(1 + \frac{h}{4} + \frac{h^2}{64} + \frac{h^3}{256} + \frac{25h^4}{16384} + ... )$

Example:

<GraphElipsis />

## Complex Numbers

### Definition

##### Euler formula

> $e^{i\pi}=-1 \iff \frac{(i \pi)^0}{0!} + \frac{(i \pi)^1}{1!} + \frac{(i \pi)^2}{2!} + \frac{(i \pi)^3}{3!} + \dots = -1$

##### Trigonometry

| $\cos(x)=\frac{e^{ix}+e^{-ix}}{2}$    | $\sin(x)=\frac{e^{ix}-e^{-ix}}{2i}$   |
|---------------------------------------|---------------------------------------|
| $\cos(x)^2=\frac{\cos(2x)+1}{2}$       | $\sin(x)^2=\frac{1-\cos(2x)}{2}$       |
| $\cos(x)^3=\frac{\cos(3x)+3cos(x)}{4}$ | $\sin(x)^3=\frac{3 \sin(x)- \sin(3x)}{4}$ |

##### Linearizations Example

> $\cos(x)^2 = \left( \frac{e^{ix} + e^{-ix}}{2} \right)^2 \\ = \frac{(e^{ix})^2 + 2e^{ix}e^{-ix} + (e^{-ix})^2}{2^2} = \frac{e^{2ix}+2e^{ix}e^{-ix}+e^{-2ix}}{4} \\ = \frac{e^{2ix} + 2 + e^{-2ix}}{4} = \frac{2(\frac{e^{2ix} + e^{-2ix}}{2}) + 2}{4} \\ = \frac{2\cos(2x)+2}{4} = \frac{\cos(2x)+1}{2}$
>
> $\sin(x)^2 = \left( \frac{e^{ix} - e^{-ix}}{2i}\right)^2 \\ = \frac{(e^{ix})^2 - 2e^{ix}e^{-ix} + (e^{-ix})^2}{2^2 * i^2} = \frac{e^{2ix}-2e^{ix}e^{-ix}+e^{-2ix}}{-4} \\ = \frac{e^{2ix} - 2 + e^{-2ix}}{-4} = \frac{2(\frac{e^{2ix} + e^{-2ix}}{2}) - 2}{-4} \\ = \frac{2 \cos(2x)-2}{-4} = \frac{1- \cos(2x)}{2}$

##### Complex definition

> $\sqrt{i} = -1$ and $\frac{d}{dt} e^t = e^t$ then
> $\frac{d}{dt} e^{it} = i*e^{it}$

| Complex number | Real Part | Imaginary Part |
|----------------|-----------|----------------|
| $z = a + ib$   | $a$       | $ib$           |

Example:

<GraphComplex />

Example:

| number   | $z = \frac{\sqrt{3}}{2} + \frac{1}{2} i$                                                                   |
|----------|------------------------------------------------------------------------------------------------------------|
| modulus  | $\|z\| = \frac{\sqrt{3}}{2}^2 + \frac{1}{2}^2 = 0.75 + 0.25 = 1$                                             |
| argument | $arg(z) = \frac{\pi}{6} (cos(\frac{\pi}{6})=\frac{\sqrt{3}}{2}, sin(\frac{\pi}{6})=\frac{1}{2})$           |
| trigo    | $z = mod*(cos(arg)+i*sin(arg)) = cos(\frac{\pi}{6}) + i*sin(\frac{\pi}{6})$                                |
| polar    | $z = mod*e^{i*arg} = e^{i*\frac{\pi}{6}}$                                                                  |
| conjug   | $\overline{z} = \frac{\sqrt{3}}{2} + -\frac{1}{2} i$                                                       |

### Transformations

##### Rotation
-   center $\Omega(\omega)$
-   angle $\theta$

<GraphRotation />

##### Translation
-   vector $u$

<GraphTranslation />

##### Homothety

-   center $\Omega(\omega)$
-   ratio $k = \frac{kb}{ka}$

<GraphHomothety />

##### Similarity

-   center $\Omega(\omega)$ (single invariant point, resolve
    $s(\omega)=\omega$)
-   angle $\theta = Arg(a)$
-   ratio $k = |a|$

**Rotation** of center $\Omega(\omega)$ and of angle $\theta$ then
**Homothety** of center $\Omega(\omega)$ and of ration $k$

<GraphSimilarity />

Example:

**Similarity of**

$\left[ \begin{array}{l} s: \mathbb{C} \rightarrow \mathbb{C} \\ \quad z \rightarrow (1-i\sqrt{3})z + 2i \end{array} \right]$

**1. Center:**

$s(\omega) = \omega \Leftrightarrow (1-i\sqrt{3})\omega + 2i = \omega \\ 
\qquad \qquad \Leftrightarrow \omega-(i\sqrt{3})\omega + 2i = \omega \\
\qquad \qquad \Leftrightarrow (i\sqrt{3}\omega - 2i = 0 \\
\qquad \qquad \Leftrightarrow \omega = \frac{2i}{i\sqrt{3}} = 2$

**2. Ratio:**

$k=|1-i \sqrt{3}| = \sqrt{1^2 + (\sqrt{3})^2} = \sqrt{1+3} = 2$

**3. Angle:**

$\theta = arg(1-i \sqrt{3}) = arg(2 * (\frac{1}{2} - i \frac{\sqrt{3}}{2})) = arg(2 * cos(-\frac{\pi}{3}) + i sin(-\frac{\pi}{3})) = 2e^{i* (-\frac{\pi}{3})}$

## Vectors

## Matrices

### Definition

##### Matrix

$$
A = \begin{pmatrix}
a_{11} & a_{12} & \dots & a_{1p} \cr
a_{21} & a_{22} & \dots & a_{2p} \cr
\vdots & \vdots & \ddots & \vdots \cr
a_{n1} & a_{n2} & \dots & a_{np} \cr
\end{pmatrix}
\quad \left. \begin{array}{l} dimension \\ order \\ size \end{array}\right \rbrace n \times p
$$

Example:

| Matrix    | Exemple                                                    |
|-----------|------------------------------------------------------------|
| Square    | $\begin{pmatrix} 1 & 2 \cr 3 & 4 \cr \end{pmatrix}$   |
| Line      | $\begin{pmatrix} 1 & 2 & 3 & 4 \cr \end{pmatrix}$ |
| Column    | $\begin{pmatrix} 1 \cr 2 \cr 3 \cr 4 \cr \end{pmatrix}$       |
| Null      | $\begin{pmatrix} 0 & 0 \cr 0 & 0 \cr \end{pmatrix}$   |
| Diagonal  | $\begin{pmatrix} 1 & 0 \cr 0 & 2 \cr \end{pmatrix}$   |
| Unit (Id) | $\begin{pmatrix} 1 & 0 \cr 0 & 1 \cr \end{pmatrix}$   |


$(A+B)^n = \sum\limits_{k=0}^{n} \binom{n}{p} A^{n-k}B^k$ where $\binom{n}{p} = \frac{n!}{k!(n-k)!}$

### Operations

##### Matrix Addition ($A+B$)

* The **two Matrices** must have **the same shape***

* alaways commutative ($A+B=B+A$)

> $\begin{pmatrix} 1 & 2 & 3 \cr 4 & 5 & 6 \cr \end{pmatrix} + \begin{pmatrix} 7 & 8 & 9 \cr 10 & 11 & 12 \cr\end{pmatrix} = \begin{pmatrix} 1+7 & 2+8 & 3+9 \cr 4+10 & 5+11 & 6+12 \cr\end{pmatrix} = \begin{pmatrix} 8 & 10 & 12 \cr 14 & 16 & 18 \cr \end{pmatrix}$

##### Matrix Multiplication ($A \times B$)

* The **first Matrix width** must have the same size as the **second Matrix height**

* usually not commutative ($A \times B \neq B \times A$)

> $\begin{pmatrix} 1 & 2 & 3 \cr 4 & 5 & 6 \cr\end{pmatrix} \times \begin{pmatrix} 7 & 8 \cr 9 & 10 \cr 11 & 12 \cr\end{pmatrix} = \begin{pmatrix} 1 \times 7 + 2 \times 9 + 3\times 11 & 1 \times 8 + 2 \times 10 + 3 \times 12 \cr 4 \times 7 + 5 \times 9 + 6 \times 11 & 4 \times 8 + 5 \times 10 + 6 \times 12 \cr\end{pmatrix} = \begin{pmatrix} 58 & 64 \cr 139 & 154 \cr\end{pmatrix}$

##### Scalar Multiplication ($n \times B$)

* The **first Matrix width** must have the same size as the **second Matrix height**

* alaways commutative ($n \times B=B \times n$)

> $3 \times \begin{pmatrix} 7 & 8 \cr 9 & 10 \cr 11 & 12 \cr\end{pmatrix} = \begin{pmatrix} 3 \times 7 & 3 \times 8 \cr 3 \times 9 & 3 \times 10 \cr 3 \times 11 & 3 \times 12 \cr\end{pmatrix} = \begin{pmatrix} 21 & 24 \cr 27 & 30 \cr 33 & 36 \cr\end{pmatrix}$

##### Matrix Power ($A^n$)

$A^0 = Id(A) = \begin{pmatrix} 1 & 0 & \dots & 0 \cr 0 & 1 & \dots & 0 \cr \vdots & \vdots & \ddots & \vdots \cr 0 & 0 & \dots & 1 \cr\end{pmatrix}$

> $A^n = A \times A \times \dots \times A$

##### Matrix Inverse ($A^{-1}$)

$Mn(\mathbb{R})$ is all the **square matrices** of **order n**

> $\forall A \in Mn(\mathbb{R}), \exists A^{-1} \iff \exists B | A \times B = B \times A = Id(A), B = A^{-1}$

##### Matrix Division ($\frac{A}{B}$)

> $\exists B^{-1} \iff \frac{A}{B} = A \times (1/B) = A \times B^{-1}$

##### Gaussian Elimination

**Transform a system** in another similar one (with the same solutions) as a **Triangular matrix** (easier to resolve).

**We have our initial system**

$\left\lbrace \begin{array}{l} x+2y+2z = 2 \\ x+3y-2z = -1 \\ 3x+5y+8z = 8 \end{array}\right. \begin{array}{l} (L1) \\ (L2) \\ (L3) \end{array}$

**We then use L1 like a pivot and we eliminate x in L2 and L3**

$\left\lbrace \begin{array}{l} x+2y+2z = 2 \\ \qquad y-4z = -3 \\ \qquad -y+2z = 2 \end{array}\right. \begin{array}{l} (L1) \\ (L2 \leftarrow L2 - L1) \\ (L3 \leftarrow L3 - 3L1) \end{array}$

**Finally, we use L2 like a pivot and we eliminate y in L3**

$\left\lbrace \begin{array}{l} x+2y+2z = 2 \\ \qquad y-4z = -3 \\ \qquad \quad -2z = -1 \end{array}\right. \begin{array}{l} (L1) \\ (L2) \\ (L3 \leftarrow L3 + L2) \end{array}$

##### Resolution

$\begin{array}{l} (L3) \\ (L2) \\ (L1) \end{array} \left. \begin{array}{l} -2z = -1 \iff z= \frac{1}{2} \\ y-4z=-3 \iff y-2=-3 \iff y=-1 \\ x+2y+2z=2 \iff x-2+1=2 \iff x=3\end{array}\right.$

##### Sarrus Method

> TODO

##### Cramers rule

> TODO

### Resolve a System

$(S) \quad \left\lbrace \begin{array}{l} ax + by = s \\ cx + dy = t \end{array}\right.$
(We need as many unknowns as lines)

We have

$A = \begin{pmatrix} a & b \cr c & d \cr\end{pmatrix}, B = \begin{pmatrix} s \cr t \cr\end{pmatrix}, X = \begin{pmatrix} x \cr y \cr\end{pmatrix}$

$(S) = A \times X = B, X = A^{-1} \times B \iff \exists A^{-1}$ (1 solution)

Exemple:

$(S) \quad \left\lbrace \begin{array}{l} 3x + 4y = 1 \\ 5x + 7y = 2 \end{array}\right. \quad A = \begin{pmatrix} 3 & 4 \cr 5 & 7 \cr\end{pmatrix}, B = \begin{pmatrix} 1 \cr 2 \cr\end{pmatrix}, X = \begin{pmatrix} x \cr y \cr\end{pmatrix}$

$A^{-1} = \begin{pmatrix} 7 & -4 \cr -5 & 3 \cr\end{pmatrix}$

$X = A^{-1} \times B = \begin{pmatrix} 7 & -4 \cr -5 & 3 \cr\end{pmatrix} \times \begin{pmatrix} 1 \cr 2 \cr\end{pmatrix} = \begin{pmatrix} -1 \cr 1 \cr\end{pmatrix}$

$x=-1, y=1$

## Vector spaces

> TODO

## Tensors

> TODO

## Quaternions

> TODO