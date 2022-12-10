export const fadeIn = (element_to_show: any) => {


  element_to_show.style.opacity = 0
  element_to_show.style.display = 'block'

  let show_interval = setInterval(() => {
    element_to_show.style.opacity = +element_to_show.style.opacity + 0.1

    if (element_to_show.style.opacity == 1) {
      clearInterval(show_interval)
    }
  }, 20)
}
export const fadeOut = (element_to_hide: any) => {
  console.log(element_to_hide)
  element_to_hide.style.opacity = 1
  let hide_interval = setInterval(() => {
    element_to_hide.style.opacity -= 0.1
    if (element_to_hide.style.opacity == 0) {
      element_to_hide.style.display = 'none'
      clearInterval(hide_interval)
    }
  }, 20)
}
export const fade = (hide: any, show: any) => {
  fadeOut(hide)
  setTimeout(() => {
    fadeIn(show)
  }, 200)
}
export const parseDate = (date: string) => {
  let array = date.split('/')
  return array[2] + '-' + array[1] + '-' + array[0]
}
export const parseSeparatorDate = (date: string, last_separator: string, new_separator: string) => {
  let array = date.split(last_separator)
  return array[0] + new_separator + array[1] + new_separator + array[2]
}
export const invertDateFormat = (date: string, separator: string) => {
  let array = date.split(separator)
  return array[2] + separator + array[1] + separator + array[0]
}
export const isDateFormat = (date: string) => {
  return typeof date == 'string'
}
export const dateIsSeparatedBy = (date: string, separator: string) => {

  return date.split(separator).length > 1
}

export const changeOrder = (move_event: any, array: any, callBack: Function) => {
  let items_aux = [...array]
  console.log(items_aux)
  let removed_item = items_aux.splice(move_event.old_index, 1)
  console.log(items_aux)

  items_aux.splice(move_event.new_index, 0, removed_item[0])
  console.log(items_aux)
  console.log(move_event)
  items_aux.map(x => {
    console.log(x.title + ': ' + x.order)
  })
  if (callBack) callBack()
  return items_aux

}

export const changeItemPosition = (last_index: number, new_index: number, array: any, callBack: Function) => {


  let aux_item = array[last_index]
  let aux_array = [...array]

  aux_array.splice(last_index, 1)
  aux_array.splice(new_index, 0, aux_item)


  if (callBack) callBack()
  return aux_array

}
export const extractFile = (id: string) => {

  let _input_file = document.querySelector('#' + id)

  //@ts-ignore
  return (_input_file && _input_file.files) ? _input_file.files[0] : {}

}
export const parseForm = (form: object) => {

  let form_data = new FormData()
  for (let i in form) {
    //@ts-ignore
    form_data.append(i, form[i])
  }

  return form_data

}
export const goTo = (route: string) => {
  window.location.assign(route)
}