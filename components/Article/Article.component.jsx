import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import Blog from '../Blog/Blog.component.jsx';
import { useTranslation } from 'react-i18next';
import { Row, Pagination } from 'antd';
const Article = (props) => {
  const { t } = useTranslation('common');
  const [state, setState] = useState(1);
  const renderBlogArticle = () => {
    if (props.listNews.length > 0) {
      // console.log("in if")
      return props.listNews.map((article, idx) => {
        return <Blog key={idx} article={article} isNews={props.isNews} />;
      });
    } else {
      return (
        <p
          style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '.5rem',
          }}
        >
          {t('empty')}
        </p>
      );
    }
  };
  const onChangePage = (numberpage) => {
    props.getMoreBlog({
      variables: {
        page: numberpage,
        perPage: 10,
      },
    });
    setState(numberpage);
  };
  return (
    <div className="blog__article__container">
      {renderBlogArticle()}
      <Row justify="end">
        <Pagination
          current={state}
          onChange={onChangePage}
          total={props.totalDocs}
          pageSize={10}
          showSizeChanger={false}
        />
      </Row>
    </div>
  );
};

export default Article;
