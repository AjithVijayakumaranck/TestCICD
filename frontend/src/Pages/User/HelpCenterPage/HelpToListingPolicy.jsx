import React, { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { AiOutlineArrowUp } from "react-icons/ai";
import { TbPointFilled } from "react-icons/tb";
import Sidebar from '../../../Components/HelpCenter/Sidebar/Sidebar';



const HelpToListingPolicy = () => {

    const location = useLocation();

    const pathSegment = location.pathname.split('/').filter((segment) => segment);

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    function ScrollToTopOnMount() {
        window.scrollTo(0, 0);
        return null;
    }

    useEffect(() => {
        ScrollToTopOnMount();
    }, []);



    return (
        <div className={Style.page_wrapper}>
            <ScrollToTopOnMount />
            <Navbar />
            <div className={Style.main}>
                <Breadcrumb pathSegments={pathSegment} />
                <div className={Style.container}>
                    <div className={Style.To_top} onClick={ScrollToTop} > <AiOutlineArrowUp /></div>
                    <div className={Style.left}>
                        <Sidebar />
                    </div>
                    <div className={Style.right}>
                        <div className={Style.content_wrapper}>
                            <div className={Style.container_wrap}>
                                <div className={Style.row}>
                                    <div className={Style.top}>
                                        <div className={Style.title}>
                                            <h2> Listing Policy </h2>
                                            <p>For use of our Site and other services, you confirm and declare that you shall not list or post or
                                                provide information in relation to the sale or purchase or exchange of goods and services, content or
                                                information that are illegal under the laws of the Republic of India and/or are not permitted as per the
                                                prohibited items policy listed below.
                                            </p>
                                        </div>
                                        <div className={Style.row}></div>
                                    </div>

                                    <div className={Style.bottom}>

                                        <div className={Style.subtitle}>
                                            <h3> Prohibited Items Policy: </h3>
                                        </div>

                                        <div className={Style.subtitle}>
                                            <span>1.</span>
                                            <p>We specifically prohibit any listing or posting of classifieds or information
                                                in relation to the following items:
                                            </p>
                                        </div>

                                        <div className={Style.subdata}>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Alcoholic Beverages, Liquor, tobacco products, drugs, psychotropic substances,
                                                narcotics, intoxicants of any description, medicines, palliative/curative substances
                                                nor shall you provide link directly or indirectly to or include descriptions of items,
                                                goods or services that are prohibited under any applicable law for the time being in
                                                force including but not limited to the Drugs and Cosmetics Act, 1940, the Drugs And
                                                Magic Remedies (Objectionable Advertisements) Act, 1954 Narcotic Drug and
                                                Prohibited Substances Act and the Indian Penal Code, 1860.

                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Living, dead person and/or the whole or any part of any human which has been kept
                                                or preserved by any means whether artificial or natural including any blood, bodily
                                                fluids and/ or body parts.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Prostitution or any other service in the nature there of that purports to violate the
                                                provisions of Immoral Act or Indecent representation of women which violates the
                                                contemporary standards of morality and decency in Indian society.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Religious items, including books, artifacts, etc. or any information, description of any
                                                such item that is likely to affect the religious sentiments of any person or group.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Mature Audiences Policy includes films which do not have a certificate for public
                                                exhibition issued by the Central Board of Film Certification and or described and
                                                depict or otherwise deal with matters which are revolting or repulsive and or tend to
                                                deprave a person's mind in such a way that they tend to offend against the standards
                                                of morality, decency and propriety generally accepted by reasonable adults.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Obscene Items includes items which contain an indecent representation of women
                                                within the meaning of the Indecent Representation of Women (Prohibition) Act, 1986;
                                                Any publication or film or item that describes or depicts a minor who is, or who
                                                appears to be, under 18 (whether the minor is engaged in sexual activity or not) and
                                                any computer games not suitable for minor that are unsuitable for a minor to see or
                                                play.

                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Offensive Material intended for use in a sexual setting (including "bondage" and
                                                "fetish" items,) displaying sexual activity or portraying human genitalia in a "life-like"
                                                or realistic fashion.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                "Antiquities" and "Art Treasures" in violation of the provisions of the Antiquities and
                                                Art Treasures Act, 1972 ("the Act").
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Information or items that are defamatory, libelous, threatening or abusive in nature.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Information that is fraudulent, misrepresenting as to the nature and use of the goods
                                                or the services.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Counterfeit, Pirated and stolen goods or unauthorized illegal services (services for
                                                which you are not licensed or permitted to do or do not have the authority to
                                                undertake).
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Items, goods and services that infringe or attempt to pass off any third parties
                                                intellectual property or rights of publicity or moral rights and/ purports to breach any
                                                person's right to privacy.

                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Electronically transmitting through any medium computer viruses of any type or any
                                                computer program that facilitates hacking of a computer system with the intent to
                                                damage a computer or computer network or intercept any personal data.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Your information shall not include any hate content, that is derogatory or slanderous
                                                in nature that may be directed to any individual or group or advocate violence against
                                                any users, individuals and or animals.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Hazardous chemicals and pesticides and/ or items in violation of Hazardous
                                                Chemicals Act, 1985.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Fireworks, Destructive Devices and Explosives including any material that enables
                                                the making of fireworks, explosive triggers and explosive devices.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Identity Documents, Personal Financial Records & Personal Information (in any form,
                                                including mailing lists).
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Lottery Tickets, Sweepstakes Entries and Slot Machines.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Items in violation of the Food Adulteration Act, 1954.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Military or Police Badges, Uniforms, coats-of-arms and or any Government emblems,
                                                insignia, and/ or items in violation of Emblems and names (Prevention of improper
                                                use) Act, 1950 and/ or Flag Codes of India Act, 2002.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Weapons and related items such as firearms, firearm parts and magazines,
                                                ammunition, tear gas, stun guns, switchblade knives or any other item which is
                                                prohibited under the Indian Arms Act, 1959.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                "Pyramid schemes" and "Multilevel Marketing" and/ or similar scams which are solely
                                                listed for the purpose of defrauding users.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Spam, abusive, duplicate, listing, fraud schemes (e.g. "Get rich quick" "work at
                                                homes" scams which are solely listed for the purpose of duping users).
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Inappropriate, Wrong Category (e.g dining table listed as office furniture).
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Incorrect City / Location of Listing (listing allowed only in the city you are based in, of
                                                listing).
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                International Listings.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Belongs to another person and to which the user does not have any right.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Is defamatory, obscene, pornographic, pedophilic, invasive of another‘s privacy,
                                                including bodily privacy, insulting or harassing on the basis of gender, libelous,
                                                racially or ethnically objectionable, relating or encouraging money laundering or
                                                gambling, or otherwise inconsistent with or contrary to the laws in force.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Is harmful to children.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Infringes any patent, trademark, copyright or other proprietary rights.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Violates any law for the time being in force.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Deceives or misleads the addressee about the origin of the message or knowingly
                                                and intentionally communicates any information which is patently false or misleading
                                                in nature but may reasonably be perceived as a fact.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Impersonates another person.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Threatens the unity, integrity, defense, security or sovereignty of India, friendly
                                                relations with foreign States, or public order, or causes incitement to the commission
                                                of any cognisable offense or prevents investigation of any offense or is insulting other
                                                nation.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Contains software virus or any other computer code, file or program designed to
                                                interrupt, destroy or limit the functionality of any computer resource.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Is patently false and untrue, and is written or published in any form, with the intent to
                                                mislead or harass a person, entity or agency for financial gain or to cause any injury
                                                to any person.
                                            </p>
                                        </div>

                                        <div className={Style.subtitle}>
                                            <span>2.</span>
                                            <p>Without prejudice to the generality of the above, DealNBuy does not permit posting or
                                                listing of classifieds in relation to the following:
                                            </p>
                                        </div>

                                        <div className={Style.subdata}>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                "Securities" within the meaning of the Securities Contract Regulation Act, 1956,
                                                including shares, bonds, debentures, etc. and/or any other financial
                                                instruments/assets of any description.

                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Living, dead creatures and/or the whole or any part of any animal which has been
                                                kept or preserved by any means whether artificial or natural including rugs, skins,
                                                specimens of animals, antlers, horns, hair, feathers, nails, teeth, musk, eggs, nests,
                                                other animal products of any description the sale and purchase of which is prevented
                                                or restricted in any manner by applicable laws (including those prohibited under The
                                                Wildlife Protection Act, 1972 and/ or The Environment Protection Act, 1986).
                                            </p>
                                        </div>

                                        <div className={Style.subtitle}>
                                            <span>3.</span>
                                            <p>Your listing, information, Advertisement :</p>
                                        </div>

                                        <div className={Style.subdata}>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Shall not be defamatory, trade libelous, unlawfully threatening or unlawfully
                                                harassing. Further shall not be fraudulent, misrepresenting, misleading or pertaining
                                                to the sale of any illegal, counterfeit, stolen goods and or services which do not
                                                belong to you or you do not have the authority for. Further still shall not infringe any
                                                intellectual property, trade secret, or other proprietary rights or rights of publicity or
                                                privacy of any third party.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Shall not contain any viruses, Trojan horses, worms, time bombs, cancel bots, easter
                                                eggs or other computer programming routines that may damage, detrimentally
                                                interfere with, surreptitiously intercept or expropriate any system, data or personal
                                                information.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Shall not be allowed to libel anyone or include hate, derogatory, slanderous speech
                                                directed at individuals or groups. You should not advocate violence against other
                                                users or individuals or groups.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div >
    )
}

export default HelpToListingPolicy