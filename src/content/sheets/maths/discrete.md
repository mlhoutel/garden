---
title: "Discrete"
short: ""
topic: maths discrete
---

## Sets and Domains

| $\mathbb{C}$ | Complexs (Real+Imaginary)   | $(-5i, 5, i, 3+2i, 10i)$ |
|--------------|-----------------------------|--------------------------|
| $\mathbb{R}$ | Reals (All non imaginary)   | $-8.535, 9.76, \pi, e$   |
| $\mathbb{Q}$ | Rationals (Fractions)       | $\frac{3}{7}, 0.65, 7$   |
| $\mathbb{Z}$ | Integers (Whole numbers )   | $-53337, -5, 0, 7, 19$   |
| $\mathbb{N}$ | Naturals (Integer Positive) | $0, 1, 42, 69, 420$      |

> $\mathbb{C} \supset \mathbb{R} \supset \mathbb{Q} \supset \mathbb{Z} \supset \mathbb{N}$

### Notations

| Notation  | Name         | Meaning                |       
|-----------|--------------|------------------------|
| $\exists$ | Exists       | At least one element   |
| $\forall$ | for All      | All elements           |
| $\in$     | In           | Is included in         |
| $\notin$  | Not in       | Is excluded from       |
| $\cup$    | Union        | Elements in A or in B  |
| $\cap$    | Intersection | Elements in A and in B |

### Extensional definition of a set

$A = \{x \in \mathbb{R} / x^2 + 2x - 3 = 0\}$

## Propositional calculus and Logic

### Connectors and expressions

| Notation | Name | Meaning |
|--------------|---------|------------------------------------------------|
| $\lor$       | Or      | $(1 \lor 0) = 1$, $(0 \lor 0) = 0$             |
| $\land$      | And     | $(1 \land 0) = 0$ , $(1 \land 1) = 1$          |
| $\neg$       | Not     | $\neg 1 = 0$ , $\neg 0 = 1$                    |
| $\uparrow$   | Sheffer | $p \uparrow q \Leftrightarrow \neg(p \land q)$ |
| $\downarrow$ | Pierce  | $p \uparrow q \Leftrightarrow \neg(p \lor q)$  |

### Boolean logic

$\mathbb{B} = \{ 0 , 1 \}$

$p \in \mathbb{B}, \left\lbrace \begin{array}{l} p = 0 \Leftrightarrow \neg p = 1 \\\\\\ p = 1 \Leftrightarrow \neg p = 0 \end{array}\right.$

truth table:

| $p$ | $q$ | $p \lor q$ | $p \land q$ | $\neg p$ |
|-----|-----|------------|-------------|----------|
| $0$ | $0$ | $0$        | $0$         | $1$      |
| $0$ | $1$ | $1$        | $0$         | $1$      |
| $1$ | $0$ | $1$        | $0$         | $0$      |
| $1$ | $1$ | $1$        | $1$         | $0$      |

### Reciprocal and Contraposed

Reciprocal:

> $p \Rightarrow q \Leftrightarrow q \Rightarrow p$

Contraposed:

> $p \Rightarrow q \Leftrightarrow \neg q \Rightarrow p$

### Simplification

Conjunctive Form:

> It is a `conjunction of sub-propositions` composed only of $\lor$ and
> $\neg$
>
> **example:**
> $(p \lor \neg q \lor r) \land (\neg q \lor r) \land (p \lor q)$


Disjonctive Form:

> It is a `disjonction of sub-propositions` composed only of $\land$ and
> $\neg$
>
> **example:**
> $(p \land \neg r) \lor (r \land q \land \neg r) \lor (q \land r)$

## Functions and Properties

### Continuous

> TODO

### Mesurable

> TODO

### Injection

> TODO

### Surjection

> TODO

### Bijection

> TODO

## Probability

Conditional probability:

> $\mathit{P}_{B}(A)$: Probability of A knowing B

$\mathit{P}_{B}(A)=\frac{P(A \cap B)}{P(B)} \Leftrightarrow P(A \cap B)$

= $\mathit{P}_{B}(A) \times P(B)$

= $\mathit{P}_{A} (B) \times P(A)$

$Independence \Rightarrow P(A \cap B) = P(A) \times P(B)$

### Discrete Variable

 * $E(X)=\sum_{i=1}^{n}[xi \times P(xi)]$
 * $V(X)=\sum_{i=1}^{n}[xi-E(X)]^2$
 * $\sigma(X)=\sqrt{V(X)}$

##### Bernouilli

Bernouilli Formula

> $P(X=k)=C_k^n \times P(A)^k \times (1-P(A))^{n-k}$


We have two exclusive values, success $A$ (favorable) and failure
$\overline{A}$, with the probabilities $P(A)=p$ and $P(\overline{A})=q$.
The experiment is repeated n times in an identical and independent
manner, with X the number of successes.

According to the statement \[\...\], X therefore follows a binomial
distribution of parameters p = \... and n = \...

 * $E(X)=np$
 * $V(X)=npq$
 * $\sigma(X)=\sqrt{V(X)}$

Exemple, We Roll 3 dice. What is the chance to have 2 times the 1?

> $B(3;\frac{1}{6}), P(X=2)=C_3^2 \times \frac{1}{6}^2 \times \frac{5}{6}^{1}=0.0694$

##### Poisson

Poisson Formula

> $P(k)=P(X=k)=e^{-\lambda} \times \frac{\lambda^k}{k!}$

 * $E(X)=\lambda$
 * $V(X)=\lambda$
 * $\sigma(X)=\sqrt{V(X)}$

Exemple, one more person every 40 seconds. What is the chance to have 4 persons in 2 minutes?

$dt=40s, T=2 \times 60=120s, n=\frac{T}{dt}=\frac{120}{40}=3(expectation)$
$\lambda=p \times n = 1 \times 3, P(X=4)=e^{-3} \times \frac{3^4}{3!}=0.168$

### Continuous Variable

##### Exponential

Exponential Formula

> $P(0 \geq X \geq x)=1-e^{-\lambda x}, P(X\leq x)=e^{-\lambda x}$

 * $E(X)=\frac{1}{\lambda}$
 * $V(X)=\frac{1}{\lambda^2}$
 * $\sigma(X)=\frac{1}{\lambda}$

Exemple, Lambda=6.116x10\^(-4), Probability that T \> 1000?

$P(T>1000)=1-P(T \leqslant 1000)=e^(-\lambda \times 1000)=0.542$

##### Uniform

Uniform Formula

> $f(t)=\frac{1}{b-a}$ if $(t \in [a,b])$, else $0$

 * $E(X)=\frac{a+b}{2}$
 * $V(X)=\frac{(b-a)^2}{12}$
 * $\sigma(X)=\sqrt{V(X)}$

##### Truncated Normal

Normal Formula

> $T=\frac{X-m}{\sigma} N(0,1)$

| 95%  | 98%  | 99%  |
|------|------|------|
| 1.96 | 2.33 | 2.58 |


$f(t)=\frac{1}{\sqrt{2\pi}} \times e^{-\frac{t^2}{2}}$

$\prod(t)=P(T<t)=\int_{-\infty}^{t} (\frac{1}{2\pi} \times e^{-\frac{t^2}{2}})dt$

### Comparison

##### Expectation

$X=320$, observated $\overline{X}=324$, $\sigma(X)=3$ and $N=100$

$Z=\frac{\mu - \overline{\lambda}}{\frac{\sigma(X)}{\sqrt{n}}}=-13.3, |Z|>1.96 (significative)$

Exemple, A=N(1030,5)n1=10 and B=N(995,7)n2=20

$Z=\frac{1030-995}{\sqrt{\frac{5^2}{10}+\frac{7^2}{20}}}=15.7 \geqslant 1.96 (5\%)$

### Approximation

##### Binomial by Normal 

Binomial Formula

> $T=\frac{X-np}{\sqrt{npq}}$

 * $E(Y)=np$
 * $V(X)=npq$
 * $\sigma(Y)=\sqrt{V(X)}$

##### Binomial by Poisson

Poisson Formula

> $\lambda=np$ $(n \geqslant 30, p \leqslant 0.10, np \leqslant 5)$

 * $E(X)=\lambda$
 * $V(X)=\lambda$
 * $\sigma(X)=\sqrt{V(X)}$

##### Poisson by Normal

Normal Formula

> $T=\frac{X-\lambda}{\sqrt{\lambda}}$

 * $E(X)=\lambda$
 * $V(X)=\lambda$
 * $\sigma(X)=\sqrt(\lambda)$

### Distribution

Normal Median

> $\overline{X} \Rightarrow N(\mu, \frac{\sigma}{\sqrt{n}})$ for an
> infinite population, else
> $m=\frac{\sigma}{\sqrt{n}} \times \sqrt{\frac{N-n}{N-1}}$

Exemple, 5 machines, 500g packages with sigma=5g and 20 packages collected per machine. What is the probability of 499g or under?

$(\mu=500, \sigma=5) \Rightarrow N(500, \frac{5}{\sqrt{20 \times 5}})$

$T=\frac{X-n}{\sigma}=\frac{499-500}{0.5}=-2 \Leftrightarrow P(X \leqslant 499)=2.28$

##### Sample Proportion

> $F(p, \sqrt{\frac{pq}{n}})$ for $n \geqslant 30$

Exemple, 1% defective and 5000 pieces collected, certitude $if < 1.2%$ ?

$\sigma=\sqrt{\frac{0.01 \times 0.99}{5000}} = 0.0014 \Rightarrow N(0.01, 0.0014)$

$P(f<1.2)=P(T<\frac{0.012-0.01}{0.0014})=P(T<1.42)=92.22\%$

### Average Estimation

##### Ponctual Estimation

> $X(\mu=?, \sigma=?) \Rightarrow$ sample of size n $(\mu e, \sigma e)$
>
> $m=\mu e, s=\sqrt{\frac{n}{n-1}}\sigma e$

Exemple, 13L/day for 21 days, sigma=2L. What would be an average estimation?

$m=13, s=\sqrt{\frac{21}{20}} \times 2 = 2.049$

##### Confidence Interval

> confidence coefficient = $\alpha$, degree of freedom(khi2) =
> $\chi^2=\frac{(sample-effective)^2}{effective}$

 * if $n \geq 30$ : Central Limit 
   > $\Rightarrow$ Normal Law 
   > $(m, \frac{\sigma}{\sqrt{n}})$
   > 
   > $P(m \in ( a,b))=P(\overline{X} \times \frac{\sigma}{\sqrt{n}}$ 
   > $\overline{X}+t \times \frac{\sigma}{\sqrt{n}})=\alpha$

 * if $n < 30$ : Read Table 
   > $\Rightarrow$ Student Fisher 
   > 
   > $P(m \in (a,b))=P(\overline{X}-t \times \frac{s}{\sqrt{n}}$
   > $\overline{X}+t \times \frac{s}{\sqrt{n}})=\alpha$

### Proportion Estimation

##### Ponctual Estimation

> $\sigma(D)=\sqrt{\frac{\sigma 1}{n1}^2 + \frac{\sigma 2}{n2}^2}$
>
> $N(p,\sqrt{\frac{pq}{n}}) \Rightarrow f=pe \times \sigma p = \sqrt{\frac{n}{n-1}} \sigma e$

 * if $n \geq 30$
   > $\sigma p = \sqrt{\frac{pe(1-pe)}{n}}$
 * if $n < 30$
   > $\sigma p = \sqrt{\frac{pe(1-pe)}{n-1}}$

Exemple, We have a survey with a sample of 160 persons, 40 agree. What is the estimated proportion?

$N(\frac{1}{4}, \sqrt{\frac{\frac{1}{4} \times \frac{3}{4}}{160}})=N(0.25, 0.03423)$

### Confidence Interval

##### Confidence Interval

> $P(p \in (a,b))=P(f-t \sqrt{\frac{f(1-f)}{n}} < p < f+t \sqrt{\frac{f(1-f)}{n}}) = \alpha$
>
> $\sigma(X)=\sqrt{V(\overline{X})}, \sigma(\overline{X})=\frac{\sigma(X)}{\sqrt{N}} \Rightarrow \mu e = [E(\overline{X}) \pm 1.96 \times \sigma(\overline{X})]$

Exemple, We have 64 clients, with an average of 60min, sigma=9.27. What would be an confidence interval at 5% ?

$\sigma(\overline{X})=\frac{9.27}{\sqrt{64}}=1.159 \Rightarrow \mu e = [60-1.96 \times 1.159; 60+1.96 \times 1.159]$