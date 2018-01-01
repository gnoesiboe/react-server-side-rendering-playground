import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createFetchAdminsAction } from '../../../action/actionFactory';
import Preloader from './Preloader';
import requireIsAuthenticated from './hoc/requireIsAuthenticated';
import { Helmet } from 'react-helmet';

class AdminsList extends React.Component {

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this.props.dispatch(
            createFetchAdminsAction()
        );
    }

    /**
     * @param {Object} admin
     *
     * @returns {String}
     *
     * @private
     */
    _renderAdmin(admin) {
        return (
            <li className="collection-item" key={ admin.id }>{ admin.name }</li>
        );
    }

    /**
     * @returns {String}
     *
     * @private
     */
    _renderList() {
        var { admins } = this.props;

        if (admins.length === 0) {
            return <Preloader/>;
        }

        return (
            <ul className="collection">
                { admins.map((admin) => this._renderAdmin(admin)) }
            </ul>
        );
    }

    /**
     * @returns {String}
     *
     * @private
     */
    _renderHeadProperties() {
        var title = `Admins list (${this.props.admins.length})`;

        return (
            <Helmet>
                <title>{ title }</title>
                <meta property="og:title" content="Admins list" />
            </Helmet>
        );
    }

    /**
     * @returns {String}
     */
    render() {
        return (
            <div>
                { this._renderHeadProperties() }
                <h1>Protected list of admins</h1>
                { this._renderList() }
            </div>
        )
    }
}

AdminsList.propTypes = {
    admins: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired
};

/**
 * @param {Function} dispatch
 *
 * @returns {*}
 */
function loadData({ dispatch }) {
    return dispatch(
        createFetchAdminsAction()
    );
}

/**
 * @param {Object[]} admins
 *
 * @returns {Object}
 *
 * @private
 */
function _mapGlobalStateToProps({ admins }) {
    return { admins };
}

export { loadData }
export default connect(_mapGlobalStateToProps)(requireIsAuthenticated(AdminsList));
