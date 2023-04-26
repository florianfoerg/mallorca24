
const NoResultsFound = ({msg}) => {

    // Returns a div element containing an image, a message and an optional error message
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "max(600px, calc(100vh - 480px))" }}>
            <img src="https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/penguin-7837-16545-550x550.png" style={{ height: "20vh", marginTop: "20px" }} alt={'penguin'}></img>
            <div style={{ fontSize: "3vh", alignSelf: "center", textAlign: "center", color: "#063773" }}>unfortunately no results were found, consider changing your search request!</div>
            
            {/* If "msg" prop is defined, it displays an error message */}
            {msg !== undefined && <div style={{ fontSize: "2vh", alignSelf: "center", textAlign: "center", color: "red" }}>{msg}</div>}
        </div>
    );
}

export default NoResultsFound;
