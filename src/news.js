import {Component} from 'react';
import './news.css';

export default class News extends Component {
    constructor() {
        super();

        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        this.getNews('associated-press, rt, reuters, crypto-coins-news').then(data => this.setState({
            articles: data.articles
        }))
    }

    getNews(sources) {
        return fetch(`https://newsapi.org/v2/top-headlines?sources=${sources}&pageSize=5&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`).then(response => response.json()); 
    }

    render () {
        return (
            <div className='News container-f'>
                {this.state.articles.map((article, index) => {
                    return (
                        <div className='article-container' key={index}>
                            <img className='img-article' src={article.urlToImage} alt=''></img>
                            <div className='article-info'>
                                <div className='source'>{article.source.name}</div>
                                <div className='title-article'>{article.title}</div>
                                <div className='description-article'>{article.description}</div>
                            </div>
                            
                        </div>
                    )
                })}
               
                            
                       
            </div>
        );
    }
        
}