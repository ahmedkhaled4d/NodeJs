/**
 * Let’s take an example and write a route handler for our web app, 
 * where the request can be resolved after 3 steps: validateParams, dbQuery and serviceCall.

If you’d like to write them without any helper, you’d most probably end up with something like this. Not so nice, right?
 */

// validateParams, dbQuery, serviceCall are higher-order functions
// DONT
function handler(done) {
    validateParams((err) => {
        if (err) return done(err)
        dbQuery((err, dbResults) => {
            if (err) return done(err)
            serviceCall((err, serviceResults) => {
                done(err, { dbResults, serviceResults })
            })
        })
    })
}

//Instead of the callback-hell, we can use promises to refactor our code, as we have already learned:

// validateParams, dbQuery, serviceCall are higher-order functions
function handler() {
    return validateParams()
        .then(dbQuery)
        .then(serviceCall)
        .then((result) => {
            console.log(result)
            return result
        })
        .catch(console.log.bind(console))
}

// Let’s take it a step further! Rewrite it to use the async and await keywords:

// validateParams, dbQuery, serviceCall are thunks
async function handler() {
    try {
        await validateParams()
        const dbResults = await dbQuery()
        const serviceResults = await serviceCall()
        return { dbResults, serviceResults }
    } catch (error) {
        console.log(error)
    }
}

/**
 * It feels like a “synchronous” code but still doing async operations one after each other.

Essentially, a new callback is injected into the functions, and this is how async knows when a function is finished.
 */