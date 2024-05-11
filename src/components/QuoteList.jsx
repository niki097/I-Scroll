import React, { useState, useEffect, useCallback } from 'react';
import getQuotes from '../services/api';
import QuoteItem from './QuoteItem';
import '../styles/QuoteList.css';
import { debounce } from 'lodash';

function QuoteList() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuotesCount, setTotalQuotesCount] = useState(0);

  const fetchMoreQuotes = useCallback(async () => {
    if (isLoading || currentPage >= totalPages || quotes.length >= totalQuotesCount) return; 

    setIsLoading(true);
    try {
      const { data, total } = await getQuotes(currentPage + 1);
      setQuotes(prevQuotes => [...prevQuotes, ...data]);
      setCurrentPage(currentPage + 1);
      setTotalPages(Math.ceil(total / 10));
      setTotalQuotesCount(total); // Update total quotes count
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, isLoading, totalPages, quotes.length, totalQuotesCount]);

  useEffect(() => {
    const fetchInitialQuotes = async () => {
      setIsLoading(true);
      try {
        const { data, total } = await getQuotes(1);
        setQuotes(data);
        setTotalPages(Math.ceil(total / 10));
        setTotalQuotesCount(total); 
      } catch (error) {
        console.error('Error fetching initial quotes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialQuotes(); // Call immediately without condition
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const isCloseToBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isCloseToBottom && !isLoading && currentPage < totalPages) {
        fetchMoreQuotes();
      }
    }, 250);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, currentPage, totalPages, fetchMoreQuotes]);

  return (
    <div className="quote-list">
      {quotes.map(quote => <QuoteItem key={quote.id} quote={quote} />)}
      {isLoading && <p className="loader">Loading more quotes...</p>}
    </div>
  );
}

export default QuoteList;
