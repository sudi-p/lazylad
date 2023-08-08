import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class PageNotFound extends PureComponent {
  render() {
    return (
      <div>
        <p>{this.props.itemTitle} not found</p>
        <div />
        <p>
          We&#39;re sorry. The {this.props.itemTitle.toLowerCase()} you are
          looking <br />
          for doesn&#39;t exist.
        </p>
      </div>
    );
  }
}

PageNotFound.defaultProps = {
  itemTitle: "Page"
};

PageNotFound.propTypes = {
  itemTitle: PropTypes.string
};

export default PageNotFound;
