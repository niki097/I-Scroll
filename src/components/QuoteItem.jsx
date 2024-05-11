import React from 'react';

function QuoteItem({ quote }) {
  return (
    <div className="quote-item"> 
      <p className="quote-text">{quote.quote}</p>
      <p className="quote-author">- {quote.author}</p>
    </div>
  );
}

export default QuoteItem;
