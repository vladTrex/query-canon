import {branch, renderComponent} from "recompose";

export const renderWhileLoadingHOC = (component, propName = 'data') =>
    branch(
        props => props[propName].loading,
        renderComponent(component),
    );

export const renderForErrorHOC = (component, propName = "data") =>
    branch(
        props => props[propName].error,
        renderComponent(component),
    );