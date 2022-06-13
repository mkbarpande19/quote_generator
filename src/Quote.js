import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import './App.css';

const Quote = () => {
    const [bgColor, setBgColor] = useState("#d3d3d3");
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        getQuote();
    }, []);

    const getQuote = async () => {
        await fetch("https://quotable.io/random").then((res) => res.json())
            .then((data) => {
                setQuote(data.content);
                setAuthor(data.author);
            }).catch((error) => console.log(error));
    }

    function generateRandomColor() {
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal;
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);
        return `#${randColor.toUpperCase()}`
    }

    const getQuotesData = () => {
        getQuote();
        let color = generateRandomColor();
        setBgColor(color);
        document.body.style.backgroundColor = color;
    }

    return (
        <Row xl={6} lg={6} md={6} sm={6} className='quoteWrapper'>
            <div>
                <div className='quote'>
                    "{quote}"
                </div>
                <div className='author'>
                    <span>{author}</span>
                </div>
            </div>
            <div
                className='nextQuoteButton' style={{ backgroundColor: bgColor }}
                onClick={() => { getQuotesData() }}
            >New Quote</div>
        </Row>
    )
}

export default Quote