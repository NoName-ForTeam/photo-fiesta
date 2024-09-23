// array of cities
export const cities: City[] = [
  { city: 'Москва', cityEn: 'Moscow', id: 1 },
  { city: 'Лондон', cityEn: 'London', id: 2 },
  { city: 'Париж', cityEn: 'Paris', id: 3 },
  { city: 'Берлин', cityEn: 'Berlin', id: 4 },
  { city: 'Рим', cityEn: 'Rome', id: 5 },
  { city: 'Мадрид', cityEn: 'Madrid', id: 6 },
  { city: 'Токио', cityEn: 'Tokyo', id: 7 },
  { city: 'Пекин', cityEn: 'Beijing', id: 8 },
  { city: 'Вашингтон', cityEn: 'Washington D.C.', id: 9 },
  { city: 'Оттава', cityEn: 'Ottawa', id: 10 },
  { city: 'Канберра', cityEn: 'Canberra', id: 11 },
  { city: 'Бразилиа', cityEn: 'Brasilia', id: 12 },
  { city: 'Буэнос-Айрес', cityEn: 'Buenos Aires', id: 13 },
  { city: 'Мехико', cityEn: 'Mexico City', id: 14 },
  { city: 'Каир', cityEn: 'Cairo', id: 15 },
  { city: 'Претория', cityEn: 'Pretoria', id: 16 },
  { city: 'Нью-Дели', cityEn: 'New Delhi', id: 17 },
  { city: 'Джакарта', cityEn: 'Jakarta', id: 18 },
  { city: 'Сеул', cityEn: 'Seoul', id: 19 },
  { city: 'Анкара', cityEn: 'Ankara', id: 20 },
  { city: 'Афины', cityEn: 'Athens', id: 21 },
  { city: 'Осло', cityEn: 'Oslo', id: 22 },
  { city: 'Стокгольм', cityEn: 'Stockholm', id: 23 },
  { city: 'Хельсинки', cityEn: 'Helsinki', id: 24 },
  { city: 'Копенгаген', cityEn: 'Copenhagen', id: 25 },
  { city: 'Амстердам', cityEn: 'Amsterdam', id: 26 },
  { city: 'Брюссель', cityEn: 'Brussels', id: 27 },
  { city: 'Вена', cityEn: 'Vienna', id: 28 },
  { city: 'Прага', cityEn: 'Prague', id: 29 },
  { city: 'Варшава', cityEn: 'Warsaw', id: 30 },
]

// array of countries
export const countries: Country[] = [
  { country: 'Россия', countryEn: 'Russia', id: 1 },
  { country: 'Великобритания', countryEn: 'United Kingdom', id: 2 },
  { country: 'Франция', countryEn: 'France', id: 3 },
  { country: 'Германия', countryEn: 'Germany', id: 4 },
  { country: 'Италия', countryEn: 'Italy', id: 5 },
  { country: 'Испания', countryEn: 'Spain', id: 6 },
  { country: 'Япония', countryEn: 'Japan', id: 7 },
  { country: 'Китай', countryEn: 'China', id: 8 },
  { country: 'США', countryEn: 'USA', id: 9 },
  { country: 'Канада', countryEn: 'Canada', id: 10 },
  { country: 'Австралия', countryEn: 'Australia', id: 11 },
  { country: 'Бразилия', countryEn: 'Brazil', id: 12 },
  { country: 'Аргентина', countryEn: 'Argentina', id: 13 },
  { country: 'Мексика', countryEn: 'Mexico', id: 14 },
  { country: 'Египет', countryEn: 'Egypt', id: 15 },
  { country: 'ЮАР', countryEn: 'South Africa', id: 16 },
  { country: 'Индия', countryEn: 'India', id: 17 },
  { country: 'Индонезия', countryEn: 'Indonesia', id: 18 },
  { country: 'Южная Корея', countryEn: 'South Korea', id: 19 },
  { country: 'Турция', countryEn: 'Turkey', id: 20 },
  { country: 'Греция', countryEn: 'Greece', id: 21 },
  { country: 'Норвегия', countryEn: 'Norway', id: 22 },
  { country: 'Швеция', countryEn: 'Sweden', id: 23 },
  { country: 'Финляндия', countryEn: 'Finland', id: 24 },
  { country: 'Дания', countryEn: 'Denmark', id: 25 },
  { country: 'Нидерланды', countryEn: 'Netherlands', id: 26 },
  { country: 'Бельгия', countryEn: 'Belgium', id: 27 },
  { country: 'Австрия', countryEn: 'Austria', id: 28 },
  { country: 'Чехия', countryEn: 'Czech Republic', id: 29 },
  { country: 'Польша', countryEn: 'Poland', id: 30 },
]

//types
export type City = {
  city: string
  cityEn: string
  id: number
}

export type Country = {
  country: string
  countryEn: string
  id: number
}
