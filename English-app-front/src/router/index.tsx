import {lazy, Suspense, useState} from "react";
import {Switch, Route} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import {Styles} from "../styles/styles";
import Container2 from "../common/Container2";

const Router = () => {
    return (
        <Suspense fallback={null}>
            <Styles/>
            <Container2>
                <Switch>
                    {routes.map((routeItem) => {
                        return (
                            <Route
                                key={routeItem.component}
                                path={routeItem.path}
                                exact={routeItem.exact}
                                component={lazy(() => import(`../pages/${routeItem.component}`))}
                            />
                        );
                    })}
                </Switch>
            </Container2>
        </Suspense>
    );
};

export default Router;
