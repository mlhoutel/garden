---
title: 'Languages Theory and Automatas'
short: 'Study of formal languages and automata as abstract models of computation used to design and analyze algorithms'
topic: automatas
---

## Introduction

```
For introduction, See [Propositional Calculus and Logic](/sheets/maths/discrete/#propositional-calculus-and-logic)
```

### Alphabet

Every finished set

- $Binairy: A = \lbrace 0,1 \rbrace$
- $Latin: A = \lbrace a,b,\dots,z,A,B,\dots,Z \rbrace$
- $ASCII: A = \lbrace a,b,\dots,z,A,B,\dots,Z\,0,1,\dots,9  \rbrace$

<!--
### Language

Set of words in an Alphabet

- $L^n$ = n words of $L$

### Letters

Element of a finished set

- $Binairy: L = 0 \in \lbrace 0,1 \rbrace$
- $\varepsilon$ is the empty element in each set

### Words

Finished sequence of elements in a set

- $Binairy: A = \lbrace 0,1 \rbrace , A^* = \lbrace \varepsilon, 0, 1, 00, 01, 10, 11, 001,\dots \rbrace$
- $Binairy: A = \lbrace 0,1 \rbrace , A^+ = \lbrace 0, 1, 00, 01, 10, 11, 001,\dots  \rbrace$
- $\alpha$ a word on $A$, $\alpha: [1,n] \Rightarrow A$
- $n$ is the lenght of the word, $|\alpha| = n$

## Operations

### Equality of Words

On the same Alphabet: $\alpha \in A, \beta \in A$
=> $\left\lbrace \begin{array}{l} |\alpha| = |\beta| = n \\\\\\ \forall i \in [1,n], \alpha i = \beta i \end{array}\right.$

> ex:
>
> $A = \lbrace a,b,\dots,z,A,B,\dots,Z \rbrace$, $\alpha \in A$, $\beta \in A$
>
> => $\alpha = word, \beta = word \rightarrow \alpha = \beta$

### Concatenation

$\left. \begin{array}{l} A^* \times A^* \rightarrow A^* \\\\\\ (\alpha, \beta) \rightarrow \alpha . \beta \end{array}\right., \alpha . \beta = \sum\limits_{i=0}^{|\alpha|} \alpha i +  \sum\limits_{j=0}^{|\beta|} \beta i$
$|\alpha . \beta| = |\alpha| + |\beta|$

> ex:
>
> $L1 = \lbrace a,aa \rbrace$, $L2 = \lbrace b,bb \rbrace$, $L1.L2 = \lbrace ab, ba, aab, baa, \dots \rbrace$
>
> $L1 = \lbrace a,ab \rbrace$, $L2 = \lbrace abab, aa \rbrace$, $L1^{-1}.L2 = \lbrace ab, a \rbrace$

### Kleen closure

Also named iterative closure, or stared closure. It\'s the smallest language on A that contains L and the empty word, and that is stable by concatenation.

https://en.wikipedia.org/wiki/Kleene_star

### Convexity

> TODO

-->
