const shortid = require("shortid");
const URL = require("../model/urlDB");

// Generate short URL
async function handleGenerateShortURL(req, res) {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || typeof originalUrl !== "string") {
      return res.status(400).json({ error: "Please provide a valid URL." });
    }

    const shortURL = shortid.generate();

    const newEntry = await URL.create({
      shortURL,
      redirectURL: originalUrl,
      searchHistory: [],
      user: req.user._id
    });

    const fullShortUrl = `${req.protocol}://${req.get("host")}/${shortURL}`;

    return res.render("shortURL", {
      shortUrl: fullShortUrl,
    });
  } catch (err) {
    console.error("Error in handleGenerateShortURL:", err);
    return res.status(500).send("Server Error");
  }
}

// Redirect to original URL
async function handleRedirectURL(req, res) {
  try {
    const shortURL = req.params.id;

    const urlEntry = await URL.findOneAndUpdate(
      { shortURL },
      {
        $push: {
          searchHistory: {
            time: new Date(),  // raw date object for formatting later
          },
        },
      },
      { new: true }
    );

    if (!urlEntry) {
      return res.status(404).send("Short URL not found");
    }

    return res.redirect(urlEntry.redirectURL);
  } catch (err) {
    console.error("Error in handleRedirectURL:", err);
    return res.status(500).send("Server Error");
  }
}

//User analytics

async function handleUserAnalytics(req,res){
  try{
    const userId=req.user._id;
    const userURLs=await URL.find({user: userId});//.select('shortURL searchHistory');

    res.render('userAnalytic',{
      urls: userURLs,
    })
  }catch(error){
    console.log(error);
    res.status(500).send("server Error");
  }

}


module.exports = {
  handleGenerateShortURL,
  handleRedirectURL,
  handleUserAnalytics,
};