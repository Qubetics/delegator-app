Number.prototype.noExponents = function () {
  try {
    var data = String(this).split(/[eE]/);
    if (data.length === 1) return data[0];
    var z = "",
      sign = this < 0 ? "-" : "",
      str = data[0].replace(".", ""),
      mag = Number(data[1]) + 1;
    if (mag < 0) {
      z = sign + "0.";
      while (mag++) z += "0";
      return z + str.replace(/^\-/, "");
    }
    mag -= str.length;
    while (mag--) z += "0";
    return str + z;
  } catch (error) {}
};

export const noExponential = (num) => {
  return Number(num).noExponents();
};

export function capitalizeFirstLetter(string) {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

export const formatMillionNumber = (num) => {
  if (!num || num === null || num === undefined) return 0;
  let formattedNumber;

  switch (true) {
    case num >= 1e12:
      formattedNumber = (num / 1e12).toFixed(2) + " T";
      break;
    case num >= 1e9:
      formattedNumber = (num / 1e9).toFixed(2) + " B";
      break;
    case num >= 1e6:
      formattedNumber = (num / 1e6).toFixed(2) + " M";
      break;
    case num >= 1e3:
      formattedNumber = (num / 1e3).toFixed(2) + " K";
      break;
    default:
      formattedNumber = Number(num).toFixed(4);
      break;
  }

  return formattedNumber;
};

export const isTimeAgoByCreatedDate = (date) => {
  const parsedTime = new Date(date).getTime();
  const now = Date.now();
  const diffInSeconds = (now - parsedTime) / 1000;

  if (diffInSeconds < 60) {
    return `${Math.floor(diffInSeconds)}s ago`;
  }

  const diffInMinutes = diffInSeconds / 60;
  if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}m ago`;
  }

  const diffInHours = diffInMinutes / 60;
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  }

  const diffInDays = diffInHours / 24;
  if (diffInDays < 30) {
    return `${Math.floor(diffInDays)}d ago`;
  }

  const diffInMonths = diffInDays / 30;
  if (diffInMonths < 12) {
    return `${Math.floor(diffInMonths)}mo ago`;
  }

  const diffInYears = diffInMonths / 12;
  return `${Math.floor(diffInYears)}y ago`;
};



export function truncateText(text, maxLength = 15) {
  if (typeof text !== 'string') return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}