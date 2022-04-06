/**
 * We can use another javascript feature since node@7.6 to achieve the same thing: the async and await keywords. They allow you to structure your code in a way that is almost synchronous looking, 
 * saving us the .then chaining as well as callbacks:
 */

const promisify = require('util').promisify;

async function asyncRunner() {
    try {
        const slowResult = await promisify(slowFunction)()
        const fastResult = await promisify(fastFunction)()
        console.log('all done')
        return [
            slowResult,
            fastResult
        ]
    } catch (error) {
        console.error(error)
    }
}

/**
 * 
 * This is the same async runner we’ve created before, 
 * but it does not require us to wrap our code in .then calls to gain access to the results.
 *  For handling errors, we have the option to use try & catch blocks, as presented above,
 *  or use the same .catch calls that we’ve seen previously with promises. This is possible because async-await is an abstraction on top of promises – async functions always return a promise,
 *  even if you don’t explicitly declare them to do so.
 */