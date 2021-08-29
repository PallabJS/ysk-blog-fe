import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import Homepage from "./pages/Homepage";
import Basepage from "./pages/basepage/Basepage";
// import Postpage from "./pages/postpage/Postpage";

const baseRoutes = [
    { title: "science", route: "/science" },
    { title: "tech", route: "/tech" },
];

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                {baseRoutes.map((page, index) => {
                    return (
                        <Route path={page.route} key={index}>
                            <Basepage />
                        </Route>
                    );
                })}
            </Switch>
        </Router>
    );
};

export default App;
