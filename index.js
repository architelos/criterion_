"use strict";

import { hrtime } from "node:process";
import { mathExact } from "math-exact";

const currentTime = hrtime.bigint;

class Criterion_ {
    #test;
    #tests;
    #testNames;
    #expectedValues;
    #results;

    #log;
    #info;
    #warn;
    #error;
    #table;

    #testName;
    #testOutput;
    #testResult;
    #startTime;
    #endTime;
    #testTime;

    constructor() {
        this.#tests = [];
        this.#testNames = [];
        this.#expectedValues = [];
        this.#results = [];

        this.#init();
    }

    #init() {
        this.#log = console.log;
        this.#info = console.info;
        this.#warn = console.warn;
        this.#error = console.error;
        this.#table = console.table;

        Object.assign(console, {
            log: (_) => { },
            info: (_) => { },
            warn: (_) => { },
            error: (_) => { },
            table: (_) => { },
        });
    }

    #finish() {
        Object.assign(console, {
            log: this.#log,
            info: this.#info,
            warn: this.#warn,
            error: this.#error,
            table: this.#table,
        });
    }

    #printResults() {
        console.log(this.#results.join(""));
    }

    #addTest(testName, testFunction, expectedValue) {
        this.#tests.push(testFunction);
        this.#testNames.push(testName);
        this.#expectedValues.push(expectedValue);

        return this;
    }

    async #runTests() {
        for (let testIndex = 0; testIndex < this.#tests.length; testIndex++) {
            try {
                this.#testName = this.#testNames[testIndex];
                this.#test = this.#tests[testIndex];

                this.#startTime = Number(currentTime());
                this.#testOutput = await this.#test();
                this.#endTime = Number(currentTime());
                this.#testTime = mathExact("Divide", this.#endTime - this.#startTime, 1e6).toFixed(3);

                if (this.#testOutput === this.#expectedValues[testIndex]) {
                    this.#testResult = "\u001b[32;1mok\u001b[0m";
                } else {
                    this.#testResult = "\u001b[31;1mfail\u001b[0m";
                }
            } catch (err) {
                this.#testOutput = err;
                this.#testResult = "\u001b[31;1merror\u001b[0m";
            }

            this.#results.push(`${this.#testName} ~ ${this.#testResult} (took ${this.#testTime} ms): expected ${this.#expectedValues[testIndex]} (${typeof this.#expectedValues[testIndex]}), got ${this.#testOutput} (${typeof this.#testOutput})\n`);
        }

        this.#finish();
        this.#printResults();
        this.clearTests();

        return this;
    }

    /**
     * Clears all tests.
     */
    clearTests() {
        this.#tests = [];
        this.#testNames = [];
        this.#expectedValues = [];
        this.#results = [];

        return this;
    }

    /**
     * Adds a test to the test suite.
     * @param {string} testName - The name of the test.
     * @param {Function} testFunction - The function to be tested.
     * @param {any} expectedValue - The expected value of the test.
     */
    addTest(testName, testFunction, expectedValue) {
        return this.#addTest(testName, testFunction, expectedValue);
    }

    /**
     * Runs the tests.
     */
    runTests() {
        return this.#runTests();
    }
}

export default Criterion_;