import Criterion_ from "./index.js";
const criterion = new Criterion_();

criterion.addTest("pass", () => {
    const res = 1 + 1;

    return res;
}, 2).addTest("fail", () => {
    const res = 1 + 2;

    return res;
}, 4).addTest("error", () => {
    throw new Error("Hi, I'm Delta!");
}, undefined).addTest("async", () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello world!");
        }, 1000);
    });
}, "Hello world!").runTests();