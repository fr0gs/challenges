import React, { Component } from 'react';
import './SearchBox.css';
import RandomArticle from './RandomArticle';
import InputArticle from './InputArticle';
import ArticleList from './ArticleList';
import $ from 'jquery';


class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      api: "https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=",
      cb: "&callback=JSON_CALLBACK",
      page: "https://en.wikipedia.org/?curid="
    }
  }

  searchString(str) {
    let search = this.state.api + str + this.state.cb;
    $.ajax({
        url: search,
        dataType: "jsonp",
        success: (result, textStatus) => {
          this.setState({
            articles: result.query.pages
          })
        },
        type: "GET"
    });
  }

  render() {
    return (
      <div className="search-box">
          <RandomArticle />
          <InputArticle searchString={this.searchString.bind(this)}/>
          <ArticleList articles={this.state.articles} page={this.state.page}/>
      </div>
    );
  }
};

export default SearchBox;
