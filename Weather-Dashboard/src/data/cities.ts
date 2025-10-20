export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  timeZone: string;
}

export const CITIES: City[] = [
  {
    name: "San Francisco",
    country: "US",
    lat: 37.7749,
    lon: -122.4194,
    timeZone: "America/Los_Angeles",
  },
  {
    name: "Tehran",
    country: "IR",
    lat: 35.6892,
    lon: 51.389,
    timeZone: "Asia/Tehran",
  },
  {
    name: "London",
    country: "UK",
    lat: 51.5074,
    lon: -0.1278,
    timeZone: "Europe/London",
  },
  {
    name: "New York",
    country: "US",
    lat: 40.7128,
    lon: -74.006,
    timeZone: "America/New_York",
  },
  {
    name: "Paris",
    country: "FR",
    lat: 48.8566,
    lon: 2.3522,
    timeZone: "Europe/Paris",
  },
  {
    name: "Tokyo",
    country: "JP",
    lat: 35.6762,
    lon: 139.6503,
    timeZone: "Asia/Tokyo",
  },
  {
    name: "Sydney",
    country: "AU",
    lat: -33.8688,
    lon: 151.2093,
    timeZone: "Australia/Sydney",
  },
];
