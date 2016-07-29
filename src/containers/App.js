import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchPostsIfNeeded } from '../actions';

const DEFAULT_TITLE = 'React Boilerplate';

class App extends Component {
    render() {
        return (
            <div>
                <Helmet titleTemplate={`%s | ${DEFAULT_TITLE}`} defaultTitle={DEFAULT_TITLE} />
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.posts
    };
}

export default connect(mapStateToProps)(App);
