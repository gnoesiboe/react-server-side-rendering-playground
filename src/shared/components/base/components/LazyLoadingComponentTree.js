import React from 'react';
import Preloader from './Preloader';
import PropTypes from 'prop-types';

class LazyLoadingComponentTree extends React.PureComponent {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            Component: null
        };
    }

    /**
     * @inheritDoc
     */
    async componentWillMount() {
        if (!this.state.Component) {
            var module = await this.props.moduleProvider(),
                Component = module.default ? module.default : module;

            this.setState(state => ({ ...state, Component }));
        }
    }

    /**
     * @returns {String}
     */
    render() {
        var { Component } = this.state;

        return Component ? <Component { ...this.props } /> : <Preloader/>;
    }
}

LazyLoadingComponentTree.propTypes = {
    moduleProvider: PropTypes.func.isRequired
};

export default LazyLoadingComponentTree;
