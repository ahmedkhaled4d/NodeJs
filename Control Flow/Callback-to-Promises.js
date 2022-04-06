//Converting callback functions to promises
/**
 * Node also provides a handy utility function called “promisify”, 
 * that you can use to convert any old function expecting a callback that you just have to use into one that returns a promise.
 *  All you need to do is import it in your project:
 */

const promisify = require('util').promisify;
function slowCallbackFunction(done) {
    setTimeout(function () {
        done()
    }, 300)
}
const slowPromise = promisify(slowCallbackFunction);

slowPromise()
    .then(() => {
        console.log('Slow function resolved')
    })
    .catch((error) => {
        console.error('There has been an error:', error)
    })

//It’s actually not that hard to implement a promisify function of our own, to learn more about how it works. 
//We can even handle additional arguments that our wrapped functions might need!

function homebrewPromisify(originalFunction, originalArgs = []) {
    return new Promise((resolve, reject) => {
        originalFunction(...originalArgs, (error, result) => {
            if (error) return reject(error)
            return resolve(result)
        })
    })
}

/**
 * We just wrap the original callback-based function in a promise, and then reject or resolve based on the result of the operation.

Easy as that!

For better support of callback based code – legacy code, ~50% of the npm modules – 
Node also includes a callbackify function, essentially the opposite of promisify,
 which takes an async function that returns a promise,
 and returns a function that expects a callback as its single argument.
 */


const callbackify = require('util').callbackify
const callbackSlow = callbackify(slowFunction)

callbackSlow((error, result) => {
    if (error) return console.log('Callback function received an error')
    return console.log('Callback resolved without errors')
})