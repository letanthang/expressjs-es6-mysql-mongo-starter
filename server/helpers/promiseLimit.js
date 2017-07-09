/* eslint no-console: 0 */
/* eslint no-loop-func: 0 */


export const limitPromise = async(arr, limit, proms) => {
  let start = 0;
  while (start <= arr.length) {
    const end = start + limit;
    const tmpArr = arr.slice(start, end);
    for (let i = 0; i < tmpArr.length; i += 1) {
      const currentObject = tmpArr[i];
      await proms(currentObject);
    }
    // console.log('start :', start);
    // console.log('limit :', limit);
    start += limit;
    // await Promise.all(
    //   tmpArr.map(proms)
    //   )
    //   .then(() => {
    //     start += limit;
    //   })
    //   .catch(err => console.log(err));
  }
};

export const interatePromise = async(arr, limit, proms) => {
  let start = 0;
  const returnData = {};
  while (start <= arr.length) {
    const end = start + limit;
    const tmpArr = arr.slice(start, end);
    for (let i = 0; i < tmpArr.length; i += 1) {
      const currentObject = tmpArr[i];
      await proms(returnData, currentObject);
    }
    // console.log('start :', start);
    // console.log('limit :', limit);
    start += limit;
  }
  return returnData;
};
/*
 Usage :
 limitPromise(
 items,
 2,
 item => new Promise((resolve, reject) => {
 setTimeout(() => {
 console.log(item);
 resolve(item);
 }, 2000);
 })
 );
 */
