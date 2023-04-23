import "./SiteOrganizer.css";

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
      <div className="site-organizer-container">
        <div className="site-organizer-button-container">
          {/* Render button only if the current site is greater than 1 */}
          {site > 1 && (
            <Button
              className="site-organizer-button"
              onClick={() => {
                setSite(1);
                handleScrollToOffers();
              }}
              style={{ backgroundColor: "transparent", border: "none", color: "black"}}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
              {isWidthScreen && "First"}
            </Button>
          )}
        </div>
        <div className="site-organizer-button-container">
          {/* Render button only if the current site is greater than 1 */}
          {site > 1 && (
            <Button
              className="site-organizer-button"
              onClick={() => {
                setSite(site - 1);
                handleScrollToOffers();
              }}
              style={{ backgroundColor: "transparent", border: "none", color: "black"}}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              {isWidthScreen && " Previous"}
            </Button>
          )}
        </div>
        <div className="site-organizer-page-count">
          <u>
            <b>{site}</b>
          </u>{" "}
          / {amountSites}
        </div>
        <div className="site-organizer-button-container">
          {/* Render button only if the current site is less than amountSites */}
          {site < amountSites && (
            <Button
              className="site-organizer-button"
              onClick={() => {
                setSite(site + 1);
                handleScrollToOffers();
              }}
              style={{ backgroundColor: "transparent", border: "none", color: "black"}}
            >
              {isWidthScreen && "Next"} <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          )}
        </div>
        <div className="site-organizer-button-container">
          {/* Render button only if the current site is less than amountSites */}
          {site < amountSites && (
            <Button
              className="site-organizer-button"
              onClick={() => {
                setSite(amountSites);
                handleScrollToOffers();
              }}
              style={{ backgroundColor: "transparent", border: "none", color: "black"}}
            >
              {isWidthScreen && "Last"}{" "}
              <FontAwesomeIcon icon={faArrowRightLong} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteOrganizer;
