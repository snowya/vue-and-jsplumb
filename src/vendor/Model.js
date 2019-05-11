// 创建copy元素（参数为：drop事件的ui、当前容器）

export function CreateModel (ui, selector) {
  // 添加html模型
  let modelId = $(ui.draggable).attr('id')

  ui.draggable.appendTo('.canvas').show()
  let left = parseInt(ui.offset.left - $(selector).offset().left)
  let top = parseInt(ui.offset.top - $(selector).offset().top)
  document.getElementById(modelId).style.position = 'absolute'
  $('#' + modelId).css('left', left).css('top', top).removeClass('node')

  return modelId
}
