// Note: Needs to be all the data in one huge object
module.exports = allItems => {
  return {
    gloves: allItems.filter(item => item.type === 'gloves').map(item => delete item.type),
    facemasks: allItems.filter(item => item.type === 'facemasks').map(item => delete item.type),
    beanies: allItems.filter(item => item.type === 'beanies').map(item => delete item.type)
  }
}
