import React from "react";
// import './Story.styled.scss';

// import StoryImg from './../../public/assets/home/elementor/img_our_stories.png'
// import StoryImg2 from './../../public/assets/home/elementor/bg_992.jpg'
// import LogoImg from './../../public/assets/home/elementor/efway_logo.png'
import StoryImg from '../../public/assets/img_our_stories.png';
//const StoryImg = "http://demo2.themelexus.com/efway/wp-content/uploads/2020/06/img_our_stories.png";
//const logoEfway = "http://demo2.themelexus.com/efway/wp-content/uploads/2020/06/efway.png"
const Story = () => {
    return (
        <div className="story">
            <div className="story__image--1">
                <img src={StoryImg} alt="Story 1"/>
            </div>
            <div className="story__text">
                <div className="story__title">
                    <span>MỤC TIÊU CỦA CHÚNG TÔI</span>
                </div>
                <div className="story__content">
                    <div className="story__content--title">
                        <span>Thực Phẩm&nbsp;</span>
                        <span>Chay An Toàn&nbsp;</span>
                        <span>Đa Dạng.</span>
                    </div>
                    <div className="story__content--paragraph">
                        <p>
                            {/* We’ve recently updated our entire product portfolio
                            to give customers and partners the best products
                            with the newest technology. */}
                            Âu Lạc tự hào mang đến những dòng sản phẩm chay chất lượng,
                            đa dạng sản phẩm, và đặc biệt là rất an toàn. Nhằm góp phần mang lại sự an tâm và 
                            cải thiện bữa ăn của khách hàng.
                        </p>
                    </div>
                    {/* <div className="story__content--logo">
                        <img src={logoEfway} alt="Logo"/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Story;