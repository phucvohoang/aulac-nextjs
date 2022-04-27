import React from 'react';
// import Image from 'next/image'
import { convertDataEditorToHTML } from '../../util/helper'

const ArticleDetails = ({data}) => {
    const sampleData = {
        image: data?.cover,
        title: data?.title,
        contentArticle: data?.contentHTML,
    }
    const headerDetail = sampleData;
    let body = ""
    if(data?.content){
        try{
            const parsedDescription = JSON.parse(data.content);
            body = convertDataEditorToHTML(parsedDescription)
            
        }catch(e){
            // console.log("error")
        }
    }
    return (
        <div className="blog__article-detail__container">
            <div className="blog__article-detail__header">
                <div className="article-detail__header__img">
                    <img src={headerDetail.image} alt="Header" />
                </div>
                <div className="article-detail__header__title">
                    <h1>{headerDetail.title}</h1>
                </div>
                <div className="article-detail__header__date">
                </div>
            </div>
            <div className="blog__article-detail__body" dangerouslySetInnerHTML={{__html: body}}>
            </div>
        </div>
    )
}

export default ArticleDetails;