import React from "react";
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const ContactMap = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{
            lat: 10.0536841, lng: 105.7744248
        }}
    >
        <Marker position={{lat: 10.0534371, lng: 105.7746868}}/>
    </GoogleMap>
))

export default ContactMap;
