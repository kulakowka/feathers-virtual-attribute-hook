'use strict'

module.exports = function addVirtualAttribute (virtuals) {
  var serializer = function (item) {
    item = item.toJSON ? item.toJSON() : item  // hack for sequelize

    var virtual
    for (virtual in virtuals) {
      item[virtual] = virtuals[virtual](item)
    }
  }

  return function (hook) {
    var result = hook.type === 'before' ? hook.data : hook.result

    if (hook.method === 'find' || Array.isArray(result)) {
      result = (result.data || result).forEach(serializer)
    } else {
      result = serializer(result)
    }
  }
}
