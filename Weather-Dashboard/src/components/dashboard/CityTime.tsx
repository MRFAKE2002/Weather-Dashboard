//! React
import { useMemo } from "react";

//! MUI
import { Typography } from "@mui/material";

//! Libraries
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import jalaliday from "jalaliday";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(jalaliday);

export default function CityTime({
  city,
}: {
  city: { name: string; timeZone: string } | null | undefined;
}) {
  const { i18n } = useTranslation();
  const lang = i18n.language ?? "en";

  const c = city ?? { name: "Tehran", timeZone: "Asia/Tehran" };
  const tz = c.timeZone || "Asia/Tehran";

  const nowInTz = useMemo(() => dayjs().tz(tz), [tz]);

  const isFa = lang.startsWith("fa");

  const getPersianMeridiem = (hour24: number) => {
    if (hour24 === 12) return "ظهر";
    if (hour24 >= 0 && hour24 < 6) return "بامداد";
    if (hour24 >= 6 && hour24 < 12) return "صبح";
    if (hour24 > 12 && hour24 < 18) return "عصر";
    return "شب";
  };

  let weekdayText = "";
  let dateTimeText = "";

  if (isFa) {
    try {
      weekdayText = nowInTz.calendar("jalali").locale("fa").format("dddd");
      const hour = nowInTz.hour();
      const mer = getPersianMeridiem(hour);
      const dayMonthYear = nowInTz
        .calendar("jalali")
        .locale("fa")
        .format("D MMMM YYYY");
      dateTimeText = `${nowInTz.format(
        "HH:mm"
      )} ${mer} ${weekdayText} ${dayMonthYear}`;
    } catch (e) {
      const native = nowInTz.toDate();
      const faWeekday = new Intl.DateTimeFormat("fa-IR", {
        timeZone: tz,
        weekday: "long",
      }).format(native);
      weekdayText = faWeekday;
      const faDate = new Intl.DateTimeFormat("fa-IR", {
        timeZone: tz,
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(native);
      const hour = nowInTz.hour();
      const mer = getPersianMeridiem(hour);
      dateTimeText = `${nowInTz.format(
        "HH:mm"
      )} ${mer} ${weekdayText} ${faDate}`;
    }
  } else {
    const native = nowInTz.toDate();
    const timeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(native);
    const dateStr = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(native);
    dateTimeText = `${timeStr} ${dateStr}`;
    weekdayText = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "long",
    }).format(native);
  }

  return (
    <div>
      <Typography
        variant="caption"
        fontWeight={500}
        fontSize={32}
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {isFa ? weekdayText : weekdayText}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {isFa ? dateTimeText : dateTimeText}
      </Typography>
    </div>
  );
}
