///Middleware errorHandler

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if(err.name === 'CastError') {
        return res.status(400).json({ error: 'malformatted id' })
    } 

    if(err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }

    if(err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }

    res.status(500).json({ error: 'internal server error' });
}

module.exports = errorHandler;