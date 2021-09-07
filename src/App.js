import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import Version from "./components/version/Version";

import Homepage from "./pages/Homepage";
import Basepage from "./pages/basepage/Basepage";
import Footer from "./components/footer/Footer";

import { categoryRoutes } from "./appspecs/routes";
import Category from "./components/category/Category";

const App = () => {
    return (
        <React.Fragment>
            <Version />
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    {categoryRoutes.map((page, index) => {
                        return (
                            <Route path={page.route} key={index}>
                                <Basepage />
                            </Route>
                        );
                    })}
                </Switch>
            </Router>
            <Footer />
        </React.Fragment>
    );
};

export default App;
