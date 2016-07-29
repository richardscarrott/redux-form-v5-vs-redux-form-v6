import React, { PropTypes } from 'react';

function Html({ css, js, html, head, initialState }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge,chrome=1" />
                {head.title.toComponent()}
                {head.meta.toComponent()}
                <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="msapplication-tap-highlight" content="no" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                {head.link.toComponent()}
                {css ? (
                    <link rel="stylesheet" href={css} />
                ) : null}
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous" />
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{
                    __html: html
                }} />
                <script dangerouslySetInnerHTML={{
                    __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`
                }} />
                <script src={js}></script>
            </body>
        </html>
    );
}

Html.propTypes = {
    css: PropTypes.string,
    js: PropTypes.string.isRequired,
    html: PropTypes.string,
    head: PropTypes.object.isRequired,
    initialState: PropTypes.object.isRequired
};

export default Html;
