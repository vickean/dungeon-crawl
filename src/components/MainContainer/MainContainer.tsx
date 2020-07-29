import {
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./MainContainerStyles";
import { dungeonMap, DungeonMapItem, DungeonData, dungeonData } from "./DungeonData";

// const dungeonMap: string[][] = [
//   ["0-0", "1-0", "2-0", "3-0"],
//   ["0-1", "1-1", "2-1", "3-1"],
//   ["0-2", "1-2", "2-2", "3-2"],
//   ["0-3", "1-3", "2-3", "3-3"],
// ];

interface CurrentRoom {
  moveOptions: DungeonMapItem;
}

interface InitialState {
  currentCol: number;
  currentRow: number;
  currentRoom: CurrentRoom;
  endRoomCol: number;
  endRoomRow: number;
  endDialogOpen: boolean;
}

interface DirectionalButtons {
  label: string;
  callback: () => void;
  gridValue: number;
  disabled: boolean;
}

function MainContainer() {
  const classes = useStyles();

  const initialState: InitialState = {
    currentCol: 999,
    currentRow: 999,
    currentRoom: {
      moveOptions: {
        N: null,
        E: null,
        S: null,
        W: null,
      },
    },
    endRoomCol: 999,
    endRoomRow: 999,
    endDialogOpen: false,
  };

  const [state, setState] = useState(initialState);

  const moveNorth = () => {
    console.log("North");
    setState({ ...state, currentRow: state.currentRow - 1 });
  };

  const moveWest = () => {
    console.log("West");
    setState({ ...state, currentCol: state.currentCol - 1 });
  };

  const moveEast = () => {
    console.log("East");
    setState({ ...state, currentCol: state.currentCol + 1 });
  };

  const moveSouth = () => {
    console.log("South");
    setState({ ...state, currentRow: state.currentRow + 1 });
  };

  const setStartPos = (source: DungeonData) => {
    console.log("Checking start position!");

    const sourceCopy = JSON.parse(JSON.stringify(source));

    const startingPosition = Object.keys(sourceCopy)
      .filter((key: string) => {
        const tags = sourceCopy[`${key}`].tags;

        return tags.includes("start");
      })[0]
      .split("-");

    const colPos: number = parseInt(startingPosition[0]);
    const rowPos: number = parseInt(startingPosition[1]);

    // Setting up end room
    const endRoomCoord = Object.keys(sourceCopy)
      .filter((key: string) => {
        const tags = sourceCopy[`${key}`].tags;

        return tags.includes("end");
      })[0]
      .split("-");

    const endColPos: number = parseInt(endRoomCoord[0]);
    const endRowPos: number = parseInt(endRoomCoord[1]);

    setState({
      ...state,
      currentCol: colPos,
      currentRow: rowPos,
      endRoomCol: endColPos,
      endRoomRow: endRowPos,
      endDialogOpen: false, //close the dialog
    });
  };

  const closeEndDialog = () => {
    setState({ ...state, endDialogOpen: false });
  };

  const resetGame = () => {
    setStartPos(dungeonData);
  };

  const GameItem = (props: {
    item: DungeonMapItem;
    idx: number;
    rowIdx: number;
  }) => {
    const { item, idx, rowIdx } = props;

    const isCurrentPos: boolean =
      idx === state.currentCol && rowIdx === state.currentRow;

    return (
      <Grid item xs={3} key={"item" + idx}>
        <Paper style={{ height: "3vh" }}>
          {`${idx}-${rowIdx}`}
          <div
            style={{
              borderRadius: "10px",
              backgroundColor: isCurrentPos ? "green" : "red",
              height: "10px",
              width: "10px",
            }}
          />
        </Paper>
      </Grid>
    );
  };

  const GameRow = (props: { row: DungeonMapItem[]; rowIdx: number }) => {
    const { row, rowIdx } = props;

    return (
      <Grid container item xs={12} key={"row" + rowIdx}>
        {row.map((item: DungeonMapItem, idx: number) => {
          return <GameItem item={item} idx={idx} rowIdx={rowIdx} />;
        })}
      </Grid>
    );
  };

  const GameGrid = (props: { source: DungeonMapItem[][] }) => {
    const { source } = props;

    return (
      <div
        style={{
          width: "25%",
          margin: "1rem",
          padding: "1rem",
          backgroundColor: "#202060",
        }}
      >
        Mini Map
        <Grid container>
          {source.map((row: DungeonMapItem[], rowIdx: number) => {
            return <GameRow row={row} rowIdx={rowIdx} />;
          })}
        </Grid>
      </div>
    );
  };

  const GameControls = (props: any) => {
    const directionalButtons: DirectionalButtons[] = [
      {
        label: "North",
        callback: moveNorth,
        gridValue: 12,
        disabled: state.currentRoom.moveOptions.N === null,
      },
      {
        label: "West",
        callback: moveWest,
        gridValue: 6,
        disabled: state.currentRoom.moveOptions.W === null,
      },
      {
        label: "East",
        callback: moveEast,
        gridValue: 6,
        disabled: state.currentRoom.moveOptions.E === null,
      },
      {
        label: "South",
        callback: moveSouth,
        gridValue: 12,
        disabled: state.currentRoom.moveOptions.S === null,
      },
    ];

    return (
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "30%",
          backgroundColor: "#202060",
          textAlign: "center",
          padding: "1rem",
          margin: "1rem",
        }}
      >
        <Grid container>
          {directionalButtons.map((el: DirectionalButtons, idx: number) => {
            return (
              <Grid item xs={el.gridValue as any} key={idx}>
                <Button
                  variant="contained"
                  onClick={el.callback}
                  disabled={el.disabled}
                >
                  {el.label}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  useEffect(() => {
    setStartPos(dungeonData);
  }, []);

  useEffect(() => {
    const notInitPos =
      state.currentCol !== initialState.currentCol &&
      state.currentRow !== initialState.currentRow;

    const isEndRoom =
      state.currentCol === state.endRoomCol && state.currentRow === state.endRoomRow;

    if (notInitPos) {
      const currentRoom = dungeonMap[state.currentRow][state.currentCol];
      const { N, E, S, W } = currentRoom;
      setState({
        ...state,
        currentRoom: { ...state.currentRoom, moveOptions: { N, E, S, W } },
      });

      if (isEndRoom) {
        console.log("You have escaped!");
        setState({ ...state, endDialogOpen: true });
      }
    }
  }, [state.currentCol, state.currentRow]);

  console.log("Current State: ", state);

  return (
    <div className={classes.root}>
      <div className={classes.titleBox}>
        <Typography variant="h2" className={classes.titleText}>
          Dungeon Crawl!
        </Typography>
      </div>
      <Paper className={classes.mainUi}>
        <GameGrid source={dungeonMap} />
        <GameControls />
      </Paper>
      <Dialog open={state.endDialogOpen} onClose={closeEndDialog}>
        <DialogContent>
          <Typography variant="h5">You've escaped!</Typography>
          <Typography variant="h6">Play again?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEndDialog} color="primary">
            No
          </Button>
          <Button onClick={resetGame} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MainContainer;
