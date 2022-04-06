/**
 * There have been native promises in javascript since 2014, 
 * receiving an important boost in performance in Node.js 8.
 *  We will make use of them in our functions to make them non-blocking – without the traditional callbacks. 
 *  The following example will call the modified
 *  version of both our previous functions in such a manner:
 * @returns
 */

function fastFunction() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log('Fast function done')
            resolve()
        }, 2000)
    })
}

function slowFunction() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log('Slow function done')
            resolve()
        }, 2000)
    })
}

function asyncRunner() {
    return Promise.all([slowFunction(), fastFunction()])
    // Please note that Promise.all will fail as soon as any of the promises inside it fails.


}

// run it 
asyncRunner()
    .then(([slowResult, fastResult]) => {
        console.log('All operations resolved successfully')
    })
    .catch((error) => {
        console.error('There has been an error:', error)
    })

// Serial task execution
/**
 * To make sure your tasks run in a specific order – 
 * maybe successive functions need the return value of previous ones,
 *  or depend on the run of previous functions less directly – 
 *  which is basically the same as _.flow for functions that return a Promise.
 *  As long as it’s missing from everyone’s favorite utility library,
 *  you can easily create a chain from an array of your async functions:
 */

function serial(asyncFunctions) {
    return asyncFunctions.reduce(function (functionChain, nextFunction) {
        return functionChain.then(
            (previousResult) => nextFunction(previousResult)
        );
    }, Promise.resolve());
}
// const parameterValidation, dbQuery, serviceCall  all functions 
serial([parameterValidation, dbQuery, serviceCall])
    .then((result) => console.log(`Operation result: ${result}`))
    .catch((error) => console.log(`There has been an error: ${error}`))