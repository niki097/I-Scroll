async function getQuotes(page) {
    const response = await fetch(`https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=10`)
    return response.json();
}

export default getQuotes;