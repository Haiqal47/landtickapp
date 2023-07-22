import moment from "moment";

export function duration(endTime, startTime) {
  const start = moment(startTime, "HH:mm:ss");
  const end = moment(endTime, "HH:mm:ss");

  const duration = moment.duration(end.diff(start)).humanize();

  return duration;
}
