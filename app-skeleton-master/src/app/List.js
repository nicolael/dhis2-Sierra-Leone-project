import React, { PropTypes } from 'react';

/**
 * A stateless function component
 * https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
 */
export default function List({ items = [] }) {
    // Create a list of li elements that make up the list of organisation units units
    const listItems = items
        .map(item => {
            return (
                <li key={item.id}>{item.displayName}</li>
            );
        });

    // Render the list with the items
    return (
        <div className="list">
            <ul>
                {listItems}
            </ul>
        </div>
    );
}

List.propTypes = {
    items: PropTypes.array,
};