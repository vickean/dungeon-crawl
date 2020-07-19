import { Paper, Typography, Grid, Button } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./MainContainerStyles";
import { dungeonMap, DungeonMapItem } from "./DungeonData";

// const dungeonMap: string[][] = [
//   ["0-0", "1-0", "2-0", "3-0"],
//   ["0-1", "1-1", "2-1", "3-1"],
//   ["0-2", "1-2", "2-2", "3-2"],
//   ["0-3", "1-3", "2-3", "3-3"],
// ];

interface DirectionalButtons {
  label: string;
  callback: () => void;
  gridValue: number;
}

function MainContainer() {
  const classes = useStyles();

  const initialState = {
    currentCol: 999,
    currentRow: 999,
  };

  const [state, setState] = useState(initialState);

  const moveNorth = () => {
    console.log("North");
  };

  const moveWest = () => {
    console.log("West");
  };

  const moveEast = () => {
    console.log("East");
  };

  const moveSouth = () => {
    console.log("South");
  };

  const GameItem = (props: {
    item: DungeonMapItem;
    idx: number;
    rowIdx: number;
  }) => {
    const { item, idx, rowIdx } = props;

    return (
      <Grid item xs={3} key={"item" + idx}>
        <Paper style={{ height: "3vh" }}>
          {`${idx}-${rowIdx}`}
          <div
            style={{
              borderRadius: "10px",
              backgroundColor: "red",
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
      },
      {
        label: "West",
        callback: moveWest,
        gridValue: 6,
      },
      {
        label: "East",
        callback: moveEast,
        gridValue: 6,
      },
      {
        label: "South",
        callback: moveSouth,
        gridValue: 12,
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
                <Button variant="contained" onClick={el.callback}>
                  {el.label}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

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
    </div>
  );
}

export default MainContainer;
