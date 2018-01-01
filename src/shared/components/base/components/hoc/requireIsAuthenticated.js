import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Preloader from '../Preloader';
import { Redirect } from 'react-router-dom';
import { createHomePath } from '../../../../router/urlGenerator';

export default function requireIsAuthenticated (ChildComponent) {
    class RequireIsAuthenticated extends React.Component {

        /**
         * @returns {String}
         */
        render() {
            switch (this.props.currentUser) {
                case false:
                    return <Redirect to={ createHomePath() }/>

                case null:
                    return <div><Preloader /></div>;

                default:
                    return (
                        <div>
                            <ChildComponent {...this.props} />
                        </div>
                    );
            }
        }
    }

    RequireIsAuthenticated.propTypes = {
        currentUser: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ])
    };

    /**
     * @param {Object} currentUser
     *
     * @returns {Object}
     *
     * @private
     */
    var _mapGlobalStateToProps = function ({ currentUser }) {
        return { currentUser }
    };

    return connect(_mapGlobalStateToProps)(RequireIsAuthenticated);
};
