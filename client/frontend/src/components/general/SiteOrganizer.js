import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowLeftLong, faArrowRight, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const SiteOrganizer = ({ setSite, site, amountSites, scrollRef }) => {
    const isWidthScreen = useMediaQuery({ minWidth: 1000 });

    const handleScrollToOffers = () => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", fontSize: "20px" }}>
                <div style={{ width: isWidthScreen ? "150px" : "50px" }}>{site > 1 && (<Button style={{ width: isWidthScreen ? "150px" : "auto", backgroundColor: "transparent", color: "black", borderWidth: "0px" }} onClick={() => { setSite(1); handleScrollToOffers(); }}><FontAwesomeIcon icon={faArrowLeftLong} />{isWidthScreen && "First"} </Button>)}</div>
                <div style={{ width: isWidthScreen ? "150px" : "50px" }}>{site > 1 && (<Button style={{ width: isWidthScreen ? "150px" : "auto", backgroundColor: "transparent", color: "black", borderWidth: "0px" }} onClick={() => { setSite(site - 1); handleScrollToOffers(); }}><FontAwesomeIcon icon={faArrowLeft} />{isWidthScreen && " Previous"} </Button>)}</div>
                <div style={{ marginLeft: "20px", marginRight: "20px" }}><u ><b>{site}</b></u> / {amountSites}</div>

                <div style={{ width: isWidthScreen ? "150px" : "50px" }}>{site < amountSites && (<Button style={{ width: isWidthScreen ? "150px" : "auto", backgroundColor: "transparent", color: "black", borderWidth: "0px" }} onClick={() => { setSite(site + 1); handleScrollToOffers(); }}>{isWidthScreen && "Next"} <FontAwesomeIcon icon={faArrowRight} /></Button>)}</div>
                <div style={{ width: isWidthScreen ? "150px" : "50px" }}>{site < amountSites && (<Button style={{ width: isWidthScreen ? "150px" : "auto", backgroundColor: "transparent", color: "black", borderWidth: "0px"  }} onClick={() => { setSite(amountSites); handleScrollToOffers(); }}>{isWidthScreen && "Last"} <FontAwesomeIcon icon={faArrowRightLong} /></Button>)}</div>
            </div>
        </div>
    );
};

export default SiteOrganizer;
