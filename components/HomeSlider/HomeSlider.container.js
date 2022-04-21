import React from 'react';
import { gql, useQuery } from '@apollo/client';
import HomeSlider from './HomeSlider'
import { ClientSide } from '../Wrapper/fetchingClient'
import { withApollo } from '@apollo/client/react/hoc';
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
    console.warn('===== This is our client object =====')
    console.log(props.client)
    // return <h1>Testing props client</h1>
    const { data, loading, error} = useQuery(GET_HOME_COVER_SETTING);

    if(loading){
        return <p>loading...</p>
    }
    if(error){
        console.log('we have error when fetching getHomeCoverSetting')
        console.log(error)
        return <p>we have an error</p>
    }
    const {getHomeCoverSettings: settingHome } = data;
    console.log(settingHome)
    return <HomeSlider {...props} settingHome={settingHome} />
}
export default withApollo(HomeSliderContainer)
// export tdefault ClientSide(HomeSliderContainer);
// export default HomeSliderContainer;