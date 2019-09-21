function wrap(fn) {
    return function(req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req)
            .then(returnVal => {
                if(returnVal.status==200){
                    res.json(returnVal.content);
                }else{
                    res.status(returnVal.status).json(returnVal.content);
                }
            }
            ).catch(next);
    };
}
module.exports = wrap;