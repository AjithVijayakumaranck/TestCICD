import React, { useState } from 'react'
import Style from "./index.module.css"

const AboutUs = ({ Data ,title}) => {

    const Policy = Data?.policy

    return (
        <div className={Style.content_wrapper}>
            <div className={Style.container}>
                <div className={Style.row}>
                    <div className={Style.top}>
                        <div className={Style.title}>
                            <h2> {title} </h2>
                            <p> {Data?.description} </p>
                        </div>
                        <div className={Style.row}></div>
                    </div>

                    {Policy?.map((policies, index) => {
                        const SubData = policies?.subData
                        return (
                            <div className={Style.bottom} key={index}>
                                <div className={Style.subtitle}>
                                    <span>{index+1}.</span>
                                    <h3> {policies?.subtitle} </h3>
                                </div>
                                <div className={Style.subdata}>
                                    {SubData?.map((subdata, index) => {
                                        return (
                                            <p key={index}>{subdata}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AboutUs