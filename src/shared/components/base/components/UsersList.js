import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createFetchUsersAction } from '../../../action/actionFactory';
import Preloader from './Preloader';
import { Helmet } from 'react-helmet';

class UsersList extends Component {

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this.props.dispatch(
            createFetchUsersAction()
        );
    }

    /**
     * @param {Object} user
     *
     * @private
     */
    _renderUser(user) {
        return (
            <li className="collection-item" key={ user.id }>{ user.name }</li>
        );
    }

    /**
     * @returns {String}
     *
     * @private
     */
    _renderList() {
        var { users } = this.props;

        if (users.length === 0) {
            return <Preloader/>;
        }

        return (
            <ul className="collection">
                { users.map((user) => this._renderUser(user))}
            </ul>
        );
    }

    /**
     * @returns {String}
     *
     * @private
     */
    _renderHeadProperties() {
        var title = `Users list (${this.props.users.length})`;

        return (
            <Helmet>
                <title>{ title }</title>
                <meta property="og:title" content="Users list" />
            </Helmet>
        );
    }

    /**
     * @returns {*}
     */
    render() {
        return (
            <div>
                { this._renderHeadProperties() }
                <h1>List of users</h1>
                { this._renderList() }
            </div>
        );
    }
}

UsersList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired
};

/**
 * @param {Object} globalState
 *
 * @returns {Object}
 *
 * @private
 */
function _mapGlobalStateToProps(globalState) {
    return {
        users: globalState.users
    };
}

/**
 * @param {Function} dispatch
 */
function loadData({ dispatch }) {
    return dispatch(
        createFetchUsersAction()
    );
}

export { loadData };
export default connect(_mapGlobalStateToProps)(UsersList);
