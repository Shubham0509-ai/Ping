const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)) // In JavaScript, Promise.resolve(value) takes whatever value you give it and forces it into a successfully resolved Promise.
        .catch((err) => next(err))
    }
}

export { asyncHandler }