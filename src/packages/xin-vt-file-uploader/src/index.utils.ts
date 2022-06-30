/**
 * @description 时间戳格式化方法
 * @param formatter 格式化字符串(日期大写，时间小写)
 * @param time 时间戳
 */
export const unixTimeFormat = (formatter = 'Y-M-D h:m:s', time = +new Date()) => {
  const pekingTime = new Date(time + 8 * 3600 * 1000);
  const dateStr = pekingTime.toJSON().substr(0, 19)
  const [date, moment] = dateStr.split('T')
  const [Y, M, D] = date.split('-')
  const [h, m, s] = moment.split(':')
  const replaceObj: any = { Y, M, D, h, m, s }
  Object.keys(replaceObj).forEach(key => {
    formatter = formatter.replace(key, replaceObj[key])
  })
  return formatter
}
