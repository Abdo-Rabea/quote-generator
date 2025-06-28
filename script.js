// selecting elements
const quoteContainer = document.getElementById("container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const laoder = document.getElementById("loader");

// functions
function loading() {
  laoder.hidden = false;
  quoteContainer.hidden = true;
}
function finishLoading() {
  // *just a guarding
  if (!laoder.hidden) {
    laoder.hidden = true;
    quoteContainer.hidden = false;
  }
}

async function getQuote() {
  try {
    // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    loading();
    const proxyUrl = "";
    const apiUrl = "https://api.forismatic.com/api/1.0/";
    const response = await fetch(proxyUrl + apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        method: "getQuote",
        key: "457653",
        format: "json",
        lang: "en",
      }),
    });
    const quote = await response.json();
    console.log(quote);
    setQuoteInElement(quote.quoteText, quote.quoteAuthor);
    // stop loader and show the quote
    finishLoading();
  } catch (err) {
    getQuote();
    console.log("whoops!", err);
  }
}

function setQuoteInElement(text, author) {
  if (text.length > 120) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");
  quoteText.innerText = text;
  authorText.innerText = author || "unknown";
}

// tweet quote
function tweet(quote, author) {
  const data = quote + " " + author;
  const url = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(url);
}

// Event listner
newQuoteBtn.onclick = getQuote;
twitterBtn.onclick = () => tweet(quoteText.innerText, authorText.innerText);

// onLoad
getQuote();
