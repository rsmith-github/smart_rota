import LoadingIcons from "react-loading-icons";
import AppSidebar from "./sidebar";

function LoadingScreen() {
  return (
    <div className="page-container">
      <AppSidebar />
      <div className="right-side" style={{ width: "80%" }}>
        <span className="page-location-text">Pages / ...</span>
        <h1 className="page-title">...</h1>
        <div className="loading-container">
          <LoadingIcons.Circles fill="rgba(255,255,255,0.7)" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
