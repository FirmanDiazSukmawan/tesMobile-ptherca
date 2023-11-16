export function calculateWorkHours(clock_in, clock_out) {
  const clock_inTime = new Date(`2023-11-15T${clock_in}`);
  const clock_outTime = new Date(`2023-11-15T${clock_out}`);

  const timeDiff = clock_outTime - clock_inTime;

  const hours = Math.floor(timeDiff / (60 * 60 * 1000));
  const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));

  let result = '';
  if (hours > 0) {
    result += `${hours} ${hours === 1 ? 'h' : 'h'}`;
  }
  if (minutes > 0) {
    result += ` ${minutes} ${minutes === 1 ? 'minute' : 'm'}`;
  }

  return result.trim();
}
