function setQuoteInElement(text, author) {
  const quoteText = document.getElementById("quote");
  const quoteAuthor = document.getElementById("author");
  quoteText.textContent = text;
  quoteAuthor.textContent = author || "unknown";
}

async function getQuote() {
  try {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
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
  } catch (err) {
    getQuote();
    console.log("whoops!", err);
  }
}

getQuote();
