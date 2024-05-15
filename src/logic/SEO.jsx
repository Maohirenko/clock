import React from "react";
import { Helmet } from "react-helmet-async";


export default function SEO({ title, description, name, type, keywords = "React, JavaScript, clock, html" }) {
    return (
        <Helmet>
            <title>{title}</title>
            {/* <meta></meta> */}
            <meta name="description" content={description} data-react-helmet="true"/>
            <meta name="keywords" content={keywords} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    )
}