import { useMediaQuery } from "react-responsive";



const MallorcaInfoBox = () => {
    // Determine if screen width is over 1000 pixels
    const isWidthScreen = useMediaQuery({ minWidth: 1715 });

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "70vw", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100%", marginTop: "30px", marginBottom: "60px", padding: "20px", background: "white", borderRadius: "5px" }}>
                    <div style={{ textAlign: "center", fontSize: "30px" }}><b>Why Mallorca?</b></div>
                    <div style={{ textAlign: "center", fontSize: "20px", marginTop: "10px" }}>Mallorca is the largest island in the Balearic Islands and the fourth largest island in Spain. It is located in the Mediterranean Sea, 8 km south of the eastern coast of the Iberian Peninsula. The island has a population of 870,000 inhabitants, of which 60% live in the capital Palma de Mallorca. The island is a popular tourist destination and is known for its beautiful beaches, the Tramuntana mountains and the many cultural attractions.</div>


                    <div style={{ textAlign: "center", marginTop: "40px", display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "25px", boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)" }}>
                        <img src="https://images.pexels.com/photos/883758/pexels-photo-883758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ width: "min(600px, 100%)" }} alt="beach"></img>
                        <div style={{ fontSize: "15px", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", width: "300px", marginLeft: "100px", marginRight: "100px" }}>
                            <div>
                                <b>Beaches</b> <br />

                                Mallorca has more than 300 beaches, which are divided into 3 categories: urban, natural and protected. The most famous beaches are Playa de Palma, Playa de Muro, Playa de Alcudia and Playa de Cala Millor.
                            </div>
                        </div>

                    </div>

                    <div style={{ textAlign: "center", marginTop: "40px", display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "25px", boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)" }}>
                        {isWidthScreen && (<div style={{ fontSize: "15px", display: "flex", justifyContent: "center", alignItems: "center", width: "300px", marginLeft: "100px", marginRight: "100px" }}>
                            <div>
                                <b>Mountains</b> <br />

                                The Tramuntana mountains are a mountain range in the north of the island. The Tramuntana is a UNESCO World Heritage Site and is known for its beautiful nature and the many hiking trails. The highest mountain is Puig Major with 1,445 meters.
                            </div>
                        </div>)}
                        <img src="https://images.pexels.com/photos/63508/pexels-photo-63508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ width: "min(600px, 100%)" }} alt="mountains"></img>
                        {!isWidthScreen && (<div style={{ fontSize: "15px", display: "flex", justifyContent: "center", alignItems: "center", width: "300px", marginLeft: "100px", marginRight: "100px", marginTop: "10px" }}>
                            <div>
                                <b>Mountains</b> <br />

                                The Tramuntana mountains are a mountain range in the north of the island. The Tramuntana is a UNESCO World Heritage Site and is known for its beautiful nature and the many hiking trails. The highest mountain is Puig Major with 1,445 meters.
                            </div>
                        </div>)}
                    </div>

                    <div style={{ textAlign: "center", marginTop: "40px", display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "25px", boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)" }}>
                        <img src="https://images.pexels.com/photos/5402890/pexels-photo-5402890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" style={{ width: "min(600px, 100%)" }} alt="church"></img>
                        <div style={{ fontSize: "15px", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", width: "300px", marginLeft: "100px", marginRight: "100px" }}>
                            <div>
                                <b>Culture</b> <br />

                                Mallorca has a rich cultural history. The island has many museums, such as the Museum of Modern Art, the Museum of Contemporary Art and the Museum of Mallorca. The island also has many beautiful churches, such as the Cathedral of Palma de Mallorca and the Church of Sant Francesc.
                            </div>
                        </div>

                    </div>





                </div>
            </div>
        </div>
    );
}

export default MallorcaInfoBox;