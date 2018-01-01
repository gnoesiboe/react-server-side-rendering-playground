import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {Object=} staticContext       (does not exist client-side)
 *
 * @returns {String}
 *
 * @constructor
 */
function NotFound({ staticContext = {} }) {
    staticContext.notFound = true;

    return (
        <div style={{ marginTop: '200px' }}>
            <h1>Oops, page not found.</h1>
        </div>
    );
}

NotFound.propTypes = {
    staticContext: PropTypes.object
};

export default NotFound;
