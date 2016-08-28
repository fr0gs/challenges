import React, { Component } from 'react';
import ArticleItem from './ArticleItem';
import './ArticleList.css';

class ArticleList extends React.Component {

  render() {
    let articleList = [];
    Object.keys(this.props.articles).forEach(el => {
      const elem = this.props.articles[el];
      articleList.push(
        <ArticleItem
          key={elem.pageid}
          page={this.props.page}
          pageid={elem.pageid}
          extract={elem.extract}
          title={elem.title} />
      );
    });
    return (
      <div className="article-list-container">
        <ul className="article-list" >
          { articleList }
        </ul>
      </div>
    );
  }
};

ArticleList.defaultProps = {
  articles: {}
};

export default ArticleList;
