import React from 'react';
import PropTypes from 'prop-types';

// LinkWithInfo takes a url title and website and returns a link to the url with the title and website as the title
const NewsLink = ({ url, articleTitle, website }) => {
    // Check for inputs provided
    if (!url || !articleTitle || !website){
        return <span>Ivalid link data</span>
    }

    // Function to truncate the title if it exceeds 50 characters
    const truncateTitle = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };

    const shortenedTitle = truncateTitle(articleTitle, 50);

    // return the link
    return (
        <a href={url} target="blank" rel="noopener noreferrer">
            {`${shortenedTitle} | ${website}`}
        </a>
    );
};

// Check for string type
NewsLink.propTypes={
    url: PropTypes.string.isRequired,
    articleTitle: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
};

export default NewsLink;