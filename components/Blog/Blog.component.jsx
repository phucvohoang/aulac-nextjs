import React from 'react';
import { Link } from 'react-router-dom';
import imgSample from '../../assets/blog-3.jpeg';
const Blog = (props) => {
  const { article, isNews } = props;
  // console.log(article)
  return (
    <div className="blog__article">
      <div className="blog__article__img">
        <img
          src={article.cover ? article.cover : imgSample}
          alt={`Article ${1}`}
        />
      </div>
      <div className="blog__article__text">
        <h1 className="article__text--title">
          <Link to={`/${isNews ? 'news' : 'recipes'}/${article.slug}`}>
            {article.title}
          </Link>
        </h1>
        <p className="article__text--date-comment">
          <span>
            <i className="far fa-calendar-alt highlight-text" />
            &nbsp;
            {/* {article.date} */}
          </span>
          <span>
            <i className="fas fa-comments highlight-text" />
            &nbsp;{3} Comments
          </span>
        </p>
        {/* <p className="article__text--paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis in, hic iure magnam cumque accusamus vitae minus unde aut quaerat. Libero similique repellendus animi. Voluptates sed at odio aut.
                </p> */}
        <div className="article__text--action">
          <button>
            <Link to={`/${isNews ? 'news' : 'recipes'}/${article.slug}`}>
              Đọc Tiếp
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
