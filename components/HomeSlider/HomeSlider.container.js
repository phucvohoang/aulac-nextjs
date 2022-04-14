import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import HomeSlider from './HomeSlider'
const GET_HOME_COVER_SETTING = gql`
    query GetHomeCoverSettings {
        getHomeCoverSettings {
            imageUrl
            title
            subTitle
            buttonText
        }
    }
`;

const HomeSliderContainer = props => {
    const { data, loading, error} = useQuery(GET_HOME_COVER_SETTING);

    if(loading){
        return <p>loading...</p>
    }
    if(error){
        return <p>we have an error</p>
    }
    const {getHomeCoverSettings: settingHome } = data;
    return <HomeSlider {...props} settingHome={settingHome} />
}

export default HomeSliderContainer;