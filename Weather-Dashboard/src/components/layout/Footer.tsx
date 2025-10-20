import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { useThemeMode } from "../../contexts/ThemeModeContext";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
function useClock(locale: string) {
  const [now, setNow] = React.useState<Date>(() => new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    weekday: "long",
    hour: "2-digit",
    day: "numeric",
    minute: "2-digit",
    hour12: false,
  };

  const formatted = new Intl.DateTimeFormat(locale, options).format(now);
  return formatted;
}

function Footer() {
  const { mode } = useThemeMode();
  const { lang } = useLanguage();
  const { t } = useTranslation();
  const locale = lang === "fa" ? "fa-IR" : "en-GB";
  const dateTimeStr = useClock(locale);

  return (
    <Box
      component="footer"
      sx={{
        background:
          mode === "light"
            ? "linear-gradient(90deg, #F3FAFE 0%, rgba(204, 221, 221, 0.619608) 51%, #F3FAFE 100%)"
            : "linear-gradient(90deg, #292F45 0%, #3F4861 50.5%, #151D32 98%)",
        py: 2,
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      {/* Logo & Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src="/FooterLogo.webp"
            alt="logo"
            sx={{ height: 50, width: 50, objectFit: "contain" }}
          />
          {/* Title */}
          <Typography variant="caption" sx={{ fontWeight: 400 }}>
            {t("footer.title")}
          </Typography>
        </Box>
      </Box>

      {/* Contact & date/time */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="mailto:info@nadin.ir"
            underline="none"
            gap={1}
            sx={{ fontWeight: 400, fontSize: "12px", display:"flex", alignItems:"center" }}
          >
            <EmailOutlinedIcon sx={(theme)=>({color:theme.palette.primary.main})} />
            {t("footer.contact")}: info@nadin.ir
          </Link>
          <Typography variant="caption" color="text.secondary" sx={{display:"flex", alignItems:"center"}} gap={1}>
            <CalendarMonthOutlinedIcon/>
            {dateTimeStr}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
