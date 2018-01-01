import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    createAdminsPath, createHomePath, createLoginPath, createLogoutPath, createUsersPath
} from '../../../router/urlGenerator';
import { connect } from 'react-redux';
import { isObject } from 'lodash';
import createClassName from 'classnames';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {

    /**
     * @param {Number} index
     *
     * @returns {String}
     *
     * @private
     */
    _renderAuthenticationStatusLink(index) {
        var { currentUser } = this.props;

        var isAuthenticated = isObject(currentUser),
            path = null,
            label = null;

        if (isAuthenticated) {
            path = createLogoutPath();
            label = 'Logout';
        } else {
            path = createLoginPath();
            label = 'Login';
        }

        return (
            <li key={ index }>
                <a href={ path }>{ label }</a>
            </li>
        );
    }

    /**
     * @param {String} path
     * @param {String} label
     * @param {Number} index
     *
     * @returns {String}
     *
     * @private
     */
    _renderMenuItem(path, label, index) {
        var className = createClassName({
            active: this.props.location.pathname === path
        });

        return (
            <li key={ index } className={ className }>
                <Link to={ path }>{ label }</Link>
            </li>
        );
    }

    /**
     * @returns {String}
     */
    render() {
        return (
            <nav>
                <div className="nav-wrapper center-align">
                    <Link to={ createHomePath() } className="brand-logo">React SSR</Link>
                    <ul className="right">
                        { this._renderMenuItem(createUsersPath(), 'Users', 1) }
                        { this._renderMenuItem(createAdminsPath(), 'Admins', 2) }
                        { this._renderAuthenticationStatusLink(3) }
                    </ul>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    currentUser: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

/**
 * @param {Object|null} currentUser
 * @returns {{currentUser: *}}
 * @private
 */
function _mapGlobalStateToProps({ currentUser }) {
    return { currentUser };
}

var ConnectedHeader = connect(_mapGlobalStateToProps)(Header);

export default withRouter(ConnectedHeader);
