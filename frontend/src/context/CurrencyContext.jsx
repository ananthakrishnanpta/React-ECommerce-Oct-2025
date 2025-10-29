import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Creating a new context
const CurrencyContext = createContext();

// Hook to utilize the Currency Context from components.
export const useCurrency = () => useContext(CurrencyContext);

// Designing the Provider for the currency context.
// This will wrap the App in main.jsx, thus providing the context of 
// currency to all the children from the top most component, 
// making it accessible to all components if required.
export const CurrencyProvider = ({ children }) => {

    // Creating new states for managing conversions across the website.
    const [currency, setCurrency] = useState("USD");
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch conversion rates from API (base USD)
    useEffect(() => {
        const fetchRates = async () => {
            // Keeping the main logic inside try-catch 
            // block predicting chances of API failure.

            try {
                // Setting initial state of loading :  true, until data is retrieved ✔
                setLoading(true);

                // `await`ing response after sending `get` request to API using `axios`.
                const res = await axios.get("https://open.er-api.com/v6/latest/USD");

                // If data is retrieved and the `rates` dictionary is present
                if (res.data && res.data.rates) {
                    // setting the state of `rates` 💸
                    setRates(res.data.rates);
                } else {
                    // Throw error to console if data is invalid.
                    console.error("Invalid data from currency API:", res.data);
                }
            } catch (err) {

                // Catching general errors and printing out.
                console.error("Currency API Error:", err);
            } finally {

                // Finally set loading state to false since data is already loaded.
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    // Convert USD -> selected currency safely
    const convertPrice = (priceInUSD) => {
        if (!priceInUSD) return 0; // If price is not given, return 0
        if (!rates || !rates[currency]) return priceInUSD; // fallback if rates not loaded
        const converted = priceInUSD * rates[currency];
        return converted.toFixed(2); // Returning the converted price rounded of to
                                    // 2 decimal places.
    };

    // Return appropriate currency symbol
    const getSymbol = () => {

        // accessing state `currency`
        switch (currency) {
            case "USD": return "$";
            case "EUR": return "€";
            case "INR": return "₹";
            case "GBP": return "£";
            case "JPY": return "¥";
            default: return "$";
        }
    };

    // Setting up props to pass to Context provider
    const value = {
        currency, setCurrency, rates, convertPrice, getSymbol, loading,
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
