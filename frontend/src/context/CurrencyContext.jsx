import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState("USD");
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch conversion rates from API (base USD)
    useEffect(() => {
        const fetchRates = async () => {
            try {
                setLoading(true);
                const res = await axios.get("https://open.er-api.com/v6/latest/USD");

                if (res.data && res.data.rates) {
                    setRates(res.data.rates);
                } else {
                    console.error("Invalid data from currency API:", res.data);
                }
            } catch (err) {
                console.error("Currency API Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    // Convert USD -> selected currency safely
    const convertPrice = (priceInUSD) => {
        if (!priceInUSD) return 0;
        if (!rates || !rates[currency]) return priceInUSD; // fallback if rates not loaded
        const converted = priceInUSD * rates[currency];
        return converted.toFixed(2);
    };

    // Return appropriate currency symbol
    const getSymbol = () => {
        switch (currency) {
            case "USD": return "$";
            case "EUR": return "€";
            case "INR": return "₹";
            case "GBP": return "£";
            case "JPY": return "¥";
            default: return "$";
        }
    };

    const value = {
        currency, setCurrency, rates, convertPrice, getSymbol, loading,
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
