const articleCheck = async (req, res, next) => {
    console.log(req.body);
    const titleCharLimit = 200;
    const descriptionCharLimit = 200;
    const allowedTopics = ["health", "economy", "tech", "design", "food", "politics", "event", "travel"];
    const limits = {
        "paragraph": 2000,
        "h1": 120,
        "h2": 120,
        "h3": 120,
        "quote": 250,
        "callout": 500,
        "image": 500, 
        "youtube": 200
    }
    let firstObject = req.body

    if (!req.body.article)
        return res.status(400).json({
            error: 'Title cannot be empty'
        });
    if (firstObject.title.length > titleCharLimit)
        return res.status(400).json({
            error: `Title exceeds the ${titleCharLimit} character limit.`
        });
    if (!firstObject.description)
        return res.status(400).json({
            error: 'Description is empty'
        });
    if (firstObject.description.length > descriptionCharLimit)
        return res.status(400).json({
            error: `Description exceeds the ${descriptionCharLimit} character limit.`
        });
    if (!allowedTopics.includes(firstObject.topic))
        return res.status(400).json({
            error: `Topic is not allowed, allowed topics are ${allowedTopics}`
        });
    if (req.body.article[1].length < 1)
        return res.status(400).json({
            error: 'Please specify at least one element'
        });
    for (let i = 0; i < req.body.article[1].length; i++) {
        for (let type in req.body.article[1][i]) {
            if (type == 'type' && !req.body.article[1][i].value) {
                return res.status(400).json({
                    error: `${req.body.article[1][i][type]} is empty.`
                });
            }
            if (limits[req.body.article[1][i][type]] && req.body.article[1][i].value.length > limits[req.body.article[1][i][type]]) {
                return res.status(400).json({error: `${req.body.article[1][i][type]} exceeds the ${limits[req.body.article[1][i][type]]} character limit.`});
            }
        }
    }
    next();
};

module.exports = articleCheck;