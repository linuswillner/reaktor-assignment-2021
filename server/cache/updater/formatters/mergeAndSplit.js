exports.merge = allCategories => {
  const allItems = []
  allCategories.forEach(itemsInCategory => allItems.push(itemsInCategory))
  return allItems.flat()
}

exports.split = allItems => {
  return {
    gloves: allItems.filter(item => item.type === 'gloves'),
    facemasks: allItems.filter(item => item.type === 'facemasks'),
    beanies: allItems.filter(item => item.type === 'beanies')
  }
}
