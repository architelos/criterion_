export default Criterion_;
declare class Criterion_ {
    /**
     * Clears all tests.
     */
    clearTests(): Criterion_;
    /**
     * Adds a test to the test suite.
     * @param {string} testName - The name of the test.
     * @param {Function} testFunction - The function to be tested.
     * @param {any} expectedValue - The expected value of the test.
     */
    addTest(testName: string, testFunction: Function, expectedValue: any): Criterion_;
    /**
     * Runs the tests.
     */
    runTests(): Promise<Criterion_>;
    #private;
}
//# sourceMappingURL=index.d.ts.map