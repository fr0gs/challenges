import React, { Component } from 'react';
import './ArticleItem.css';

class ArticleItem extends React.Component {

  render() {
    const itemLink = this.props.page + this.props.pageid;
    return (
      <li className="article-list-item">
        <a href={ itemLink}>
          <h2>{this.props.title}</h2>
          <h3>{this.props.extract}</h3>
        </a>
      </li>
    );
  }
};

export default ArticleItem;
