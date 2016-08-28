import React, { Component } from 'react';
import './RandomArticle.css';

class RandomArticle extends React.Component {
  render() {
    return (
      <div>
        <h3>
          <a className="random-article" href="http://en.wikipedia.org/wiki/Special:Random" target="_blank">Random Article...</a>
        </h3>
      </div>
    );
  }
};

export default RandomArticle;
