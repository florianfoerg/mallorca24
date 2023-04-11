import SearchForm from "../../components/search/SearchForm";


const SearchResultPage = () => {

    return (
        <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
            <div style={{width: "min(600px, 100vw)"}}>
                <SearchForm label={"Your search"}/>
            </div>
            <div style={{width: "calc(100vw - 1000px)", minWidth: "min(700px, 100vw)", display: "flex", justifyContent: "center", marginLeft: "100px", marginRight: "100px"}}>
                <div style={{width: "80%", display: "flex", justifyContent: "center", marginTop: "30px"}}>
                    <div style={{fontSize: "40px"}}>
                        <b>Search results:</b>
                    </div>

                </div>
            
            </div>
            </div>
    );
};

export default SearchResultPage;