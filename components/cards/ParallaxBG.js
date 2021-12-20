
const ParallaxBG = ({url, children = "FAREWELL"}) => {


  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: "url( " + url+ ")",
        padding: "50px 0px 75px ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "block",
      }}
    >
      <div className="row">
        <div className="col">
          <h1 className="display-1 text-center text-light">{children}</h1>
          {/* {JSON.stringify(state)} */}
        </div>
      </div>
    </div>
  );
};

export default ParallaxBG;
