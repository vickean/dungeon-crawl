import { makeStyles } from "@material-ui/core";

const uiWidth = "60vw";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#202040",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  mainUi: {
    height: "60vh",
    width: uiWidth,
    backgroundColor: "#602080",
    color: "#fff",
    position: "relative",
  },
  titleBox: {
    textAlign: "left",
    width: uiWidth,
    marginBottom: "1rem",
  },
  titleText: {
    color: "#fff",
    fontWeight: 700,
  },
}));

export default useStyles;
