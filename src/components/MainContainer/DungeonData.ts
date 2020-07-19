export interface DungeonData {
  [index: string]: {
    text: string;
    tags: [string];
  };
}

export interface DungeonMapItem {
  N: string | null;
  E: string | null;
  S: string | null;
  W: string | null;
}

export const dungeonData: DungeonData = {
  //row 0
  "0-0": {
    text: "0-0",
    tags: [""],
  },
  "1-0": {
    text: "1-0",
    tags: [""],
  },
  "2-0": {
    text: "2-0",
    tags: ["start"],
  },
  "3-0": {
    text: "3-0",
    tags: [""],
  },
  //row 1
  "0-1": {
    text: "0-1",
    tags: [""],
  },
  "1-1": {
    text: "1-1",
    tags: [""],
  },
  "2-1": {
    text: "2-1",
    tags: [""],
  },
  "3-1": {
    text: "3-1",
    tags: [""],
  },
  //row 2
  "0-2": {
    text: "0-2",
    tags: [""],
  },
  "1-2": {
    text: "1-2",
    tags: [""],
  },
  "2-2": {
    text: "2-2",
    tags: [""],
  },
  "3-2": {
    text: "3-2",
    tags: [""],
  },
  //row 3
  "0-3": {
    text: "0-3",
    tags: [""],
  },
  "1-3": {
    text: "1-3",
    tags: ["end"],
  },
  "2-3": {
    text: "2-3",
    tags: [""],
  },
  "3-3": {
    text: "3-3",
    tags: [""],
  },
};

export const dungeonMap: DungeonMapItem[][] = [
  //row 0
  [
    //0-0
    {
      N: null,
      E: null,
      S: "0-1",
      W: null,
    },
    //1-0
    {
      N: null,
      E: "2-0",
      S: "1-1",
      W: null,
    },
    //2-0
    {
      N: null,
      E: "3-0",
      S: "2-1",
      W: "1-0",
    },
    //3-0
    {
      N: null,
      E: null,
      S: "3-1",
      W: "2-0",
    },
  ],
  //row 1
  [
    //0-1
    {
      N: "0-0",
      E: "1-1",
      S: null,
      W: null,
    },
    //1-1
    {
      N: "1-0",
      E: null,
      S: "1-2",
      W: "0-1",
    },
    //2-1
    {
      N: "2-0",
      E: "3-1",
      S: null,
      W: null,
    },
    //3-1
    {
      N: "3-0",
      E: null,
      S: "3-2",
      W: "2-1",
    },
  ],
  //row 2
  [
    //0-2
    {
      N: null,
      E: "1-2",
      S: "0-3",
      W: null,
    },
    //1-2
    {
      N: "1-1",
      E: "2-2",
      S: null,
      W: "0-2",
    },
    //2-2
    {
      N: null,
      E: "3-2",
      S: "2-3",
      W: "1-2",
    },
    //3-2
    {
      N: "3-1",
      E: null,
      S: "3-3",
      W: "2-2",
    },
  ],
  //row3
  [
    //0-3
    {
      N: "0-2",
      E: null,
      S: null,
      W: null,
    },
    //1-3
    {
      N: null,
      E: "2-3",
      S: null,
      W: null,
    },
    //2-3
    {
      N: "2-2",
      E: null,
      S: null,
      W: "1-3",
    },
    //3-3
    {
      N: "3-2",
      E: null,
      S: null,
      W: null,
    },
  ],
];
