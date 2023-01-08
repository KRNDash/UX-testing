export function getUnique(arr) {
  var rez = [];
  rez.push(arr[0]);
  arr.forEach(function (item, i) {
    if (!(rez.indexOf(item) + 1)) rez.push(item);
  });
  return rez.length;
}
