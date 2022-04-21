  
import React from 'react';
import WrapperRouter from '../WrapperRouter/WrapperRouter';

class ScrollToTop extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default WrapperRouter(ScrollToTop);