import React from "react";
import "./app.css"
import {Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const App = () => {
    return (
        <div className="app-container">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
};

export default App;