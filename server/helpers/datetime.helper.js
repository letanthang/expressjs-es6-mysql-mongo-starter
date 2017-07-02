import moment from 'moment';
import { workingTimes } from '../../config/constant';

moment.locale('vi');
export const check = (time) => {
  const momentTime = moment(time);
  const weekDay = momentTime.weekday();
  let result = false;
  if (weekDay < 6) { // not weekend
    const hour = momentTime.hour();
    const minute = momentTime.minute();
    const currentMinute = (hour * 60) + minute;
    for (const workingTime of workingTimes) {
      const startMinute = (workingTime.start.h * 60) + workingTime.start.m;
      const endMinute = (workingTime.end.h * 60) + workingTime.end.m;
      if (currentMinute >= startMinute && currentMinute <= endMinute) {
        result = true;
        break;
      }
    }
  }
  return result;
};
export const calculate = (duration, starttime) => {
  const startTime = moment(starttime);
  let endTime = startTime;
  const step = 5;
  while (duration > 0) {
    endTime = endTime.add(step, 'minute');
    if (check(endTime)) {
      duration -= step;
    }
  }
  return endTime.toISOString();
};

const echoDateTime = (date) => {
  const a = moment(date).format('DD/MM/YYYY HH:mm');
  return a === 'Invalid date' ? '' : a;
};
const fromNow = (date) => {
  const tmpDate = moment(date).add(1, 'hours');
  const a = tmpDate.startOf('hours').fromNow();
  return a === 'Invalid date' ? '' : a;
};
const calPercentBetween = (from, to, now = null) => {
  const start = new Date(from);
  const end = new Date(to);
  const today = now || new Date();
  return Math.round(((today - start) / (end - start)) * 100);
};
const isOutOfDate = (now, replyTimeExpect) => moment(now).isAfter(replyTimeExpect);
// const isTimeWarning =
//   (date, duration) => moment.duration((new Date()).diff(new Date(date))).asMinutes();

const isTimeWarning = (now, replyTimeExpect, duration) => {
  const startTime = moment(now);
  const endTime = moment(new Date(replyTimeExpect));
  return moment.duration(startTime.diff(endTime)).asMinutes() <= duration;
};

const getDuration = (from, to) => {
  const startTime = new Date(from);
  const endTime = new Date(to);
  const tmpDiff = endTime.getTime() - startTime.getTime();
  return (tmpDiff / 60000);
};

const checkOutOfDate = (from, to, duration) => {
  const tmpDuration = getDuration(from, to);
  if (tmpDuration < 0) {
    return 1;
  } else if ((tmpDuration - duration) >= 0) {
    return 3;
  }
  return 2;
};


export default {
  echoDateTime,
  calPercentBetween,
  fromNow,
  isOutOfDate,
  isTimeWarning,
  getDuration,
  checkOutOfDate
};
