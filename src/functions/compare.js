function compare( a, b ) {
  if ( a.timesSold > b.timesSold ){
    return -1;
  }
  if ( a.timesSold < b.timesSold ){
    return 1;
  }
  return 0;
}

module.exports = compare;