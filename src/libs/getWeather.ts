type Weather = {
   color: number;
   bgColor: number;
   snow: number;
   wind: number;
};

export type WeatherName = keyof typeof weathers;

const weathers = {
   morning: {
      color: 0xecdccc,
      bgColor: 0xf8c3ac,
      snow: 20,
      wind: 300,
   },
   afternoon: {
      color: 0xffffff,
      bgColor: 0x0571ff,
      snow: 2,
      wind: 80,
   },
   twilight: {
      color: 0xccaacc,
      bgColor: 0x18235c,
      snow: 10,
      wind: 200,
   },
   night: {
      color: 0x555555,
      bgColor: 0x000000,
      snow: 5,
      wind: 0,
   },
};

export default function getWeather(weather: WeatherName): Weather {
   return weathers[weather];
}
