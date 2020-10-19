// Nhập dữ liệu các đội
let data = [
    {
      name: "Arsenal",
      points: 99,
      gd: 45
    },
    {
      name: "Chelsea",
      points: 88,
      gd: 39
    },
    {
      name: "MANU",
      points: 60,
      gd: 29
    },
    {
      name: "Liverpool",
      points: 88,
      gd: 39
    },
  ];
  
  function count(arr) {
    let number = 0;
    let gds = [];
    let sort = arr.map((x) => x.points).sort((a, b) => b - a);
    let one = data.forEach((item) => {
      if (item.points == sort[0]) {
        item.position = ++number;
      }
      if (item.points == sort[1]) {
        gds.push(item.gd);
        let sordGd = gds.sort((a, b) => b - a);
        data.forEach((item) => {
          if (item.gd == sordGd[1]) {
            item.position = 2;
          }
          if (item.gd == sordGd[sordGd.length - 1]) {
            item.position = 3;
          }
        });
      }
      if (item.points == sort[sort.length - 1]) {
        item.position = sort.length;
      }
    });
  }
  console.log(data);
  count(data);