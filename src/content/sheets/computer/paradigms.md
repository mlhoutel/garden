---
title: "Data Structures and Programming Paradigms"
short: "Ways of organizing and storing data and approaches to writing and structuring code"
topic: computer-science data-structures paradigms
---

## Modularity and Typing

#### Introduction

Evolution of the Languages towards an increasingly modular and abstract programming

 ```
 Assembly => C => C++ => Java => Js => Ts
 ```

#### Creating a new Type

Creating a new Type (TypeScript) : example of the Car

Two points of view when defining a new type:

-   **Internal:** How to build and manage the elements (how to build a car?)
-   **External:** How to use the instances of that element (how to drive a car?)

``` typescript
   	// Defining an impementation of a type différents Layers:
   class Car {
   	/* Attributes (values, fields, properties) */
   	private number price
   	private string brand
   	private string plate

   		/* Methods (Factories, Constructors, Accessors, Functions) */

   		/* Factories (Builders) */
   	constructor() // Multiple implementations with the overload
   	constructor(price: number, brand: string, plate: string) {
   		this.price = price
   		this.brand = brand
   		this.plate = plate
   	}
   	// Garbage collection (ex: c++ ~destructor)

   		/* Constructors (Setters) */
   	setPrice(price : number) { this.price = price }
   	setBrand(brand : string) { this.brand = brand }
   	setPlate(plate : string) { this.plate = plate }

   		/* Accessors (Getters) */
   	getPrice() : number { return this.price }
   	getBrand() : string { return this.brand }
   	getPlate() : string { return this.plate }

   		/* Functions */
   	computeSomething(): number { return 0 }
   }
```

#### Data Persistence

**Immutability: Keep the initial state, each computation create a new object**

-   **Benefits:** Permit to avoid errors due to the change of the object. For instance, if multiple entities can access the object at the same time, or if you just don\'t want the state of the object to change.
-   **DrawBack:** Can be heavier on memory due to the initialisation of a new element for each change in the object state

``` typescript
   	class ImmutableNumber {
   	constructor(private value: number) { }

   		getValue() : number { return this.value }

   		plusNumber(other: ImmutableNumber) : ImmutableNumber {
   		return new ImmutableNumber(this.getValue() + other.getValue())
   	}

   		minusNumber(other: ImmutableNumber) : ImmutableNumber {
   		return new ImmutableNumber(this.getValue() - other.getValue())
   	}
   } 
```

**Mutability: The state of the object can change, allows to edit it**

-   **Benefits:** Some case just need to have an object evolution.
-   **DrawBack:** Harder to manage the states, and riskier.

``` typescript
   	class MutableNumber {
   	constructor(private value: number) { }

   		getValue() : number { return this.value }
   	setValue(value: number) { this.value = value }

   		plusNumber(other: MutableNumber) {
   		this.setValue(this.getValue() + other.getValue())
   	}

   		minusNumber(other: MutableNumber) {
   		this.setValue(this.getValue() - other.getValue())
   	}
   } 
```

#### Hierarchy: Aggregation and Inheritance

**Aggregation (Has a X)**

Code factorisation with the aggregation of the differents classes
  
Multiples forms:
 -   **Shared Aggregation** (objects are independants)
 -   **Symbiosis** (same life duration)

Example:
``` typescript
   class Driver {
   	/* Driver class implementation */
   }

   class Wheel {
   	/* Wheel class implementation */
   }

   class Frame {
   	/* Frame class implementation */
   }

   /*
   	The Car class is an example of the Aggregation:
   	It HAS a driver, wheels and a frame
   */

   class Car {
   	private driver: Driver
   	private wheels: Array<Wheel>
   	private frame: Frame

   	constructor(driver: Driver) {
   		this.driver = driver
   		this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()]
   		this.frame = new Frame()
   	}

   	/*
   		With this exemples, we could also say thet these components
   		don't have the same relation with the Car class:

   		- The Wheels and the Frame seems pretty linked to the Car
   		  In fact, we can see that they are only created in the Car constructor.
   		  => We could say that the Car is in symbiosis with the Wheels and the Frame
   		  ... but it's not realy true, the wheels could be changed, the car
   		  would still be the same. The interpretation is realy specific to what you need

   		- The Driver seems completely independant from the rest of the pieces. It is 
   		passed by parameter in the constructor, and we can emit the supposition that
   		the driver can be changed, for instance if he sells the car to another Driver
   		=> We could say that the Driver is in a shared aggregation with the Car
   	*/
   }
```

**Inheritance (Is a X)**

Polymorphism : Multiplicity of essences

Data storage:
-   **Covariant** (accept object that are more specialized)
-   **Contravariant** (don\'t accept any more specialized object)

Example:
``` typescript
   	class Vehicle {
   	private driver: Driver
   	private wheels: Array<Wheel>
   	private frame: Frame

   		/* Vehicle implementation */
   }

   	/* A Car IS a Vehicle, it will have the same attributes and methods... */
   class Car extends Vehicle {

   		/* Car class implementation */
   }

   	/* ... but moreover, it can implement new attributes and methods! */
   class Truck extends Vehicle {
   	private trailer: Trailer // The trailer is specific to the truck

   		/* Truck class implementation */
   }

   	/* 
   	We can see that the Polymorphism allows to store multiple childs 
   	of the Car class in the same Array, that's really usefull 
   */
   let MyVehicles: Array<Vehicles> = [new Car(), new Truck()]
```

#### Layered architectures

**Universal architecture:**

-   *Low Layer* (internal): accessors and builders
-   *High Layer* (external): services implemented using the low layer

**Factorisation Cases:**

-   *Simple Inheritance:* descending aproach (factoring the bottom layer)
-   *Simple Inheritance:* ascending aproach (factoring the top layer)
-   *Multiple Inheritance:* independant bottom and top layers
-   *Agregation with Delegation:* composition of the top layer (inject dependances)

#### Other concepts