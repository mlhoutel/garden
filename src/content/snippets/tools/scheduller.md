---
title: "Scheduler"
short: Simple scheduler policies demo
topic: scheduler visualisation
---

## Scheduler demo

```js
const Status = Object.freeze({
    Waiting: -1,
    Running: 0,
    Terminated: 1
});

class Task {
    constructor(duration, priority = 1) {
        this._duration = duration
        this._priority = priority
        this._status = Status.Waiting
        this.trace = ""
    }

    Start() {
        const waiting = this._status === Status.Waiting
        if (waiting) this._status = Status.Running
    }

    Stop() {
        const running = this._status === Status.Running
        if (running) this._status = Status.Waiting
    }

    Step() {
        const running = this._status === Status.Running
        this.trace += running ? "█" : " "
        if (running) this._duration--
        if (this._duration < 1) this._status = Status.Terminated
    }

    Terminated() {
        return this._status === Status.Terminated
    }
}

const Policy = Object.freeze({
    FIFO: "FIFO",    // First In First Out
    LIFO: "LIFO",    // Last In First Out
    SJF: "SJF",     // Shortest Job First
    RR: "RR",      // Round Robin
});

// Preemptive scheduler
class Scheduler {
    constructor(tasks, policy, threads = 1) {
        tasks.forEach((t, i) => t.id = i);

        this._policy = policy
        this._threads = threads
        this._queue = [...tasks]
        this._pool = []
        this._complete = []
    }

    Schedule() {
        // Extract finished tasks
        for (let i in this._pool) {
            if (this._pool[i].Terminated()) {
                const task = this._pool.splice(i, 1)
                this._complete.push(...task)
            }
        }

        switch (this._policy) {
            case Policy.FIFO: {
                // Insert tasks from the start
                while (this._queue.length > 0 && this._pool.length < this._threads) {
                    const task = this._queue.shift()
                    task.Start()
                    this._pool.push(task)
                }
            } break;
            case Policy.LIFO: {
                // Insert tasks from the end
                while (this._queue.length > 0 && this._pool.length < this._threads) {
                    const task = this._queue.pop()
                    task.Start()
                    this._pool.push(task)
                }
            } break;
            case Policy.SJF: {
                // Insert tasks from shortest
                while (this._queue.length > 0 && this._pool.length < this._threads) {
                    const task = this._queue.sort((a, b) => a._duration - b._duration).shift()
                    task.Start()
                    this._pool.push(task)
                }
            } break;
            case Policy.RR: {
                // Stop running tasks and move them at the end
                for (let i in this._pool) {
                    const task = this._pool.shift()
                    task.Stop()
                    this._queue.push(task)
                }

                // Insert tasks from the start
                while (this._queue.length > 0 && this._pool.length < this._threads) {
                    const task = this._queue.shift()
                    task.Start()
                    this._pool.push(task)
                }
            } break;
            default: throw "Policy not supported"
        }
    }

    Trace() {

        while (this._queue.length > 0 || this._pool.length > 0) {
            this.Schedule()

            const every = [...this._queue, ...this._pool, ...this._complete]
            every.forEach(t => {
                t.Step()
            });
        }

        console.log(`\n________________ ${this._policy} [${this._threads} threads] ________________\n`)

        this._complete
            .sort((a, b) => a.id - b.id)
            .map((t) => {
                console.log(`task ${t.id}: ${t.trace}`)
            })
    }
}

const FIFO = new Scheduler([new Task(10), new Task(5), new Task(10), new Task(7)], Policy.FIFO)
const LIFO = new Scheduler([new Task(10), new Task(5), new Task(10), new Task(7)], Policy.LIFO)
const SJF = new Scheduler([new Task(10), new Task(5), new Task(10), new Task(7)], Policy.SJF)
const RR = new Scheduler([new Task(10), new Task(5), new Task(10), new Task(7)], Policy.RR)

FIFO.Trace()
LIFO.Trace()
SJF.Trace()
RR.Trace()

/*
________________ FIFO [1 threads] ________________

task 0: ██████████                       
task 1:           █████                  
task 2:                ██████████        
task 3:                          ███████ 

________________ LIFO [1 threads] ________________

task 0:                       ██████████ 
task 1:                  █████           
task 2:        ██████████                
task 3: ███████                          

________________ SJF [1 threads] ________________

task 0:             ██████████           
task 1: █████                            
task 2:                       ██████████ 
task 3:      ███████                     

________________ RR [1 threads] ________________

task 0: █   █   █   █   █   █  █  █ █ █  
task 1:  █   █   █   █   █               
task 2:   █   █   █   █   █  █  █  █ █ █ 
task 3:    █   █   █   █   █  █  █       
*/
```